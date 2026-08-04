import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { config } from '@/lib/portfolio-config'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const { meta } = config

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: {
    default: `${meta.name} — ${meta.role}`,
    template: `%s — ${meta.name}`,
  },
  description: `Chat with ${meta.name}'s AI twin. ${meta.valueProp}`,
  keywords: [
    meta.name,
    'AI Engineer',
    'Machine Learning Engineer',
    'LLM',
    'MLOps',
    'Deep Learning',
    'Interactive Portfolio',
    'AI Portfolio',
  ],
  authors: [{ name: meta.name, url: meta.siteUrl }],
  creator: meta.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: meta.siteUrl,
    title: `${meta.name} — ${meta.role}`,
    description: `Chat with ${meta.name}'s AI twin about their work, projects, and experience.`,
    siteName: `${meta.name} · Interactive Portfolio`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${meta.name} — ${meta.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${meta.name} — ${meta.role}`,
    description: `Chat with ${meta.name}'s AI twin about their work, projects, and experience.`,
    creator: meta.twitterHandle,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: meta.siteUrl },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eaeaea' },
    { media: '(prefers-color-scheme: dark)', color: '#1d2129' },
  ],
  colorScheme: 'dark light',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: meta.name,
  jobTitle: meta.role,
  description: meta.valueProp,
  url: meta.siteUrl,
  email: meta.email,
  address: { '@type': 'PostalAddress', addressLocality: meta.location },
  sameAs: config.socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
