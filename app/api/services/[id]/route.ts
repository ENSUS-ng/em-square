import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import Service from "@/app/models/service"
import { connectToDB } from "@/app/utils/database"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectToDB()
    const service = await Service.findById(id).lean()
    if (!service)
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
    return NextResponse.json({ success: true, data: service })
  } catch {
    return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const images = Array.isArray(body.images)
      ? body.images
          .filter((image:any): image is string => typeof image === "string" && image.trim().length > 0)
          .map((image:any) => image.trim())
      : []

    if (!("images" in body)) {
      return NextResponse.json(
        { success: false, error: "images array is required" },
        { status: 400 },
      )
    }

    await connectToDB()
    const service = await Service.findByIdAndUpdate(id, { images }, { new: true }).lean()

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
    }

    revalidatePath("/")
    revalidatePath("/admin/service-images")
    revalidatePath(`/admin/service-images/${id}`)
    revalidatePath(`/services/${id}`)

    return NextResponse.json({ success: true, data: service })
  } catch (error) {
    console.error("Failed to update service images", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update service images",
      },
      { status: 400 },
    )
  }
}
