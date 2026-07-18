"use client"

import { useEffect, useState } from "react"
import { fetchLaunchRequests, type LaunchRequestItem } from "@/app/utils/adminData"
import { Mail, User, CalendarDays, MessageSquare, Share, Reply } from "lucide-react"

const LaunchRequests = () => {
  const [requests, setRequests] = useState<LaunchRequestItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchLaunchRequests()
        setRequests(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadRequests()
  }, [])

  const mailTo = (email: string) => {
    window.open(`mailto:${email}`, '_self')
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,10,255,0.24),transparent_64%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">
              Admin Dashboard
            </p>

            <h1 className="text-4xl font-semibold text-white">
              Branding Requests
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Review enquiries submitted through your website contact form and
              follow up with prospective clients.
            </p>
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex justify-center py-24">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-purple border-t-transparent" />
              </div>
            ) : requests.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">
                <h3 className="text-xl font-semibold text-white">
                  No branding requests yet
                </h3>

                <p className="mt-3 text-slate-400">
                  New enquiries from your website will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 transition hover:border-brand-purple/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-brand-purple/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
                        <User size={14} />
                        {request.name}
                      </div>

                      {request.createdAt && (
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <CalendarDays size={14} />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-6 space-y-5">
                      <div
                      onClick={() => mailTo(request.email)}
                      className="w-full flex items-center gap-3 text-slate-300">
                        <Mail
                          size={18}
                          className="text-brand-purple shrink-0"
                        />

                        <span className="break-all">{request.email}</span>
                        <Reply size={20} className="cursor-pointer text-brand-purple ml-auto self-end stroke-3 shrink-0" />
                      </div>

              

                      <div>
                        <p className="mb-2 font-medium text-brand-gold">
                          Message
                        </p>

                        <div className="rounded-2xl bg-white/5 p-4 leading-7 text-slate-300">
                          {request.message}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LaunchRequests