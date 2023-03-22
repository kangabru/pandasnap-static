import NextImage from "next/image"
import { createContext, useContext, useEffect, useState } from "react"
import { animated, config, interpolate, useTransition } from "react-spring"
import useMeasure from "react-use-measure"
import create from "zustand"
import {
  Content,
  imageUrls,
  TagUuid as Tag,
  urls,
} from "../../common/constants"
import {
  join,
  useBoolState,
  useDocumentListener,
  useOnEscape,
  Wait,
} from "../../common/utils"
import { ClickProtector, StatefulInputWithRef } from "../common/common"
import { searchTerms, useRandomMessage } from "../message"
import { dataSnaps, dataTags } from "./data"
import { ContentAddFormButton, useContentAddForm } from "./formContentAddNew"

enum TagLoadState {
  None,
  Loading,
  Loaded,
}
enum SnapLoadState {
  None,
  Loading,
}

/** Filter state to manage snap search and filtering */
type Filter = {
  tagMap: Record<string, Tag>
  tagIdsSelected: Set<string> // uuid
  getTags: (id?: string[]) => Tag[]
  getTagsSelected: () => Tag[]
  tagLoadState: TagLoadState
  loadTags: () => void
  clickTag: (tag: Tag) => void

  searchText: string
  hasFilters: () => boolean

  snaps: ContentImage[]
  snapLoadState: SnapLoadState
  nextUrl?: number
  getNext: () => void
  loadSnaps: (currentSnaps?: ContentImage[]) => void
}

/** zustand state for filter management  */
const useFilter = create<Filter>(
  (set, get) =>
    ({
      tagMap: {},
      tagIdsSelected: new Set(),
      getTags: (ids?: string[]) => {
        const tagMap = get().tagMap
        return ids === undefined
          ? Object.values(tagMap.values)
          : ids.map((id) => tagMap[id]).filter((x) => !!x)
      },
      getTagsSelected: () => {
        const tags = get().tagMap
        return [...get().tagIdsSelected].map((uuid) => tags[uuid])
      },

      tagLoadState: TagLoadState.None,
      loadTags: async () => {
        set({ tagLoadState: TagLoadState.Loading })
        await Wait(1000)
        const tags: Record<string, Tag> = {}
        dataTags.forEach((tag) => {
          tags[tag.uuid] = tag
        })
        set({ tagMap: tags, tagLoadState: TagLoadState.Loaded })
      },
      clickTag: (tag: Tag) =>
        set(({ tagIdsSelected: tagsSelected }) => {
          const tagIds = new Set(tagsSelected),
            uuid = tag.uuid
          tagIds.has(uuid) ? tagIds.delete(uuid) : tagIds.add(uuid)
          return { tagIdsSelected: tagIds }
        }),

      searchText: "",
      hasFilters: () => {
        const s = get()
        return !!s.tagIdsSelected.size || !!s.searchText
      },

      snaps: [],
      snapLoadState: SnapLoadState.Loading,
      getNext: async () => {
        const s = get()
        s.snapLoadState == SnapLoadState.None &&
          s.nextUrl &&
          s.loadSnaps(s.snaps)
      },
      loadSnaps: async (currentSnaps?: ContentImage[]) => {
        const state = get()

        let params = getFilterParams(state)
        set({
          snaps: currentSnaps ?? [],
          nextUrl: undefined,
          snapLoadState: SnapLoadState.Loading,
        })
        const nextUrl = state.nextUrl || 0
        const nextUrlNext = nextUrl + 10
        await Wait(1000)
        const snaps = dataSnaps.slice(nextUrl, nextUrlNext)
        const newSnaps = await Promise.all(snaps.map(loadContent) ?? [])
        set({ snapLoadState: SnapLoadState.None })
        set({
          nextUrl: nextUrlNext < dataSnaps.length ? nextUrlNext : undefined,
          snaps: [...(currentSnaps ?? []), ...newSnaps],
        })
      },
    } as Filter)
)

useFilter.subscribe(
  (s: any) => s.loadSnaps(),
  // @ts-ignore
  ({ loadSnaps, searchText, tagIdsSelected: tagsSelected }) => ({
    loadSnaps,
    searchText,
    tagsSelected,
  }),
  // @ts-ignore
  (sOld, sNew: any) =>
    sOld.searchText === sNew.searchText &&
    sOld.tagsSelected.size === sNew.tagsSelected.size
)

