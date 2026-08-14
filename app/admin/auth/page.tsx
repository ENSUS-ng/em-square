"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export default function AdminAuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const returnTo = searchParams.get("returnTo") || "/admin"
  const isPermissionGranted = searchParams.get("ispermissiongranted")

  const handleAfter = () => {
    router.push(returnTo)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.26),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.18),transparent_24%),#0e0b1d] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/8 p-8 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Admin access</p>
        <h1 className="mt-4 text-3xl font-semibold">Sign in or create an account</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Sign back in as an admin or sign up as a new admin
        </p>

        {isPermissionGranted === "false" ? (
          <p className="mt-4 text-sm text-rose-300">This invite link has not been validated yet.</p>
        ) : null}

        {isPermissionGranted !== "false" && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <SignInButton forceRedirectUrl='/admin'>
              <button className="cursor-pointer w-40 rounded-full btn-gradient px-4 py-3 text-sm font-semibold text-white">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton forceRedirectUrl='/admin'>
              <button className="cursor-pointer w-40 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white">
                Sign up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  )
}
