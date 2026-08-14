"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isSignedIn) {
      // redirect unauthenticated users to admin auth page
      router.replace(`/admin/auth?ispermissiongranted=true`)
    }
  }, [isSignedIn, router, pathname])

//   if (!isSignedIn) return null

  return <>{children}</>
}
