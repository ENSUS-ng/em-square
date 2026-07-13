"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import {
  deleteBrand,
  deleteLaunchRequest,
  deleteService,
  deleteTeamMember,
} from "@/app/utils/deleteContent"
import { fetchBrands, fetchLaunchRequests, fetchServices, fetchTeam } from "@/app/utils/adminData"
import { useAdmin } from "@/app/hooks/AdminContext"
type ContentKind = "service" | "brand" | "team" | "launch"

type SectionState = {
  loading: boolean
  error: string | null
  items: Array<{ _id: string; [key: string]: unknown }>
}

const initialSectionState = (): SectionState => ({ loading: true, error: null, items: [] })

export default function DeleteContentPage() {
  const [services, setServices] = useState<SectionState>(initialSectionState)
  const [brands, setBrands] = useState<SectionState>(initialSectionState)
  const [team, setTeam] = useState<SectionState>(initialSectionState)
  const [launchRequests, setLaunchRequests] = useState<SectionState>(initialSectionState)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [activeKind, setActiveKind] = useState<ContentKind>("service")
  const { isAuthenticated } = useAdmin()

  useEffect(() => {
    void loadAll()
  }, [])

  const loadAll = async () => {
    try {
      const [servicesData, brandsData, teamData, launchData] = await Promise.all([
        fetchServices(),
        fetchBrands(),
        fetchTeam(),
        fetchLaunchRequests(),
      ])

      setServices({ loading: false, error: null, items: servicesData })
      setBrands({ loading: false, error: null, items: brandsData })
      setTeam({ loading: false, error: null, items: teamData })
      setLaunchRequests({ loading: false, error: null, items: launchData })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load content"
      setServices((state) => ({ ...state, loading: false, error: message }))
      setBrands((state) => ({ ...state, loading: false, error: message }))
      setTeam((state) => ({ ...state, loading: false, error: message }))
      setLaunchRequests((state) => ({ ...state, loading: false, error: message }))
    }
  }

  const removeItem = async (kind: ContentKind, id: string) => {
    if (!window.confirm("Delete this item?")) return

    setDeletingId(id)

    try {
      if (kind === "service") {
        await deleteService(id)
        setServices((state) => ({ ...state, items: state.items.filter((item) => item._id !== id) }))
      } else if (kind === "brand") {
        await deleteBrand(id)
        setBrands((state) => ({ ...state, items: state.items.filter((item) => item._id !== id) }))
      } else if (kind === "team") {
        await deleteTeamMember(id)
        setTeam((state) => ({ ...state, items: state.items.filter((item) => item._id !== id) }))
      } else {
        await deleteLaunchRequest(id)
        setLaunchRequests((state) => ({
          ...state,
          items: state.items.filter((item) => item._id !== id),
        }))
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete item"
      window.alert(message)
    } finally {
      setDeletingId(null)
    }
  }

  const tabs: Array<{ id: ContentKind; label: string }> = [
    { id: "service", label: "Services" },
    { id: "brand", label: "Brands" },
    { id: "team", label: "Team" },
    { id: "launch", label: "Launch Requests" },
  ]

  const activeSection =
    activeKind === "service"
      ? services
      : activeKind === "brand"
        ? brands
        : activeKind === "team"
          ? team
          : launchRequests
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Delete content</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Remove stored content</h1>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-300 sm:text-base">
                Review the items below and delete anything you no longer want published.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Back to dashboard
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const isActive = activeKind === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveKind(tab.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? "border-brand-purple/60 bg-brand-purple/15 text-white"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-3">
            {activeSection.loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                Loading items...
              </div>
            ) : activeSection.error ? (
              <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-200">
                {activeSection.error}
              </div>
            ) : activeSection.items.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                No items found.
              </div>
            ) : (
              activeSection.items.map((item) => {
                const title =
                  activeKind === "service"
                    ? (item.heading as string)
                    : activeKind === "brand"
                      ? (item.brandName as string)
                      : activeKind === "team"
                        ? (item.name as string)
                        : `${item.name as string} — ${item.subject as string}`

                return (
                  <div
                    key={item._id as string}
                    className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-base font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {activeKind === "service"
                          ? (item.about as string)
                          : activeKind === "brand"
                            ? (item.logo as string)
                            : activeKind === "team"
                              ? (item.role as string)
                              : (item.email as string)}
                      </p>
                    </div>
                    <button
                      onClick={() => void removeItem(activeKind, item._id as string)}
                      disabled={deletingId === item._id}
                      className="rounded-full border cursor-pointer border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
