const api = "/api"
export const urls = {
  home: "/",
  collection: "/collection",
  extension: "/extension",
  upgrade: "/upgrade",
  about: "/about",

  logout: "/logout",
  profile: "/profile",
  extensionFirefox: "/extension-firefox",
  admin: "/admin/",
  whatsNew: "/changelog",
  howTo: "/learn",
  contentNew: `${api}/content/`,
  feedback: `${api}/feedback/`,
  content: (id: string) => `${api}/content/${id}/`,
  twitter: "https://twitter.com/kanga_bru",
}

export const imageUrls = {
  logo: "/static/pandasnap/icons/logo.png",
  logo_48: "/static/pandasnap/icons/logo_48.png",
  deadPanda: "/static/pandasnap/images/dead-panda.png",
}

export type Content = {
  uuid: string
  name: string
  url: string
  image: string
  tags: string[]
}

export type Tag = {
  value: string
  label: string
}

export type TagUuid = {
  uuid: string
  name: string
}

export const KeyCode = {
  enter: 13,
  escape: 27,
}

export const IDS = {
  section1: "section-1",
  snapAnElement: "snap-an-element",
  section2: "section-2",
  section3: "section-3",

  // idSnapPage: "root-snap-page",
  // idSnapElem: "root-snap-elem",
  // idImageSelect: "root-images",
  // idImageForm: "root-image-form",
  // idImageFormImage: "root-image",
  // idScrollStart: "scroll-start",
  // idScroll1: "scroll-1",
  // idScroll2: "scroll-2",
  // idScroll3: "scroll-3",
  // idScrollReset: "scroll-reset",
  // imageSavedLanding: "image-saved-landing",
  // imageSavedOther: "image-saved-other",
}
