"use client"

import { urls } from "@/common/constants"
import { Footer, Header } from "@/components/common"
import Link from "next/link"

// @ts-ignore
import AboutContent from "./about.mdx"

export default function About() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Header />
      <Content />
      <Footer />
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </main>
  )
}

function Content() {
  return (
    <article className="container prose prose-lg mx-auto mb-20 px-5 font-mono">
      <h1>About</h1>
      <ShutDownLink />
      <Intro />

      <hr />
      <h1>Timeline</h1>
      <AboutContent />
    </article>
  )
}

function ShutDownLink() {
  const scrollToBottom = () =>
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    })

  return (
    <button className="w-full text-center" onClick={scrollToBottom}>
      <div className="mx-auto my-0 rounded bg-green-200 py-2 px-3">
        <svg
          className="-mt-1 mr-2 inline h-5 w-5 text-green-900"
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
        Here to learn about the shut down? Click here.
      </div>
    </button>
  )
}

function Intro() {
  return (
    <>
      <p>
        Panda Snap was a &apos;design capture&apos; service that enabled users
        to take and store snapshots of beautiful websites. It featured an
        extension (Chrome & Firefox) that provided a convenient way to snapshot
        full landing pages or specific elements on the webpage itself.
      </p>
      <p>
        Sadly I shut down the Panda Snap service in 2023 and built this page to
        showcase how it used to work. Check out the following demo pages:
      </p>
      <ul>
        <li>
          <Link href={urls.home} className="rounded bg-green-200 px-2 py-1">
            Landing page
          </Link>{" "}
          - The fun and interactive landing page explaining what Panda Snap is
          all about
        </li>
        <li>
          <Link
            href={urls.collection}
            className="rounded bg-green-200 px-2 py-1"
          >
            Collection
          </Link>{" "}
          - The page where you browse your saved snaps. This features some snaps
          I personally captured using Panda Snap.
        </li>
        <li>
          <Link
            href={urls.extension}
            className="rounded bg-green-200 px-2 py-1"
          >
            Extension
          </Link>{" "}
          - A demo of the UI used when snapping a page with the extension.
        </li>
        <li>
          <Link href={urls.upgrade} className="rounded bg-green-200 px-2 py-1">
            Upgrade
          </Link>{" "}
          - An experimental page I used to guage demand of possible PRO
          features.
        </li>
      </ul>
    </>
  )
}
