"use client"

import { urls } from "@/common/constants"
import { join } from "@/common/utils"
import Image from "next/image"
import Link from "next/link"
import iconLogo from "public/icons/logo.png"
import { useEffect, useState } from "react"

type HeaderProps = {
  hideDash?: boolean
  hideExtension?: boolean
}

export function Header(props: HeaderProps) {
  return (
    <header className="top-0 z-50 mb-6 w-full">
      <Disclaimer />
      <div className="bg-white shadow-md">
        <div className="row container justify-between px-4 py-2 text-lg leading-none sm:px-6 sm:py-4 sm:text-xl">
          <Link
            title="Landing page"
            href={urls.home}
            className="hover:scale-105"
          >
            <Image
              src={iconLogo}
              alt="Logo"
              className="pointer-events-none h-6 w-8 sm:h-8 sm:w-10"
            />
          </Link>

          <HeaderLinks {...props} />
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

export function HeaderLinks(props: HeaderProps) {
  return (
    <div className="row space-x-3 text-gray-800 sm:space-x-5">
      {!props.hideDash && (
        <Link
          title="Collection"
          href={urls.collection}
          className="hover:scale-105"
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.75 3A1.75 1.75 0 003 4.75v2.752l.104-.002h13.792c.035 0 .07 0 .104.002V6.75A1.75 1.75 0 0015.25 5h-3.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H4.75zM3.104 9a1.75 1.75 0 00-1.673 2.265l1.385 4.5A1.75 1.75 0 004.488 17h11.023a1.75 1.75 0 001.673-1.235l1.384-4.5A1.75 1.75 0 0016.896 9H3.104z" />
          </svg>
        </Link>
      )}
      {!props.hideExtension && (
        <Link
          title="Extension"
          href={urls.extension}
          className="hover:scale-105"
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
              fillRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  )
}

export function Disclaimer() {
  return (
    <div className="row w-full bg-green-200 p-2">
      <div className="h-5 w-5" />
      <Link
        className="row mx-auto w-full max-w-screen-lg justify-center text-center"
        href={urls.about}
      >
        <p>
          This is now a portfolio project demo site as the Panda Snap service
          has shut down. <u>Read more here.</u>
        </p>
      </Link>
      <Github />
    </div>
  )
}

function Github(props: { className?: string }) {
  return (
    <Link href={urls.repo}>
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        className={join("h-5 w-5", props.className)}
      >
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
      </svg>
    </Link>
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
