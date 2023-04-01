import { join, useOnEscape } from "@/common/utils"
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import TagSelectOg from "../tags/tagSelect"

type HtmlAttrsButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
type HtmlAttrsDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
type HtmlAttrsInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function ClickProtector(
  props: Omit<HtmlAttrsDiv, "onClick"> & { onClick?: (_: any) => void }
) {
  const onClick = (e: any) => {
    e.stopPropagation()
    props.onClick && props.onClick(e)
  }
  return <div {...{ ...props, onClick }}></div>
}

function CommonButton(
  props: HtmlAttrsButton & {
    isPrimary?: boolean
    text?: string
    className?: string
  }
) {
  let bgClass = props.isPrimary ? "button button-primary" : "button"
  bgClass += props.text ? " py-2 px-3" : " p-2"
  if (props.className) bgClass += " " + props.className
  return (
    <button
      {...props}
      type={props.type ?? ("button" as any)}
      className={bgClass}
    >
      {props.text || props.children}
    </button>
  )
}

function EditButton(props: { onClick: () => void }) {
  return (
    <button title="Edit" className="button p-2" onClick={props.onClick}>
      {icons.edit()}
    </button>
  )
}

export function SaveButton(props: {
  onClick?: () => void
  isLoading: boolean
  tabIndex?: number
  text?: string
  textLoading?: string
}) {
  const text = props.text ?? "Save"
  const textLoading = props.textLoading ?? "Saving"
  return (
    <SpinnerButton
      onClick={props.onClick}
      button={{ title: text, tabIndex: props.tabIndex }}
      type="submit"
      text={props.isLoading ? textLoading : text}
      isLoading={props.isLoading}
      className="button button-primary py-2 px-3"
    />
  )
}

export function CancelButton(props: {
  onClick: () => void
  tabIndex?: number
}) {
  return (
    <button
      title="Cancel"
      type="button"
      tabIndex={props.tabIndex}
      className="button p-2"
      onClick={props.onClick}
    >
      {icons.cross()}
    </button>
  )
}

export function Errors(props: { errors?: string }) {
  return props.errors ? (
    <span className="text-lg text-red-600">{props.errors}</span>
  ) : null
}

export function FloatingWindow(props: {
  children: any
  onClose: () => void
  canClose?: boolean
}) {
  useOnEscape(props.onClose, props.canClose ?? true)

  const stop = (e: any) => {
    e.stopPropagation()
    e.stopImmediatePropagation?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={props.onClose}
    >
      <div className="col fixed inset-0 mx-auto max-w-3xl justify-center p-10">
        <div
          className="pointer-events-auto max-h-full rounded-lg bg-gray-200 shadow-lg"
          onClick={stop}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

type SpinnerButtonType = "submit" | "button"

export function SpinnerButton(props: {
  button?: HtmlAttrsButton
  isLoading?: boolean
  disabled?: boolean
  text: string
  className?: string
  type?: SpinnerButtonType
  onClick?: (e: any) => void
}) {
  return (
    <button
      {...props.button}
      type={props.type ?? "button"}
      disabled={props.isLoading || props.disabled}
      className={(props.className || "") + " inline-flex items-center"}
      onClick={props.onClick}
    >
      {props.isLoading && icons.spinner()}
      {props.text}
    </button>
  )
}

type StatefulInputProps = {
  initValue?: string
  postInput?: (value: string) => void
} & Omit<HtmlAttrsInput, "ref" | "value" | "autofocus" | "onInput">

function StatefulInput(
  props: StatefulInputProps,
  _ref?: React.Ref<HTMLInputElement>
) {
  const { initValue, className, postInput, ...rest } = props
  const [value, setValue] = useState(initValue || "")
  useEffect(() => void setValue(initValue || ""), [initValue])
  return (
    <input
      {...rest}
      ref={_ref}
      value={value}
      className={className ?? "form-input"}
      onInput={(e) => {
        const newValue = (e.target as HTMLInputElement).value
        setValue(newValue)
        postInput?.(newValue)
      }}
    />
  )
}

export const StatefulInputWithRef = forwardRef<
  HTMLInputElement,
  StatefulInputProps
>(StatefulInput)

type BoolState<T> = { [K in keyof T]: boolean }

/** A state which maintains a single bool as true */
function useOneBoolState<T>(
  init: keyof T,
  values: (keyof T)[]
): [BoolState<T>, (key: keyof T) => void] {
  const initState = values.reduce(
    (newState, k) => ({ ...newState, [k]: false }),
    {}
  ) as BoolState<T>
  initState[init] = true
  const [state, setState] = useState(initState)
  const setBool = (key: keyof T) => {
    const newState = Object.keys(state).reduce(
      (newState, k) => ({ ...newState, [k]: false }),
      {}
    ) as BoolState<T>
    newState[key] = true
    setState(newState)
  }
  return [state, setBool]
}

async function apiFetchTags() {
  return Promise.resolve({ success: true, tags: [] as any })
}

function apiCreateTags(): any {
  return (_: FormData) => Promise.resolve({ success: true, tag: {} as any })
}

export function TagSelect(props: any) {
  return TagSelectOg({
    ...props,
    fetchTags: apiFetchTags,
    createTag: apiCreateTags(),
  } as any)
}

export const icons = {
  link: (cls = "w-5 h-5") => (
    <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  cross: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  image: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  ),
  spinner: (cls = "-ml-1 mr-2 h-5 w-5 text-white") => (
    <svg
      className={join("animate-spin", cls)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ),
  trash: (cls = "w-5 h-5") => (
    <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  edit: (cls = "w-5 h-5") => (
    <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  home: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
  ),
  user: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  logout: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  admin: (cls = "w-5 h-5") => (
    <svg
      className={cls}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
    </svg>
  ),
}

function useResizableTextArea(): [
  string,
  MutableRefObject<HTMLTextAreaElement | undefined>
] {
  const [text, setText] = useState("")
  const textRef = useRef<HTMLTextAreaElement>()

  useLayoutEffect(() => {
    const update = (e: any) => setText((e.target as HTMLTextAreaElement)?.value)
    const ref = textRef.current
    ref?.addEventListener("input", update)
    ref?.addEventListener("keydown", textAreaResize)
    ref?.addEventListener("keyup", textAreaResize)
    return () => {
      ref?.removeEventListener("input", update)
      ref?.removeEventListener("keydown", textAreaResize)
      ref?.removeEventListener("keyup", textAreaResize)
    }
  })

  return [text, textRef as any]
}

function textAreaResize(e: any) {
  var el = e.target
  if (!el) return
  el.style.height = ""
  el.style.height = `${el.scrollHeight}px`
  el.focus()
}
