import Image from 'next/image'
import { ArrowUpRight, Download, MapPin } from 'lucide-react'
import { config } from '@/lib/portfolio-config'
import type { SectionId } from '@/lib/portfolio-sections'
import { Icon } from '@/components/icon'

/* ------------------------------- About ---------------------------------- */

function AboutCard() {
  const { about, meta } = config
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <Image
          src={meta.avatar || '/placeholder.svg'}
          alt={meta.name}
          width={52}
          height={52}
          className="size-12 rounded-full border border-border object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{meta.name}</p>
          <p className="text-sm text-primary">{meta.role}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {meta.location}
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {about.highlights.map((h) => (
          <div key={h.label} className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</dt>
            <dd className="text-right text-sm font-medium text-foreground">{h.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ------------------------------ Projects --------------------------------- */

function ProjectsCard() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {config.projects.map((p) => (
        <article
          key={p.slug}
          className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={p.image || '/placeholder.svg'}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            <span className="absolute right-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
              {p.year}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight text-foreground">{p.title}</h3>
              <div className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="transition-colors hover:text-foreground">
                    <Icon name="github" className="size-4" />
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="transition-colors hover:text-foreground">
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 pt-4">
              {p.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-muted/60 px-2 py-1.5 text-center">
                  <p className="text-sm font-semibold text-primary">{m.value}</p>
                  <p className="text-[10px] leading-tight text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ------------------------------- Skills ---------------------------------- */

function SkillsCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {config.skills.map((cat) => (
        <div key={cat.title} className="rounded-xl border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cat.title}</p>
          <ul className="space-y-2.5">
            {cat.skills.map((s) => (
              <li key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.level}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bar-fill h-full rounded-full bg-primary"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------- Experience -------------------------------- */

function ExperienceCard() {
  return (
    <ol className="relative space-y-4 border-l border-border pl-5">
      {config.experience.map((e) => (
        <li key={`${e.company}-${e.start}`} className="relative">
          <span className="absolute -left-[27px] top-1.5 size-2.5 rounded-full border-2 border-card bg-primary" />
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-semibold text-foreground">{e.role}</p>
              <span className="text-xs text-muted-foreground">
                {e.start} – {e.end}
              </span>
            </div>
            <p className="text-sm text-primary">
              {e.company} · <span className="text-muted-foreground">{e.location}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
            <ul className="mt-3 space-y-1.5">
              {e.achievements.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-foreground/90">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.technologies.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------ Contact ---------------------------------- */

function ContactCard() {
  const { meta, socials } = config
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <a
        href={`mailto:${meta.email}`}
        className="flex items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3 text-primary-foreground transition-opacity hover:opacity-90"
      >
        <span className="min-w-0">
          <span className="block text-[11px] uppercase tracking-wide opacity-80">Email</span>
          <span className="block truncate text-sm font-medium">{meta.email}</span>
        </span>
        <ArrowUpRight className="size-4 shrink-0" />
      </a>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        {meta.location} · {meta.availability}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Icon name={s.icon} className="size-4" />
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------- Resume ---------------------------------- */

function ResumeCard() {
  const { meta } = config
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4">
      <div>
        <p className="font-medium text-foreground">{meta.name} — Résumé</p>
        <p className="text-sm text-muted-foreground">{meta.role}</p>
      </div>
      <a
        href={meta.resumeUrl}
        target="_blank"
        rel="noreferrer"
        download
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Download className="size-4" />
        Download PDF
      </a>
    </div>
  )
}

/* ----------------------------- Dispatcher -------------------------------- */

const CARDS: Record<SectionId, () => React.ReactNode> = {
  about: AboutCard,
  projects: ProjectsCard,
  skills: SkillsCard,
  experience: ExperienceCard,
  contact: ContactCard,
  resume: ResumeCard,
}

export function SectionCard({ id }: { id: SectionId }) {
  const Cmp = CARDS[id]
  return <Cmp />
}
