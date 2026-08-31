import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clapperboard, Megaphone } from "lucide-react"
import { notFound } from "next/navigation"

import Service from "@/app/models/service"
import { connectToDB } from "@/app/utils/database"

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDB()
  const service = await Service.findById(id).lean()
  if (!service) notFound()

  const isMedia = service.type === "media"
  const images = Array.isArray(service.images) ? service.images.filter(Boolean) : []

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(120,166,163,0.18),transparent_30%),#ffffff] px-4 py-8 text-slate-800 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#what-we-do"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Back to services
        </Link>
        <section className="mt-20 grid gap-12 border-b border-white/10 pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div
              className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${isMedia ? "bg-brand-purple_15 text-brand-purple" : "bg-brand-gold_15 text-brand-gold"}`}
            >
              {isMedia ? <Clapperboard size={28} /> : <Megaphone size={28} />}
            </div>
            <p
              className={`text-sm uppercase tracking-[0.28em] ${isMedia ? "text-brand-purple" : "text-brand-gold"}`}
            >
              {service.type}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-slate-900 sm:text-7xl">
              {service.heading}
            </h1>
          </div>
          <div>
            <p className="text-xl leading-9 text-slate-300">{service.about}</p>
            <Link
              href="/branding-request"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl btn-gradient px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Discuss this service <ArrowUpRight size={19} />
            </Link>
          </div>
        </section>

        {images.length > 0 ? (
          <section className="py-16">
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Service gallery</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {images.map((image:any, index:number) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={`${service.heading} visual ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-6 py-16 md:grid-cols-[0.35fr_0.65fr]">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">The full brief</p>
          <div>
            <div className="whitespace-pre-wrap text-lg leading-9 text-slate-700">
              {service.content}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
