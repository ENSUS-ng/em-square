import { Nav } from "@/app/components/Nav"
import { PartnersTeam } from "@/app/components/PartnersTeam"
import { WhatWeDo } from "@/app/components/WhatWeDo"
import { aboutText } from "@/app/data/demoArrays"
import Link from "next/link"

export default function Home() {
  return (
    <div
      id="home"
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(124,15,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] text-white"
    >
      <Nav />
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28 sm:px-8">
        <div className="w-full rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-90px_rgba(0,0,0,0.55)] sm:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-purple">
            We engineer brand acceleration
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl">
            We engineer brand acceleration for media and communications.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{aboutText}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
            >
              Launch a project
            </Link>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Start with a quick introduction and we&apos;ll help shape the next phase of your brand
              journey.
            </p>
          </div>
        </div>
      </main>

      <WhatWeDo />
      <PartnersTeam />
    </div>
  )
}
