"use client"

import { useState } from "react"

import { createService } from "@/app/utils/createContent"

export function ServiceForm() {
  const [heading, setHeading] = useState("")
  const [about, setAbout] = useState("")
  const [type, setType] = useState<"media" | "marketing">("media")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus(null)

    if (!heading.trim() || !about.trim() || !content.trim()) {
      setStatus({ ok: false, message: "Please fill in the service details." })
      return
    }

    setLoading(true)
    try {
      await createService({ heading, about, type, content })
      setStatus({ ok: true, message: "Service created successfully." })
      setHeading("")
      setAbout("")
      setType("media")
      setContent("")
    } catch (error) {
      setStatus({
        ok: false,
        message: error instanceof Error ? error.message : "Could not create service.",
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
          <span className="mb-1 text-sm text-slate-300">Heading</span>
          <input
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
            placeholder="Service heading"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-slate-300">Type</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as "media" | "marketing")}
            className="rounded-xl border border-white/10 bg-[#120d22] px-4 py-3 text-white outline-none"
          >
            <option value="media">Media</option>
            <option value="marketing">Marketing</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Short about</span>
        <input
          value={about}
          onChange={(event) => setAbout(event.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Short summary"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Expanded content</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={6}
          className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Describe the brand experience and work this service covers"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create service"}
        </button>
        {/* {status ? (
          <p className={`text-sm ${status.ok ? "text-emerald-400" : "text-rose-400"}`}>
            {status.message}
          </p>
        ) : null} */}
      </div>
    </form>
  )
}
