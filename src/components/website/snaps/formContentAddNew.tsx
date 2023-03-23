import { KeyCode, urls } from "@/common/constants"
import { useFocusInputRef } from "@/common/utils"
import { useLayoutEffect, useRef, useState } from "react"
import {
  CancelButton,
  Errors,
  FloatingWindow,
  icons,
  SaveButton,
  StatefulInputWithRef,
  TagSelect,
} from "../common/common"
import { useForm } from "../common/formUtils"
import { useRandomMessage } from "../message"

enum FormState {
  Closed,
  Open,
  Saved,
}

/** Provides state managers for the add form. This will render the popup form but won't doesn't render button to open the form. */
export function useContentAddForm(
  onSuccess?: (data?: FormData) => void
): [JSX.Element, FormState, () => void, () => void] {
  const [state, setState] = useState(FormState.Closed)
  const open = () => setState(FormState.Open)
  const close = () => setState(FormState.Closed)

  const [formData, setResponse] = useState<FormData>()

  const onSave = (e: any) => {
    const formData = new FormData(e.target)
    setResponse(formData)
    setState(FormState.Saved)
  }
  const onSavedClose = () => {
    onSuccess && onSuccess(formData)
    close()
  }

  const element =
    state == FormState.Saved ? (
      <SavedPopup onClose={onSavedClose} />
    ) : state == FormState.Open ? (
      <AddForm cancel={close} onSuccess={onSave as any} />
    ) : (
      <></>
    )
  return [element, state, open, close]
}

export function ContentAddFormButton(props: {
  onSuccess?: (e?: FormData) => void
}) {
  const [element, state, open] = useContentAddForm(props.onSuccess)
  return state == FormState.Closed ? (
    <AddButton onClick={open} />
  ) : (
    <div>
      <AddButton onClick={open} />
      {element}
    </div>
  )
}

function AddButton(props: { onClick: () => void }) {
  return (
    <button
      className="button rounded opacity-75 hover:opacity-100"
      title="Add snap"
      onClick={props.onClick}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="4 4 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </button>
  )
}

const saveConfirmMessages = ["Woohoo", "Saved", "Great success"]

function SavedPopup(props: { onClose: () => void }) {
  const confirmMessage = useRandomMessage(saveConfirmMessages)
  setTimeout(props.onClose, 1000)
  return (
    <FloatingWindow onClose={props.onClose}>
      <div className="row space-x-3 p-5 text-3xl text-gray-800">
        <span>{confirmMessage}</span>
        <span className="-mt-2">👍</span>
      </div>
    </FloatingWindow>
  )
}

function AddForm(props: { cancel: () => void; onSuccess: () => void }) {
  const { submit, formState } = useForm(urls.contentNew, props.onSuccess)

  const titleRef = useFocusInputRef()
  const onFileChange = () => titleRef?.current?.focus()

  return (
    <FloatingWindow onClose={props.cancel} canClose>
      <form
        className="col max-h-full w-full items-start space-y-2 p-3"
        onSubmit={(e) => submit(e as any)}
      >
        <div className="row w-full justify-between space-x-2">
          <label className="flex-1 leading-none">
            <StatefulInputWithRef
              ref={titleRef as any}
              name="name"
              type="text"
              placeholder="Title"
              maxLength={100}
              className="button-outline form-input w-full"
              tabIndex={1}
            />
          </label>
          <CancelButton onClick={props.cancel} tabIndex={4} />
          <SaveButton isLoading={formState.isLoading} tabIndex={5} />
        </div>
        <label className="w-full">
          <TagSelect isDisabled={formState.isLoading} tabIndex={2} />
        </label>
        <Errors errors={formState.errors} />
        <ImageSelect
          openFileSelectOnStart={true}
          onFileChange={onFileChange}
          tabIndex={3}
        />
      </form>
    </FloatingWindow>
  )
}

function ImageSelect(props: {
  openFileSelectOnStart?: boolean
  tabIndex?: number
  onFileChange?: () => void
}) {
  const ref = useRef<HTMLInputElement>()
  const [image, setImage] = useState("")

  const openFileSelect = () => {
    props.openFileSelectOnStart && ref.current?.click()
  }
  useLayoutEffect(openFileSelect, [props.openFileSelectOnStart])

  const loadImage = async (e: any) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files && files.length) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (ie) => setImage(ie.target?.result as string)
      reader.readAsDataURL(file)
    }

    props.onFileChange && props.onFileChange()
  }

  return (
    <div className="col scrollbar w-full justify-center overflow-y-auto overscroll-contain">
      <label
        htmlFor="id_image"
        tabIndex={props.tabIndex}
        className="scrollbar cursor-pointer overflow-hidden overflow-y-auto overscroll-contain rounded-lg border-0 border-green-300 outline-none focus:border-3"
        onKeyDown={(e) => e.keyCode == KeyCode.enter && openFileSelect()}
      >
        {image ? (
          <img alt="" className="pointer-events-none w-full" src={image} />
        ) : (
          icons.image("w-40 max-h-full opacity-50")
        )}
        <input
          ref={ref as any}
          id="id_image"
          type="file"
          name="image"
          accept="image/*"
          required
          hidden
          onChange={loadImage}
        />
      </label>
    </div>
  )
}
