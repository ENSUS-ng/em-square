import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }
 const timeStamp = Date.now()
  const blob = await put(`${file.name}${timeStamp}`, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    // storeId: process.env.BLOB_STORE_ID,
  })

  return NextResponse.json(blob)
}
