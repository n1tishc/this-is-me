'use client'

import { ArrowUp } from 'lucide-react'
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export function AskBar({
  onSubmit,
  disabled,
  autoFocus,
  placeholder = 'Ask me anything…',
  className,
}: {
  onSubmit: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  placeholder?: string
  className?: string
}) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function submit(e?: FormEvent) {
    e?.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue('')
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Respect IME composition (CJK) before submitting on Enter.
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      submit()
    }
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        'flex items-center gap-2 rounded-full border border-border bg-background py-2 pl-5 pr-2 transition-colors focus-within:border-primary/60',
        className,
      )}
    >
      <input
        ref={inputRef}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Ask me anything"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp className="size-4" strokeWidth={2.5} />
      </button>
    </form>
  )
}
