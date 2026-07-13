"use client"

import { useScrollReveal } from "@/app/hooks/useScrollReveal"
import { marketingServices, mediaServices } from "@/app/data/demoArrays"
import { ServiceCard } from "@/app/components/ServiceCard"
import Image from "next/image"

export function WhatWeDo() {
  const { ref, revealed } = useScrollReveal()

  return (
    <section
      id="what-we-do"
      ref={ref as React.LegacyRef<HTMLElement>}
      className={`mx-auto mt-24 max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="space-y-14">
        <div className="mx-auto max-w-2xl space-y-4 text-center lg:max-w-xl lg:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">What we do</p>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            We move culture forward through media and marketing.
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-8 text-slate-300 lg:mx-0">
            Two connected practices, one modern motion: Ensus Media designs the narrative and Ensus
            Marketing turns it into growth.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-4xl border border-brand-purple/30 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-full bg-brand-purple_15">
                <Image 
                src="/favicon.png"
                alt="icon"
                width={1080}
                height={720}
                className='w-[80%] h-[80%]'
                />
                </div>

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Ensus Media</p>
                <p className="mt-1 text-2xl font-semibold text-white">Story-led production</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {mediaServices.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  accent="purple"
                />
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-brand-gold/30 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-gold_15" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">
                  Ensus Marketing
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">Growth-driven campaigns</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {marketingServices.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  accent="gold"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
