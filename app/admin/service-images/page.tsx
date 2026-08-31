"use client"

import Link from "next/link"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { useEffect, useState } from "react"

type ServiceItem = {
  _id: string
  heading: string
  about: string
  type: "media" | "marketing"
  images?: string[]
}

export default function ServiceImagesIndexPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch("/api/services")
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          throw new Error(payload.error || "Failed to load services")
        }

        setServices(Array.isArray(payload.data) ? payload.data : [])
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load services")
      } finally {
        setLoading(false)
      }
    }

    void loadServices()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">
                Update service images
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-gray-700 sm:text-4xl">
                Manage service visuals
              </h1>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
            >
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                Loading services...
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-200">
                {error}
              </div>
            ) : services.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                No services found yet.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service._id}
                    href={`/admin/service-images/${service._id}`}
                    className="group rounded-4xl border border-black/50 bg-white/5 p-5 text-left transition hover:border-violet-400/70 hover:bg-white/10"
                  >
                    <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${service.type === "marketing" ? "bg-brand-purple" : "bg-brand-gold"}`}>
                      {service.type}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-600">{service.heading}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300">
                      {service.about}
                    </p>

                    <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-250/60 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <ImageIcon size={16} />
                        {service.images?.length ?? 0} image
                        {(service.images?.length ?? 0) === 1 ? "" : "s"}
                      </div>
                      {/* <span className="text-sm font-medium text-violet-200 transition group-hover:translate-x-1">
                        Manage
                      </span> */}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
