export const urls = {
  home: "/",
  collection: "/collection",
  extension: "/extension",
  upgrade: "/upgrade",
  about: "/about",
  twitter: "https://twitter.com/kanga_bru",
  repo: "https://github.com/kangabru/pandasnap-static",
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
}
