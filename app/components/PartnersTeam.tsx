"use client"

import { useEffect, useState } from "react"
import { useScrollReveal } from "@/app/hooks/useScrollReveal"
import { fetchBrands, fetchTeam } from "../utils/adminData"
import Image from "next/image"

function TeamsSection({ teams }: { teams: any[] }) {
  const { ref: teamRef, revealed: teamRevealed } = useScrollReveal()
  return (
    <div
      ref={teamRef as any}
      className={`flex flex-col gap-10 transition-all duration-700 ease-out ${
        teamRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-5xl space-y-3 text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Meet the team</p>

        <h2 className="text-4xl font-semibold text-white md:text-5xl">
          The creative team behind every launch.
        </h2>

        <p className="mx-auto max-w-5xl text-lg leading-8 text-slate-300 lg:mx-0">
          The people turning ideas into memorable campaigns and productions.
        </p>
      </div>

      <div className="rounded-4xl border border-white/10 bg-white/5 p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((member: any) => (
            <div
              key={member._id}
              className="rounded-3xl border border-white/10 bg-slate-950/30 p-6 transition hover:border-brand-purple/30"
            >
              <Image
                src={member.picture}
                alt={member.name}
                width={500}
                height={500}
                className="h-20 w-20 rounded-full object-cover"
              />

              <h3 className="mt-5 text-xl font-semibold text-white">{member.name}</h3>

              <p className="mt-2 text-sm uppercase tracking-[0.24em] text-brand-gold">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PartnersTeam() {
  const { ref, revealed } = useScrollReveal()
  const [brands, setBrands] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandData, teamData] = await Promise.all([fetchBrands(), fetchTeam()])

        setBrands(brandData)
        setTeams(teamData)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <section
      id="partners-team"
      ref={ref as any}
      className={`mx-auto mt-24 max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col gap-20">
        {/* Brands */}
        <div className="flex flex-col gap-10">
          <div className="mx-auto max-w-5xl space-y-3 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">
              Brands we work with
            </p>

            <h2 className="text-4xl font-semibold text-white md:text-5xl">
              We're trusted by ambitious brands to create compelling media and marketing
              experiences.
            </h2>

            <p className="mx-auto max-w-5xl text-lg leading-8 text-slate-300 lg:mx-0">
              A showcase of brands we have partnered with.
            </p>
          </div>

          {!isLoading && (
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 px-4 py-5">
              <div className="flex min-h-[96px] w-[220%] items-center gap-6 whitespace-nowrap animate-marque">
                {brands.map((brand: any) => (
                  <div
                    key={brand._id}
                    className="inline-flex min-w-[220px] items-center gap-10 rounded-3xl border border-white/10 bg-slate-950/30 px-5 py-4 text-sm text-slate-200"
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.brandName}
                      width={200}
                      height={200}
                      className="h-15 w-15 rounded-full object-contain p-1"
                    />

                    <span>{brand.brandName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teams */}
        {!isLoading && <TeamsSection teams={teams} />}
      </div>
    </section>
  )
}
