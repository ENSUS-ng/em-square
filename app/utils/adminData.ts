"use client"

import axios from "axios"

export type ServiceType = "media" | "marketing"

export type ApiResponse<T> = {
  success: boolean
  data: T
  error?: string
}

export type ServiceItem = {
  _id: string
  heading: string
  about: string
  type: ServiceType
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

async function get<T>(url: string, params?: Record<string, unknown>) {
  try {
    const { data: payload } = await axios.get<ApiResponse<T>>(url, {
      params,
    })

    if (!payload.success) {
      throw new Error(payload.error || "Request failed")
    }

    return payload.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message || "Something went wrong")
    }

    throw error
  }
}

export function fetchServices(type: ServiceType) {
  return get<ServiceItem[]>("/api/services", { type })
}

export function fetchBrands() {
  return get<BrandItem[]>("/api/brands")
}

export function fetchTeam() {
  return get<TeamItem[]>("/api/team")
}

export function fetchLaunchRequests() {
  return get<LaunchRequestItem[]>("/api/launch-requests")
}
