"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAdmin } from "@/app/hooks/AdminContext"
import Image from "next/image"
import { LayoutDashboard, Mail } from "lucide-react"

const sections = [
  { id: "what-we-do", label: "What we do" },
  { id: "brands-team", label: "Brands/Team" },
]

export function Nav() {
  const [active, setActive] = useState("what-we-do")
  const { isAuthenticated } = useAdmin()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateActiveSection = () => {
      const current = sections.reduce((currentActive, section) => {
        const element = document.getElementById(section.id)
        if (!element) return currentActive

        const offset = element.getBoundingClientRect().top - 120
        if (offset <= 0) {
          return section.id
        }

        return currentActive
      }, sections[0].id)

      setActive(current)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 pl-0 pr-2 py-4 text-sm text-slate-200">
        <Link
          href="/"
          className="font-semibold text-white w-40 h-12"
        >
          <Image
            src="/em-logo.png"
            alt="logo"
            width={1080}
            height={720}
            className="w-full h-full border-2"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {sections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors ${
                active === item.id ? "text-brand-purple" : "text-slate-300 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-sm rounded-2xl btn-gradient px-3 py-2.5  font-semibold text-white shadow-[0_16px_40px_-22px_rgba(255,168,15,0.7)] transition hover:brightness-110"
          >
            <Mail
              size={24}
              className="text-white stroke-2"
            />
          </Link>

          {mounted && isAuthenticated ? (
            <Link
              href="/admin"
              className="text-sm rounded-2xl btn-gradient-left px-3 py-2.5  font-semibold text-white shadow-[0_16px_40px_-22px_rgba(255,168,15,0.7)] transition hover:brightness-110"
            >
              <LayoutDashboard
                size={24}
                className="text-white"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  )
}
