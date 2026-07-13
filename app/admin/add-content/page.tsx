"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { BrandForm } from "@/app/components/forms/BrandForm"
import { LaunchRequestForm } from "@/app/components/forms/LaunchRequestForm"
import { ServiceForm } from "@/app/components/forms/ServiceForm"
import { TeamForm } from "@/app/components/forms/TeamForm"
import { useAdmin } from "@/app/hooks/AdminContext"
const contentCards = [
  {
    id: "service",
    title: "Service",
    description: "Create a new service card and its expanded content.",
  },
  { id: "brand", title: "Brand", description: "Add a partner or client brand logo and name." },
  { id: "team", title: "Team", description: "Add a team member with a picture, name, and role." },
]

export default function AddContentPage() {
  const searchParams = useSearchParams()
  const createMode = searchParams.get("create-mode")
  const { isAuthenticated } = useAdmin()
  const activeForm = useMemo(() => {
    switch (createMode) {
      case "brand":
        return <BrandForm />
      case "team":
        return <TeamForm />
      case "launch-request":
        return <LaunchRequestForm />
      case "service":
      default:
        return <ServiceForm />
    }
  }, [createMode])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Add content</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Choose what to create</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Pick a content type below to open its create form. Launch requests are handled
                separately by your client flow.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Back to dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-4 xl:flex-row xl:items-start">
            <div className="grid gap-4 sm:grid-cols-2 xl:w-[38%] xl:grid-cols-1">
              {contentCards.map((card) => {
                const isActive = createMode === card.id || (!createMode && card.id === "service")

                return (
                  <Link
                    key={card.id}
                    href={`/admin/add-content?create-mode=${card.id}`}
                    className={`rounded-3xl border p-5 text-left transition ${
                      isActive
                        ? "border-brand-purple/60 bg-brand-purple/15 shadow-[0_20px_60px_-30px_rgba(124,15,255,0.55)]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm uppercase tracking-[0.24em] text-brand-gold">
                      {card.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                  </Link>
                )
              })}
            </div>

            <div className="min-w-0">{activeForm}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