const PropsContext = createContext<MainProps>({})
type MainProps = {
  imageChrome?: string
  imageFirefox?: string
}

export default function Snaps(props: MainProps) {
  const addImage = (d: FormData) => {
    const image = d.get("image") as any
    if (!image) return

    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (ie) => {
      let dataUrl = ie.target?.result

      let snap: Content = {
        uuid: "" + Math.random(),
        name: d.get("name") as any,
        url: d.get("url") as any,
        image: dataUrl as string,
        tags: d.getAll("tags") as any,
      }

      let state = useFilter.getState()
      useFilter.setState({ snaps: [...state.snaps, snap] })
    }
  }

  return (
    <PropsContext.Provider value={props}>
      <div className="mx-auto max-w-screen-xl space-y-3">
        <section className="row mx-auto max-w-xl justify-center space-x-3 pr-3 sm:pr-0">
          <div className="invisible hidden p-2 sm:block">
            <div className="h-6 w-6"></div>
          </div>
          <AdvancedSearchBar />
          <ContentAddFormButton onSuccess={addImage as any} />
        </section>
        <SnapMasonry />
      </div>
    </PropsContext.Provider>
  )
}

function AdvancedSearchBar() {
  const [isOpen, close, open] = useBoolState(false)
  useOnEscape(close, isOpen)
  useDocumentListener("click", close, [isOpen])

  const search = (searchText: string) => useFilter.setState({ searchText })
  const [timeoutId, setTimeoutId] = useState<number>()

  const postInput = (newValue: string) => {
    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(search, 750, newValue) as any)
  }

  const transitions = useTransition(isOpen, null, {
    config: config.gentle,
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const searchMessage = useRandomMessage(searchTerms)

  return (
    <section className="relative z-10 flex-1">
      <ClickProtector
        className={join(
          "row relative z-10 w-full max-w-lg cursor-text rounded bg-white pl-2 shadow transition-shadow duration-100",
          isOpen ? "shadow-none" : "hover:shadow-md"
        )}
        onClick={open}
      >
        <svg
          className="mr-3 h-6 w-6 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>

        <StatefulInputWithRef
          postInput={postInput}
          title="Search snaps"
          placeholder={searchMessage}
          className={join(
            "button-outline focus:shadow-outline w-full rounded px-3 py-2 text-lg focus:border-none",
            isOpen && "border-1"
          )}
        />

        <div className="absolute right-1 top-1">
          <TagRow mode={TagRowType.selected} />
        </div>
      </ClickProtector>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={{ ...props }}>
              <SearchOpen />
            </animated.div>
          )
      )}
    </section>
  )
}

/** The main bar shows the tag, search, and add button */
function SearchOpen() {
  const [tagsLoading, hasTags] = useTagLoader()

  return (
    <ClickProtector className="absolute left-0 right-0 top-0 -m-2 flex flex-col space-y-3 rounded-lg bg-white p-2 shadow-md">
      <p className="py-2 opacity-0">_</p>
      {tagsLoading ? (
        <LoadingTags />
      ) : hasTags ? (
        <TagRow mode={TagRowType.nonSelected} />
      ) : (
        <EmptyTags />
      )}
    </ClickProtector>
  )
}

enum TagRowType {
  selected,
  nonSelected,
}

