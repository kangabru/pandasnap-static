"use client"

import { useState } from "react"
import { IDS, Tag } from "../../common/constants"
import { Wait } from "../../common/utils"
import { SpinnerButton, StatefulInputWithRef } from "../common/common"
import TagSelect from "../tags/tagSelect"
import { scrollToElement } from "./index"

export enum ImageFormMode {
  landingStripe,
  landingPanda,
  elem1,
  elem2,
  elem3,
}
export type ImageFormProps = { mode?: ImageFormMode }

export default function ImageForm(props: ImageFormProps) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const tagLanding: Tag = { value: "1", label: "Landing pages" }
  const tagHeader: Tag = { value: "2", label: "Headers" }
  const tagUi: Tag = { value: "3", label: "Nice UIs" }

  let defaultTitle = ""
  const selectedTags: Tag[] = []

  switch (props.mode) {
    case ImageFormMode.landingPanda:
      defaultTitle = "Snap inception"
      selectedTags.push(tagLanding)
      break
    case ImageFormMode.elem1:
      defaultTitle = "I should use more colour like this"
      selectedTags.push(tagUi)
      break
    case ImageFormMode.elem2:
      defaultTitle =
        "Look at the subtle off-white coloring. The tasteful thickness of it."
      selectedTags.push(tagHeader)
      break
    case ImageFormMode.elem3:
      defaultTitle = "Why aren't more sites dark like this?"
      selectedTags.push(tagHeader)
      break
    default:
      defaultTitle = "God tier landing design"
      selectedTags.push(tagLanding)
      break
  }

  const save = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      Wait(500).then(() => scrollToElement(IDS.section2))
    }, 1000)
  }

  return (
    <>
      <form
        className="flex w-full flex-col items-end space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3"
        onSubmit={save}
      >
        <label className="w-full leading-none">
          <StatefulInputWithRef
            name="name"
            type="text"
            initValue={defaultTitle}
            placeholder="Title"
            maxLength={100}
            className="button-outline form-input w-full"
          />
        </label>
        <div className="row w-full space-x-3">
          <label className="z-0 flex-1">
            <TagSelect tags={selectedTags} />
          </label>
          <SpinnerButton
            onClick={save}
            className="button button-primary py-2 px-3"
            isLoading={loading}
            text={loading ? "Saving" : saved ? "Woohoo!" : "Save"}
          />
        </div>
      </form>
    </>
  )
}
