"use client"

import { useScrollReveal } from "@/app/hooks/useScrollReveal"
import { partnerLogos, teamMembers } from "@/app/data/demoArrays"

export function PartnersTeam() {
  const { ref, revealed } = useScrollReveal()

  return (
    <section
      id="partners-team"
      ref={ref as any}
      className={`mx-auto mt-24 max-w-310 px-6 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col gap-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Brands we work with</p>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Brands and teams driving the EM Square story.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            A showcase of brands we have partnered with and the creative team behind every launch.
          </p>
        </div>

        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 px-4 py-5">
          <div className="flex min-h-24 w-[220%] items-center gap-6 animate-marquee whitespace-nowrap">
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="inline-flex min-w-45 items-center justify-between rounded-3xl border border-white/10 bg-slate-950/30 px-5 py-4 text-sm text-slate-200"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-base font-semibold text-white">
                  {partner.logo}
                </span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-4xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-lg font-semibold text-white">{member.name}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-400">
                {member.role}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}
