"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRandomMessage } from "../website/message"
import dataTags from "../website/snaps/dataTags"
import { KeyCode } from "./constants"
import TagSelect, { FetchTagsResponse } from "./tagSelect"
import {
  CloseButton,
  CommonButton,
  CopyButton,
  DownloadButton,
  LockIcon,
  LockSize,
  SpinnerButton,
} from "./uiCommon"
import { useKeyUpEffect, useOpenExperiment, Wait } from "./utils"

export default function ImageUi(props: {
  removeImageUi: () => void
  imageUrl: string | undefined
}) {
  const [didSave, setDidSave] = useState(false)
  const onSave = () => setDidSave(true)
  const isLoading = props.imageUrl === undefined // Called at the beginning on the image merge with no props
  return isLoading ? (
    <LoadingPopup removeImageUi={props.removeImageUi} />
  ) : didSave ? (
    <SavedPopup removeImageUi={props.removeImageUi} />
  ) : (
    <ImageForm
      imageUrl={props.imageUrl as any}
      onSave={onSave}
      removeImageUi={props.removeImageUi}
    />
  )
}

function FloatingWindow(props: {
  removeImageUi: () => void
  children: any
  closeOnEscape?: boolean
}) {
  useKeyUpEffect(
    (e: KeyboardEvent) => {
      if (props.closeOnEscape !== undefined && props.closeOnEscape)
        e.keyCode == KeyCode.escape && props.removeImageUi()
    },
    [props.closeOnEscape]
  )

  const stop = (e: Event) => {
    e.stopPropagation()
    e.stopImmediatePropagation?.()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 text-left"
      onClick={props.removeImageUi}
    >
      <div className="col fixed inset-0 mx-auto max-w-3xl justify-center p-10 text-3xl text-white">
        <div
          className="pointer-events-auto max-h-full rounded-lg bg-gray-200 shadow-lg"
          onClick={stop as any}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

function ImageForm(props: {
  removeImageUi: () => void
  imageUrl: string
  onSave: () => void
}) {
  const [isSaving, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(
    () => () => {
      window.URL.revokeObjectURL(props.imageUrl)
    },
    [props.imageUrl]
  )

  const [canClose, setCanClose] = useState(true)
  const allowClose = () => setCanClose(true),
    blockClose = () => setCanClose(false)

  const openExperiment = useOpenExperiment()

  return (
    <FloatingWindow
      closeOnEscape={canClose}
      removeImageUi={props.removeImageUi}
    >
      <form
        id="ps-submit"
        onSubmit={upload as any}
        className="col mb-0 max-h-full space-y-3 overflow-hidden p-5 text-lg"
      >
        <div className="row w-full space-x-3">
          <CloseButton onClick={props.removeImageUi} title="Close" />
          <DownloadButton onClick={() => Promise.resolve(true)} />
          <CopyButton onClick={() => Promise.resolve(true)} />
          {error && <span className="text-lg text-red-600">{error}</span>}
          <div className="flex-1"></div>

          <div className="relative mx-3">
            <CommonButton
              className="row relative space-x-1 px-3"
              onClick={openExperiment}
            >
              <svg
                className="h-5 w-5 translate-y-px -translate-x-px transform text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Instant Save</span>
            </CommonButton>
            <LockIcon size={LockSize.small} />
          </div>

          <SpinnerButton
            id="submit"
            isPrimary
            isLoading={isSaving}
            text={isSaving ? "Saving" : "Save"}
            className="button button-primary py-2 px-3"
            type="submit"
          />
        </div>

        <div
          className={
            "row relative z-10 w-full space-x-3 text-gray-800 " +
            (isSaving ? "opacity-75" : "")
          }
        >
          <label className="flex-1 leading-none">
            <input
              type="text"
              name="name"
              placeholder="Title"
              disabled={isSaving}
              maxLength={100}
              className="form-input w-full bg-white"
            />
          </label>

          <label className="flex-1">
            <TagSelect
              fetchTags={apiFetchTags}
              onFocus={blockClose}
              onBlur={allowClose}
            />
          </label>
        </div>

        <div className="scrollbar relative z-0 h-full overflow-y-auto overscroll-contain">
          <input type="file" name="image" hidden />
          <Image
            src={props.imageUrl}
            alt="Screenshot"
            className="pointer-events-none w-full rounded"
          />
          <div className="absolute top-1/3 left-0 right-0 z-10 -translate-y-1/2 overflow-hidden py-10">
            <div className="-mx-2 -rotate-6 bg-gray-900 p-4 text-center text-lg">
              This is a placeholder snapshot for demo purposes.
            </div>
          </div>
        </div>
      </form>
    </FloatingWindow>
  )

  async function upload(e: Event) {
    e.preventDefault()
    if (!e.target) return
    setError(null)
    setIsLoading(true)
    await Wait(1000)
    setIsLoading(false)
    props.onSave()
    setTimeout(props.removeImageUi, 1000)
  }
}

/** Fetches tags. Initial requests are local (if possible) and subsequent requests hit the server. */
async function apiFetchTags(): FetchTagsResponse {
  return { success: true, tags: dataTags }
}

const saveConfirmMessages = ["Woohoo", "Saved", "Great success"]

function SavedPopup(props: { removeImageUi: () => void }) {
  return (
    <MessagePopup
      removeImageUi={props.removeImageUi}
      messages={saveConfirmMessages}
      icon="👍"
    />
  )
}

const loadMessages = ["Loading", "Processing", "Reticulating"]

function LoadingPopup(props: { removeImageUi: () => void }) {
  return (
    <MessagePopup
      removeImageUi={props.removeImageUi}
      messages={loadMessages}
      icon="🐢"
    />
  )
}

function MessagePopup(props: {
  removeImageUi: () => void
  icon: string
  messages: string[]
}) {
  const message = useRandomMessage(props.messages)
  return (
    <FloatingWindow removeImageUi={props.removeImageUi}>
      <div className="row space-x-3 p-5 text-3xl text-gray-800">
        <span>{message}</span>
        <span className="-mt-2">{props.icon}</span>
      </div>
    </FloatingWindow>
  )
}
