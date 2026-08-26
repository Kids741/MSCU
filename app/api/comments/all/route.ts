import { NextResponse } from "next/server"
import { getAllComments } from "@/lib/comments-store"

export async function GET() {
  return NextResponse.json(await getAllComments())
}
