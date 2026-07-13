import { NextRequest, NextResponse } from "next/server"

import LaunchRequest from "@/app/models/launchRequest"
import { connectToDB } from "@/app/utils/database"
import { createLaunchRequest } from "@/app/utils/createContent"

export async function GET() {
  try {
    await connectToDB()
    const requests = await LaunchRequest.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: requests })
  } catch (error) {
    console.error("Failed to fetch launch requests", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch launch requests" },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const request = await createLaunchRequest(body as Parameters<typeof createLaunchRequest>[0])

    return NextResponse.json({ success: true, data: request }, { status: 201 })
  } catch (error) {
    console.error("Failed to create launch request", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create launch request",
      },
      { status: 400 },
    )
  }
}
