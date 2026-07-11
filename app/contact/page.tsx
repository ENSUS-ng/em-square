import ContactForm from "@/app/components/ContactForm"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(124,15,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_28%),#0e0b1d] text-white">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12 sm:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_50px_120px_-100px_rgba(0,0,0,0.4)]">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Contact</p>
          <h1 className="mt-4 text-5xl font-semibold text-white sm:text-6xl">
            Let&apos;s launch your next project.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Share your goals and we&apos;ll help build the strategy, creative and channels to make
            your brand feel fresher, louder and more connected.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-gray-600/40 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
              <p className="mt-3 text-lg font-semibold text-white">ensusacademy@gmail.com</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-gray-600/40 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Office</p>
              <p className="mt-3 text-lg font-semibold text-white">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8">
            <div>
              <ContactForm />
              <p className="mt-4 text-sm text-slate-400 self-center text-center">
                {" "}
                Fill The form above and we'll get back to you
              </p>
            </div>

            <div className="relative my-3 flex items-center">
              <div className="flex-grow border-t border-white/10" />
              <span className="mx-4 rounded-full bg-white/5 px-4 py-1 text-sm text-slate-300">
                OR
              </span>
              <div className="flex-grow border-t border-white/10" />
            </div>

            <div className="flex flex-col items-start gap-4">
              {/* <div className="rounded-[2rem] border border-white/10 bg-gray-600/40 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                <p className="mt-3 text-lg font-semibold text-white">ensusacademy@gmail.com</p>
              </div> */}

              <Link
                href="mailto:ensusacademy@gmail.com"
                className="inline-flex self-center items-center justify-center rounded-full btn-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(124,15,255,0.18)]"
              >
                Email us directly
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
