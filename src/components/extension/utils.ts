import { useEffect, useLayoutEffect, useRef } from "react"
import { SerializedFormData } from "./types"

export function useKeyUpEffect(
  keyup: (e: KeyboardEvent) => void,
  inputs: any[] = [],
  useIframeDocument: Boolean = false
) {
  useEffect(() => {
    document.addEventListener("keyup", keyup)
    return () => document.removeEventListener("keyup", keyup)
  }, inputs)
}

export function getDownloadName() {
  function pad2(str: number) {
    if ((str + "").length == 1) return "0" + str
    return "" + str
  }
  const date = new Date()
  const year = date.getFullYear(),
    month = pad2(date.getMonth() + 1),
    day = pad2(date.getDate())
  const hour = pad2(date.getHours()),
    minute = pad2(date.getMinutes())
  const timestamp = `${year}-${month}-${day} ${hour}-${minute}.png`
  return "Panda Snap " + timestamp
}

export function seriliaseFormData(data: FormData): SerializedFormData {
  return JSON.stringify([...data.entries()])
}

export function getFormDataFromSerialised(
  data: SerializedFormData,
  transformValue?: (key: string, value: string) => any
): FormData {
  const formData = new FormData()
  const dataList = JSON.parse(data) as [string, string][]
  for (const [key, value] of dataList) {
    const finalValue = transformValue ? transformValue(key, value) : value
    formData.append(key, finalValue)
  }
  return formData
}

// Only allow string or blob properties
type FormDataValue = string | Blob | undefined
export type FormDataKeys<T> = {
  [K in keyof T]: T[K] extends FormDataValue ? T[K] : never
}

// Override FormData and added typed functions
export type TypedFormData<T extends FormDataKeys<T>> = Omit<
  FormData,
  "get" | "set" | "append"
> & {
  get: (key: keyof T) => T[typeof key] | undefined
  set: <K extends keyof T>(key: K, value: T[K]) => void
  append: <K extends keyof T>(key: K, value: T[K]) => void
}

// Return standard form data but wrap with expected types
function TypedFormData<T extends FormDataKeys<T>>(): TypedFormData<T> {
  return new FormData() as any as TypedFormData<T>
}

export function formDatafromObject<T extends FormDataKeys<T>>(
  data: T,
  transformValue?: (key: string, value: FormDataValue) => FormDataValue
): TypedFormData<T> {
  const formData = new FormData()
  for (const [key, value] of Object.entries(data) as [
    string,
    FormDataValue
  ][]) {
    const finalValue = transformValue ? transformValue(key, value) : value
    finalValue && formData.append(key, finalValue)
  }
  return formData as any as TypedFormData<T>
}

// jimbob => Jimbob
export function nameCase(str: string | undefined) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
}

export function useFocusInputRef(
  onLoadExtra?: (ref: React.Ref<HTMLInputElement>) => void
) {
  const inputRef = useRef<HTMLInputElement>()
  useLayoutEffect(() => {
    const focus = () => {
      inputRef.current?.focus && inputRef.current.focus()
      onLoadExtra && onLoadExtra(inputRef as any)
    }
    focus()
    setTimeout(focus, 300)
  }, [])
  return inputRef
}

export function dataToBlobURL(dataUrl: string): string {
  /****************************************************************************************************
   * Converts a data:// URL (i.e. `canvas.toDataURL("image/png")`) to a blob:// URL.
   * This allows a shorter URL and a simple management of big data objects.
   *
   * Contributor: Ben Ellis <https://github.com/ble>
   */
  var blob = dataToBlob(dataUrl)
  return blob ? window.URL.createObjectURL(blob) : ""
}

export function dataToBlob(dataUrl: string): Blob | undefined {
  const bufferInfo = dataToArrayBuffer(dataUrl)

  if (bufferInfo) {
    const { parts, view } = bufferInfo
    // Create blob with mime type, create URL for it
    return new Blob([view], { type: parts[1] })
  }
}

export function dataToArrayBuffer(dataUrl: string) {
  var parts = dataUrl.match(/data:([^]*)(base64)?,([0-9A-Za-z+/]+)/)

  if (parts && parts.length >= 3) {
    // Assume base64 encoding
    var binStr = atob(parts[3])

    // Convert to binary in ArrayBuffer
    var buf = new ArrayBuffer(binStr.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i < view.length; i++) view[i] = binStr.charCodeAt(i)

    return { parts, buf, view }
  }
}

export function Wait(timeout: number, ...args: any[]) {
  return new Promise((accept) => setTimeout(accept, timeout, ...args))
}

export function GetClientWidth() {
  const body = window.document.body
  return Math.max(body.scrollWidth, body.offsetWidth, body.clientWidth) // jquery method
}

// Delay promises so users think stuff is working
export function DelayedPromise<T>(
  func: () => Promise<T>,
  instant?: boolean
): Promise<T> {
  const futureRanDelay = instant ? Promise.resolve() : randDelay()
  return Promise.all([func(), futureRanDelay]).then(([result]) => result)
}

function randDelay(delayMin = 1000, delayMax = 1500) {
  const delay = delayMin + Math.random() * (delayMax - delayMin)
  return new Promise<null>((accept) => setTimeout(accept, delay))
}

export function openExperiment() {
  console.log("EXPERIMENT")
}
