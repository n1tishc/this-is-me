'use client'

import { useEffect, useRef } from 'react'
import { config } from '@/lib/portfolio-config'

const user = config.meta.name.split(' ')[0].toLowerCase()

/** The reusable `alex@portfolio ~ $` prompt label. */
export function PromptLabel() {
  return (
    <span className="shrink-0 text-primary">
      {user}
      <span className="text-muted-foreground">@</span>
      portfolio
      <span className="text-muted-foreground"> ~ $</span>
    </span>
  )
}

export function PromptLine({
  value,
  onChange,
  onSubmit,
  disabled,
  autoFocus,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  disabled?: boolean
  autoFocus?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep focus on the input whenever the terminal is clicked/enabled.
  useEffect(() => {
    if (autoFocus && !disabled) inputRef.current?.focus()
  }, [autoFocus, disabled])

  return (
    <div className="flex items-center gap-2 text-sm md:text-[15px]">
      <PromptLabel />
      <div className="relative flex-1">
        <input
          ref={inputRef}
          id="term-input-focus"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // Respect CJK IME composition before submitting on Enter.
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              e.keyCode !== 229
            ) {
              e.preventDefault()
              onSubmit()
            }
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal command input"
          className="w-full bg-transparent text-foreground caret-transparent outline-none placeholder:text-muted-foreground/60"
          placeholder={disabled ? '' : 'type a command or ask me anything…'}
        />
        {/* Custom block caret positioned after the typed text */}
        {!disabled && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 caret"
            style={{ left: `${value.length}ch` }}
          />
        )}
      </div>
    </div>
  )
}
