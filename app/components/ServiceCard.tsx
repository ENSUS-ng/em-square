type ServiceCardProps = {
  title: string
  description: string
  accent: "purple" | "gold"
}

export function ServiceCard({ title, description, accent }: ServiceCardProps) {
  const border = accent === "purple" ? "border-2 border-brand-purple" : "border-2 border-brand-gold"
  const accentText = accent === "purple" ? "text-brand-purple" : "text-brand-gold"
  const hoverShadow =
    accent === "purple"
      ? "hover:shadow-[0_24px_90px_-60px_rgba(124,15,255,0.35)]"
      : "hover:shadow-[0_24px_90px_-60px_rgba(255,168,15,0.35)]"

  return (
    <article
      className={`group rounded-3xl ${border} bg-white/5 px-6 py-7 transition duration-300 hover:-translate-y-0.5 ${hoverShadow}`}
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold transition-colors duration-300 hover:text-white">
        <span className={accentText}>{accent === "purple" ? "Learn more" : "Learn more"}</span>
        <span className={`${accentText} text-base`}>&rarr;</span>
      </div>
    </article>
  )
}
