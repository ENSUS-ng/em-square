import { NextRequest, NextResponse } from "next/server"

import Brand from "@/app/models/brand"
import { connectToDB } from "@/app/utils/database"
import { createBrand } from "@/app/utils/createContent"

export async function GET() {
  try {
    await connectToDB()
    const brands = await Brand.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: brands })
  } catch (error) {
    console.error("Failed to fetch brands", error)
    return NextResponse.json({ success: false, error: "Failed to fetch brands" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const brand = await createBrand(body as Parameters<typeof createBrand>[0])

    return NextResponse.json({ success: true, data: brand }, { status: 201 })
  } catch (error) {
    console.error("Failed to create brand", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create brand" },
      { status: 400 },
    )
  }
}
