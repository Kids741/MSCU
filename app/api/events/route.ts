import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { getEvents, upsertEvent, type EventItem } from "@/lib/events-store"

export async function GET() {
  return NextResponse.json(getEvents())
}

// Body: { title, location, color, displayDate, eventDate?: "YYYY-MM-DD" | null }
export async function POST(req: NextRequest) {
  try {
    const { title, location, color, displayDate, eventDate } = await req.json()

    if (!title || !displayDate) {
      return NextResponse.json({ error: "title and displayDate are required" }, { status: 400 })
    }

    if (eventDate) {
      const parsed = new Date(`${eventDate}T00:00:00`)
      if (Number.isNaN(parsed.getTime())) {
        return NextResponse.json({ error: "eventDate must be a valid date" }, { status: 400 })
      }
    }

    const event: EventItem = {
      id: nanoid(10),
      title,
      location: location || "",
      color: color || "#1E88E5",
      displayDate,
      eventDate: eventDate || null,
      createdAt: new Date().toISOString(),
    }

    upsertEvent(event)
    return NextResponse.json(event, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
