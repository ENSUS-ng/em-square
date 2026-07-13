"use client"

import { useState } from "react"

import { AdminMediaField } from "@/app/components/admin/AdminMediaField"
import { createTeamMember } from "@/app/utils/createContent"

export function TeamForm() {
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus(null)

    if (!picture.trim() || !name.trim() || !role.trim()) {
      setStatus({ ok: false, message: "Please fill in the team member details." })
      return
    }

    setLoading(true)
    try {
      await createTeamMember({ picture, name, role })
      setStatus({ ok: true, message: "Team member created successfully." })
      setPicture("")
      setName("")
      setRole("")
    } catch (error) {
         setPicture("")
      setName("")
      setRole("")
      setStatus({
        ok: false,
        message: error instanceof Error ? error.message : "Could not create team member.",
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
      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Team member name"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">Role</span>
        <input
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Role title"
        />
      </label>

      <AdminMediaField
        label="Team picture"
        value={picture}
        onChange={setPicture}
        placeholder="https://..."
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create team member"}
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
