import type { ReactNode } from 'react'

/**
 * The desktop-app window frame (Codex / Claude-desktop feel): rounded corners,
 * soft layered shadow, a title bar with traffic lights, a centered title, an
 * optional left nav slot (e.g. a back button), and a right-hand controls slot.
 */
export function DesktopWindow({
  title,
  nav,
  right,
  layer,
  children,
}: {
  title: string
  nav?: ReactNode
  right?: ReactNode
  /** Optional decorative layer painted behind the content (e.g. a node field). */
  layer?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="window-shadow flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl">
      {/* Title bar */}
      <header className="relative flex h-11 shrink-0 items-center gap-3 border-b border-border bg-secondary/40 px-4">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-accent" />
          <span className="size-3 rounded-full bg-muted-foreground/40" />
          <span className="size-3 rounded-full bg-primary" />
        </div>

        {nav}

        <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 truncate text-xs font-medium text-muted-foreground">
          {title}
        </p>

        <div className="ml-auto flex items-center gap-1">{right}</div>
      </header>

      {/* Content */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        {layer}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
