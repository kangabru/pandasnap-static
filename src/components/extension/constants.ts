export enum CrossTabAction {
  logout,
  hasAuthCookie,
  downloadImage,
  copyImage,
  createTab,
  captureTab,
  screenshotElement,
  screenshotVisible,
  fetchTags,
  fetchUser,
  urlRequest,
  devReload,
  saveImage,
  setInfoSection,
  getInfoSection,

  // Screenshotter actions
  screenshotPage = "kbScreenshotPage",
  screenshotPageLoading = "kbScreenshotPageLoading",
  screenshotBegin = "screenshotBegin",
  screenshotEnd = "screenshotEnd",
  screenshotScroll = "screenshotScroll",
  screenshotReturn = "screenshotReturn",
  screenshotterVisible = "screenshotVisibleArea",
  blanketStyleSet = "blanketStyleSet",
  blanketStyleRestore = "blanketStyleRestore",
  heartbeat = "heartbeat",
}

// IDs for the Chrome right click context menu
export enum ContextMenuId {
  TakeSnap = "SNAP",
  TakeSnapImage = "SNAP_IMAGE",
  GoHome = "HOME",
  GoFeedback = "FEEDBACK",
  GoSettings = "SETTINGS",
}

export enum ShortcutCommand {
  Screenshot = "screenshot",
}

export const rootId = "ps-root"
export const initId = "ps-init"

export const Classes = {
  ignoreClass: "ignore",
}

export const KeyCode = {
  enter: 13,
  escape: 27,
}

export const urlRoot =
  process.env.NODE_ENV === "production"
    ? "https://pandasnap.io"
    : process.env.NODE_ENV === "test"
    ? "http://localhost:7357"
    : "http://localhost:8000"

export const apiRoot = urlRoot + "/api"

const nextLogin = "?next=" + urlRoot + "/extension-login"
const nextLogout = "?next=" + urlRoot + "/extension-logout"

export const urls = {
  home: urlRoot,
  play: urlRoot + "/play",
  feedback: urlRoot + "/feedback",
  login: urlRoot + "/login" + nextLogin,
  signup: urlRoot + "/signup" + nextLogin,
  logout: urlRoot + "/logout" + nextLogout,
  tags: apiRoot + "/tag/",
  content: apiRoot + "/content/",
  user: apiRoot + "/user/",
  shortcutChrome: "chrome://extensions/shortcuts",
  experiment: (experimentId?: string) =>
    urlRoot + "/upgrade" + (experimentId ? `#${experimentId}` : ""),
}

export const storageKey = "data"

export const files = {
  popupPage: "/popup.html",
  whatsNew: "/whats-new.html",
  contentScript: "/content.js",
  styles: "/index.css",
}

export const errors = {
  genericError: "Sorry something broke",
}

export const extensionVersionName = "ExtensionVersion"

export const tagPageSize = 100

export enum Experiment {
  SourceCodeSnap = "source-code-snap",
  CodeSnippet = "code-snippet",
  VideoRecord = "video-record",
  InstantSave = "instant-save",
}
