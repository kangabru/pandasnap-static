"use client"

import { useState } from "react"
import useMeasure from "react-use-measure"
import { useOnEscape } from "../../common/utils"
import { SnappedImage } from "./imageForm"
import {
  clamp,
  CropUi,
  Dimensions,
  growDims,
  opacityMax,
} from "./imageSelectUi"
import {
  idScroll2,
  imageSelect1,
  imageSelect2,
  imageSelect3,
  renderImageForm,
  scrollToElement,
  setImage,
} from "./index"

type ImageItem = { mode: SnappedImage; url: string; color: string }

export default function ImageSelect() {
  const [containerRef, bounds] = useMeasure({ scroll: true })

  const items: ImageItem[] = [
    { mode: SnappedImage.elem1, url: imageSelect1, color: "#fbd38d" }, // orange-300
    { mode: SnappedImage.elem2, url: imageSelect2, color: "#d6bcfa" }, // purple-300
    { mode: SnappedImage.elem3, url: imageSelect3, color: "#6de89c" }, // green-300
  ]

  const [modeHover, setModeHover] = useState<SnappedImage>()
  const [mode, setMode] = useState<SnappedImage>()
  const isSelected = !!mode

  const hoverOrSelectedItem = items.find((x) =>
    mode ? x.mode === mode : x.mode === modeHover
  )

  const [hovered, setHovered] = useState<HTMLDivElement>()
  const hover = (mode: SnappedImage) => (e: any) => {
    setModeHover(mode)
    setHovered(e.target as HTMLDivElement)
  }

  const cancel = () => setMode(undefined)
  const clickOne = (mode: SnappedImage) => (e: any) => {
    e.stopPropagation()
    setMode(mode)
  }
  const clickTwo = (e: any) => {
    e.stopPropagation()
    mode && renderImageForm(mode)
    mode && hoverOrSelectedItem && setImage(hoverOrSelectedItem.url)
    scrollToElement(idScroll2)
    setHovered(undefined)
    setMode(undefined)
  }

  useOnEscape(() => setMode(undefined))

  const dimsSelect = hovered?.getBoundingClientRect()
  const dims: Dimensions = growDims(
    {
      left: (dimsSelect?.left ?? 0) - (bounds.left ?? 0),
      top: (dimsSelect?.top ?? 0) - (bounds.top ?? 0),
      width: dimsSelect?.width ?? 0,
      height: dimsSelect?.height ?? 0,
    },
    isSelected
  )

  const opacity = getOpacity(bounds)

  return (
    <div ref={containerRef} className="relative overflow-visible py-10">
      <CropUi
        dims={dims}
        isSelected={isSelected}
        bounds={bounds}
        click={clickTwo}
        cancel={cancel}
        color={hoverOrSelectedItem?.color}
        opacity={opacity}
      />
      <div className="row container mx-auto mt-10 flex-wrap justify-center">
        {items.map((i) => (
          <div
            key={i.url}
            onClick={clickOne(i.mode)}
            onMouseOver={hover(i.mode)}
            className="m-3 w-full cursor-pointer overflow-hidden rounded-lg border-1 border-gray-400 shadow-lg focus:outline-none sm:w-90"
          >
            <div
              style={{ backgroundImage: `url('${i.url}')` }}
              className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-cover bg-top"
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getOpacity(bounds: { top: number; height: number }) {
  const pos = window.innerHeight / 2
  const top = bounds.top,
    height = bounds.height

  const dist = 400

  const aboveTop = top - dist
  const aboveBot = top
  const belowTop = top + height
  const belowBot = top + height + dist

  let opac = 0
  if (aboveTop < pos && pos < aboveBot) {
    opac = (pos - aboveTop) / dist
  } else if (aboveBot < pos && pos < belowTop) {
    opac = 1
  } else if (belowTop < pos && pos < belowBot) {
    opac = 1 - (pos - belowTop) / dist
  }

  return clamp(0, opac, 1) * opacityMax
}
