const COMMANDS: { cmd: string; desc: string }[] = [
  { cmd: 'about', desc: 'who I am and what I care about' },
  { cmd: 'projects', desc: 'things I have designed and shipped' },
  { cmd: 'skills', desc: 'languages, frameworks, and tools' },
  { cmd: 'experience', desc: 'where I have worked' },
  { cmd: 'contact', desc: 'how to reach me + socials' },
  { cmd: 'resume', desc: 'download my resume' },
  { cmd: 'clear', desc: 'clear the screen' },
  { cmd: 'help', desc: 'show this list' },
]

export function HelpOutput() {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">available commands — or just type a question:</p>
      <div className="mt-1 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {COMMANDS.map((c) => (
          <div key={c.cmd} className="flex items-baseline gap-3">
            <span className="w-24 shrink-0 text-primary">{c.cmd}</span>
            <span className="text-muted-foreground">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TextOutput({
  text,
  tone = 'normal',
}: {
  text: string
  tone?: 'normal' | 'muted' | 'error'
}) {
  const color =
    tone === 'muted'
      ? 'text-muted-foreground'
      : tone === 'error'
        ? 'text-destructive'
        : 'text-foreground'
  return <p className={`whitespace-pre-wrap ${color}`}>{text}</p>
}

export function NotFoundOutput({ text }: { text: string }) {
  return (
    <p className="text-muted-foreground">
      <span className="text-destructive">command not found:</span> {text} — try{' '}
      <span className="text-primary">help</span>
    </p>
  )
}
