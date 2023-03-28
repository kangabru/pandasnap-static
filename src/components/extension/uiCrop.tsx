import { useEffect, useState } from "react"
import useMeasure from "react-use-measure"
import { KeyCode } from "./constants"
import { CloseButton, CommonButton, join, LockIcon, LockSize } from "./uiCommon"
import { useKeyUpEffect, useOpenExperiment } from "./utils"

export type Size = { width: number; height: number }
export type Dimensions = Size & { left: number; top: number }
export type AbsolutePosition = {
  left?: number
  top?: number
  right?: number
  bottom?: number
}

export function cropUiPadding() {
  return 10 * window.devicePixelRatio
}

export function CropUi(props: {
  initCrop: Dimensions
  reselect: () => void
  screenshot: (d: Dimensions) => void
  closeUi: () => void
}) {
  useKeyUpEffect(
    (e: KeyboardEvent) => {
      e.keyCode == KeyCode.escape && props.closeUi()
    },
    [],
    true
  )

  const [bind, { width, height }] = useMeasure({ scroll: true })
  const winSize = { width, height }

  // useMeasure doesn't update on Firefox until scrolling occurs
  useEffect(() => {
    window.scrollBy({ top: 1 })
    window.scrollBy({ top: -1 })
  }, [])

  const [dimsState, setDimsRaw] = useState<Dimensions>(props.initCrop)
  const setDims = (dim: Dimensions) =>
    setDimsRaw(getBoundedDimensions(winSize, dim))

  const [isDrag, setIsDrag] = useState(false)
  const [dragDimDiff, startDrag, moveDrag, stopDrag] = useDragBox(
    dimsState,
    setDims
  )
  const [resizeDimDiff, startResize, moveResize, stopResize] = useResizeBox(
    dimsState,
    setDims
  )

  const dims = getBoundedDimensions(
    winSize,
    addDims(addDims(dimsState, dragDimDiff), resizeDimDiff)
  )

  const startDragging = (e: MouseEvent) => {
    startDrag(e)
    setIsDrag(true)
  }
  const ezFunc =
    (dragFunc: MouseFunc, resizeFunc: MouseFunc) => (e: MouseEvent) =>
      isDrag ? dragFunc(e) : resizeFunc(e)
  const stop = (e: MouseEvent) => {
    ezFunc(stopDrag, stopResize)(e)
    setIsDrag(false)
  }

  const buttonPosTop = getButtonPosition(winSize, dims, true)
  const buttonPosBot = getButtonPosition(winSize, dims, false)

  const openExperiment = useOpenExperiment()

  return (
    <div ref={bind} className="h-screen w-screen">
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ width, height }}
        onMouseMove={ezFunc(moveDrag, moveResize) as any}
        onMouseUp={stop as any}
        onMouseLeave={stop as any}
      >
        <BlackOut
          dimensions={dims}
          onClickOcean={props.closeUi}
          onMouseDownSelected={startDragging}
          className="cursor-move"
        />
        <ResizeUi dims={dims} startResize={startResize} />

        <div className="row absolute space-x-2" style={buttonPosTop as any}>
          <CommonButton onClick={props.reselect} title="Re-snap">
            <svg
              className="text-dark h-5 w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r=".5" fill="currentColor" />
              <circle cx="12" cy="12" r="7" />
              <line x1="12" y1="3" x2="12" y2="5" />
              <line x1="3" y1="12" x2="5" y2="12" />
              <line x1="12" y1="19" x2="12" y2="21" />
              <line x1="19" y1="12" x2="21" y2="12" />
            </svg>
          </CommonButton>
          <CloseButton onClick={props.closeUi} className="text-red-600" />
        </div>

        <div
          className="row absolute flex-row-reverse"
          style={buttonPosBot as any}
        >
          <CommonButton
            isPrimary
            className="row space-x-1 px-3"
            onClick={() => props.screenshot(dims)}
          >
            <svg
              className="h-5 w-5 translate-y-px -translate-x-px transform"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Snap</span>
          </CommonButton>

          <div className="relative mx-3">
            <CommonButton
              className="row relative space-x-1 px-3"
              onClick={openExperiment}
            >
              <svg
                className="h-5 w-5 translate-y-px -translate-x-px transform text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              <span>Rec</span>
            </CommonButton>
            <LockIcon size={LockSize.small} />
          </div>

          <div className="relative">
            <CommonButton
              className="row space-x-1 px-3"
              onClick={openExperiment}
            >
              <svg
                className="h-5 w-5 translate-y-px -translate-x-px transform text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
              <span>Snip</span>
            </CommonButton>
            <LockIcon size={LockSize.small} />
          </div>
        </div>
      </div>
    </div>
  )
}

