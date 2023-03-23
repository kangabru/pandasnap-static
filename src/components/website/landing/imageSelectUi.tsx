import { useEffect, useMemo, useState } from "react"
import {
  animated,
  interpolate,
  OpaqueInterpolation,
  SetUpdateFn,
  useSpring,
  useTrail,
} from "react-spring"
import { RectReadOnly } from "react-use-measure"
import { useGesture } from "react-with-gesture"
import { join } from "@/common/utils"
import { CancelButton, SpinnerButton } from "../common/common"

type Size = { width: number; height: number }
export type Dimensions = Size & { left: number; top: number }
type DimensionArray = [number, number, number, number]
type AbsolutePosition = {
  left?: number
  top?: number
  right?: number
  bottom?: number
}

const cropUiPadding = () => 10 * window.devicePixelRatio

export const opacityMax = 0.4

type CropUiProps = {
  dims: Dimensions
  color?: string
  isSelected: boolean
  opacity: number
  bounds: RectReadOnly
  click: (e: any) => void
  cancel: () => void
}

type DimsAnim = {
  left: OpaqueInterpolation<number>
  top: OpaqueInterpolation<number>
  width: OpaqueInterpolation<number>
  height: OpaqueInterpolation<number>
}

export function CropUi(props: CropUiProps) {
  const [isResizing, setIsResizing] = useState(false)

  const getSpring = useMemo(
    () => ({
      ...(props.dims as Dimensions),
      opacityOverlay: props.opacity,
      opacityResizeUi: props.isSelected ? 1 : 0,
    }),
    [props.dims, props.isSelected, props.opacity]
  )

  const [{ left, top, width, height, opacityOverlay, opacityResizeUi }, set] =
    useSpring(() => getSpring)
  const dims = { left, top, width, height } as DimsAnim

  useEffect(
    () => void set(getSpring),
    [
      props.dims.left,
      props.dims.top,
      props.dims.width,
      props.dims.height,
      props.opacity,
      props.isSelected,
      isResizing,
      set,
      getSpring,
    ]
  )

  return (
    <div
      className={join(
        "absolute inset-0 overflow-visible",
        !props.isSelected && "pointer-events-none"
      )}
    >
      <ResizeText {...{ isResizing, dims }} />
      <BlackOut
        dimsAnim={dims}
        opacity={opacityOverlay as OpaqueInterpolation<number>}
        onClickOcean={props.cancel}
        color={props.color}
        bounds={props.bounds}
      />
      <ResizeUi
        dimsAnim={dims}
        opacity={opacityResizeUi as OpaqueInterpolation<number>}
        setDimsAnim={set}
        dims={props.dims}
        setIsResizing={setIsResizing}
      />
      <Buttons {...props} dimsAnim={dims} visible={props.isSelected} />
    </div>
  )
}

function ResizeText(props: { dims: DimsAnim; isResizing: boolean }) {
  const { left, top, width, height } = props.dims

  const texts = ["This is just a tribute", "Resize in the actual app."]

  const trail = useTrail(texts.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    from: { opacity: 0, y: 20, height: 0 },
    opacity: props.isResizing ? 1 : 0,
    y: props.isResizing ? 0 : 20,
    height: props.isResizing ? 100 : 0,
  })

  return (
    <animated.div
      className="pointer-events-none absolute p-10"
      style={{ top, left, width, height }}
    >
      <div className="col h-full w-full items-center justify-center space-y-1">
        {trail.map(({ opacity, y, height }, index) => (
          <animated.div
            key={texts[index]}
            className="relative py-4 px-6 text-center font-mono text-lg text-black"
            style={{
              opacity,
              transform: (y as OpaqueInterpolation<number>).interpolate(
                (x) => `translate3d(0,${x}px,0)`
              ),
            }}
          >
            <animated.div
              className="absolute inset-0 rounded bg-white shadow"
              style={{
                height: (height as OpaqueInterpolation<number>).interpolate(
                  (h) => `${h}%`
                ),
              }}
            ></animated.div>

            <animated.span
              className="relative select-none"
              style={{
                opacity,
                transform: (y as OpaqueInterpolation<number>).interpolate(
                  (x) => `translate3d(0,${x}px,0)`
                ),
              }}
            >
              {texts[index]}
            </animated.span>
          </animated.div>
        ))}
      </div>
    </animated.div>
  )
}

