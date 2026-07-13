"use client"
import { useState, useEffect } from "react"
import { useScrollReveal } from "@/app/hooks/useScrollReveal"
import { marketingServices, mediaServices } from "@/app/data/demoArrays"
import { ServiceCard } from "@/app/components/ServiceCard"
import Image from "next/image"
import { fetchServices, type ServiceItem } from "@/app/utils/adminData"

export function WhatWeDo() {
  const { ref, revealed } = useScrollReveal()

  const [mediaServices, setMediaServices] = useState<ServiceItem[]>([])
  const [marketingServices, setMarketingServices] = useState<ServiceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const [media, marketing] = await Promise.all([
          fetchServices("media"),
          fetchServices("marketing"),
        ])

        setMediaServices(media)
        setMarketingServices(marketing)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  console.log({ mediaServices, marketingServices })

  return (
    <section
      id="what-we-do"
      ref={ref as any}
      className={`mx-auto mt-16 max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="space-y-14">
        <div className="mx-auto max-w-5xl space-y-4 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">What we do</p>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            We move culture forward through media and marketing.
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-8 text-slate-300 lg:mx-0">
            Two connected practices, one modern motion: Ensus Media designs the narrative and Ensus
            Marketing turns it into growth.
          </p>
        </div>
        {!isLoading && (
          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            <div className="rounded-4xl border border-brand-purple/30 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-full bg-brand-purple_15">
                  <Image
                    src="/favicon.png"
                    alt="icon"
                    width={1080}
                    height={720}
                    className="w-[90%] h-[90%]"
                  />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">
                    Ensus Media
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">Story-led production</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {mediaServices.map((service) => (
                  <ServiceCard
                    key={service?._id}
                    title={service?.heading}
                    description={service?.about}
                    link={service?._id}
                    accent="purple"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-brand-gold/30 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-brand-purple_15">
                  <Image
                    src="/favicon.png"
                    alt="icon"
                    width={1080}
                    height={720}
                    className="w-[90%] h-[90%]"
                  />
                </div>
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
                    key={service?._id}
                    title={service?.heading}
                    description={service?.about}
                    link={service?._id}
                    accent="gold"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
