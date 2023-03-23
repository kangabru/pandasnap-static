"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import useMeasure from "react-use-measure"
import Flash from "../common"
import { KeyCode } from "./constants"
import { join, LockIcon } from "./uiCommon"
import { BlackOut, CropUi, cropUiPadding, Dimensions } from "./uiCrop"
import { useKeyUpEffect, useOpenExperiment, Wait } from "./utils"

const MAX_DRAG_DIST = 5

export default function ScreenshotUi({
  onSnapPage,
  onSnapElement,
  removeScreenshotUi,
}: {
  onSnapPage: () => void
  onSnapElement: () => void
  removeScreenshotUi: () => void
}) {
  const [selectedCrop, setSelectedCrop] = useState<Dimensions | undefined>(
    undefined
  )
  const [mode, setMode] = useState<"overlay" | "elem-select">("overlay")

  const router = useRouter()

  useKeyUpEffect((e: KeyboardEvent) => {
    e.keyCode == KeyCode.escape && removeScreenshotUi()
  })

  const [showFlash, setShowFlash] = useState(false)

  const screenshotThenClose = async () => {
    setShowFlash(true)
    await Wait(1000)
    removeScreenshotUi()
  }

  const snapElement = () => {
    setSelectedCrop(undefined)
    setMode("elem-select")
  }

  const viewSnaps = () => {
    router.push("/dashboard")
    removeScreenshotUi()
  }

  const openExperiment = useOpenExperiment()

  return (
    <>
      {showFlash && <Flash />}
      <div id="picker-ocean">
        {selectedCrop ? (
          <CropUi
            initCrop={selectedCrop}
            reselect={snapElement}
            screenshot={() => screenshotThenClose().then(onSnapElement)}
            closeUi={removeScreenshotUi}
          />
        ) : (
          <>
            <ScreenshotUiOverlay
              closeUi={removeScreenshotUi}
              setSelectedCrop={setSelectedCrop}
              showSelectUI={mode == "elem-select"}
            />

            {mode == "overlay" && (
              <div className="fixed top-0 right-0 pt-5 pr-5">
                <div className="grid grid-cols-6 gap-2 rounded-lg bg-white p-2 text-lg shadow">
                  <ScreenshotUiTextButton
                    id="snap-element"
                    onClick={snapElement}
                    text="Snap element"
                    icon={
                      <svg
                        className="h-6 w-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    }
                  />
                  <ScreenshotUiTextButton
                    id="snap-snaps"
                    onClick={viewSnaps}
                    text="View snaps"
                    icon={
                      <svg
                        className="h-6 w-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                    }
                  />
                  <ScreenshotUiButton
                    id="snap-page"
                    onClick={() => screenshotThenClose().then(onSnapPage)}
                    text="Snap Page"
                    type={LargeButtonType.fullPage}
                  />
                  <ScreenshotUiButton
                    id="snap-visible"
                    onClick={() => screenshotThenClose().then(onSnapElement)}
                    text="Snap Visible"
                    type={LargeButtonType.visible}
                  />
                  <ScreenshotUiButton
                    id="snap-visible"
                    onClick={openExperiment}
                    text="Source Code"
                    type={LargeButtonType.sourceCode}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

const buttonStyleClass =
  "hover:bg-blue-100 rounded whitespace-nowrap transition-all duration-150 ease-in-out select-none focus:outline-none focus:shadow-outline"

function ScreenshotUiTextButton(props: {
  id: string
  text: string
  onClick: () => void
  icon: JSX.Element
}) {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={join(
        "row col-span-3 flex-1 justify-center space-x-2 py-2 px-3",
        buttonStyleClass
      )}
    >
      {props.icon}
      <span>{props.text}</span>
    </button>
  )
}

function ScreenshotUiButton(props: {
  id: string
  text: string
  onClick: () => void
  type: LargeButtonType
}) {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={join("col-span-2 flex-1 py-1 px-3", buttonStyleClass)}
    >
      <ScreenshotUiButtonIcon isFullPage={props.type} />
      <span>{props.text}</span>
    </button>
  )
}

enum LargeButtonType {
  fullPage,
  visible,
  sourceCode,
}

function ScreenshotUiButtonIcon(props: { isFullPage: LargeButtonType }) {
  const isSourceCode = props.isFullPage == LargeButtonType.sourceCode
  return (
    <div className="relative my-3 mx-auto h-10 w-16">
      {isSourceCode ? (
        <>
          <div className="col absolute inset-0 justify-center rounded-sm bg-blue-200">
            <svg
              className="h-8 w-8 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </div>
          <div className="absolute inset-0 rounded-sm border-3 border-blue-900"></div>
          <LockIcon />
        </>
      ) : (
        <>
          {props.isFullPage == LargeButtonType.fullPage ? (
            <div className="absolute inset-0 -my-2 mx-1 bg-blue-200"></div>
          ) : (
            <div className="absolute inset-0 bg-blue-200"></div>
          )}
          <div className="absolute inset-0 rounded-sm border-4 border-blue-900"></div>
        </>
      )}
    </div>
  )
}

function ScreenshotUiOverlay(props: {
  closeUi: () => void
  setSelectedCrop: (_: Dimensions) => void
  showSelectUI: boolean
}) {
  const [{ selectedCrop, isElement }, setSelectedCrop] = useState<{
    isElement?: boolean
    selectedCrop?: Dimensions | DOMRect | undefined
  }>({})
  const setSelectedElem = (elem: HTMLElement | undefined) =>
    setSelectedCrop({
      isElement: true,
      selectedCrop: elem?.getBoundingClientRect(),
    })

  const [dragStart, setDragStart] = useState<
    { left: number; top: number } | undefined
  >(undefined)
  const isDragging = dragStart

  const [bind, { width, height }] = useMeasure({ scroll: true })

  const onMouseDown = (ev: MouseEvent) =>
    setDragStart({ left: ev.clientX, top: ev.clientY })
  const onMouseUp = () => {
    setDragStart(undefined)
    if (selectedCrop) {
      // Manually extract values in DOMRect case
      const dims = {
        left: selectedCrop.left,
        top: selectedCrop.top,
        width: selectedCrop.width,
        height: selectedCrop.height,
      }

      // Cutoff top
      if (dims.top < 0) {
        dims.height += dims.top
        dims.top = 0
      }

      // Cutoff bottom
      const bottom = dims.top + dims.height - height
      if (bottom > 0) dims.height -= bottom

      // Cutoff excess left
      if (dims.left < 0) {
        dims.width += dims.left
        dims.left = 0
      }

      // Cuttoff excess right
      const right = dims.left + dims.width - width
      if (right > 0) dims.width -= right

      props.setSelectedCrop(isElement ? growDimensions(dims) : dims)
    }
  }

  const [timer, setTimer] = useState<number | undefined>(undefined)
  const onMove = (ev: MouseEvent) => {
    if (dragStart) {
      const width = Math.abs(ev.clientX - dragStart.left) ?? 0
      const height = Math.abs(ev.clientY - dragStart.top) ?? 0
      if (
        Math.pow(width, 2) + Math.pow(height, 2) >
        Math.pow(MAX_DRAG_DIST, 2)
      ) {
        const left = Math.min(ev.clientX, dragStart.left) ?? 0
        const top = Math.min(ev.clientY, dragStart.top) ?? 0
        setSelectedCrop({
          isElement: false,
          selectedCrop: { left, top, width, height },
        })
      }
    } else {
      timer && clearTimeout(timer)
      setTimer(
        setTimeout(
          (argEv) => setSelectedElem(elementFromPoint(argEv)),
          20,
          ev
        ) as any
      )
    }
  }

  return (
    <div
      ref={bind}
      className="fixed inset-0"
      onMouseDown={onMouseDown as any}
      onMouseMove={onMove as any}
      onMouseUp={onMouseUp}
    >
      <BlackOut dimensions={selectedCrop} animate={!isDragging} />
      {props.showSelectUI && (
        <div className="fixed inset-0 grid place-items-center text-center text-3xl text-white">
          <div className="col w-full max-w-lg justify-center space-y-3 rounded-lg bg-black/30 p-8">
            <div className="pointer-events-none h-16 w-20 rounded-lg border-4 border-dashed border-white"></div>
            <p className="pointer-events-none select-none">
              Click a specific element or click and drag to crop a custom area
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/** ublock origin code
 * @see https://github.com/gorhill/uBlock/blob/3bbed7be330a581d1ddf15c5283aac2864c66620/src/js/scriptlets/element-picker.js#L1262
 */
function elementFromPoint(ev: MouseEvent): HTMLElement | undefined {
  const pickerRoot = document.getElementById("picker-ocean") as HTMLElement

  let x = ev.clientX,
    y = ev.clientY
  let lastX, lastY

  if (x !== undefined && y !== undefined) {
    lastX = x
    lastY = y
  } else if (lastX !== undefined && lastY !== undefined) {
    x = lastX
    y = lastY
  } else return

  pickerRoot.style.setProperty("pointer-events", "none", "important")
  let elem = document.elementFromPoint(x, y)
  if (elem === document.body || elem === document.documentElement) elem = null

  pickerRoot.style.setProperty("pointer-events", "auto", "important")
  return elem as HTMLElement
}

function growDimensions(dims: Dimensions): Dimensions {
  const padding = cropUiPadding()
  return {
    left: dims.left - padding,
    top: dims.top - padding,
    width: dims.width + padding * 2,
    height: dims.height + padding * 2,
  }
}
