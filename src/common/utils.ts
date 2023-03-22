import { DependencyList, useEffect, useRef, useState } from "react"
import { KeyCode } from "./constants"

// jimbob => Jimbob
export function nameCase(str: string | undefined) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
}

export function useKeyUpEffect(
  keyup: (e: KeyboardEvent) => void,
  isActive: boolean = true
) {
  useDocumentListener("keyup", (e: KeyboardEvent) => isActive && keyup(e), [
    isActive,
  ])
}

export function useDocumentListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  inputs?: DependencyList
) {
  useEffect(() => {
    document.addEventListener(type, listener)
    return () => document.removeEventListener(type, listener)
  }, inputs)
}

export function useOnEscape(
  onEscape: (e: KeyboardEvent) => void,
  isActive: boolean = true
) {
  useKeyUpEffect((e) => e.keyCode == KeyCode.escape && onEscape(e), isActive)
}

export function useFocusInputRef() {
  const inputRef = useRef<HTMLInputElement>()
  useEffect(() => inputRef.current?.focus(), [])
  return inputRef
}

type ClassProp = string | boolean | undefined | null
export function join(...classes: ClassProp[]): string {
  return classes.filter((x) => !!x).join(" ")
}

/** Returns a bool state with 'off' and 'on' functions (in that order).
 * @example
 * const [isOpen, close, open] = useBoolState()
 */
export function useBoolState(
  initState: boolean = false
): [boolean, () => void, () => void] {
  const [state, setState] = useState(initState)
  const turnOff = () => setState(false)
  const turnOn = () => setState(true)
  return [state, turnOff, turnOn]
}

/** A simple promise to wait for the specified amount of time */
export function Wait(timeout: number, ...args: any[]) {
  return new Promise((accept) => setTimeout(accept, timeout, ...args))
}