function TagRow(props: { mode: TagRowType }) {
  const clickTag = useFilter((state) => state.clickTag)

  const tagMap = useFilter((state) => state.tagMap)
  const tagsSelected = useFilter((state) => state.tagIdsSelected)
  const tagsNonSelected = [...Object.keys(tagMap)].filter(
    (t) => !tagsSelected.has(t)
  )

  const isSelectMode = props.mode == TagRowType.selected
  const tagIds = isSelectMode ? [...tagsSelected] : tagsNonSelected
  const tags = tagIds.map((id) => tagMap[id])

  return (
    <div className="row w-full flex-wrap justify-center sm:justify-start">
      {tags.map((tag) => (
        <button
          key={tag.uuid}
          onClick={(e) => {
            e.stopPropagation()
            clickTag(tag)
          }}
          className={join(
            "row focus:shadow-outline m-1 space-x-1 rounded bg-gray-300 py-1 text-sm hover:bg-gray-400 focus:border-none focus:outline-none",
            isSelectMode ? "pl-3 pr-1" : "px-3"
          )}
        >
          <span>{tag.name}</span>
          {isSelectMode && (
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

function useTagLoader() {
  const { tags, tagLoadState, loadTags } = useFilter(
    ({ tagMap: tags, tagLoadState, loadTags }) => ({
      tags,
      tagLoadState,
      loadTags,
    })
  )

  useEffect(() => {
    tagLoadState == TagLoadState.None && loadTags()
  }, [loadTags, tagLoadState])

  const isLoading = tagLoadState == TagLoadState.Loading
  const hasTags = Object.keys(tags).length > 0

  return [isLoading, hasTags]
}

function LoadingTags() {
  return (
    <div className="row w-full flex-wrap justify-center sm:justify-start">
      {["w-16", "w-10", "w-12"].map((w) => (
        <div
          key={w}
          className={join("m-1 animate-pulse rounded bg-gray-300 py-1", w)}
        >
          &nbsp;
        </div>
      ))}
    </div>
  )
}

function EmptyTags() {
  return <span className="text-gray-700">No tags created yet</span>
}

type ContentImageExtra = { width?: number; height?: number; error?: boolean }
type ContentImage = Content & ContentImageExtra

const IMG_PADDING = 16
const IMG_WIDTH_TARGET = 300
const IMG_HEIGHT_MAX = 600
const IMG_HEIGHT_ERROR = 200

const SCROLL_THRESHOLD_LOW = -50
const SCROLL_THRESHOLD_HIGH = 200
const SCROLL_THRESHOLD_RATE_LIMIT_MS = 200

/** Displays the snaps in a nice animated grid. */
function SnapMasonry() {
  useTagLoader()

  // Hook to manage snaps
  const {
    loadSnaps,
    nextUrl: hasNext,
    getNext,
  } = useFilter(({ loadSnaps, nextUrl, getNext }) => ({
    loadSnaps,
    nextUrl,
    getNext,
  }))
  const { snaps, snapLoadState, hasFilters } = useFilter(
    ({ snaps, snapLoadState, hasFilters }) => ({
      snaps,
      snapLoadState,
      hasFilters,
    })
  )
  const isLoading = snapLoadState == SnapLoadState.Loading

  useEffect(() => void loadSnaps(), [loadSnaps])

  // Hook to manage screen size changes
  const [bind, { width: widthCont, bottom }] = useMeasure({ scroll: true })
  const distFromBottom = bottom - window.innerHeight

  // Load next snaps when close to the bottom
  const [time, setTime] = useState(new Date().getTime())
  const timeDiff = new Date().getTime() - time
  const rateLimited = timeDiff > SCROLL_THRESHOLD_RATE_LIMIT_MS
  const withinBounds =
    SCROLL_THRESHOLD_LOW < distFromBottom &&
    distFromBottom < SCROLL_THRESHOLD_HIGH

  if (!isLoading && rateLimited && withinBounds) {
    setTime(new Date().getTime())
    getNext()
  }

  // Form a grid of stacked items using width & columns
  const columns = Math.max(1, Math.floor(widthCont / IMG_WIDTH_TARGET))
  const heights = new Array(columns).fill(0) // Each column gets a height starting with zero

  type ContentInternal = ContentImage & {
    x: number
    y: number
    isLong: boolean
    isExpanded: boolean
  }

  // Internally manage whether tall images are expanded or not by tracking them by the snap UUID
  const [itemsExpanded, setItemsExpanded] = useState<Set<string>>(new Set())
  const toggleExpand = (uuid: string) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const expandUpdate = new Set(itemsExpanded)
    expandUpdate.has(uuid) ? expandUpdate.delete(uuid) : expandUpdate.add(uuid)
    setItemsExpanded(expandUpdate)
  }

  // Create the internal snap objects we'll use in the grid
  const width = widthCont / columns
  const gridItems = snaps.map<ContentInternal>((snap) => {
    // Convert real to local heights
    const convertedHeight =
      snap.width && snap.height
        ? ((width - 2 * IMG_PADDING) / snap.width) * snap.height +
          2 * IMG_PADDING
        : 0
    const isLong = convertedHeight > IMG_HEIGHT_MAX,
      isExpanded = itemsExpanded.has(snap.uuid)
    const height = convertedHeight
      ? isExpanded
        ? convertedHeight
        : Math.min(convertedHeight, IMG_HEIGHT_MAX)
      : IMG_HEIGHT_ERROR

    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const x = width * column,
      y = (heights[column] += height) - height
    return { ...snap, width, height, x, y, isLong, isExpanded }
  })

  // Use react spring to animate images into place
  const transitions = useTransition<
    ContentInternal,
    React.CSSProperties & { x: number; y: number }
  >(gridItems, (item) => item.uuid, {
    //@ts-ignore
    from: ({ x, y, width, height }) => ({
      x,
      y: y + 50,
      width,
      height,
      opacity: 0,
    }),
    //@ts-ignore
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    //@ts-ignore
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    //@ts-ignore
    leave: ({ x, y, width, height }) => ({
      x,
      y: y - 50,
      width,
      height,
      opacity: 0,
    }),
    trail: 25,
  } as any)

  const maxHeight = Math.max(...heights)
  const maxWidth = snaps.length
    ? width * Math.min(columns, snaps.length)
    : "100%"

  return (
    <div ref={bind} className="h-full w-full">
      <animated.div
        className="relative mx-auto mb-8"
        style={{ height: maxHeight, width: maxWidth }}
      >
        {transitions.map(
          ({ item, props: { x, y, ...rest }, key }) =>
            item && (
              <animated.div
                key={key}
                className="absolute"
                style={{
                  padding: IMG_PADDING,
                  transform: interpolate(
                    [x, y],
                    (x, y) => `translate3d(${x}px,${y}px,0)`
                  ),
                  ...rest,
                }}
              >
                <Snap {...item}>
                  {item.isLong && !item.isExpanded ? (
                    <button
                      onClick={toggleExpand(item.uuid)}
                      title="See full image"
                      className="button rounded-full p-2 hover:scale-110"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  ) : undefined}
                </Snap>
              </animated.div>
            )
        )}
      </animated.div>

      {isLoading ? (
        <SnapLoadUi isLoading={isLoading} />
      ) : gridItems.length ? (
        hasNext && (
          <button
            className="button mx-auto mb-10 block text-xl"
            onClick={getNext}
          >
            Load more
          </button>
        )
      ) : hasFilters() ? (
        <NoSnapState />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function SnapLoadUi(props: { isLoading: boolean }): JSX.Element {
  // Animate the 'next snaps' loading when near the bottom of the screen
  const isLoadingTransition = useTransition<
    boolean,
    React.CSSProperties & { y: number }
  >(props.isLoading, null, {
    from: { y: 50, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -50, opacity: 0 },
  } as any)

  const className = "rounded w-full sm:w-40 m-4"
  return (
    <>
      {isLoadingTransition.map(
        ({ item, key, props: { y, ...rest } }) =>
          item && (
            <animated.div
              key={key}
              style={{
                transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
                ...rest,
              }}
              className="row animate-pulse flex-wrap sm:items-start sm:justify-center sm:space-x-4"
            >
              <div className={join(className, "h-24 bg-blue-300")}></div>
              <div className={join(className, "h-32 bg-red-300")}></div>
              <div className={join(className, "h-20 bg-yellow-300")}></div>
            </animated.div>
          )
      )}
    </>
  )
}

function NoSnapContainer(props: { children: JSX.Element | JSX.Element[] }) {
  return (
    <section className="col w-fullmax-w-lg relative mx-auto space-y-4 p-5">
      <svg
        className="h-12 text-gray-400 sm:h-16"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="space-y-2 text-center text-xl text-gray-700">
        {props.children}
      </div>
    </section>
  )
}

/** Used when no snaps were returned from search. */
function NoSnapState() {
  return (
    <NoSnapContainer>
      <p>No snaps were found.</p>
      <p className="pt-5 text-left">Some tips:</p>
      <ul>
        <li className="bullet-xl">Ensure all words are spelt correctly</li>
        <li className="bullet-xl">The title, url, and tag name is searched</li>
      </ul>
    </NoSnapContainer>
  )
}

/** Used when the user hasn't taken any snap yet. */
function EmptyState() {
  const context = useContext(PropsContext)
  const reset = useFilter((s) => s.loadSnaps)
  const [addForm, , openAddForm] = useContentAddForm(reset as any)

  return (
    <NoSnapContainer>
      <p>You haven&apos;t taken snap yet.</p>
      <p>Get the extension for the best experience.</p>

      <div className="row flex-wrap justify-center py-4">
        <a
          className="button bg-white-200 mx-2 mt-2 block space-x-2 whitespace-nowrap rounded-lg py-3 px-4 text-xl"
          href={urls.extension}
        >
          <NextImage
            alt=""
            className="pointer-events-none -mt-1 mr-1 inline h-6"
            src={context.imageChrome as any}
          />
          <span>Chrome extension</span>
        </a>
        <a
          className="button bg-white-200 mx-2 mt-2 block space-x-2 whitespace-nowrap rounded-lg py-3 px-4 text-xl"
          href={urls.extensionFirefox}
        >
          <NextImage
            alt=""
            className="pointer-events-none -mt-1 mr-1 inline h-6"
            src={context.imageFirefox as any}
          />
          <span>Firefox extension</span>
        </a>
      </div>

      <button onClick={openAddForm} className="text-gray-500 underline">
        Or add a snap now
      </button>
      {addForm}
    </NoSnapContainer>
  )
}

function Snap(
  snap: ContentImage & { isLong: boolean; children?: JSX.Element }
) {
  const error = snap.error
  const backgroundImage = error
    ? `url('${imageUrls.deadPanda}')`
    : `url('${snap.image}')`

  const getTags = useFilter((s) => s.getTags)
  const tags = getTags(snap.tags)

  return (
    <div
      title={snap.name}
      // href={urls.viewContent(snap.uuid)}
      style={{ backgroundImage }}
      className={join(
        "col group relative h-full w-full transform space-y-2 overflow-hidden rounded bg-no-repeat p-2 shadow transition-all duration-100 hover:scale-102 hover:shadow-lg",
        error ? "bg-red-100 bg-contain bg-center" : "bg-cover bg-top"
      )}
    >
      <div className="z-10 flex w-full flex-row items-start justify-between space-x-2 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
        <IconLink url={snap.url} isVisible={!!snap.url} />
        {snap.name && <NameTag name={snap.name} />}
      </div>
      <div className="flex-1"></div>
      <div
        title="Tags"
        className="z-10 flex w-full flex-row flex-wrap items-end justify-end space-x-2 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
      >
        {tags.map((t) => (
          <TagTag key={t.uuid} name={t.name} />
        ))}
      </div>
      {snap.children}
    </div>
  )
}

function IconLink(props: { url: string; isVisible: boolean }) {
  return (
    <a
      href={props.url}
      target="_blank"
      className={join(
        "transform rounded-full bg-gray-700 p-1 text-white shadow transition-all duration-100 hover:scale-105 hover:bg-gray-800",
        !props.isVisible && "invisible"
      )}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          strokeWidth="5"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  )
}

function NameTag(props: { name: string }) {
  return (
    <span
      title={props.name}
      className="rounded bg-white py-1 px-2 text-right text-lg text-gray-800 shadow"
    >
      {props.name}
    </span>
  )
}

function TagTag(props: { name: string }) {
  return (
    <span
      title={props.name}
      className="rounded bg-white py-1 px-2 text-right text-base text-gray-800 shadow"
    >
      {props.name}
    </span>
  )
}

/** Construct the API url params that filter snaps by the internal filter state. */
function getFilterParams(filter: Filter): string {
  const params: string[] = []

  filter.searchText && params.push(`search=${filter.searchText}`)
  for (const uuid of filter.tagIdsSelected) params.push(`tags=${uuid}`)

  return params.length ? "?" + params.join("&") : ""
}

/** Loads image dimensions for the given content as soon as they are available.
 * Note that dimensions are resolved *before* the image fully loads so this function doesn't guarantee the image will display yet.
 */
async function loadContent(content: Content): Promise<ContentImage> {
  const imageDetails = await loadImageDimensions(content.image)
  return { ...content, ...imageDetails }
}

/** Starts loading a given image url and returns the dimensions as soon as they are available.
 * Note that dimensions are resolved *before* the image fully loads so this function doesn't guarantee the image will display yet.
 */
async function loadImageDimensions(src: string) {
  return new Promise<ContentImageExtra>((resolve) => {
    const img = new Image()
    const wait = setInterval(function () {
      const width = img.naturalWidth,
        height = img.naturalHeight
      if (width && height) {
        clearInterval(wait)
        resolve({ width, height })
      }
    }, 30)
    img.addEventListener("error", (_) =>
      resolve({ width: 0, height: 0, error: true })
    )
    img.src = src
  })
}
