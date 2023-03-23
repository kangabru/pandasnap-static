import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react"
import { Wait } from "./utils"

type HtmlAttrs = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
type ButtonProps = HtmlAttrs & {
  isPrimary?: boolean
  text?: string
  className?: string
}

export function CommonButton(props: ButtonProps) {
  const { isPrimary, className, text, ...rest } = props
  let bgClass = isPrimary
    ? "button button-primary"
    : "button transition-colors duration-100"
  bgClass += text ? " py-2 px-3" : " p-2"
  if (className) bgClass += " " + className
  return (
    <button {...rest} type={props.type ?? "button"} className={bgClass}>
      {text || props.children}
    </button>
  )
}

export function CloseButton(props: HtmlAttrs) {
  return (
    <CommonButton {...props} title="Close">
      <svg
        className="h-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </CommonButton>
  )
}

export function DownloadButton(
  props: Omit<HtmlAttrs, "onClick" | "title"> & {
    onClick: () => Promise<boolean>
  }
) {
  return (
    <ButtonWithConfirm {...props} title="Download">
      <svg
        className="h-5 w-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
    </ButtonWithConfirm>
  )
}

export function CopyButton(
  props: Omit<HtmlAttrs, "onClick" | "title"> & {
    onClick: () => Promise<boolean>
  }
) {
  return (
    <ButtonWithConfirm {...props} title="Copy to clipboard">
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
      </svg>
    </ButtonWithConfirm>
  )
}

function ButtonWithConfirm(
  props: Omit<HtmlAttrs, "onClick"> & { onClick: () => boolean }
) {
  const { onClick, ...rest } = props
  const [clickWithConfirm, confirmState] = useClickConfirmState(onClick)
  return (
    <CommonButton {...rest} className="row" onClick={clickWithConfirm}>
      {/* Show tick on confirm */}
      {confirmState == ConfirmState.success ? (
        <svg
          className="w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : confirmState == ConfirmState.fail ? (
        <svg
          className="w-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ) : (
        props.children
      )}
    </CommonButton>
  )
}

enum ConfirmState {
  normal,
  success,
  fail,
}

/** Handles the confirm state as follows:
 * Normal: Should show default content
 * Success: Shown for at least <delay> milliseconds upon confirmation
 * Fail: Shown for at least <delay> milliseconds upon upon failure
 */
function useClickConfirmState(
  onClick: () => Promise<boolean>,
  delay = 1000
): [() => void, ConfirmState] {
  const [confirmState, setConfirmState] = useState(ConfirmState.normal)
  const clickWithConfirm = async () => {
    setConfirmState(ConfirmState.success)
    try {
      const success = await onClick()
      setConfirmState(success ? ConfirmState.success : ConfirmState.fail)
    } catch (error) {
      setConfirmState(ConfirmState.fail)
    }
    await Wait(delay)
    setConfirmState(ConfirmState.normal)
  }
  return [clickWithConfirm, confirmState]
}

export function SpinnerButton(
  props: Omit<ButtonProps, "text"> & {
    isLoading?: boolean
    useDarkSpinner?: boolean
    text: string
    textLoading?: string
  }
) {
  const { isLoading, text, textLoading, className: className, ...rest } = props
  return (
    <CommonButton
      {...rest}
      className={join(className, "inline-flex items-center")}
    >
      {isLoading && (
        <Spinner
          classColor={props.useDarkSpinner ? "text-gray-900" : undefined}
        />
      )}
      {isLoading ? textLoading ?? text : text}
    </CommonButton>
  )
}

export function Spinner(props: { classSize?: string; classColor?: string }) {
  const cls = "animate-spin -ml-1 mr-2"
  const clsSize = props.classSize ?? "h-5 w-5"
  const clsColor = props.classColor ?? "text-white"
  return (
    <svg
      className={join(cls, clsSize, clsColor)}
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
      ></circle>{" "}
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

type ClassProp = string | boolean | undefined | null
export function join(...classes: ClassProp[]): string {
  return classes.filter((x) => !!x).join(" ")
}

export enum LockSize {
  small,
  base,
}

export function LockIcon(props: { size?: LockSize }) {
  const [isShown, setIsShown] = useState(false)
  const show = () => setIsShown(true),
    hide = () => setIsShown(false)

  const sizeClassTrans =
    props.size == LockSize.small ? "-translate-y-2" : "-translate-y-3"
  const sizeClassIcon = props.size == LockSize.small ? "w-3 h-3" : "w-4 h-4"

  return (
    <div
      className={join(
        "col absolute top-0 right-0 translate-x-1/2 transform",
        sizeClassTrans
      )}
    >
      <div
        onMouseOver={show}
        onMouseLeave={hide}
        className="rounded-full bg-white p-1 shadow"
      >
        <svg
          className={join("text-gray-700", sizeClassIcon)}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      {isShown && (
        <div className="z-10 mt-2 whitespace-nowrap rounded bg-white px-2 py-1 text-sm text-gray-900 shadow">
          Locked Feature
        </div>
      )}
    </div>
  )
}
