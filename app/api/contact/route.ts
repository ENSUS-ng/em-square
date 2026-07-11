import { NextRequest, NextResponse } from "next/server"

type Body = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body
    const { name, email, subject, message } = body

    if (!email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 })
    }

    // TODO: integrate an email provider or persistence here
    console.log("Contact submission:", { name, email, subject, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
