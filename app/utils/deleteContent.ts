"use server"

import { revalidatePath } from "next/cache"

import Brand from "@/app/models/brand"
import LaunchRequest from "@/app/models/launchRequest"
import Service from "@/app/models/service"
import Team from "@/app/models/team"
import { connectToDB } from "@/app/utils/database"

export async function deleteService(id: string) {
  await connectToDB()
  const deleted = await Service.findByIdAndDelete(id)
  if (!deleted) throw new Error("Service not found")
  return { ok: true }
}

export async function deleteBrand(id: string) {
  await connectToDB()
  const deleted = await Brand.findByIdAndDelete(id)
  if (!deleted) throw new Error("Brand not found")
  return { ok: true }
}

export async function deleteTeamMember(id: string) {
  await connectToDB()
  const deleted = await Team.findByIdAndDelete(id)
  if (!deleted) throw new Error("Team member not found")
  return { ok: true }
}

import GallerySection from "@/app/models/gallery"
export async function deleteLaunchRequest(id: string) {
  await connectToDB()
  const deleted = await LaunchRequest.findByIdAndDelete(id)
  if (!deleted) throw new Error("Launch request not found")
  return { ok: true }
}

export async function deleteGallerySection(id: string) {
  await connectToDB()
  const deleted = await GallerySection.findByIdAndDelete(id)
  if (!deleted) throw new Error("Gallery section not found")

  revalidatePath("/gallery")
  return { ok: true }
}
