"use client"

import ClientOnly from "@/common/client-only"
import ImageUi from "@/components/extension/uiImage"
import ScreenshotUi from "@/components/extension/uiScreenshot"
import { useState } from "react"

import imageElement from "public/images/demo1.jpg"
import imageLanding from "public/images/landing.jpg"
import "./page.css"

export default function Screenshot() {
  return (
    <ClientOnly>
      <ScreenshotPanel />
    </ClientOnly>
  )
}

enum ScreenshotState {
  Closed,
  TakeSnapshot,
  ImageLanding,
  ImageElement,
}

function ScreenshotPanel() {
  const [state, setState] = useState(ScreenshotState.TakeSnapshot)
  return (
    <>
      {state === ScreenshotState.Closed && (
        <button
          title="Snap something"
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
