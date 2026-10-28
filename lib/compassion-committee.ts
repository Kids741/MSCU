// Compassion & Care committee shown on /compassion under "Seek Assistance".
// Update this list at each handover. Phone numbers are in international
// format without the "+" (used for both tel: and WhatsApp links).
// Leave `image` out to show the member's initials instead of a photo.

export type CommitteeMember = {
  name: string
  role: string
  phone: string
  image?: string
  objectPosition?: string
}

export const compassionCommittee: CommitteeMember[] = [
  { name: "Joy Chege", role: "Compassion & Care Committee", phone: "254782137094", image: "/Compassion/committee/joy-chege.webp" },
  { name: "Alphonceberry Otieno", role: "Compassion & Care Committee", phone: "254717024672", image: "/Compassion/committee/alphonceberry-otieno.webp" },
  { name: "Brian Chege", role: "Compassion & Care Committee", phone: "254796693660", image: "/Compassion/committee/brian-chege.webp" },
  { name: "Kevin Otieno", role: "Compassion & Care Committee", phone: "254782128332", image: "/Compassion/committee/kevin-otieno.webp" },
  { name: "Liz", role: "Compassion & Care Committee", phone: "254790418539", image: "/Compassion/committee/liz.webp" },
  { name: "Brenda Wanyama", role: "Compassion & Care Committee", phone: "254745730449", image: "/Compassion/committee/brenda-wanyama.webp" },
]
