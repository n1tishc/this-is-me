'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { DesktopWindow } from '@/components/app/desktop-window'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { NeuralBackground } from '@/components/app/neural-background'
import { SectionPanel } from '@/components/app/section-panel'
import { AskBar } from '@/components/app/ask-bar'
import { QuickChips } from '@/components/app/quick-chips'
import { Conversation, type Msg } from '@/components/app/conversation'
import { config } from '@/lib/portfolio-config'
import type { SectionId } from '@/lib/portfolio-sections'

const SECTION_IDS: SectionId[] = ['about', 'projects', 'skills', 'experience', 'contact', 'resume']

type View = 'home' | 'chat' | SectionId

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function PortfolioApp() {
  const [view, setView] = useState<View>('home')
  const [messages, setMessages] = useState<Msg[]>([])
  const [busy, setBusy] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (view !== 'chat') return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, view])

  const goHome = useCallback(() => setView('home'), [])

  const openSection = useCallback((id: SectionId) => {
    setView(id)
  }, [])

  const runAI = useCallback(
    async (text: string) => {
      const history: Msg[] = [...messages, { id: uid(), role: 'user', text }]
      const assistantId = uid()
      setMessages([...history, { id: assistantId, role: 'assistant', text: '', streaming: true }])
      setView('chat')
      setBusy(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.map((m) => ({
              id: m.id,
              role: m.role,
              parts: [{ type: 'text', text: m.text }],
            })),
          }),
        })

        if (!res.body) throw new Error('no body')
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)),
            )
            break
          }
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const payload = trimmed.slice(5).trim()
            if (payload === '[DONE]') continue
            try {
              const evt = JSON.parse(payload)
              if (evt.type === 'text-delta' && typeof evt.delta === 'string') {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, text: m.text + evt.delta, streaming: true } : m,
                  ),
                )
              }
            } catch {
              // ignore keep-alive / non-JSON lines
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  streaming: false,
                  text:
                    m.text ||
                    "My AI twin is catching its breath (free tier, you know how it is). Try a topic below, or ask again in a moment.",
                }
              : m,
          ),
        )
      } finally {
        setBusy(false)
        abortRef.current = null
      }
    },
    [messages],
  )

  const handleSubmit = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text || busy) return
      const cmd = text.toLowerCase().replace(/^\//, '')
      if ((SECTION_IDS as string[]).includes(cmd)) {
        openSection(cmd as SectionId)
        return
      }
      if (cmd === 'clear' || cmd === 'reset') {
        setMessages([])
        setView('home')
        return
      }
      void runAI(text)
    },
    [busy, runAI, openSection],
  )

  const atHome = view === 'home'

  return (
    <div className="desktop-bg relative flex min-h-[100dvh] items-stretch justify-center p-0 sm:items-center sm:p-6 md:p-8">
      <NeuralBackground />

      <div className="relative flex h-[100dvh] w-full max-w-4xl sm:h-[min(860px,90dvh)]">
        <DesktopWindow
          title={`${config.meta.name.toLowerCase().replace(/\s+/g, '-')} — portfolio`}
          right={<ThemeToggle />}
          layer={<NeuralBackground variant="card" />}
          nav={
            !atHome ? (
              <button
                type="button"
                onClick={goHome}
                className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Home
              </button>
            ) : null
          }
        >
          {/* Content area — swapped per view, keyed to animate the transition */}
          <div key={view} className="panel-in flex min-h-0 flex-1 flex-col">
            {atHome && (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                <img
                  src={config.meta.avatar || '/placeholder.svg'}
                  alt={config.meta.name}
                  className="mb-5 size-16 rounded-full border border-border object-cover"
                />
                <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                  {config.meta.name}
                </h1>
                <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {config.meta.role} · {config.meta.location}. Ask me anything, or pick a topic to
                  open it.
                </p>
                <div className="mt-8 w-full max-w-xl">
                  <QuickChips onPick={openSection} disabled={busy} variant="card" />
                </div>
              </div>
            )}

            {view === 'chat' && (
              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
                  <Conversation messages={messages} />
                </div>
              </div>
            )}

            {view !== 'home' && view !== 'chat' && <SectionPanel id={view} />}
          </div>

          {/* Persistent ask bar — the "chat window" always stays reachable */}
          <div className="shrink-0 border-t border-border bg-card/70 px-4 py-3 backdrop-blur md:px-6">
            <div className="mx-auto max-w-2xl">
              <AskBar onSubmit={handleSubmit} disabled={busy} autoFocus={atHome} />
              {!atHome && (
                <div className="mt-2.5">
                  <QuickChips onPick={openSection} disabled={busy} variant="pill" />
                </div>
              )}
            </div>
          </div>
        </DesktopWindow>
      </div>
    </div>
  )
}
