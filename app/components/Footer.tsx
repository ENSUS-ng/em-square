import Link from "next/link"
import { ArrowUpRight, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="mx-auto mt-28 w-full max-w-6xl border-t border-slate-200 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900 capitalize">
            Ensus media and marketing
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Providing media and marketing for brands ready to move with clarity.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
          <Link
            className="transition hover:text-slate-900"
            href="/gallery"
          >
            Gallery
          </Link>
          <a
            className="inline-flex items-center gap-2 transition hover:text-slate-900"
            href="mailto:hello@emsquare.com"
          >
            <Mail size={15} /> enusmediandmarketing@gmail.com
          </a>
          {/* <Link
            className="inline-flex items-center gap-2 transition hover:text-white"
            href="/branding-request"
          >
            <Phone size={15} /> Contact
          </Link> */}
          <Link
            className="inline-flex items-center gap-1 text-brand-gold transition hover:text-white"
            href="/branding-request"
          >
            Start a project <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <p className="mt-10 text-xs text-slate-500">
        © {new Date().getFullYear()} Ensus Global. All rights reserved.
      </p>
    </footer>
  )
}
