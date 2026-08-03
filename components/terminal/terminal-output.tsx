'use client'

import Image from 'next/image'
import { config } from '@/lib/portfolio-config'
import type { SectionId } from '@/lib/portfolio-sections'

/* ------------------------------------------------------------------ *
 * Shared primitives — calm, spacious terminal output
 * ------------------------------------------------------------------ */

function OutputBlock({ children }: { children: React.ReactNode }) {
  // A soft left rail groups each answer without heavy boxes.
  return <div className="border-l-2 border-primary/30 pl-4 md:pl-5">{children}</div>
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{children}</p>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 leading-relaxed">
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{children}</span>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-foreground/80"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function Bar({ level }: { level: number }) {
  return (
    <span className="inline-flex h-2 w-28 overflow-hidden rounded-full bg-secondary align-middle">
      <span
        className="bar-fill h-full rounded-full bg-primary"
        style={{ width: `${level}%` }}
      />
    </span>
  )
}

function TermLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  )
}

/* ------------------------------------------------------------------ *
 * Section renderers
 * ------------------------------------------------------------------ */

function AboutOut() {
  const { meta, about } = config
  return (
    <OutputBlock>
      <Label>about</Label>
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={meta.avatar || '/placeholder.svg'}
          alt=""
          width={52}
          height={52}
          className="rounded-lg border border-border"
        />
        <div className="space-y-1 text-sm">
          <Field label="role">{meta.role}</Field>
          <Field label="location">{meta.location}</Field>
          <Field label="status">
            <span className="text-primary">{meta.availability}</span>
          </Field>
        </div>
      </div>
      <div className="space-y-2 text-foreground/90">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-pretty">
            {p}
          </p>
        ))}
      </div>
      <ul className="mt-3 space-y-1">
        {about.highlights.map((h) => (
          <li key={h.label} className="flex gap-3 leading-relaxed">
            <span className="w-20 shrink-0 text-muted-foreground">{h.label}</span>
            <span className="text-foreground/90">{h.value}</span>
          </li>
        ))}
      </ul>
    </OutputBlock>
  )
}

function ProjectsOut() {
  return (
    <OutputBlock>
      <Label>projects</Label>
      <div className="space-y-5">
        {config.projects.map((p) => (
          <div key={p.slug}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold text-foreground">{p.title}</span>
              <span className="text-xs text-muted-foreground">{p.year}</span>
            </div>
            <p className="leading-relaxed text-muted-foreground">{p.tagline}</p>
            <p className="mt-1 leading-relaxed text-foreground/90">{p.impact}</p>
            <div className="mt-2">
              <Chips items={p.tech} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {p.github ? <TermLink href={p.github}>source</TermLink> : null}
              {p.demo ? <TermLink href={p.demo}>live demo</TermLink> : null}
              <TermLink href={`/projects/${p.slug}`}>case study →</TermLink>
            </div>
          </div>
        ))}
      </div>
    </OutputBlock>
  )
}

function SkillsOut() {
  return (
    <OutputBlock>
      <Label>skills</Label>
      <div className="space-y-4">
        {config.skills.map((cat) => (
          <div key={cat.title}>
            <p className="mb-1.5 text-sm text-primary">{cat.title}</p>
            <div className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {cat.skills.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-3">
                  <span className="text-foreground/90">{s.name}</span>
                  <Bar level={s.level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OutputBlock>
  )
}

function ExperienceOut() {
  return (
    <OutputBlock>
      <Label>experience</Label>
      <div className="space-y-5">
        {config.experience.map((e, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold text-foreground">{e.role}</span>
              <span className="text-foreground/70">· {e.company}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {e.start} – {e.end} · {e.location}
            </p>
            <p className="mt-1 leading-relaxed text-foreground/90">{e.summary}</p>
            <ul className="mt-1.5 space-y-1">
              {e.achievements.map((a, j) => (
                <li key={j} className="flex gap-2 leading-relaxed">
                  <span className="text-primary">–</span>
                  <span className="text-foreground/90">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </OutputBlock>
  )
}

function ContactOut() {
  const { meta, socials } = config
  return (
    <OutputBlock>
      <Label>contact</Label>
      <div className="space-y-1 text-sm">
        <Field label="email">
          <TermLink href={`mailto:${meta.email}`}>{meta.email}</TermLink>
        </Field>
        <Field label="location">{meta.location}</Field>
        <Field label="status">
          <span className="text-primary">{meta.availability}</span>
        </Field>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {socials.map((s) => (
          <TermLink key={s.label} href={s.href}>
            {s.label} →
          </TermLink>
        ))}
      </div>
    </OutputBlock>
  )
}

function ResumeOut() {
  const { meta } = config
  return (
    <OutputBlock>
      <Label>resume</Label>
      <p className="leading-relaxed text-foreground/90">
        {meta.name} — {meta.role}
      </p>
      <a
        href={meta.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Download resume.pdf
      </a>
    </OutputBlock>
  )
}

const RENDERERS: Record<SectionId, () => React.JSX.Element> = {
  about: AboutOut,
  projects: ProjectsOut,
  skills: SkillsOut,
  experience: ExperienceOut,
  contact: ContactOut,
  resume: ResumeOut,
}

export function SectionOutput({ id }: { id: SectionId }) {
  const Renderer = RENDERERS[id]
  return <Renderer />
}
