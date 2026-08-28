"use client"
import { Nav } from "@/app/components/Nav"
import { BrandsTeam } from "@/app/components/BrandsTeam"
import { WhatWeDo } from "@/app/components/WhatWeDo"
import { aboutText } from "@/app/data/demoArrays"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/app/components/Footer"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div
      id="home"
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(120,166,163,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(233,166,111,0.13),transparent_25%),#101820] text-white"
    >
      <Nav />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative  pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
          {/* Hero Image */}
          <div
            className="
              relative z-0
              mx-auto
              h-90
              w-full
              overflow-hidden
              rounded-4xl
              sm:h-101
              sm:rounded-[2.5rem]
              md:h-102.5
              lg:h-105
              lg:rounded-[3rem]
            "
          >
            <Image
              alt="Brand acceleration"
              src="/connect2.jpg"
              fill
              priority
              // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
              className="object-fill aspect-square"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-[#101820]/60" />
          </div>

          {/* Main Content */}
          <div
            className="
              relative z-10
              mx-auto
              -mt-12
              w-[calc(100%-1rem)]
              rounded-4xl
              border border-white/10
              bg-[#17132a]/90
              px-5 py-8
              shadow-[0_40px_120px_-60px_rgba(0,0,0,0.8)]
              backdrop-blur-xl
              sm:-mt-16
              sm:w-[calc(100%-2rem)]
              sm:rounded-[2.5rem]
              sm:px-8
              sm:py-10
              md:-mt-20
              md:px-10
              md:py-12
              lg:-mt-24
              lg:rounded-[3rem]
              lg:px-12
              lg:py-14
            "
          >
            {/* Main section */}
            <div className="text-center sm:text-left">
              <h1
                className="
                  text-4xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:max-w-5xl
                "
              >
                We engineer brand acceleration for media and communications.
              </h1>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-3xl
                  text-base
                  leading-7
                  text-slate-300
                  sm:mx-0
                  sm:mt-6
                  sm:text-lg
                  sm:leading-8
                "
              >
                {aboutText}
              </p>
            </div>

            {/* CTA */}
            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-5
                sm:mt-10
                sm:flex-row
                sm:items-center
                sm:justify-start
              "
            >
              <Link
                href="/branding-request"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  btn-gradient
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  shadow-[0_18px_40px_-20px_rgba(233,166,111,0.7)] hover:-translate-y-0.5 hover:brightness-110
                  sm:w-auto
                "
              >
                <span>Start Your Branding Journey</span>

                <ArrowUpRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <p
                className="
                  max-w-xl
                  text-center
                  text-sm
                  leading-7
                  text-slate-300
                  sm:text-left
                "
              >
                Start with a quick introduction and we&apos;ll help shape the next phase of your
                brand journey.
              </p>
            </div>
          </div>
        </section>

        {/* Other sections */}
        <WhatWeDo />
        <BrandsTeam />
      </main>
      <Footer />
    </div>
  )
}
