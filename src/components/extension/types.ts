import { CrossTabAction } from "./constants"

type CrossTabPair<Req, Res> = { request: Req; response: Promise<Res> }
type CrossTabTypes = {
  [CrossTabAction.downloadImage]: CrossTabPair<{ dataUrl: string }, any>
  [CrossTabAction.copyImage]: CrossTabPair<{ dataUrl: string }, boolean>
  [CrossTabAction.createTab]: CrossTabPair<Tabs.CreateCreatePropertiesType, any>
  [CrossTabAction.captureTab]: CrossTabPair<
    ExtensionTypes.ImageDetails | undefined,
    string | undefined
  >
  [CrossTabAction.urlRequest]: CrossTabPair<UrlRequest, UrlResponse>
  [CrossTabAction.logout]: CrossTabPair<void, void>
  [CrossTabAction.fetchTags]: CrossTabPair<FetchTypeRequest, Tag[] | undefined>
  [CrossTabAction.fetchUser]: CrossTabPair<FetchTypeRequest, User | undefined>
  [CrossTabAction.devReload]: CrossTabPair<void, void>
  [CrossTabAction.hasAuthCookie]: CrossTabPair<void, boolean>
  [CrossTabAction.saveImage]: CrossTabPair<string, void>
  [CrossTabAction.screenshotPage]: CrossTabPair<ScreenshotPageResponse, void>
  [CrossTabAction.getInfoSection]: CrossTabPair<
    void,
    ReadInfoSections | undefined
  >
  [CrossTabAction.setInfoSection]: CrossTabPair<
    ReadInfoSections,
    ReadInfoSections | undefined
  >
}

export type TabKeys = keyof CrossTabTypes
export type TabTypeReq = { [P in TabKeys]: CrossTabTypes[P]["request"] }
export type TabTypeRes = { [P in TabKeys]: CrossTabTypes[P]["response"] }

export type ActionDataType<T extends CrossTabAction> = T extends TabKeys
  ? TabTypeReq[T]
  : void

export type CrossTabMessage<A, D> = { action: A; data: D }
export type CrossTabReq<T extends TabKeys> = CrossTabMessage<T, TabTypeReq[T]>
export type CrossTabRes<T extends TabKeys> = CrossTabMessage<T, TabTypeRes[T]>

export type SerializedFormData = string
export type UrlRequest = {
  url: string
  method: Method
  data: SerializedFormData
}
export type UrlResponse = Pick<AxiosResponse, "data" | "status">

export type ScreenshotPageResponse = { dataUrl: string }

export type ReadInfoSections = { [id: string]: boolean }

export type FetchTypeRequest = { type: FetchType }
export enum FetchType {
  LocalOrServer,
  Server,
}

export type StorageData = {
  user?: User
  tags?: Tag[]
  infoSections?: ReadInfoSections
}

export type ApiList<Entity> = {
  count: number
  next: string | null
  previous: string | null
  results: Entity[]
}

export type TagList = ApiList<Tag>
export type UserList = ApiList<User>

export type Tag = {
  uuid: string
  name: string
}

export type User = {
  first_name?: string
  last_name?: string
  username: string
  email: string
  date_joined: Date
}

/** Removes all properties from an object. */
type ExcludeAll<T> = { [P in keyof T]?: never }

/** Removed all property of [Output] if [Input] is nullish. */
export type OptionalIfNull<Input, Output> = Input extends
  | null
  | undefined
  | void
  ? ExcludeAll<Output>
  : Output
