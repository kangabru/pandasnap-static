import { Content, urls } from "../../common/constants"
import { useFocusInputRef, useOnEscape } from "../../common/utils"
import {
  CancelButton,
  DeleteButton,
  EditButton,
  Errors,
  icons,
  SaveButton,
  StatefulInputWithRef,
  TagSelect,
} from "../common/common"
import { FormInfo, RootInfo, useForm } from "../common/formUtils"

const url = urls.content

function ContentForm(props: FormInfo<Content>) {
  return props.editing ? (
    <ContentEdit {...props} />
  ) : (
    <ContentDisplay {...props} />
  )
}

function ContentDisplay(props: FormInfo<Content>) {
  return (
    <div className="row space-x-2">
      {props.state.url && (
        <a
          href={props.state.url}
          target="_blank"
          className="h-5 opacity-50 hover:opacity-75"
        >
          {icons.link()}
        </a>
      )}
      <h1 className="text-2xl">{props.state.name}</h1>
      <div className="flex-1"></div>
      <DeleteButton
        url={urls.content(props.id)}
        onSuccess={() => window.location.replace(urls.home)}
      />
      <EditButton onClick={props.edit} />
    </div>
  )
}

export function ContentEdit(props: FormInfo<Content>) {
  const onSuccess = (content: Content) => {
    props.cancel()
    props.setState(content)
  }
  const { submit, formState } = useForm(url(props.id), onSuccess)

  const inputRef = useFocusInputRef()
  useOnEscape(props.cancel)

  return (
    <div className="col w-full items-start space-y-2">
      <form
        className="row w-full justify-between space-x-2"
        onSubmit={(e) => submit(e, "PATCH")}
      >
        <label className="flex-1 leading-none">
          <StatefulInputWithRef
            initValue={props.state.name}
            ref={inputRef}
            name="name"
            type="text"
            placeholder="Title"
            maxLength={100}
            className="form-input w-full"
            autoFocus
          />
        </label>
        <label className="flex-1">
          <TagSelect
            defaultTagIds={props.state.tags}
            isDisabled={formState.isLoading}
          />
        </label>
        <SaveButton isLoading={formState.isLoading} />
        <CancelButton onClick={props.cancel} />
      </form>
      <Errors errors={formState.errors} />
    </div>
  )
}

export default ContentForm
