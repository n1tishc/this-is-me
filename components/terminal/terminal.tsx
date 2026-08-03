'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { config } from '@/lib/portfolio-config'
import { sections, type SectionId } from '@/lib/portfolio-sections'
import { PromptLine, PromptLabel } from '@/components/terminal/prompt-line'
import { SectionOutput } from '@/components/terminal/terminal-output'
import { TerminalHeader } from '@/components/terminal/terminal-header'
import { BootBanner } from '@/components/terminal/boot-banner'
import { HelpOutput, TextOutput, NotFoundOutput } from '@/components/terminal/system-output'

type Entry =
  | { id: string; kind: 'command'; text: string }
  | { id: string; kind: 'section'; section: SectionId }
  | { id: string; kind: 'help' }
  | { id: string; kind: 'text'; text: string; tone?: 'normal' | 'muted' | 'error' }
  | { id: string; kind: 'notfound'; text: string }
  | { id: string; kind: 'thinking'; label: string }
  | { id: string; kind: 'ai'; text: string; done: boolean }

const SECTION_IDS = Object.keys(sections) as SectionId[]

// Commands the terminal understands directly (besides section names).
const SYSTEM_COMMANDS = ['help', 'clear', 'ls', 'whoami', 'socials'] as const

let counter = 0
const uid = () => `e${++counter}`