function Buttons(
  props: Pick<CropUiProps, "bounds" | "cancel" | "click"> & {
    dimsAnim: DimsAnim
    visible: boolean
  }
) {
  const { top: buttonsTop, right: buttonsRight } = getButtonPosition(
    props.dimsAnim,
    props.bounds
  )

  const [saving, setSaving] = useState(false)
  const saveThenClick = (e: any) => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      props.click(e)
    }, 1000)
  }

  const buttons: JSX.Element[] = [
    <CancelButton key="cancel" onClick={props.cancel} />,
    <SpinnerButton
      key="spinner"
      onClick={saveThenClick}
      text={saving ? "Snapping" : "Snap"}
      isLoading={saving}
      className="button button-primary py-2 px-3"
    />,
  ]

  const toggle = props.visible
  const trail = useTrail(buttons.length, {
    opacity: toggle ? 1 : 0,
    y: toggle ? 0 : 40,
  })

  return (
    <animated.div
      className="row absolute z-30 space-x-2"
      style={{ top: buttonsTop, right: buttonsRight }}
    >
      {trail.map(({ y, ...rest }, index) => (
        <animated.div
          key={index}
          style={{
            ...rest,
            transform: (y as OpaqueInterpolation<number>).interpolate(
              (y) => `translate3d(0,-${y}px,0)`
            ),
          }}
        >
          {buttons[index]}
        </animated.div>
      ))}
    </animated.div>
  )
}

export function growDims(dims: Dimensions, grow: boolean): Dimensions {
  const padding = cropUiPadding()
  return grow
    ? {
        left: dims.left - padding,
        top: dims.top - padding,
        width: dims.width + padding * 2,
        height: dims.height + padding * 2,
      }
    : dims
}

function ResizeUi(props: {
  dims: Dimensions
  dimsAnim: DimsAnim
  setDimsAnim: SetUpdateFn<{
    left: number
    top: number
    width: number
    height: number
  }>
  opacity: OpaqueInterpolation<number>
  setIsResizing: (_: boolean) => void
}) {
  const { left: l, top: t, width: w, height: _h } = props.dimsAnim
  const r = interpolate([l, w], (l, w) => l + w)
  const b = interpolate([t, _h], (t, _h) => t + _h)
  const mx = interpolate([l, r], (l, r) => (l + r) / 2)
  const my = interpolate([t, b], (t, b) => (t + b) / 2)

  function Point(ps: {
    style: any
    top?: boolean
    right?: boolean
    bottom?: boolean
    left?: boolean
  }) {
    const bind = useGesture(({ down, delta, distance }) => {
      const { left: l, top: t, width: w, height: _h } = props.dims
      const r = l + w,
        b = t + _h

      const left = l + (ps.left && down ? taper(delta[0]) : 0)
      const top = t + (ps.top && down ? taper(delta[1]) : 0)

      props.setIsResizing(down && distance !== 0)

      props.setDimsAnim({
        left,
        top,
        width: r + (ps.right && down ? taper(delta[0]) : 0) - left,
        height: b + (ps.bottom && down ? taper(delta[1]) : 0) - top,
      })
    })

    return (
      <animated.div
        {...bind()}
        style={ps.style}
        className="absolute -ml-3 -mt-3 h-5 w-5 rounded-full bg-white shadow"
      ></animated.div>
    )
  }

  return (
    <>
      <animated.div
        className="relative z-20"
        style={{ opacity: props.opacity }}
      >
        <Point style={{ left: l, top: t, cursor: "nwse-resize" }} top left />
        <Point style={{ left: r, top: t, cursor: "nesw-resize" }} top right />
        <Point style={{ left: l, top: b, cursor: "nesw-resize" }} bottom left />
        <Point
          style={{ left: r, top: b, cursor: "nwse-resize" }}
          bottom
          right
        />

        <Point style={{ left: mx, top: t, cursor: "ns-resize" }} top />
        <Point style={{ left: r, top: my, cursor: "ew-resize" }} right />
        <Point style={{ left: mx, top: b, cursor: "ns-resize" }} bottom />
        <Point style={{ left: l, top: my, cursor: "ew-resize" }} left />
      </animated.div>
    </>
  )
}

