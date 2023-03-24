"use client"

import ClientOnly from "@/common/client-only"
import { Header } from "@/components/common"
import Snaps from "@/components/website/snaps"

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Header hideDash />

      <div className="container mb-8 max-w-xl text-center">
        <p className="mx-auto rounded bg-green-200 py-2 px-3">
          <svg
            className="-mt-1 mr-1 inline h-5 w-5 text-green-900"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              fillRule="evenodd"
            />
          </svg>
          This page allowed you to view your snaps. Try search something, or
          resize the page for tasty animations.
        </p>
      </div>

      <ClientOnly>
        <Snaps />
      </ClientOnly>
    </main>
  )
}
