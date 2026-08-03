'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { config } from '@/lib/portfolio-config'

const { meta } = config

const bootLines = [
  { text: 'initializing session…', tone: 'muted' as const },
  { text: `authenticated as guest · ${meta.location}`, tone: 'muted' as const },
  { text: 'ready', tone: 'primary' as const },
]

export function BootBanner({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (visible >= bootLines.length) {
      if (!doneRef.current) {
        doneRef.current = true
        onDone()
      }
      return
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 180 : 220)
    return () => clearTimeout(t)
  }, [visible, onDone])

  return (
    <div className="space-y-4">
      {/* Calm identity header — avatar + name, no ASCII art */}
      <div className="flex items-center gap-3">
        <Image
          src={meta.avatar || '/placeholder.svg'}
          alt=""
          width={48}
          height={48}
          className="rounded-lg border border-border"
          priority
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{meta.name}</p>
          <p className="truncate text-xs text-muted-foreground">{meta.role}</p>
        </div>
      </div>

      <div className="space-y-0.5">
        {bootLines.slice(0, visible).map((line, i) => (
          <p
            key={i}
            className={
              'flicker-in ' +
              (line.tone === 'primary' ? 'text-primary' : 'text-muted-foreground')
            }
          >
            <span className="text-muted-foreground/60">{'» '}</span>
            {line.text}
          </p>
        ))}
      </div>

      {visible >= bootLines.length && (
        <p className="flicker-in text-foreground/90">
          {"Hi — I'm "}
          {meta.name.split(' ')[0]}
          {"'s portfolio. Type a command like "}
          <span className="text-primary">projects</span>
          {', or just '}
          <span className="text-accent">ask me anything</span>
          {'.'}
        </p>
      )}
    </div>
  )
}
