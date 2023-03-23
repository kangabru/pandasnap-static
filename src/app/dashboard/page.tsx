"use client"

import ClientOnly from "@/common/client-only"
import { Header } from "@/components/common"
import Snaps from "@/components/website/snaps"

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Header />
      <ClientOnly>
        <Snaps />
      </ClientOnly>
    </main>
  )
}
