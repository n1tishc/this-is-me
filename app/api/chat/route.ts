import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  type ModelMessage,
  type UIMessage,
} from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { buildSystemPrompt } from '@/lib/persona'

/**
 * Convert the client UIMessages into plain model messages. We do this by hand
 * (instead of `convertToModelMessages`) because we fully control the message
 * shape sent from `useChat`, and it keeps the payload minimal and predictable.
 */
function toModelMessages(uiMessages: UIMessage[]): ModelMessage[] {
  return (uiMessages ?? [])
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: (m.parts ?? [])
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join('\n')
        .trim(),
    }))
    .filter((m) => m.content.length > 0)
}

// Allow responses up to 30 seconds
export const maxDuration = 30

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })

// Free models, tried in order. If the first is rate-limited or errors, we fall
// back to the next before giving up with an in-character message.
const MODELS = ['google/gemma-4-31b-it:free', 'openai/gpt-oss-20b:free']

// Witty, in-character lines shown when the free tier is exhausted, so a
// recruiter never sees a raw error — the twin just admits it's catching a breath.
const RATE_LIMIT_LINES = [
  "Ah — my free-tier brain just hit its hourly thinking quota. Give me a few minutes to recharge, or tap a command below (`about`, `projects`, `skills`) and I'll answer instantly from memory.",
  "Looks like I've been talking a lot today and my free model needs a breather. Try one of the commands below in the meantime — those don't cost me any tokens.",
  "My budget-friendly neurons are rate-limited for the moment. The commands below (`projects`, `experience`, `skills`) still work perfectly — go ahead and run one.",
]

const ERROR_LINES = [
  "Something glitched on my end just now. Mind trying that again, or run a command like `projects` or `skills` below?",
  "Hmm, I dropped that thought mid-sentence. Give it another shot — or tap a command below for the instant version.",
]

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)]
}

function isRateLimit(err: unknown): boolean {
  const anyErr = err as { statusCode?: number; status?: number; message?: string }
  const code = anyErr?.statusCode ?? anyErr?.status
  const msg = (anyErr?.message ?? String(err)).toLowerCase()
  return code === 429 || msg.includes('rate') || msg.includes('quota') || msg.includes('429')
}

function chunkWords(text: string): string[] {
  // Split into word-sized chunks (keeping trailing spaces) for a typewriter feel.
  return text.match(/\S+\s*/g) ?? [text]
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const modelMessages = toModelMessages(messages)
  const system = buildSystemPrompt()

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const id = crypto.randomUUID()
      writer.write({ type: 'text-start', id })

      let answer = ''
      let sawRateLimit = false

      for (const modelId of MODELS) {
        try {
          const { text } = await generateText({
            model: openrouter.chat(modelId),
            system,
            messages: modelMessages,
            temperature: 0.6,
            maxOutputTokens: 400,
          })
          answer = (text ?? '').trim()
          if (answer) break
        } catch (err) {
          if (isRateLimit(err)) sawRateLimit = true
          // fall through and try the next model
        }
      }

      if (!answer) {
        answer = sawRateLimit ? pick(RATE_LIMIT_LINES) : pick(ERROR_LINES)
      }

      for (const chunk of chunkWords(answer)) {
        writer.write({ type: 'text-delta', id, delta: chunk })
        await sleep(16)
      }
      writer.write({ type: 'text-end', id })
    },
  })

  return createUIMessageStreamResponse({ stream })
}
