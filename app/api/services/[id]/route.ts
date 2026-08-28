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
