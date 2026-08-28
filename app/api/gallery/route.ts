import { NextResponse } from "next/server"

import GallerySection from "@/app/models/gallery"
import { connectToDB } from "@/app/utils/database"

export async function GET() {
  try {
    await connectToDB()
    const sections = await GallerySection.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: sections })
  } catch (error) {
    console.error("Failed to fetch gallery", error)
    return NextResponse.json({ success: false, error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const images = Array.isArray(body.images)
      ? body.images.filter(
          (image: unknown): image is string => typeof image === "string" && image.trim().length > 0,
        )
      : []
    if (!body.title || !body.description || images.length === 0) {
      return NextResponse.json(
        { success: false, error: "Title, description, and at least one image are required" },
        { status: 400 },
      )
    }

    await connectToDB()
    const section = await GallerySection.create({
      title: body.title,
      description: body.description,
      images,
    })
    return NextResponse.json({ success: true, data: section }, { status: 201 })
  } catch (error) {
    console.error("Failed to create gallery section", error)
    return NextResponse.json(
      { success: false, error: "Failed to create gallery section" },
      { status: 400 },
    )
  }
}
