import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { getEvents, upsertEvent, type EventItem } from "@/lib/events-store"
import { isAdminAuthenticated } from "@/lib/require-admin"

// Public — event data isn't sensitive, and this is also duplicative of
// what's already shown on /events, so no auth required to list.
export async function GET() {
  return NextResponse.json(await getEvents())
}

// Admin-only.
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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

    await upsertEvent(event)
    return NextResponse.json(event, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
