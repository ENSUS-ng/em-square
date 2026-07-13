"use client"

import { useState } from "react"

import { AdminMediaField } from "@/app/components/admin/AdminMediaField"
import { createBrand } from "@/app/utils/createContent"

export function BrandForm() {
  const [logo, setLogo] = useState("")
  const [brandName, setBrandName] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus(null)

    if (!logo.trim() || !brandName.trim()) {
      setStatus({ ok: false, message: "Please add a logo link and brand name." })
      return
    }

    setLoading(true)
    try {
      await createBrand({ logo, brandName })
      setStatus({ ok: true, message: "Brand created successfully." })
      setLogo("")
      setBrandName("")
    } catch (error) {
           setLogo("")
      setBrandName("")
      setStatus({
        ok: false,
        message: error instanceof Error ? error.message : "Could not create brand.",
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
        <span className="mb-1 text-sm text-slate-300">Brand name</span>
        <input
          value={brandName}
          onChange={(event) => setBrandName(event.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder="Brand name"
        />
      </label>

      <AdminMediaField
        label="Brand logo"
        value={logo}
        onChange={setLogo}
        placeholder="https://..."
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create brand"}
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
