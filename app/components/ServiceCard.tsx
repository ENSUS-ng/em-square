import Link from "next/link"
import { Megaphone, Clapperboard, ArrowUpRight } from "lucide-react"

type ServiceCardProps = {
  title: string
  description: string
  accent: "purple" | "gold"
  link: string
}

export function ServiceCard({ title, description, accent, link }: ServiceCardProps) {
  const border = accent === "purple" ? "border-2 border-brand-purple" : "border-2 border-brand-gold"
  const accentText = accent === "purple" ? "text-brand-purple" : "text-brand-gold"
  const hoverShadow =
    accent === "purple"
      ? "hover:shadow-[0_24px_90px_-60px_rgba(124,15,255,0.35)]"
      : "hover:shadow-[0_24px_90px_-60px_rgba(255,168,15,0.35)]"

  return (
    <Link
      href={`/services/${link}`}
      className={`group block rounded-3xl ${border} bg-white px-6 py-7 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 ${hoverShadow}`}
    >
      <span className={accentText}>
        {accent === "purple" ? (
          <Clapperboard
            size={34}
            className="stroke-2"
          />
        ) : (
          <Megaphone
            size={34}
            className="stroke-2"
          />
        )}
      </span>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-500">{description}</p>
      <div className={`mt-6 flex items-center justify-between text-sm font-semibold ${accentText}`}>
        <span>Explore service</span>
        <ArrowUpRight
          size={19}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </Link>
  )
}