function addDims(dims1: Dimensions, dims2: Dimensions): Dimensions {
  return {
    left: dims1.left + dims2.left,
    top: dims1.top + dims2.top,
    width: dims1.width + dims2.width,
    height: dims1.height + dims2.height,
  }
}

function ResizeUi(props: { dims: Dimensions; startResize: ResizeFunc }) {
  const dims = props.dims
  const l = dims.left,
    t = dims.top
  const r = dims.left + dims.width,
    b = dims.top + dims.height
  const mx = (l + r) / 2,
    my = (t + b) / 2

  function Point(ps: {
    style: any
    top?: boolean
    right?: boolean
    bottom?: boolean
    left?: boolean
  }) {
    return (
      <div
        style={ps.style}
        className="absolute -ml-3 -mt-3 h-5 w-5 rounded-full bg-white shadow"
        onMouseDown={(e) =>
          props.startResize(ps.top, ps.right, ps.bottom, ps.left)(e as any)
        }
      ></div>
    )
  }

  return (
    <div>
      <Point style={{ left: l, top: t, cursor: "nwse-resize" }} top left />
      <Point style={{ left: r, top: t, cursor: "nesw-resize" }} top right />
      <Point style={{ left: l, top: b, cursor: "nesw-resize" }} bottom left />
      <Point style={{ left: r, top: b, cursor: "nwse-resize" }} bottom right />

      <Point style={{ left: mx, top: t, cursor: "ns-resize" }} top />
      <Point style={{ left: r, top: my, cursor: "ew-resize" }} right />
      <Point style={{ left: mx, top: b, cursor: "ns-resize" }} bottom />
      <Point style={{ left: l, top: my, cursor: "ew-resize" }} left />
    </div>
  )
}

function getButtonPosition(
  winSize: Size,
  dims: Dimensions,
  isAbove: boolean
): AbsolutePosition {
  const minGap = 80

  const padding = cropUiPadding()

  const { width: winWidth, height: winHeight } = winSize
  const { top, left, width, height } = dims
  const bottom = winHeight - top - height

  // Place buttons to the right of the crop area
  const right = winWidth - left - width + padding

  // Place button at the top right of the crop area
  const aboveInside: AbsolutePosition = { right, top: top + padding }
  const aboveOutside: AbsolutePosition = {
    right,
    bottom: bottom + height + padding,
  }
  const belowInside: AbsolutePosition = {
    right,
    bottom: bottom + padding,
  }
  const belowOutside: AbsolutePosition = {
    right,
    top: top + height + padding,
  }

  const closeToTop = top < minGap,
    closeToBottom = bottom < minGap

  return isAbove
    ? closeToTop
      ? aboveInside
      : aboveOutside
    : closeToBottom
    ? belowInside
    : belowOutside
}

function getBoundedDimensions(winSize: Size, dimsRaw: Dimensions): Dimensions {
  let dims = {
    left: dimsRaw.left,
    top: dimsRaw.top,
    width: dimsRaw.width,
    height: dimsRaw.height,
  }

  // Ensure it fits in window
  dims.width = Math.min(winSize.width, dimsRaw.width)
  dims.height = Math.min(winSize.height, dimsRaw.height)

  // Keep within window
  dims.left = Math.max(0, Math.min(winSize.width - dims.width, dimsRaw.left))
  dims.top = Math.max(0, Math.min(winSize.height - dims.height, dimsRaw.top))

  // Account for negative sizes
  if (dimsRaw.width < 0) {
    dims.left += dimsRaw.width
    dims.width = -dimsRaw.width
  }
  if (dimsRaw.height < 0) {
    dims.top += dimsRaw.height
    dims.height = -dimsRaw.height
  }

  return dims
}

type Func = () => void
type MouseFunc = (e: MouseEvent) => void
type DimFunc = (dims: Dimensions) => void

type CoordsXY = { x: number; y: number }

/** Uses a drag point and manipulates your object with the drag coordinates.
 * getResult: Return the diff object based on the drag coords.
 * getResult: Return the final object based on the drag coords.
 */
