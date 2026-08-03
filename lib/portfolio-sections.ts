import { config } from '@/lib/portfolio-config'

/**
 * Deterministic, client-side section payloads.
 *
 * Each quick-action renders one of these instantly from the config — no model
 * call required — so the core portfolio content always works. Free-text
 * questions still go through the AI (see components/chat/chat.tsx).
 *
 * The `card.type` values match the dispatcher in components/chat/tool-cards.tsx.
 */

export type SectionId = 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'resume'

export type Section = {
  id: SectionId
  /** The question shown as the user bubble */
  question: string
  /** Short status line shown while the twin "thinks" before answering */
  thinking: string
  /** First-person intro shown as the assistant bubble above the card */
  intro: string[]
  /** The rich card to render */
  card: { type: string; data: unknown }
}

const first = config.meta.name.split(' ')[0]

export const sections: Record<SectionId, Section> = {
  about: {
    id: 'about',
    question: 'Tell me about yourself.',
    thinking: 'Figuring out where to start…',
    intro: config.about.paragraphs,
    card: {
      type: 'tool-showAbout',
      data: {
        name: config.meta.name,
        role: config.meta.role,
        avatar: config.meta.avatar,
        location: config.meta.location,
        highlights: config.about.highlights,
      },
    },
  },

  projects: {
    id: 'projects',
    question: 'What projects have you built?',
    thinking: 'Pulling up my favorite builds…',
    intro: [
      `Here are a few projects I'm most proud of. Each one shipped to production and moved a real metric — tap any card for the full case study.`,
    ],
    card: {
      type: 'tool-showProjects',
      data: {
        projects: config.projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          tagline: p.tagline,
          year: p.year,
          role: p.role,
          tech: p.tech,
          image: p.image,
          impact: p.impact,
          metrics: p.metrics,
          github: p.github ?? null,
          demo: p.demo ?? null,
        })),
      },
    },
  },

  skills: {
    id: 'skills',
    question: 'What are your technical skills?',
    thinking: 'Sorting through my toolkit…',
    intro: [
      `I work across the full ML lifecycle — from data and training to low-latency serving. Here's my toolkit, grouped by area.`,
    ],
    card: { type: 'tool-showSkills', data: { categories: config.skills } },
  },

  experience: {
    id: 'experience',
    question: 'Walk me through your work experience.',
    thinking: 'Retracing my steps…',
    intro: [
      `${first ? `I've` : 'I have'} spent the last several years leading ML initiatives across LLMs, recommenders, and computer vision. Here's the timeline.`,
    ],
    card: {
      type: 'tool-showExperience',
      data: {
        experience: config.experience.map((e) => ({
          company: e.company,
          role: e.role,
          location: e.location,
          start: e.start,
          end: e.end,
          summary: e.summary,
          impact: e.impact,
          achievements: e.achievements,
          technologies: e.technologies,
        })),
      },
    },
  },

  contact: {
    id: 'contact',
    question: 'How can I get in touch with you?',
    thinking: 'Grabbing my details…',
    intro: [`${config.meta.availability}. The fastest way to reach me is below — I'd love to chat.`],
    card: {
      type: 'tool-showContact',
      data: {
        email: config.meta.email,
        availability: config.meta.availability,
        location: config.meta.location,
        socials: config.socials,
      },
    },
  },

  resume: {
    id: 'resume',
    question: 'Can I see your resume?',
    thinking: 'Fetching the latest copy…',
    intro: [`Of course — here's my full resume. Feel free to download a copy.`],
    card: {
      type: 'tool-showResume',
      data: {
        resumeUrl: config.meta.resumeUrl,
        name: config.meta.name,
        role: config.meta.role,
      },
    },
  },
}
