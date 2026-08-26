import { NextRequest, NextResponse } from "next/server"
import { getLikeCount, incrementLike } from "@/lib/likes-store"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const count = await getLikeCount(decodeURIComponent(slug))
  return NextResponse.json({ count })
}

export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const count = await incrementLike(decodeURIComponent(slug))
  return NextResponse.json({ count })
}
