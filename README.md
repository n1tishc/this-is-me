# AI / ML Engineer Portfolio

A fast, premium, single-page portfolio built with Next.js 16, Tailwind CSS v4, and Framer Motion. Dark mode by default with a light theme toggle, a `⌘K` command palette, animated sections, project case-study pages, and full SEO.

## Make it yours

Everything is driven by a single file:

```
lib/portfolio-config.ts
```

Edit the values there (name, headline, stats, skills, experience, projects, certifications, education, achievements, testimonials, socials, contact). Every section, the metadata, and the structured data read from this config — no component edits required for content changes.

## Assets to replace

- `public/headshot.png` — your photo
- `public/resume.pdf` — your resume (linked from the nav, hero, and floating button)
- `public/og.png` — social share image (1200×630)
- `public/projects/*` and `public/testimonials/*` — project and testimonial imagery
- Update `meta.siteUrl` in the config for correct SEO / sitemap / Open Graph URLs

## Features

- Sticky nav with active-section highlighting and mobile menu
- `⌘K` command palette (navigate, toggle theme, download resume, open socials)
- Scroll progress bar, custom cursor, back-to-top, floating resume button
- Animated hero with count-up stats, skill bars, expandable experience timeline
- Project cards with a detail modal and dedicated `/projects/[slug]` case-study pages
- Light / dark theme via `next-themes`, dark by default
- SEO: metadata, Open Graph, Twitter cards, JSON-LD Person schema, `sitemap.xml`, `robots.txt`

## Develop

```bash
pnpm install
pnpm dev
```
