"use client"

import ClientOnly from "@/common/client-only"
import ImageUi from "@/components/extension/uiImage"
import ScreenshotUi from "@/components/extension/uiScreenshot"
import { useState } from "react"

import { Disclaimer } from "@/components/common"
import imageElement from "public/images/demo1.jpg"
import imageLanding from "public/images/landing.jpg"
import "./page.css"

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full border-b-8 border-green-200 bg-white">
      <Disclaimer />
      <Content />
      <ClientOnly>
        <Screenshot />
      </ClientOnly>
    </main>
  )
}

function Content() {
  return (
    <article className="prose mx-auto mt-12 lg:prose-xl">
      <h1>Demo Extension Page</h1>
      <p className="rounded bg-green-200 py-2 px-3">
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
        the top right panel to see how users snapped pictures to save to their
        collection.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit
        pellentesque habitant morbi. Velit scelerisque in dictum non consectetur
        a erat. Pharetra diam sit amet nisl suscipit adipiscing bibendum est.
        Vitae tortor condimentum lacinia quis vel. Et tortor consequat id porta.
        Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
        ullamcorper. Ut sem nulla pharetra diam sit. Vel pretium lectus quam id
        leo. Congue mauris rhoncus aenean vel elit scelerisque. Tempus quam
        pellentesque nec nam aliquam sem et tortor. Tellus elementum sagittis
        vitae et leo duis ut diam quam. Pharetra convallis posuere morbi leo
        urna. Ac tincidunt vitae semper quis lectus nulla at volutpat.
      </p>
      <p>
        Arcu dictum varius duis at consectetur lorem. Tristique sollicitudin
        nibh sit amet commodo nulla facilisi nullam vehicula. Scelerisque mauris
        pellentesque pulvinar pellentesque habitant morbi tristique senectus et.
        Nibh sit amet commodo nulla facilisi. In vitae turpis massa sed. Enim ut
        sem viverra aliquet eget. Volutpat lacus laoreet non curabitur gravida
        arcu ac tortor dignissim. Aenean pharetra magna ac placerat vestibulum
        lectus. Turpis egestas sed tempus urna et pharetra pharetra massa massa.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames. Proin sed libero enim sed faucibus turpis. Ac felis donec et odio
        pellentesque diam volutpat.
      </p>
      <p>
        Eros in cursus turpis massa tincidunt dui ut ornare. Commodo sed egestas
        egestas fringilla phasellus faucibus. Eleifend mi in nulla posuere
        sollicitudin aliquam ultrices. Porttitor lacus luctus accumsan tortor
        posuere ac. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper.
        Orci sagittis eu volutpat odio facilisis mauris. Laoreet suspendisse
        interdum consectetur libero id faucibus nisl. Egestas diam in arcu
        cursus euismod quis. Malesuada proin libero nunc consequat interdum
        varius sit. Dolor sit amet consectetur adipiscing elit ut aliquam.
        Libero enim sed faucibus turpis in. Turpis egestas sed tempus urna et
        pharetra. Urna neque viverra justo nec ultrices dui. Feugiat in
        fermentum posuere urna nec tincidunt praesent. Integer vitae justo eget
        magna fermentum iaculis eu non diam.
      </p>
      <p>
        Phasellus vestibulum lorem sed risus. Curabitur vitae nunc sed velit
        dignissim sodales. Augue lacus viverra vitae congue eu consequat. At
        erat pellentesque adipiscing commodo elit at. Ut tellus elementum
        sagittis vitae et. Ipsum nunc aliquet bibendum enim facilisis gravida.
        Aliquet enim tortor at auctor urna nunc. Etiam sit amet nisl purus in
        mollis nunc. Lacus vel facilisis volutpat est velit egestas. Odio morbi
        quis commodo odio aenean sed. Aliquam malesuada bibendum arcu vitae
        elementum curabitur vitae. Velit aliquet sagittis id consectetur purus.
        Justo nec ultrices dui sapien eget. Sodales ut eu sem integer vitae.
        Orci a scelerisque purus semper eget duis. Vel quam elementum pulvinar
        etiam.
      </p>
      <p>
        Massa vitae tortor condimentum lacinia quis vel eros donec ac. Sed cras
        ornare arcu dui vivamus. Sodales ut eu sem integer vitae justo eget
        magna. Et odio pellentesque diam volutpat commodo sed egestas. Pulvinar
        proin gravida hendrerit lectus a. Augue mauris augue neque gravida. A
        pellentesque sit amet porttitor eget dolor. Platea dictumst quisque
        sagittis purus sit amet. Magna fermentum iaculis eu non diam. Dictum at
        tempor commodo ullamcorper a lacus vestibulum sed. Orci porta non
        pulvinar neque laoreet suspendisse interdum consectetur. Tristique nulla
        aliquet enim tortor at auctor urna. Nunc sed augue lacus viverra vitae
        congue eu consequat. Sit amet nisl suscipit adipiscing. Fermentum
        posuere urna nec tincidunt praesent semper feugiat nibh sed. Pharetra
        pharetra massa massa ultricies mi quis hendrerit dolor magna.
      </p>
    </article>
  )
}

enum ScreenshotState {
  Closed,
  TakeSnapshot,
  ImageLanding,
  ImageElement,
}

function Screenshot() {
  const [state, setState] = useState(ScreenshotState.TakeSnapshot)
  return (
    <>
      {state === ScreenshotState.Closed && (
        <button
          className="fixed top-14 right-10 rounded-full bg-white p-3 text-blue-900 shadow-md hover:bg-blue-100"
          onClick={() => setState(ScreenshotState.TakeSnapshot)}
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
        </button>
      )}
      {state === ScreenshotState.TakeSnapshot && (
        <ScreenshotUi
          onSnapElement={() => setState(ScreenshotState.ImageElement)}
          onSnapPage={() => setState(ScreenshotState.ImageLanding)}
          removeScreenshotUi={() => setState(ScreenshotState.Closed)}
        />
      )}
      {state === ScreenshotState.ImageLanding && (
        <ImageUi
          imageUrl={imageLanding.src}
          removeImageUi={() => setState(ScreenshotState.Closed)}
        />
      )}
      {state === ScreenshotState.ImageElement && (
        <ImageUi
          imageUrl={imageElement.src}
          removeImageUi={() => setState(ScreenshotState.Closed)}
        />
      )}
    </>
  )
}
