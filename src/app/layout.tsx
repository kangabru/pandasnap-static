import Head from "next/head"
import { PropsWithChildren } from "react"
import "./globals.css"

export const metadata = {
  title: "Panda Snap",
  description:
    "Snapshot designs that inspire you and create a personalised collection. Design your next product faster but browsing them for inspiration.",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="keywords"
          content="design, inspiration, panda, snap, chrome, firefox, extension"
        />
        <meta name="author" content="@kanga_bru" />
      </Head>
      <html lang="en" className="h-full">
        <body>{children}</body>
      </html>
    </>
  )
}
