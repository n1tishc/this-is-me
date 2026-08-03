import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/icon'
import { config } from '@/lib/portfolio-config'

export function generateStaticParams() {
  return config.projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = config.projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${config.meta.name}`,
      description: project.tagline,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = config.projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const index = config.projects.findIndex((p) => p.slug === slug)
  const next = config.projects[(index + 1) % config.projects.length]

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to projects
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-2 font-mono text-xs text-primary">
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.role}</span>
        </div>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground text-balance md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Icon name="github" className="size-4" /> Code
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <ExternalLink className="size-4" /> Live demo
            </a>
          ) : null}
        </div>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          priority
          sizes="56rem"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-card p-5 text-center">
            <div className="font-mono text-xl font-semibold text-primary">{m.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            The problem
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/90 text-pretty">{project.problem}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            The solution
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/90 text-pretty">{project.solution}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Impact
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/90 text-pretty">{project.impact}</p>
        </section>

        <section>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Architecture
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {project.architecture.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium">
                  {step}
                </span>
                {i < project.architecture.length - 1 ? (
                  <ArrowRight className="size-4 shrink-0 text-primary" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.gallery.length > 1 ? (
          <section className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`${project.title} detail`}
                  fill
                  sizes="28rem"
                  className="object-cover"
                />
              </div>
            ))}
          </section>
        ) : null}
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
        <span className="text-sm text-muted-foreground">Next project</span>
        <Link
          href={`/projects/${next.slug}`}
          className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
        >
          {next.title} <ArrowRight className="size-4" />
        </Link>
      </div>
    </main>
  )
}
