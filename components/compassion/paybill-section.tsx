"use client"

import { useState } from "react"
import { Check, Copy, CreditCard, MapPin } from "lucide-react"

const PAYBILL = {
  paybillNumber: "4109183",
  accountNumber: "COMPASSION",
  businessName: "UON MEDICAL SCHOOL CHRISTIAN UNION",
}

function CopyRow({ label, value, large }: { label: string; value: string; large?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
    } catch {
      setState("failed")
    }
    setTimeout(() => setState("idle"), 2000)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`${large ? "text-2xl" : "text-xl"} font-bold text-gray-800 break-all`}>{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {state === "copied" ? <Check className="w-4 h-4" style={{ color: "#43A047" }} /> : <Copy className="w-4 h-4" />}
        <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}</span>
      </button>
    </div>
  )
}

export default function PaybillSection() {
  return (
    <section id="support" className="scroll-mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1E88E5" }}>
            Support Our Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous contribution helps us continue spreading compassion and providing assistance to those in need.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">M-Pesa Paybill</h3>
              <p className="text-sm text-gray-600">Use these details to give via M-Pesa</p>
            </div>
          </div>

          <div className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "#F5F5F5" }}>
            <CopyRow label="Paybill Number" value={PAYBILL.paybillNumber} large />
            <CopyRow label="Account Number" value={PAYBILL.accountNumber} />
            <div>
              <p className="text-sm font-medium text-gray-500">Business Name</p>
              <p className="text-base font-semibold text-gray-800">{PAYBILL.businessName}</p>
            </div>
          </div>

          <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: "#E3F2FD", borderColor: "#1E88E5" }}>
            <h4 className="font-semibold text-gray-800 mb-2">How to give</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
              <li>Go to M-Pesa on your phone</li>
              <li>Select &ldquo;Lipa na M-Pesa&rdquo;, then &ldquo;Pay Bill&rdquo;</li>
              <li>Enter Business Number: {PAYBILL.paybillNumber}</li>
              <li>Enter Account Number: {PAYBILL.accountNumber}</li>
              <li>Enter the amount you wish to contribute</li>
              <li>Enter your M-Pesa PIN to complete</li>
            </ol>
          </div>

          <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: "#E8F5E9", borderColor: "#43A047" }}>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "#43A047" }} />
              Physical Contributions
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>
                <strong>Chiromo:</strong> drop-off at the Anatomy Laboratory
              </li>
              <li>
                <strong>KNH:</strong> reach out to Brenda
              </li>
            </ul>
            <p className="text-gray-600 text-sm italic mt-2">
              Please contact a committee member below for specific drop-off details and times.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
