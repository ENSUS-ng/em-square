import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import GallerySection from "@/app/models/gallery"
import { connectToDB } from "@/app/utils/database"

export default async function GalleryPage() {
  await connectToDB()
  const sections = await GallerySection.find().sort({ createdAt: -1 }).lean()

  return (
    <main className="min-h-screen  bg-[radial-gradient(circle_at_top_right,rgba(233,166,111,0.14),transparent_26%),#ffffff] px-4 py-8 text-slate-800 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Back home
        </Link>
        <header className="mt-20 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-gold">Selected work</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-slate-900 sm:text-7xl">
            Moments made to be remembered.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A living archive of the productions, events, and brand worlds we have helped bring into
            focus.
          </p>
        </header>
        <div className="mt-20 space-y-20">
          {sections.map((section) => (
            <section key={String(section._id)}>
              <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-semibold">{section.title}</h2>
                <p className="max-w-lg text-sm leading-6 text-slate-400">{section.description}</p>
              </div>
              <div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gridAutoRows: "220px" }}
              >
                {section.images.map((image: any, index: number) => (
                  <div
                    key={`${image}-${index}`}
                    className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${index % 5 === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <Image
                      src={image}
                      alt={`${section.title} image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
          {sections.length === 0 && (
            <p className="border-t border-white/10 pt-8 text-slate-400">
              The gallery is being curated. Check back soon.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
