import { screenshotError } from "./message"
import ImageUi from "./uiImage"
import { GetClientWidth } from "./utils"

export type Size = { width: number; height: number }
export type Dimensions = Size & { left: number; top: number }
export type AbsolutePosition = {
  left?: number
  top?: number
  right?: number
  bottom?: number
}

/** Request and listen for the screenshot page action */
export function screenshotPage() {
  console.log("Screenshot pag")
  // RenderImageUi(response.data.dataUrl)
}

/** Request and listen for the screenshot screen action */
export async function screenshotVisible() {
  console.log("SCREENSHOT IMAGE")
  const dataUrl = undefined as any
  const ratio = window.devicePixelRatio

  if (dataUrl) {
    // Remove the scroll bar. Note that Firefox applies the ratio by default so ignore it here and only apply to Chrome.
    const domWidth = GetClientWidth()
    const crop: Partial<Dimensions> = { width: domWidth * ratio }
    // await cropImage(dataUrl, crop).then(RenderImageUi)
  } else {
    alert(screenshotError)
  }
}

export async function screenshotElementFromCropUi(crop: Dimensions) {
  const ratio = window.devicePixelRatio

  crop.top *= ratio
  crop.left *= ratio
  crop.width *= ratio
  crop.height *= ratio

  console.log("SCREENSHOT IMAGE")
  const dataUrl = undefined as any

  if (dataUrl) {
    const dataUrlCrop = await cropImage(dataUrl, crop)
    // RenderImageUi(dataUrlCrop)
    return Promise.resolve()
  } else {
    alert(screenshotError)
    return Promise.reject(screenshotError)
  }
}

function cropImage(dataUrl: string, crop: Partial<Dimensions>) {
  return new Promise<string>(function (accept, reject) {
    const img = new Image()
    img.src = dataUrl
    img.onerror = reject
    img.onload = function () {
      const width = crop?.width ?? img.width
      const height = crop?.height ?? img.height

      const widthFinal = width / devicePixelRatio
      const heightFinal = height / devicePixelRatio

      var canvas = document.createElement("canvas")
      ;(canvas.width = widthFinal), (canvas.height = heightFinal)

      canvas
        .getContext("2d")
        ?.drawImage(
          this as HTMLImageElement,
          crop.left || 0,
          crop.top || 0,
          width,
          height,
          0,
          0,
          widthFinal,
          heightFinal
        )

      accept(canvas.toDataURL())
    }
  })
}

export function getElementDimensionsForCropUi(
  elem: HTMLElement,
  padding: number = 0
): Dimensions {
  const dimensions: Dimensions = { top: 0, left: 0, width: 0, height: 0 }

  const offset = getOffset(elem)
  dimensions.top += offset?.top as number
  dimensions.left += offset?.left as number

  dimensions.width += elem.offsetWidth
  if (dimensions.left < 0) dimensions.width += dimensions.left

  dimensions.height += elem.offsetHeight
  if (dimensions.top < 0) dimensions.height += dimensions.top

  dimensions.top -= padding
  dimensions.left -= padding
  dimensions.width += 2 * padding
  dimensions.height += 2 * padding

  dimensions.top = Math.max(0, dimensions.top)
  dimensions.left = Math.max(0, dimensions.left)
  dimensions.width = Math.max(0, dimensions.width)
  dimensions.height = Math.max(0, dimensions.height)

  return dimensions
}

function getOffset(elem: HTMLElement) {
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 }
  }

  let rect = elem.getBoundingClientRect()
  let win = elem.ownerDocument.defaultView as Window
  return {
    top: rect.top + win.scrollY,
    left: rect.left + win.scrollX,
  }
}
