import { Nav } from "@/app/components/Nav"
import { BrandsTeam } from "@/app/components/BrandsTeam"
import { WhatWeDo } from "@/app/components/WhatWeDo"
import { aboutText } from "@/app/data/demoArrays"
import { Plus, Mail } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div
      id="home"
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(124,15,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] text-white"
    >
      <Nav />
      <main className="mt-3 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="w-full rounded-[3rem] border border-white/10 bg-white/5 px-6 py-10 shadow-[0_40px_120px_-90px_rgba(0,0,0,0.55)] sm:px-10 sm:py-12">
          <div className="text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-purple">
              We engineer brand acceleration
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white break-words sm:text-5xl md:text-6xl">
              We engineer brand acceleration for media and communications.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:mx-0">
              {aboutText}
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-start">
            <Link
              href="/branding-request"
              className="w-[90%] md:w-[60%] lg:w-[40%] inline-flex items-center justify-center gap-2 rounded-2xl btn-gradient px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <span>Start Your Branding Journey</span>
              <Mail
                size={24}
                className="text-white stroke-3"
              />
            </Link>
            <p className="max-w-xl text-center text-sm leading-7 text-slate-300 sm:text-left">
              Start with a quick introduction and we&apos;ll help shape the next phase of your brand
              journey.
            </p>
          </div>
        </div>
      </main>

      <WhatWeDo />
      <BrandsTeam />
    </div>
  )
}
