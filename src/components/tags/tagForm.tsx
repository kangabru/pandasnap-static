import { Tag, urls } from "../../common/constants"
import { axios, useFocusInputRef } from "../../common/utils"
import {
  CancelButton,
  DeleteButton,
  EditButton,
  Errors,
  SaveButton,
  StatefulInputWithRef,
} from "../common/common"
import { FormInfo, RootInfo, useEntityForm } from "../common/formUtils"

const url = urls.tag

export async function FetchTag(info: RootInfo) {
  const response = await axios.get<Tag>(url(info.id), { noDelay: true })
  if (response.status > 300) return
  return response.data
}

function TagForm(props: FormInfo<Tag>) {
  return props.editing ? <TagEdit {...props} /> : <TagFormDisplay {...props} />
}

function TagFormDisplay(props: FormInfo<Tag>) {
  return (
    <div className="row space-x-2">
      <h1 className="flex-1 text-2xl">{props.state.name}</h1>
      <DeleteButton
        url={urls.tag(props.id)}
        onSuccess={() => window.location.replace(urls.home)}
      />
      <EditButton onClick={props.edit} />
    </div>
  )
}

function TagEdit(props: FormInfo<Tag>) {
  const { submit, formState } = useEntityForm(url(props.id), props)
  const inputRef = useFocusInputRef()

  return (
    <div className="col w-full items-start space-y-2">
      <form
        className="row w-full justify-between space-x-2"
        onSubmit={(e) => submit(e, "PUT")}
      >
        <label className="flex-1 leading-none">
          <StatefulInputWithRef
            initValue={props.state.name}
            ref={inputRef}
            name="name"
            type="text"
            required
            placeholder="Title"
            maxLength={50}
            autoFocus
          />
        </label>
        <SaveButton isLoading={formState.isLoading} />
        <CancelButton onClick={props.cancel} />
      </form>
      <Errors errors={formState.errors} />
    </div>
  )
}

export default TagForm
