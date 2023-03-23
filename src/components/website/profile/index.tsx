import {
  ButtonHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  useContext,
} from "react"
import { animated, useTransition } from "react-spring"
import { urls } from "@/common/constants"
import { useBoolState, useDocumentListener, useOnEscape } from "@/common/utils"
import { ClickProtector, icons } from "@/common"

type HtmlAttrs = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const PropsContext = createContext<MainProps>({})
type MainProps = {
  avatar?: string
  isSuperUser?: boolean
}

export default function Profile(props: MainProps) {
  const [isOpen, close, open] = useBoolState(false)
  useOnEscape(close, isOpen)
  useDocumentListener("click", close, [isOpen])

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <ClickProtector>
      <PropsContext.Provider value={props}>
        <ProfileImage onClick={open} onMouseOver={open} />
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={{ ...props, zIndex: 2000 }}>
                <ProfileMenu close={close} />
              </animated.div>
            )
        )}
      </PropsContext.Provider>
    </ClickProtector>
  )
}

function ProfileImage(
  props: Partial<Pick<HtmlAttrs, "onClick" | "onMouseOver">>
) {
  const context = useContext(PropsContext)
  return (
    <button
      {...props}
      className="button-outline relative h-10 w-10 overflow-hidden rounded-full bg-white"
    >
      {context.avatar ? (
        <div
          style={{ backgroundImage: `url('${context.avatar}')` }}
          className="pointer-events-none block h-full w-full bg-cover bg-center"
        ></div>
      ) : (
        icons.user("absolute inset-0 -m-2 text-green-300")
      )}
    </button>
  )
}

function ProfileMenu(props: { close: () => void }) {
  const context = useContext(PropsContext)
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        props.close()
      }}
      onMouseLeave={props.close}
      className="absolute top-0 right-0 z-20 -m-2 flex flex-col rounded bg-white shadow"
    >
      <div className="self-end p-2">
        <ProfileImage onClick={props.close} />
      </div>
      <MenuLink title="Home" url={urls.home} icon={icons.home} />
      <MenuLink title="Settings" url={urls.profile} icon={icons.user} />
      {context.isSuperUser && (
        <MenuLink title="Admin" url={urls.admin} icon={icons.admin} />
      )}
      <MenuLink title="Logout" url={urls.logout} icon={icons.logout} />
    </div>
  )
}

function MenuLink(props: {
  url: string
  title: string
  icon: (cls: string) => JSX.Element
}) {
  return (
    <a
      href={props.url}
      className="row button-outline space-x-3 rounded py-4 pl-4 pr-5 text-2xl hover:bg-green-100"
    >
      {props.icon("text-gray-500 w-8 h-8")}
      <span>{props.title}</span>
    </a>
  )
}
