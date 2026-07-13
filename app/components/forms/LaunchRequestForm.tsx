"use client"

import { useState } from "react"

import { createLaunchRequest } from "@/app/utils/createContent"

export function LaunchRequestForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, message: "Please fill in all launch request details." })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ ok: false, message: "Please provide a valid email." })
      return
    }

    setLoading(true)
    try {
      await createLaunchRequest({ name, email, message })
      setStatus({ ok: true, message: "Launch request recorded successfully." })
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
        setName("")
      setEmail("")
      setMessage("")
      setStatus({
        ok: false,
        message: error instanceof Error ? error.message : "Could not create launch request.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-slate-300">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-slate-300">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Message</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Tell us about your project"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit launch request"}
        </button>
        {status ? (
          <p className={`text-sm ${status.ok ? "text-emerald-400" : "text-rose-400"}`}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
