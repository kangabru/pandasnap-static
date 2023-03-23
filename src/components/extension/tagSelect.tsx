import { useEffect, useState } from "react"
import SelectInput from "react-select/async-creatable"
import { Tag } from "./types"

type Option = { label: string; value: string | number }

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
  const { tags, addTag, fetchTags, isFetching } = useCachedFetchTagOptions(
    props.fetchTags
  )
  const [idsSelect, setIdsSelect] = useState<(string | number)[]>(
    props?.defaultTagIds || []
  )

  const addIdSelect = (tag: Tag) => setIdsSelect([...idsSelect, tag.uuid])

  const optionsSelect: Option[] = tagsToOptions(
    idsSelect.map((id) => tags.find((t) => t.uuid == id))
  )

  return (
    <SelectInput
      name="tags"
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      isMulti={true}
      isClearable={true}
      isSearchable={true}
      value={optionsSelect} // Manually set the values
      isDisabled={props.isDisabled}
      isLoading={isFetching}
      defaultOptions // When 'true' it fetches the options for us
      cacheOptions
      loadOptions={fetchTags} // Fetch tags. Also populates list so we have to cache em
      onChange={
        ((options: Option[]) =>
          setIdsSelect(options?.map((o) => o.value) ?? [])) as any
      }
      styles={{
        container: () => ({ position: "relative", borderRadius: "0.4rem" }),
        control: (_, s) => ({
          padding: s.hasValue ? 0 : "1px 0",
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

type Nullable<T> = T | null | undefined

function useCachedFetchTagOptions(fetchTagsRaw: FetchTagsFunction) {
  const [tags, setTags] = useState<Tag[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [hasCalled, setHasCalled] = useState(false)

  useEffect(() => {
    fetchTagsRaw(FetchRequestType.init).then(
      (x) => x.success && setTags(x.tags)
    )
  }, [])

  const addTag = (tag: Tag) => setTags([...tags, tag])
  const fetchTags: (searchText: string) => Promise<Option[]> = async (
    searchText
  ) => {
    if (isFetching || hasCalled)
      return tagsToOptions(filterTags(tags, searchText) as any)

    setHasCalled(true)
    setIsFetching(true)

    const response = await fetchTagsRaw(FetchRequestType.normal)
    setIsFetching(false)

    if (response.success) {
      const newTags = response.tags
      setTags(newTags)
      return tagsToOptions(newTags)
    }
    return []
  }

  return { tags, addTag, isFetching, fetchTags }
}

function filterTags(tags: Nullable<Tag>[], searchText: string) {
  return searchText
    ? tags.filter((t) =>
        t?.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : null
}

function tagsToOptions(tags: Nullable<Tag>[]): Option[] {
  return tags.map(tagToOption).filter((x) => !!x) as Option[]
}

function tagToOption(tag: Nullable<Tag>): Option | undefined {
  return tag ? { label: tag.name, value: tag.uuid } : undefined
}

function useCreateTag(
  createTagApi: CreateTagType,
  onCreate: (tag: Tag) => void
) {
  const [isCreating, setIsCreating] = useState(false)
  const createTag = async (name: string) => {
    const formData = new FormData()
    formData.set("name", name)
    setIsCreating(true)
    const response = await createTagApi(formData)
    setIsCreating(false)
    if (response.success) onCreate(response.tag)
  }
  return { createTag, isCreating }
}
