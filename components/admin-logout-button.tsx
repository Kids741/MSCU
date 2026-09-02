"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function AdminLogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin-login")
    router.refresh()
  }

  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Log out
    </button>
  )
}
