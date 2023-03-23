import { Tag } from "@/common/constants"
import { useMemo } from "react"
import SelectInput from "react-select/creatable"

export type FetchTagsResponse = Promise<{ success: boolean; tags: Tag[] }>
export enum FetchRequestType {
  init,
  normal,
}
export type FetchTagsFunction = (type: FetchRequestType) => FetchTagsResponse

export type CreateTagResponse = Promise<{ success: boolean; tag: Tag }>
export type CreateTagType = (d: FormData) => CreateTagResponse

export type TagSelectProps = {
  fetchTags: FetchTagsFunction
  defaultTagIds?: (string | number)[]
  isDisabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

export default function TagSelect(props: TagSelectProps) {
  const defaultOptions: { value: string; label: string }[] = useMemo<Tag[]>(
    () => [
      { value: "1", label: "Landing pages" },
      { value: "2", label: "Headers" },
      { value: "3", label: "Nice UIs" },
    ],
    []
  )
  return (
    <SelectInput
      name="tags"
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      isMulti
      isClearable
      isSearchable
      isDisabled={props.isDisabled}
      options={defaultOptions}
      styles={{
        container: () => ({ position: "relative", borderRadius: "0.4rem" }),
        control: (_, s) => ({
          padding: s.hasValue ? 0 : "0.1rem 0",
          opacity: s.isDisabled ? "0.7" : "1",
        }),
        valueContainer: (p, s) => ({
          ...p,
          padding: s.hasValue ? "0.25rem 0.25rem" : "0.25rem 0.75rem",
        }),
        input: (p) => ({ ...p, margin: 0, padding: 0 }),
      }}
      classNamePrefix="input"
      className="form-input p-0"
      placeholder="Tags..."
    />
  )
}
