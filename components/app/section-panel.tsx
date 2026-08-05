import { CHIPS } from '@/components/app/quick-chips'
import { SectionCard } from '@/components/app/section-cards'
import { sections, type SectionId } from '@/lib/portfolio-sections'

const META = Object.fromEntries(CHIPS.map((c) => [c.id, c])) as Record<
  SectionId,
  (typeof CHIPS)[number]
>

/** Renders one section as a full-height, scrollable tab panel. */
export function SectionPanel({ id }: { id: SectionId }) {
  const section = sections[id]
  const { label, icon: IconCmp } = META[id]

  return (
    <div className="panel-in min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-5 py-7 md:px-6 md:py-8">
        <header className="mb-5 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <IconCmp className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">{label}</h2>
            <p className="text-xs text-muted-foreground">{section.question}</p>
          </div>
        </header>

        {section.intro.length > 0 && (
          <div className="mb-5 space-y-3 text-pretty leading-relaxed text-muted-foreground">
            {section.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        <SectionCard id={id} />
      </div>
    </div>
  )
}
