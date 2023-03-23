import { Tag } from "@/common/constants"
import { useCallback, useEffect, useMemo, useState } from "react"
import SelectInput from "react-select/creatable"

export default function TagSelect({ tags }: { tags: Tag[] }) {
  const defaultOptions: { value: string; label: string }[] = useMemo<Tag[]>(
    () => [
      { value: "1", label: "Landing pages" },
      { value: "2", label: "Headers" },
      { value: "3", label: "Nice UIs" },
    ],
    []
  )

  const [options, setOptions] = useState<Tag[]>(defaultOptions)
  const [selected, setSelected] = useState<Tag[]>([defaultOptions[0]])

  useEffect(() => void setSelected(tags), [tags])

  const create = useCallback((option: string) => {
    let tag: Tag = { value: option, label: option }
    setOptions((s) => [...s, tag])
    setSelected((s) => [...s, tag])
  }, [])

  const change = useCallback((options: Tag[]) => {
    setSelected(options)
  }, [])

  return (
    <SelectInput
      name="tags"
      isMulti
      isClearable
      isSearchable
      value={selected}
      options={options}
      onCreateOption={create}
      onChange={change as any}
      styles={{
        container: () => ({ position: "relative", borderRadius: "0.4rem" }),
        control: (_: any, s: any) => ({
          padding: s.hasValue ? 0 : "1px 0",
          opacity: s.isDisabled ? "0.7" : "1",
        }),
        valueContainer: (p: any, s: any) => ({
          ...p,
          padding: s.hasValue ? "0.25rem 0.25rem" : "0.25rem 0.75rem",
        }),
        input: (p: any) => ({ ...p, margin: 0, padding: 0 }),
      }}
      classNamePrefix="input"
      className="p-0"
      placeholder="Tags..."
    />
  )
}
