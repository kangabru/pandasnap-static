import { Content, TagUuid } from "@/common/constants"

let imageUrl =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.BwsWE_HWTkL7DzXt4mVVlgHaIO%26pid%3DApi&f=1&ipt=246f3cc2970229ea9d72e8f9d9d8c51d2b452c5f44e738e3e808c8d5181dd6f7&ipo=images"

export const dataTags: TagUuid[] = [
  { uuid: "1", name: "Landing Pages" },
  { uuid: "2", name: "Headers" },
  { uuid: "3", name: "Icons" },
]

export const dataSnaps: Content[] = [
  {
    uuid: "i1",
    name: "Cool landing page",
    url: imageUrl,
    image: imageUrl,
    tags: ["1"],
  },
  {
    uuid: "i2",
    name: "Nice heade",
    url: "",
    image: imageUrl,
    tags: ["1", "2"],
  },
]
