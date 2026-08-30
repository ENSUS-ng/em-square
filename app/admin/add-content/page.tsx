"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs"

import { BrandForm } from "@/app/components/forms/BrandForm"
import { LaunchRequestForm } from "@/app/components/forms/LaunchRequestForm"
import { ServiceForm } from "@/app/components/forms/ServiceForm"
import { TeamForm } from "@/app/components/forms/TeamForm"
import { GalleryForm } from "@/app/components/forms/GalleryForm"

const contentCards = [
  {
    id: "service",
    title: "Service",
    description: "Create a new service card and its expanded content.",
  },
  { id: "brand", title: "Brand", description: "Add a partner or client brand logo and name." },
  { id: "team", title: "Team", description: "Add a team member with a picture, name, and role." },
  {
    id: "gallery",
    title: "Gallery",
    description: "Create a collection and add images from your work.",
  },
]

export default function AddContentPage() {
  const searchParams = useSearchParams()
  const createMode = searchParams.get("create-mode")
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [linkVisible, setLinkVisible] = useState(false)
  const activeForm = useMemo(() => {
    switch (createMode) {
      case "brand":
        return <BrandForm />
      case "team":
        return <TeamForm />
      case "launch-request":
        return <LaunchRequestForm />
      case "gallery":
        return <GalleryForm />
      case "service":
      default:
        return <ServiceForm />
    }
  }, [createMode])

  const isPermissionGranted = searchParams.get("ispermissiongranted") === "true"

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.26),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.18),transparent_24%),#0e0b1d] px-4 py-10 text-white">
        <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/8 p-8 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Admin access</p>
          <h1 className="mt-4 text-3xl font-semibold">Sign in to continue</h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            You must be signed in to access the admin area.
          </p>
          {/* 
          <div className="mt-8 flex gap-3">
            <SignInButton
              mode="redirect"
              redirectUrl={`/admin/add-content${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            >
              <button className="rounded-full btn-gradient px-4 py-3 text-sm font-semibold text-white">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton
              mode="redirect"
              redirectUrl={`/admin/add-content${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            >
              <button className="rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white">
                Sign up
              </button>
            </SignUpButton>
          </div> */}
        </div>
      </div>
    )
  }

  // if (!isPermissionGranted && user?.publicMetadata?.role !== "superadmin") {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.26),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.18),transparent_24%),#0e0b1d] px-4 py-10 text-white">
  //       <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/8 p-8 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl">
  //         <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Access blocked</p>
  //         <h1 className="mt-4 text-3xl font-semibold">Permission required</h1>
  //         <p className="mt-3 text-sm leading-7 text-slate-300">
  //           This invite link has not been validated yet. Ask a superadmin to validate the link.
  //         </p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Add content</p>
              <h1 className="mt-2 text-gray-700 text-3xl font-semibold sm:text-4xl">
                Choose what to create
              </h1>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-500 sm:text-base">
                Pick a content type below to open its create form. Launch requests are handled
                separately by your client flow.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user?.publicMetadata?.role === "superadmin" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLinkVisible((v) => !v)}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    {linkVisible ? "Hide invite" : "Validate link"}
                  </button>
                  {linkVisible ? (
                    <div className="inline-flex items-center gap-2">
                      <input
                        readOnly
                        value={
                          typeof window !== "undefined"
                            ? `${window.location.origin}/admin/add-content?ispermissiongranted=true`
                            : ""
                        }
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200"
                      />
                      <button
                        onClick={() => {
                          const text = `${typeof window !== "undefined" ? window.location.origin : ""}/admin/add-content?ispermissiongranted=true`
                          navigator.clipboard?.writeText(text)
                        }}
                        className="inline-flex items-center justify-center rounded-full btn-gradient px-4 py-2 text-sm font-medium text-white"
                      >
                        Copy link
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/10"
                >
                  Go back home
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-full border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
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
                        ? "border-violet-400/80 bg-violet-500/20 shadow-[0_20px_60px_-30px_rgba(139,92,246,0.8)]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm uppercase tracking-[0.24em] text-amber-700">
                      {card.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-500">{card.description}</p>
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
