const api = "/api"
export const urls = {
  home: "/",
  logout: "/logout",
  profile: "/profile",
  extension: "/extension-chrome",
  extensionFirefox: "/extension-firefox",
  admin: "/admin/",
  about: "/about",
  whatsNew: "/changelog",
  howTo: "/learn",
  // tagList: api + "/tag/",
  // tagNew: `${api}/tag/`,
  // contentList: api + "/content/",
  // contentNew: `${api}/content/`,
  feedback: `${api}/feedback/`,
  // tag: (id) => `${api}/tag/${id}/`,
  // content: (id) => `${api}/content/${id}/`,
  // viewContent: (id) => `/content/${id}`,
  // email: "mailto:scott@pandasnap.io",
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
