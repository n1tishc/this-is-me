'use client'

import { Briefcase, FileText, FolderGit2, Mail, Sparkles, User, type LucideIcon } from 'lucide-react'
import type { SectionId } from '@/lib/portfolio-sections'
import { cn } from '@/lib/utils'

type Chip = { id: SectionId; label: string; icon: LucideIcon }

export const CHIPS: Chip[] = [
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'resume', label: 'Resume', icon: FileText },
]

export function QuickChips({
  onPick,
  disabled,
  variant = 'card',
  className,
}: {
  onPick: (id: SectionId) => void
  disabled?: boolean
  variant?: 'card' | 'pill'
  className?: string
}) {
  if (variant === 'pill') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
        {CHIPS.map(({ id, label, icon: IconCmp }) => (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(id)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
          >
            <IconCmp className="size-3.5" />
            {label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6', className)}>
      {CHIPS.map(({ id, label, icon: IconCmp }) => (
        <button
          key={id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(id)}
          className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background px-3 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm disabled:opacity-50"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <IconCmp className="size-5" />
          </span>
          <span className="text-xs font-medium text-foreground">{label}</span>
        </button>
      ))}
    </div>
  )
}
