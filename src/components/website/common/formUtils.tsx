import { KeyCode } from "@/common/constants"
import { useKeyUpEffect, Wait } from "@/common/utils"
import { useState } from "react"

type StateInfo<Entity> = {
  state: Entity
  setState: (state: Entity) => void
  editing: boolean
  edit: () => void
  cancel: () => void
}
export type RootInfo = { id: string }
export type FormInfo<Entity> = RootInfo & StateInfo<Entity>

export function useEntityForm<Entity>(url: string, props: FormInfo<Entity>) {
  useKeyUpEffect((e) => e.keyCode == KeyCode.escape && props.cancel())
  return useForm<Entity>(url, (r) => {
    props.cancel()
    props.setState(r)
  })
}

type FormState = { errors?: string; isLoading: boolean }

export function useForm<Entity>(
  url: string,
  onSuccess: (response: any) => void
) {
  const [formState, setFormState] = useState<FormState>({
    errors: "",
    isLoading: false,
  })
  const updateFormState = (newState: Partial<FormState>) =>
    setFormState({ ...formState, ...newState })

  const submit = async (e: Event) => {
    e.preventDefault()

    updateFormState({ isLoading: true })
    await Wait(1000)
    updateFormState({ isLoading: false })
    onSuccess(e)
  }

  return { submit, formState, updateFormState }
}
