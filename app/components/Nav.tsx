"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const sections = [
  { id: "what-we-do", label: "What we do" },
  { id: "partners-team", label: "Partners/Team" },
]

export function Nav() {
  const [active, setActive] = useState("what-we-do")

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 text-sm text-slate-200">
        <Link
          href="#home"
          className="font-semibold text-white"
        >
          Ensus
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
            className="rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-22px_rgba(255,168,15,0.7)] transition hover:brightness-110"
          >
            Launch a project
          </Link>
        </div>
      </nav>
    </header>
  )
}
