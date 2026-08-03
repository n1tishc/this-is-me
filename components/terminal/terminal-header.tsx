'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Icon } from '@/components/icon'
import { config } from '@/lib/portfolio-config'

export function TerminalHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const user = config.meta.name.split(' ')[0].toLowerCase()

  return (
    <header className="flex items-center gap-3 border-b border-border bg-secondary/40 px-4 py-3 md:px-5">
      {/* Traffic lights */}
      <div className="flex items-center gap-2" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-destructive/80" />
        <span className="h-3 w-3 rounded-full bg-accent/80" />
        <span className="h-3 w-3 rounded-full bg-primary/80" />
      </div>

      <p className="flex-1 truncate text-center text-xs text-muted-foreground">
        {user}@portfolio
      </p>

      <div className="flex items-center gap-1">
        {config.socials.slice(0, 2).map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="rounded p-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon name={s.icon} className="h-4 w-4" />
          </a>
        ))}
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle color theme"
          className="rounded p-1.5 text-muted-foreground transition-colors hover:text-primary"
        >
          {mounted && resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  )
}