function taper(value: number) {
  return Math.sign(value) * Math.sqrt(Math.abs(value))
}

export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

type BlackOutProps = {
  onClickOcean?: () => void
  onMouseDownSelected?: (e: MouseEvent) => void
  animate?: boolean
  className?: string
}

export function BlackOut(
  props: {
    dimsAnim: DimsAnim
    color?: string
    opacity: OpaqueInterpolation<number>
    bounds: RectReadOnly
    pointerEvents?: boolean
  } & BlackOutProps
) {
  const { left: l, top: t, width: w, height: _h } = props.dimsAnim

  const poly = interpolate([l, t, w, _h], toPath)
  const ocean = poly.interpolate(
    (poly: any) => getOceanPath(props.bounds) + poly
  )

  const { color } = useSpring({ color: props.color ?? "#90cdf4" })

  const height = "200%",
    left = "0",
    width = "100%"
  const topBottom = `calc(-${height} + 1px)`

  const bgImageTop = color.interpolate(
    (c) => `linear-gradient(to top, ${c}, transparent)`
  )
  const bgImageBot = color.interpolate(
    (c) => `linear-gradient(to bottom, ${c}, transparent)`
  )

  return (
    <animated.div
      className={join("absolute inset-0 z-10 h-full w-full")}
      style={{ opacity: props.opacity }}
    >
      {/* Above/below gradients */}
      <animated.div
        className="pointer-events-none absolute"
        style={{
          top: topBottom,
          left,
          width,
          height,
          backgroundImage: bgImageTop,
        }}
      ></animated.div>
      <animated.div
        className="pointer-events-none absolute"
        style={{
          bottom: topBottom,
          left,
          width,
          height,
          backgroundImage: bgImageBot,
        }}
      ></animated.div>

      <animated.svg className="absolute inset-0 h-full w-full">
        <g fillRule="evenodd" fill="black">
          <animated.path
            onClick={props.onClickOcean}
            d={ocean}
            style={{ fill: color }}
          ></animated.path>
          <animated.path
            d={poly}
            className={props.className}
            onMouseDownCapture={props.onMouseDownSelected as any}
            stroke="white"
            strokeWidth="0.3rem"
            strokeDasharray="10"
            fill="rgba(0,0,0,0.1)"
          ></animated.path>
        </g>
      </animated.svg>
    </animated.div>
  )
}

function getOceanPath(bounds: RectReadOnly) {
  const ow = bounds.width
  const oh = bounds.height
  return `M0 0h${ow}v${oh}h-${ow}z`
}

function toPath(_l: number, _t: number, _w: number, _h: number, rad = 5) {
  const left = _l,
    top = _t + rad
  const width = Math.abs(_w - 2 * rad)
  const height = Math.abs(_h - 2 * rad)

  const cornorTL = `a${rad},${rad} 0 0 1 ${rad},-${rad}`
  const cornorTR = `a${rad},${rad} 0 0 1 ${rad},${rad}`
  const cornorBR = `a${rad},${rad} 0 0 1 -${rad},${rad}`
  const cornorBL = `a${rad},${rad} 0 0 1 -${rad},-${rad}`

  return `M${left},${top} ${cornorTL} h${width} ${cornorTR} v${height} ${cornorBR} h-${width} ${cornorBL} v-${height} z`
}

// Place button underneath the crop area to the right
function getButtonPosition(
  dims: DimsAnim,
  bounds: RectReadOnly
): AbsolutePosition {
  const winWidth = bounds.width
  const padding = cropUiPadding()
  return {
    top: interpolate(
      [dims.top, dims.height],
      (top, height) => top + height + padding
    ),
    right: interpolate(
      [dims.left, dims.width],
      (left, width) => winWidth - left - width + padding
    ),
  }
}
