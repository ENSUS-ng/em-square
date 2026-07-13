"use client"

import { useState } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message?: string }>(null)

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setStatus(null)

    if (!validateEmail(email)) {
      setStatus({ ok: false, message: "Please provide a valid email." })
      return
    }

    if (message.trim().length < 10) {
      setStatus({ ok: false, message: "Message must be at least 10 characters." })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const json = await res.json()
      if (!res.ok) {
        setStatus({ ok: false, message: json?.error || "Submission failed" })
      } else {
        setStatus({ ok: true, message: "Thanks — we received your message." })
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      }
    } catch (err) {
      setStatus({ ok: false, message: "Network error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-slate-300">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400 transition-shadow focus:shadow-[0_8px_24px_-12px_rgba(255,168,15,0.12)]"
            placeholder="Your name"
            aria-label="Name"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-sm text-slate-300">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400 transition-shadow focus:shadow-[0_8px_24px_-12px_rgba(255,168,15,0.12)]"
            placeholder="brand@gmail.com"
            aria-label="Email"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Subject</span>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400 transition-shadow focus:shadow-[0_8px_24px_-12px_rgba(255,168,15,0.12)]"
          placeholder="Short subject"
          aria-label="Subject"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 leading-relaxed text-white outline-none focus:ring-2 focus:ring-amber-400 transition-shadow focus:shadow-[0_8px_24px_-12px_rgba(255,168,15,0.12)]"
          placeholder="Tell us about your project"
          aria-label="Message"
        />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send message"}
        </button>

        {status && (
          <p className={`text-sm ${status.ok ? "text-emerald-400" : "text-rose-400"}`}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
