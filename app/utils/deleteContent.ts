"use server"

import Brand from "@/app/models/brand"
import LaunchRequest from "@/app/models/launchRequest"
import Service from "@/app/models/service"
import Team from "@/app/models/team"
import { connectToDB } from "@/app/utils/database"

export async function deleteService(id: string) {
  await connectToDB()
  return Service.findByIdAndDelete(id)
}

export async function deleteBrand(id: string) {
  await connectToDB()
  return Brand.findByIdAndDelete(id)
}

export async function deleteTeamMember(id: string) {
  await connectToDB()
  return Team.findByIdAndDelete(id)
}

export async function deleteLaunchRequest(id: string) {
  await connectToDB()
  return LaunchRequest.findByIdAndDelete(id)
}
