import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-primary">Error 404</p>
      <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-foreground text-balance md:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground text-pretty">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  )
}
