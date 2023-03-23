"use client"

import Image from "next/image"
import Link from "next/link"
import iconLogo from "public/icons/logo.png"
import { useEffect } from "react"

export function Header() {
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

export function Disclaimer() {
  return (
    <div className="row w-full bg-green-200 p-2">
      <div className="row mx-auto w-full max-w-screen-lg justify-center text-center">
        <p>
          Panda Snap has shut down. This is now used as a portfolio project
          demo.
        </p>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="col mt-10 space-y-5 pb-6 text-center text-gray-800">
      <p className="text-2xl">
        Made with 🤟 by
        <a
          href="https://twitter.com/kanga_bru"
          target="_blank"
          rel="noreferrer"
          className="button-outline rounded p-1 text-green-500 hover:underline"
        >
          kangabru
        </a>
      </p>
    </footer>
  )
}

export default function Flash({ onFinish }: { onFinish?: () => void }) {
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    setOpacity(0)
    onFinish && setTimeout(onFinish, 1000)
  }, [onFinish])
  return (
    <div
      className="fixed inset-0 z-max bg-white transition-opacity duration-2000"
      style={{ opacity }}
    ></div>
  )
}
