import type { Metadata } from "next"
import { PropsWithChildren } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Panda Snap",
  description:
    "Snapshot designs that inspire you and create a personalised collection. Design your next product faster but browsing them for inspiration.",
  authors: [{ name: "@kanga_bru" }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" className="h-full">
        <body>{children}</body>
      </html>
    </>
  )
}
