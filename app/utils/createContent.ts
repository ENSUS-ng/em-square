"use server"

import Brand from "@/app/models/brand"
import LaunchRequest from "@/app/models/launchRequest"
import Service from "@/app/models/service"
import Team from "@/app/models/team"
import { connectToDB } from "@/app/utils/database"

export type CreateServiceInput = {
  heading: string
  about: string
  type: "media" | "marketing"
  content: string
}

export type CreateBrandInput = {
  logo: string
  brandName: string
}

export type CreateTeamInput = {
  picture: string
  name: string
  role: string
}

export type CreateLaunchRequestInput = {
  name: string
  email: string
  message: string
}

export async function createService(input: CreateServiceInput) {
  await connectToDB()

  if (!input.heading || !input.about || !input.type || !input.content) {
    throw new Error("Missing required fields")
  }

  if (input.type !== "media" && input.type !== "marketing") {
    throw new Error("Type must be media or marketing")
  }

  await Service.create({
    heading: input.heading,
    about: input.about,
    type: input.type,
    content: input.content,
  })
  return {
  ok: true,
  message: "Service created successfully",
}
}

export async function createBrand(input: CreateBrandInput) {  
  await connectToDB()

  if (!input.logo || !input.brandName) {
    throw new Error("Missing required fields")
  }

  await Brand.create({
    logo: input.logo,
    brandName: input.brandName,
  })
  return {
  ok: true,
  message: "Brand created successfully",
}
}

export async function createTeamMember(input: CreateTeamInput) {
  await connectToDB()

  if (!input.picture || !input.name || !input.role) {
    throw new Error("Missing required fields")
  }

  await Team.create({
    picture: input.picture,
    name: input.name,
    role: input.role,
  })
  return {
  ok: true,
  message: "Team member created successfully",
}
}

export async function createLaunchRequest(input: CreateLaunchRequestInput) {
  await connectToDB()

  if (!input.name || !input.email || !input.message) {
    throw new Error("Missing required fields")
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(input.email)) {
    throw new Error("Invalid email")
  }

  const data = await LaunchRequest.create({
    name: input.name,
    email: input.email,
    message: input.message,
  })
  return {ok: data.name ? true : false}
}
