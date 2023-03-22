"use client"

import ClientOnly from "@/common/client-only"
import Snaps from "@/components/snaps"
import Image from "next/image"
import Link from "next/link"
import iconLogo from "../../../public/icons/logo.png"
import { Disclaimer } from "../page"

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

function Header() {
  return (
    <header className="top-0 z-50 mb-6 w-full">
      <Disclaimer />
      <div className="bg-white shadow-md">
        <div className="row container justify-between px-4 py-2 text-lg leading-none sm:px-6 sm:py-4 sm:text-xl">
          <Image
            src={iconLogo}
            alt="Logo"
            className="pointer-events-none h-6 w-8 scale-100 transform group-hover:scale-105 sm:h-8 sm:w-10 lg:h-10 lg:w-12"
          />
          <span className="hidden whitespace-nowrap sm:block lg:text-2xl">
            Panda Snap
          </span>

          <div className="row space-x-3 sm:space-x-5">
            <Link
              href="/"
              className="font-semibold text-gray-800 hover:underline"
            >
              Landing
            </Link>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 1 1 1"
        preserveAspectRatio="none"
        className="h-px w-full fill-current text-white sm:h-1 lg:h-2"
      >
        <path d="M 0 2 Q 0.5 0 1 2 L 1 0 L 0 0 Z"></path>
      </svg>
    </header>
  )
}
