"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAdmin } from "@/app/hooks/AdminContext"

const dashboardCards = [
  {
    title: "Add Content",
    description: "Create services, brands, and team profiles for the site.",
    href: "/admin/add-content",
    accent: "from-brand-purple via-violet-600 to-brand-gold",
  },
  {
    title: "Delete Content",
    description: "Review and remove services, brands, team members, and launch requests.",
    href: "/admin/delete-content",
    accent: "from-slate-700 via-slate-600 to-slate-500",
  },
  {
    title: "Branding requests",
    description: "View and attend to all branding requests received from clients.",
    href: "/admin/launch-requests",
    accent: "from-brand-gold via-amber-500 to-brand-purple",
  },
]

export default function AdminDashboardPage() {
  const [passkey, setPasskey] = useState("")
  const [error, setError] = useState("")
  const { isAuthenticated, login } = useAdmin()

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const success = login(passkey)

    if (success) {
      setError("")
      return
    }

    setError("Incorrect passkey. Please try again.")
  }
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.26),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.18),transparent_24%),#0e0b1d] px-4 py-10 text-white">
        <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/8 p-8 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Admin access</p>
          <h1 className="mt-4 text-3xl font-semibold">Enter your passkey</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This area is reserved for the site administrator. Use the password field below to
            continue.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={handleUnlock}
          >
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Passkey</span>
              <input
                type="password"
                value={passkey}
                onChange={(event) => setPasskey(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500"
                placeholder="Enter passkey"
              />
            </label>

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-full btn-gradient px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Unlock dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">
                Admin dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Manage your digital presence
              </h1>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-300 sm:text-base">
                Use the tools below to create and update the content that powers the site.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Back to site
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {dashboardCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br ${card.accent} p-px`}
              >
                <div className="h-full rounded-[1.7rem] bg-[#120d22] p-6 transition group-hover:scale-[1.01]">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                    Admin action
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                  <div className="mt-6 inline-flex items-center text-sm font-medium text-brand-gold">
                    Open section
                    <span className="ml-2 transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