function useDrag<TResult>(
  getResult: (dims: CoordsXY) => TResult,
  setResult: (result: TResult) => void
): [TResult, MouseFunc, MouseFunc, Func] {
  const zero: CoordsXY = { y: 0, x: 0 }
  const [isMoving, setIsMoving] = useState(false)
  const [coordsStart, setCoordsStart] = useState<CoordsXY>(zero)
  const [coordsMove, setCoordsMove] = useState<CoordsXY>(zero)

  const dCoords = {
    x: coordsMove.x - coordsStart.x,
    y: coordsMove.y - coordsStart.y,
  }
  const resultDiff = getResult(dCoords)

  const getCoords = (e: MouseEvent) => ({ x: e.clientX, y: e.clientY })
  const start = (e: MouseEvent) => {
    setCoordsStart(getCoords(e))
    setCoordsMove(getCoords(e))
    setIsMoving(true)
    e.stopPropagation()
  }
  const move = (e: MouseEvent) => isMoving && setCoordsMove(getCoords(e))
  const stop = () => {
    setIsMoving(false)
    setResult(resultDiff)
    setCoordsStart(zero) // reset
    setCoordsMove(zero) // reset
  }

  return [resultDiff, start, move, stop]
}

function useDragBox(
  dims: Dimensions,
  setDims: (dims: Dimensions) => void
): [Dimensions, MouseFunc, MouseFunc, Func] {
  return useDrag(
    (c) => ({ left: c.x, top: c.y, width: 0, height: 0 }),
    (dimDiff) => setDims(addDims(dims, dimDiff))
  )
}

type ResizeFunc = (
  top?: boolean,
  right?: boolean,
  bottom?: boolean,
  left?: boolean
) => MouseFunc
function useResizeBox(
  dims: Dimensions,
  setDims: DimFunc
): [Dimensions, ResizeFunc, MouseFunc, Func] {
  const [sides, setSides] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  })
  const [newDims, start, move, end] = useDrag(
    (dCoords) => getResizesDim(dCoords, sides),
    (dimDiff) => setDims(addDims(dims, dimDiff))
  )

  const newStart = (
    top?: boolean,
    right?: boolean,
    bottom?: boolean,
    left?: boolean
  ) => {
    if (
      sides.left != left ||
      sides.top != top ||
      sides.right != right ||
      sides.bottom != bottom
    )
      setSides({ left: !!left, top: !!top, right: !!right, bottom: !!bottom })
    return start
  }

  return [newDims, newStart, move, end]
}

function getResizesDim(
  dCoords: CoordsXY,
  sides: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean }
): Dimensions {
  const newDims: Dimensions = { left: 0, top: 0, width: 0, height: 0 }

  if (sides.left) {
    newDims.left += dCoords.x
    newDims.width -= dCoords.x
  }

  if (sides.top) {
    newDims.top += dCoords.y
    newDims.height -= dCoords.y
  }

  if (sides.right) newDims.width += dCoords.x
  if (sides.bottom) newDims.height += dCoords.y

  return newDims
}

type BlackOutProps = {
  onClickOcean?: () => void
  onMouseDownSelected?: (e: MouseEvent) => void
  animate?: boolean
  className?: string
}

export function BlackOut(
  props: { dimensions: Dimensions | undefined } & BlackOutProps
) {
  const ocean = getOceanPath(),
    poly = toPath(props.dimensions)
  return (
    <>
      <svg className="fixed inset-0 h-full w-full">
        <g fillRule="evenodd" fill="black">
          <path
            onClick={props.onClickOcean}
            className={join(props.animate && "transition-all duration-75")}
            d={ocean + " " + poly}
            fill="rgba(0,0,0,0.5)"
          ></path>
          {props.dimensions && (
            <path
              className={join(
                props.animate && "transition-all duration-75",
                props.className
              )}
              d={poly}
              onMouseDown={props.onMouseDownSelected as any}
              stroke="white"
              strokeWidth="0.3rem"
              strokeDasharray="10"
              fill="rgba(0,0,0,0.1)"
            ></path>
          )}
        </g>
      </svg>
    </>
  )
}

function getOceanPath() {
  const ow = window?.innerWidth ?? 0
  const oh = window?.innerHeight ?? 0
  return `M0 0h${ow}v${oh}h-${ow}z`
}

function toPath(rect: Dimensions | undefined, rad = 5) {
  if (!rect) return ""
  const left = rect.left,
    top = rect.top + rad
  const width = Math.max(0, rect.width - 2 * rad)
  const height = Math.max(0, rect.height - 2 * rad)

  const cornorTL = `a${rad},${rad} 0 0 1 ${rad},-${rad}`
  const cornorTR = `a${rad},${rad} 0 0 1 ${rad},${rad}`
  const cornorBR = `a${rad},${rad} 0 0 1 -${rad},${rad}`
  const cornorBL = `a${rad},${rad} 0 0 1 -${rad},-${rad}`

  return `M${left},${top} ${cornorTL} h${width} ${cornorTR} v${height} ${cornorBR} h-${width} ${cornorBL} z`
}

export function getElementDimensions(elem: HTMLElement) {
  return elem ? (elem.getBoundingClientRect() as Dimensions) : undefined
}
