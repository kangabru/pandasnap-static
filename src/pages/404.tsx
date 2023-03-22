import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import "../app/globals.css"

import deadPanda from "../../public/images/dead-panda.png"
import favicon from "../app/favicon.ico"

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Dead Panda</title>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <div className="h-full w-full">
        <div className="col mx-auto h-full w-full max-w-xl justify-center overflow-hidden px-5 text-2xl sm:text-3xl md:text-5xl">
          <Image alt="" className="block w-full max-w-sm" src={deadPanda} />
          <div className="relative z-10 px-10 text-center font-mono">
            <div>Lost Panda (404)</div>
            <Link href="/" className="link">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
