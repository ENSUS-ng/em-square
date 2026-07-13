"use client"

export type ServiceItem = {
  _id: string
  heading: string
  about: string
  type: "media" | "marketing"
  content: string
  createdAt?: string
}

export type BrandItem = {
  _id: string
  logo: string
  brandName: string
  createdAt?: string
}

export type TeamItem = {
  _id: string
  picture: string
  name: string
  role: string
  createdAt?: string
}

export type LaunchRequestItem = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt?: string
}

export async function fetchServices() {
  const response = await fetch("/api/services", { cache: "no-store" })
  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "Failed to fetch services")
  }
  return payload.data as ServiceItem[]
}

export async function fetchBrands() {
  const response = await fetch("/api/brands", { cache: "no-store" })
  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "Failed to fetch brands")
  }
  return payload.data as BrandItem[]
}

export async function fetchTeam() {
  const response = await fetch("/api/team", { cache: "no-store" })
  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "Failed to fetch team")
  }
  return payload.data as TeamItem[]
}

export async function fetchLaunchRequests() {
  const response = await fetch("/api/launch-requests", { cache: "no-store" })
  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || "Failed to fetch launch requests")
  }
  return payload.data as LaunchRequestItem[]
}