const witty = [
  "My AI twin is catching its breath (free tier, you know how it is). Try a command like `projects` or `skills` — those always work.",
  "Looks like I've hit my thinking quota for the minute. Meanwhile, `about` and `experience` are one keystroke away.",
  "Rate limit reached — even AI twins need coffee breaks. Run `help` to see everything you can explore instantly.",
]

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const history = useRef<string[]>([])
  const historyIdx = useRef<number>(-1)

  const push = useCallback((entry: Omit<Entry, 'id'>) => {
    const id = uid()
    setEntries((prev) => [...prev, { ...entry, id } as Entry])
    return id
  }, [])

  const update = useCallback((id: string, patch: Partial<Entry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? ({ ...e, ...patch } as Entry) : e)))
  }, [])

  // Auto-scroll to the newest output.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries])

  const runAI = useCallback(
    async (question: string) => {
      const thinkingId = push({ kind: 'thinking', label: 'thinking' } as Entry)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ id: uid(), role: 'user', parts: [{ type: 'text', text: question }] }],
          }),
        })
        if (!res.ok || !res.body) throw new Error('bad response')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let text = ''
        let aiId: string | null = null

        const ensure = () => {
          if (aiId === null) {
            setEntries((prev) => prev.filter((e) => e.id !== thinkingId))
            aiId = push({ kind: 'ai', text: '', done: false } as Entry)
          }
        }

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
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
                ensure()
                text += evt.delta
                if (aiId) update(aiId, { text })
              }
            } catch {
              // ignore non-JSON keep-alive lines
            }
          }
        }
        if (aiId) update(aiId, { done: true })
        else {
          setEntries((prev) => prev.filter((e) => e.id !== thinkingId))
          push({ kind: 'ai', text: witty[Math.floor(Math.random() * witty.length)], done: true } as Entry)
        }
      } catch {
        setEntries((prev) => prev.filter((e) => e.id !== thinkingId))
        push({
          kind: 'ai',
          text: witty[Math.floor(Math.random() * witty.length)],
          done: true,
        } as Entry)
      }
    },
    [push, update],
  )

  const runSection = useCallback(
    async (id: SectionId) => {
      const section = sections[id]
      const thinkingId = push({ kind: 'thinking', label: section.thinking } as Entry)
      // A believable "thinking" beat with slight jitter.
      await new Promise((r) => setTimeout(r, 650 + Math.random() * 500))
      setEntries((prev) => prev.filter((e) => e.id !== thinkingId))
      push({ kind: 'section', section: id } as Entry)
    },
    [push],
  )

  const handle = useCallback(
    async (raw: string) => {
      const value = raw.trim()
      if (!value) return
      history.current.push(value)
      historyIdx.current = history.current.length
      push({ kind: 'command', text: value } as Entry)
      setInput('')
      setBusy(true)

      const cmd = value.toLowerCase()
      const base = cmd.split(/\s+/)[0]

      try {
        if (base === 'clear') {
          setEntries([])
        } else if (base === 'help' || base === 'menu' || base === '?') {
          push({ kind: 'help' } as Entry)
        } else if (base === 'whoami') {
          push({ kind: 'text', text: `${config.meta.name} — ${config.meta.role}` } as Entry)
        } else if (base === 'ls') {
          push({
            kind: 'text',
            text: SECTION_IDS.join('   '),
            tone: 'muted',
          } as Entry)
        } else if (base === 'socials') {
          push({ kind: 'section', section: 'contact' } as Entry)
        } else if ((SECTION_IDS as string[]).includes(base)) {
          await runSection(base as SectionId)
        } else {
          // Anything else is a natural-language question for the AI twin.
          await runAI(value)
        }
      } finally {
        setBusy(false)
      }
    },
    [push, runAI, runSection],
  )

  const suggestions = useMemo(() => ['about', 'projects', 'skills', 'experience', 'contact', 'resume'], [])

  return (
    <div className="mx-auto flex h-[100dvh] max-w-3xl flex-col px-3 py-4 md:px-6 md:py-8">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/5 ring-1 ring-black/5 dark:shadow-black/30">
        <TerminalHeader />

        {/* Scrollback */}
        <div
          ref={scrollRef}
          onClick={() => {
            const sel = window.getSelection()?.toString()
            if (!sel) document.getElementById('term-input-focus')?.focus()
          }}
          className="relative min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 text-sm leading-relaxed md:px-7 md:py-7 md:text-[15px]"
        >
          <div className="relative z-[1] space-y-4">
            <BootBanner onDone={() => setBooted(true)} />

            {booted &&
              entries.map((entry) => {
                switch (entry.kind) {
                  case 'command':
                    return (
                      <div key={entry.id} className="flex items-center gap-2 pt-1">
                        <PromptLabel />
                        <span className="text-foreground">{entry.text}</span>
                      </div>
                    )
                  case 'thinking':
                    return (
                      <div key={entry.id} className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-accent">~</span>
                        <span>{entry.label}</span>
                        <span className="inline-flex gap-1">
                          <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                          <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                          <span className="h-1 w-1 animate-bounce rounded-full bg-current" />
                        </span>
                      </div>
                    )
                  case 'section':
                    return (
                      <div key={entry.id} className="flicker-in">
                        <SectionOutput id={entry.section} />
                      </div>
                    )
                  case 'help':
                    return <HelpOutput key={entry.id} />
                  case 'text':
                    return <TextOutput key={entry.id} text={entry.text} tone={entry.tone} />
                  case 'notfound':
                    return <NotFoundOutput key={entry.id} text={entry.text} />
                  case 'ai':
                    return (
                      <div
                        key={entry.id}
                        className="border-l-2 border-accent/40 pl-4 text-foreground md:pl-5"
                      >
                        <p className="whitespace-pre-wrap text-pretty leading-relaxed">
                          {entry.text}
                          {!entry.done && <span className="caret" />}
                        </p>
                      </div>
                    )
                  default:
                    return null
                }
              })}

            {/* Live prompt */}
            {booted && (
              <PromptLine
                value={input}
                onChange={setInput}
                onSubmit={() => handle(input)}
                disabled={busy}
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Suggestion bar */}
        {booted && (
          <div className="flex flex-wrap items-center gap-2 border-t border-border bg-secondary/30 px-4 py-3 md:px-6">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={busy}
                onClick={() => handle(s)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary disabled:opacity-50"
              >
                {s}
              </button>
            ))}
            <button
              type="button"
              disabled={busy}
              onClick={() => handle('help')}
              className="ml-auto rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
            >
              help
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
