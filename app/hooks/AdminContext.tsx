"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useUser, useClerk } from "@clerk/nextjs"

const PASSKEYS = ["basket86"]
const STORAGE_KEY = "emsquare_admin_auth"

type AdminContextType = {
  isAuthenticated: boolean
  login: (passkey: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(STORAGE_KEY) === "true")
  }, [])

  const login = (passkey: string) => {
    const valid = PASSKEYS.includes(passkey.trim())

    if (valid) {
      localStorage.setItem(STORAGE_KEY, "true")
      setIsAuthenticated(true)
    }

    return valid
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  // Prefer Clerk's auth state where available
  const { isSignedIn } = useUser()
  const clerk = useClerk()

  const login = (_passkey: string) => {
    // legacy passkey flow removed; return false
    return false
  }

  const logout = async () => {
    try {
      await clerk.signOut()
    } catch (e) {
      // no-op
    }
  }

  return {
    isAuthenticated: !!isSignedIn,
    login,
    logout,
  }
}
