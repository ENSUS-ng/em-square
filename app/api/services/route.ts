import { NextRequest, NextResponse } from "next/server"

import Service from "@/app/models/service"
import { connectToDB } from "@/app/utils/database"
import { createService } from "@/app/utils/createContent"

export async function GET(req: NextRequest) {
  const typeOfService = req.nextUrl.searchParams.get("type") || ""
  try {
    await connectToDB()
    let services
  if(!typeOfService) {
     services = await Service.find().sort({ createdAt: -1 }).lean()

      } else  {
        services = await Service.find({ type: typeOfService }).sort({ createdAt: -1 }).lean()
      }  
    return NextResponse.json({ success: true, data: services })
  } catch (error) {
    console.error("Failed to fetch services", error)
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const service = await createService(body as Parameters<typeof createService>[0])

    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error("Failed to create service", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create service",
      },
      { status: 400 },
    )
  }
}
