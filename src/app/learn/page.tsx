import { Footer, Header } from "@/components/common"

import imageSnapPage from "public/images/learn/snap-page.jpg"
import imageSnapElement from "public/images/learn/snap-element.jpg"
import imageCreateTag from "public/images/learn/create-tag.jpg"
import imageSearch from "public/images/learn/search.jpg"
import Image from "next/image"
import Link from "next/link"

export default function Learn() {
  return (
    <main>
      <Header />
      <article className="container prose prose-lg mx-auto mb-20 px-5 font-mono sm:prose-xl">
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
                <Link href="/extension">Download here</Link>
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
                <Link href="/dashboard">home page</Link>
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
              <p>
                Hover your mouse around the screen to see selectable elements
              </p>
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
                <Link href="/dashboard">home page</Link>
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
                You can create tags when saving snaps directly form the tag
                input.
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
                Visit the <Link href="/dashboard">home page</Link> to browse
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
      <Footer />
    </main>
  )
}
