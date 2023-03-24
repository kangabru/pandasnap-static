import { Footer, Header } from "@/components/common"

import { urls } from "@/common/constants"
import Image from "next/image"
import Link from "next/link"
import imageCreateTag from "public/images/learn/create-tag.jpg"
import imageSearch from "public/images/learn/search.jpg"
import imageSnapElement from "public/images/learn/snap-element.jpg"
import imageSnapPage from "public/images/learn/snap-page.jpg"
import Screenshot from "./screenshot"

import "./page.css"

export default function Extension() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Header hideExtension />
      <Article />
      <Footer />
      <Screenshot />
    </main>
  )
}

function Article() {
  return (
    <article className="container prose prose-lg mx-auto mb-20 px-5 font-mono sm:prose-xl">
      <p className="rounded bg-green-200 py-2 px-3 text-base">
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
        This page demonstrates how the Panda Snap extension used to work. Use
        the snap panel (
        <svg
          className="-mt-1 inline h-5 w-5"
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
        </svg>{" "}
        icon) to see how users snapped pictures to save to their collection.
      </p>

      <h2>How-to Guide</h2>

      <section>
        <h3>Contents</h3>
        <ul>
          <li>
            <a href="#install-the-extension">Install the extension</a>
          </li>

          <li>
            <a href="#snap-an-entire-web-page">Snap an entire web page</a>
          </li>

          <li>
            <a href="#snap-an-area-or-element">Snap an area or element</a>
          </li>

          <li>
            <a href="#create-tags">Create tags</a>
          </li>

          <li>
            <a href="#searchfilter-snaps">Search/filter snaps</a>
          </li>
        </ul>
      </section>
      <hr />

      <section className="rounded pl-5">
        <h3 id="install-the-extension">Install the extension</h3>

        <div className="row space-x-2">
          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            📷 Snap
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            🌎 Extension
          </span>
        </div>

        <ul>
          <li>
            <p>
              <Link href={urls.extension}>Download here</Link>
            </p>
          </li>

          <li>
            <p>
              <strong>Pin the extension</strong> for easy access via the
              extension menu
            </p>
          </li>

          <li>
            <p>Click the 🐼 icon when you want to snap something</p>
          </li>
        </ul>
      </section>

      <hr />

      <section className="rounded pl-5">
        <h3 id="snap-an-entire-web-page">Snap an entire web page</h3>

        <div className="row space-x-2">
          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            📷 Snap
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            🌎 Extension
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            💻 Site
          </span>
        </div>

        <ul>
          <li>
            <p>Click the extension button on a website</p>
          </li>

          <li>
            <p>Select the &apos;Save Page&apos; option</p>
          </li>

          <li>
            <p>Wait a few seconds for the page to process</p>
          </li>

          <li>
            <p>Save your snap (all fields are optional)</p>
          </li>

          <li>
            <p>
              Find your saved snap on the{" "}
              <Link href={urls.collection}>home page</Link>
            </p>
          </li>
        </ul>

        <div className="-my-5 flex flex-col items-center">
          <a
            href="/static/pages/learn/snap-page.a638f2374d5e.jpg"
            className="-my-6 w-full max-w-lg"
          >
            <Image alt="" className="rounded shadow" src={imageSnapPage} />
          </a>
        </div>
      </section>

      <hr />

      <section className="rounded pl-5">
        <h3 id="snap-an-area-or-element">Snap an area or element</h3>

        <div className="row space-x-2">
          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            📷 Snap
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            🌎 Extension
          </span>
        </div>

        <ul>
          <li>
            <p>Click the extension button on a website</p>
          </li>

          <li>
            <p>Hover your mouse around the screen to see selectable elements</p>
          </li>

          <li>
            <p>
              Click an element to select it, then drag the dots to crop it
              further
            </p>
          </li>

          <li>
            <p>Save your snap (all fields are optional)</p>
          </li>

          <li>
            <p>
              Find your saved snap on the{" "}
              <Link href={urls.collection}>home page</Link>
            </p>
          </li>
        </ul>

        <div className="-my-5 flex flex-col items-center">
          <a
            href="/static/pages/learn/snap-element.711f18f42624.jpg"
            className="-my-6 w-full max-w-lg"
          >
            <Image alt="" className="rounded shadow" src={imageSnapElement} />
          </a>
        </div>
      </section>

      <hr />

      <section className="rounded pl-5">
        <h3 id="create-tags">Create tags</h3>

        <div className="row space-x-2">
          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            📃 Tag
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            🌎 Extension
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            💻 Site
          </span>
        </div>

        <ul>
          <li>
            <p>
              You can create tags when saving snaps directly form the tag input.
            </p>
          </li>

          <li>
            <p>
              Simply start typing name of the tag you want and a
              &apos;Create&apos; option will appear.
            </p>
          </li>

          <li>
            <p>Click on it or press TAB or ENTER to save it.</p>
          </li>
        </ul>

        <div className="-my-5 flex flex-col items-center">
          <a
            href="/static/pages/learn/create-tag.e2ea46e1976b.jpg"
            className="-my-6 w-full max-w-lg"
          >
            <Image alt="" className="rounded shadow" src={imageCreateTag} />
          </a>
        </div>
      </section>

      <hr />

      <section className="rounded pl-5">
        <h3 id="searchfilter-snaps">Search/filter snaps</h3>

        <div className="row space-x-2">
          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            📷 Snap
          </span>

          <span className="-mt-3 -mb-3 select-none rounded bg-gray-300 p-2 text-sm leading-none">
            💻 Site
          </span>
        </div>

        <ul>
          <li>
            <p>
              Visit the <Link href={urls.collection}>home page</Link> to browse
              your snaps
            </p>
          </li>

          <li>
            <p>Click on the search bar to reveal search options.</p>
          </li>

          <li>
            <p>
              Type in anything search snaps by titles, website urls, and more.
            </p>
          </li>

          <li>
            <p>Click on the tags pills to filter snaps by them.</p>
          </li>
        </ul>

        <div className="-my-5 flex flex-col items-center">
          <a
            href="/static/pages/learn/search.77c7968f9b26.jpg"
            className="-my-6 w-full max-w-lg"
          >
            <Image alt="" className="rounded shadow" src={imageSearch} />
          </a>
        </div>
      </section>
    </article>
  )
}
