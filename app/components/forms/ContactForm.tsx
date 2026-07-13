"use client"

import { useState } from "react"
import { createLaunchRequest } from "@/app/utils/createContent"
import Link from "next/link"
import { Check } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message?: string }>(null)
  const [showModal, setShowModal] = useState(false)

  const validateEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  }

  const handleSubmit = async (ev: any) => {
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
      const res = await createLaunchRequest({
        name,
        email,
        message,
      })

      if (!res.ok) {
        setStatus({ ok: false, message: "Submission failed" })
      } else {
        setStatus({
          ok: true,
          message: "We received your message, we'll get back to you soon",
        })
        setName("")
        setEmail("")
        setMessage("")
        setShowModal(true)
      }
    } catch (err) {
      setStatus({ ok: false, message: "Network error" })
    } finally {
      setLoading(false)
    }
  }

  if (showModal) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-white/10 bg-gray-500/20 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Success Icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-indigo-500/30">
            <Check className="h-12 w-12 stroke-[3] text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">Request Sent</h2>

        {/* Message */}
        <p className="mt-4 max-w-md text-base leading-7 text-gray-300">{status?.message}</p>

        {/* CTA */}
        <Link
          href="/"
          className="text-sm mt-6 inline-flex items-center justify-center rounded-2xl btn-gradient px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40"
        >
          Go back home
        </Link>
      </div>
    )
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
          className="rounded-2xl btn-gradient px-8 py-3 text-sm font-semibold text-white disabled:opacity-60"
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
