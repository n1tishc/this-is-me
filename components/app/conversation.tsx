import Image from 'next/image'
import { config } from '@/lib/portfolio-config'
import type { SectionId } from '@/lib/portfolio-sections'
import { SectionCard } from '@/components/app/section-cards'

export type Msg = {
  id: string
  role: 'user' | 'assistant'
  text: string
  /** when set, render the matching rich card beneath the text */
  section?: SectionId
  /** show the blinking caret while the answer streams in */
  streaming?: boolean
}

function AssistantMessage({ msg }: { msg: Msg }) {
  return (
    <div className="flex gap-3">
      <Image
        src={config.meta.avatar || '/placeholder.svg'}
        alt=""
        width={30}
        height={30}
        className="mt-0.5 size-7 shrink-0 rounded-full border border-border object-cover"
      />
      <div className="min-w-0 flex-1 space-y-3">
        {msg.text && (
          <p className="whitespace-pre-wrap text-pretty leading-relaxed text-foreground">
            {msg.text}
            {msg.streaming && <span className="caret" />}
          </p>
        )}
        {msg.streaming && !msg.text && (
          <span className="inline-flex gap-1 py-1" aria-label="Thinking">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </span>
        )}
        {msg.section && <SectionCard id={msg.section} />}
      </div>
    </div>
  )
}

function UserMessage({ msg }: { msg: Msg }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] text-pretty rounded-2xl rounded-br-sm bg-primary px-4 py-2 leading-relaxed text-primary-foreground">
        {msg.text}
      </p>
    </div>
  )
}

export function Conversation({ messages }: { messages: Msg[] }) {
  return (
    <div className="space-y-6">
      {messages.map((m) => (
        <div key={m.id} className="flicker-in">
          {m.role === 'user' ? <UserMessage msg={m} /> : <AssistantMessage msg={m} />}
        </div>
      ))}
    </div>
  )
}
