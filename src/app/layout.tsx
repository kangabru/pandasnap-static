import type { Metadata } from "next"
import { PropsWithChildren } from "react"
import "./globals.css"

import promoCover from "public/images/promo-cover.jpg"

const title = "Panda Snap"
const description =
  "Snapshot designs that inspire you and create a personalised collection. Design your next product faster but browsing them for inspiration."
const twitterTag = "@kanga_bru"

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: twitterTag }],
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: twitterTag,
    images: [promoCover.src],
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: promoCover.src,
        height: promoCover.height,
        width: promoCover.width,
      },
    ],
  },
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
