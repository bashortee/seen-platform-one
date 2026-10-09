import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUp, Info, RotateCcw, Sparkles } from 'lucide-react'
import { DemoBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/Misc'
import { assistantPrompts } from '@/data/demo'
import { cn } from '@/lib/cn'

export const Route = createFileRoute('/app/assistant')({
  head: () => ({ meta: [{ title: 'Ask SEEN — SEEN' }] }),
  component: Assistant,
})

type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; text: string; kind: 'scripted' | 'unavailable' }

const UNAVAILABLE =
  "Ask SEEN isn't connected to an AI model yet, so I can't answer new questions in this preview. Try one of the suggested questions to see a pre-written example answer based on the demo data."

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, thinking])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || thinking) return
    const match = assistantPrompts.find((p) => p.prompt.toLowerCase() === trimmed.toLowerCase())
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: trimmed }])
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        match
          ? { id: crypto.randomUUID(), role: 'assistant', text: match.reply, kind: 'scripted' }
          : { id: crypto.randomUUID(), role: 'assistant', text: UNAVAILABLE, kind: 'unavailable' },
      ])
      setThinking(false)
      inputRef.current?.focus()
    }, 700)
  }

  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => m.text.toLowerCase()))
  const remaining = assistantPrompts.filter((p) => !asked.has(p.prompt.toLowerCase()))

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col">
      <PageHeader
        eyebrow="Act"
        title="Ask SEEN"
        demo={false}
        description="A conversational way into your data. In this preview, answers are pre-written examples based on the demo dataset — no AI model is called."
        actions={
          messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setMessages([])}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden /> New conversation
            </Button>
          )
        }
      />

      <div className="flex flex-1 flex-col rounded-2xl border border-white/[0.07] bg-ink-900/70">
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-8" aria-live="polite" aria-busy={thinking}>
          {messages.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-signal/30 bg-signal/10">
                <Sparkles className="h-5 w-5 text-signal-soft" aria-hidden />
              </div>
              <h2 className="mt-5 font-display text-3xl tracking-tight">What would you like to know?</h2>
              <p className="mt-2 text-sm text-fg-3">
                Pick a question to see how Ask SEEN explains the numbers and suggests a next step.
              </p>
            </div>
          ) : (
            messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink-700 px-4 py-3 text-sm text-fg sm:max-w-[70%]">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-signal/30 bg-signal/10">
                    <Sparkles className="h-3.5 w-3.5 text-signal-soft" aria-hidden />
                  </div>
                  <div className="max-w-[85%] sm:max-w-[70%]">
                    <div
                      className={cn(
                        'rounded-2xl rounded-tl-md border px-4 py-3 text-sm leading-relaxed',
                        m.kind === 'unavailable'
                          ? 'border-white/10 bg-ink-850 text-fg-2'
                          : 'border-white/[0.07] bg-ink-850/60 text-fg',
                      )}
                    >
                      {m.kind === 'unavailable' && <Info className="mb-1.5 h-4 w-4 text-fg-3" aria-hidden />}
                      {m.text}
                    </div>
                    {m.kind === 'scripted' && (
                      <p className="mt-2 flex items-center gap-2 text-[11px] text-fg-3">
                        <DemoBadge /> Pre-written example, not generated by AI
                      </p>
                    )}
                  </div>
                </div>
              ),
            )
          )}
          {thinking && (
            <div className="flex items-center gap-3" aria-label="Ask SEEN is responding">
              <div className="grid h-7 w-7 place-items-center rounded-full border border-signal/30 bg-signal/10">
                <Sparkles className="h-3.5 w-3.5 text-signal-soft" aria-hidden />
              </div>
              <span className="flex h-4 items-end gap-[3px]" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="eq-bar h-full w-[3px] rounded-full bg-signal/70" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/[0.06] p-4 sm:p-5">
          {remaining.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2" aria-label="Suggested questions">
              {remaining.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  disabled={thinking}
                  onClick={() => send(p.prompt)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-fg-2 transition-colors hover:border-signal/40 hover:text-fg disabled:opacity-40"
                >
                  {p.prompt}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-end gap-2 rounded-2xl border border-white/10 bg-ink-950/70 p-2 focus-within:border-signal/50"
          >
            <label htmlFor="ask-input" className="sr-only">Ask SEEN a question</label>
            <textarea
              id="ask-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Ask about your catalogue, audience or next steps…"
              className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg placeholder:text-fg-3/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-signal text-signal-ink transition-opacity disabled:opacity-30"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-[11px] text-fg-3">
            Ask SEEN will answer from your connected data in a future release. Nothing you type here is sent anywhere.
          </p>
        </div>
      </div>
    </div>
  )
}
