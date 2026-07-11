import CMSAdmin from "@/app/components/CMSAdmin"

export default function CMSPage() {
  return (
    <div className="min-h-screen bg-[#0e0b1d] text-white">
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Content Management (Demo)</h1>
        <p className="mt-3 text-slate-300">
          This is a simple client-side CMS demo. Data is saved to localStorage only.
        </p>

        <div className="mt-8">
          <CMSAdmin />
        </div>
      </main>
    </div>
  )
}
