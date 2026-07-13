import { NextRequest, NextResponse } from "next/server"

import Team from "@/app/models/team"
import { connectToDB } from "@/app/utils/database"
import { createTeamMember } from "@/app/utils/createContent"

export async function GET() {
  try {
    await connectToDB()
    const teamMembers = await Team.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: teamMembers })
  } catch (error) {
    console.error("Failed to fetch team members", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members" },
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

    const teamMember = await createTeamMember(body as Parameters<typeof createTeamMember>[0])

    return NextResponse.json({ success: true, data: teamMember }, { status: 201 })
  } catch (error) {
    console.error("Failed to create team member", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create team member",
      },
      { status: 400 },
    )
  }
}
