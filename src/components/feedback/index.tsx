import { useEffect, useState } from "react"
import { urls } from "../../common/constants"
import { join, useDocumentListener, useOnEscape } from "../../common/utils"
import {
  Errors,
  icons,
  SaveButton,
  useResizableTextArea,
} from "../common/common"
import { useForm } from "../common/formUtils"

enum FeedbackType {
  bug = "BG",
  idea = "ID",
  comment = "CM",
}

const emailLink =
  urls.email +
  "?subject=Panda Snap Feedback&body=Hey I would love to hear you feedback! Tell me good, the bad, and the ugly. Be honest but nice."

const formInfo = {
  [FeedbackType.comment]: {
    icon: "😁",
    text: "General feedback",
    placeholder: "What's good? What sucks?\nBe honest but nice 🙂",
  },
  [FeedbackType.idea]: {
    icon: "💡",
    text: "I have an idea",
    placeholder: "Oh yeah? Tell me all about it!",
  },
  [FeedbackType.bug]: {
    icon: "🐞",
    text: "I found an issue",
    placeholder: "Ok what happened?",
  },
}

enum FeedbackFloatyState {
  Closed,
  OpenFeedback,
  OpenInfo,
}

/** Renders the feedback and info buttons as fixed elements on the bottom right of the page. */
export function FeedbackInfoFloaties() {
  const [state, setState] = useState(FeedbackFloatyState.Closed)
  const resetState = () => setState(FeedbackFloatyState.Closed)

  // Use click away or escape to close the form
  useOnEscape(resetState)
  useDocumentListener("click", resetState, [state])

  return (
    <section
      className="col fixed bottom-0 right-0 z-40 m-4 w-full max-w-xs items-end space-y-4 text-lg sm:m-8"
      onClick={(e) => e.stopPropagation()}
    >
      {state == FeedbackFloatyState.OpenFeedback && <Feedback />}
      {state == FeedbackFloatyState.OpenInfo && (
        <InfoMenu
          openFeedback={() => setState(FeedbackFloatyState.OpenFeedback)}
        />
      )}
      <HoverButton
        isOpen={state != FeedbackFloatyState.Closed}
        open={() => setState(FeedbackFloatyState.OpenInfo)}
        close={resetState}
      />
    </section>
  )
}

function HoverButton(props: {
  isOpen: boolean
  open: () => void
  close: () => void
}) {
  const onClick = props.isOpen ? props.close : props.open
  const title = props.isOpen ? "Close" : "Get help"
  const content = props.isOpen ? icons.cross() : "?"
  const classes = props.isOpen
    ? "bg-white hover:bg-gray-200"
    : "button button-primary text-2xl"

  return (
    <button
      title={title}
      type="button"
      onClick={onClick}
      className={join(
        "button row h-10 w-10 justify-center rounded-full shadow-md",
        classes
      )}
    >
      {content}
    </button>
  )
}

function InfoMenu(props: { openFeedback: () => void }) {
  const classes =
    "row space-x-2 button-outline py-4 px-5 font-semibold hover:bg-gray-200 w-full text-center"
  return (
    <div className="col overflow-hidden rounded-lg bg-white shadow-lg">
      <a href={urls.about} className={classes}>
        {" "}
        <span>🧔</span> <span>About</span>{" "}
      </a>
      <a href={urls.whatsNew} className={classes}>
        {" "}
        <span>🎁</span> <span>What&apos;s new</span>{" "}
      </a>
      <a href={urls.howTo} className={classes}>
        {" "}
        <span>🤔</span> <span>How-to guide</span>{" "}
      </a>
      <button
        onClick={props.openFeedback}
        className={join(classes, "border-t-2 border-green-300")}
      >
        {" "}
        <span>💬</span> <span className="font-bold">Feedback</span>
      </button>
    </div>
  )
}

/** Renders an open feedback form to be used as a component on a page. */
export function FeedbackFixed() {
  return (
    <div className="col justify-center">
      <Feedback />
    </div>
  )
}

enum FeedbackState {
  SelectType,
  Form,
  Confirmation,
}
const defaultState = FeedbackState.SelectType

function Feedback() {
  const [state, setState] = useState<FeedbackState>(defaultState)
  const resetState = () => setState(defaultState)

  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    FeedbackType.bug
  )
  const onSelectType = (type: FeedbackType) => {
    setFeedbackType(type)
    setState(FeedbackState.Form)
  }

  const onSuccess = () => {
    setState(FeedbackState.Confirmation)
    setTimeout(resetState, 1500)
  }

  return state == FeedbackState.Confirmation ? (
    <FeedbackPanelConfirm />
  ) : state == FeedbackState.Form ? (
    <FeedbackPanelCommentForm
      back={resetState}
      onSuccess={onSuccess}
      feedbackType={feedbackType}
    />
  ) : (
    <FeedbackPanelSelectType onSelectFeedbackType={onSelectType} />
  )
}

function FeedbackPanelSelectType(props: {
  onSelectFeedbackType: (feedbackType: FeedbackType) => void
}) {
  const selectType = (feedbackType: FeedbackType) => () =>
    props.onSelectFeedbackType(feedbackType)

  return (
    <FeedbackPopupContainer>
      <div className="col space-y-3 pb-3">
        <p className="text-center font-semibold">What feedback do you have?</p>
        <div className="col mx-auto items-start">
          {Object.entries(formInfo).map(([type, { icon, text }]) => (
            <button
              key={text}
              className="row button-outline w-full rounded py-2 pl-1 pr-3 hover:bg-gray-200 focus:z-10"
              onClick={selectType(type as FeedbackType)}
            >
              <span className="w-8 text-center">{icon}</span>
              {text}
            </button>
          ))}
        </div>
      </div>
    </FeedbackPopupContainer>
  )
}

function FeedbackPanelCommentForm(props: {
  feedbackType: FeedbackType
  back: () => void
  onSuccess: () => void
}) {
  const { submit, formState } = useForm(urls.feedback, props.onSuccess)
  const [text, textRef] = useResizableTextArea()

  useEffect(() => textRef?.current?.focus())

  const info = formInfo[props.feedbackType]

  return (
    <FeedbackPopupContainer
      header={
        info && (
          <div className="w-full pr-2">
            <span className="mr-1">{info.icon}</span> {info.text}
          </div>
        )
      }
    >
      <form className="w-full" onSubmit={(e) => submit(e, "POST")}>
        <input
          type="text"
          name="feedback_type"
          value={props.feedbackType}
          hidden
          className="hidden"
        />
        <input
          type="text"
          name="url"
          value={document.URL}
          hidden
          className="hidden"
        />
        <div className="col w-full space-y-4">
          <textarea
            name="feedback"
            maxLength={500}
            value={text}
            ref={textRef as any}
            autoFocus
            placeholder={info.placeholder}
            rows={5}
            className="shadow-outline w-full resize-none break-words rounded p-3 outline-none"
          ></textarea>

          <Errors errors={formState.errors} />

          <div className="row w-full justify-between">
            <button type="button" className="button" onClick={props.back}>
              Back
            </button>
            <SaveButton
              isLoading={formState.isLoading}
              text="Send"
              textLoading="Sending"
            />
          </div>
        </div>
      </form>
    </FeedbackPopupContainer>
  )
}

function FeedbackPanelConfirm() {
  return (
    <FeedbackPopupContainer>
      <p className="my-10 text-center text-2xl">Thank you! 🙏</p>
    </FeedbackPopupContainer>
  )
}

function FeedbackPopupContainer(props: {
  header?: JSX.Element
  children: JSX.Element
}) {
  const linkClass =
    "text-white focus:outline-none focus:shadow-outline-white rounded transform hover:scale-105 ml-2 p-1"

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="col bg-green-400 px-5 py-3 text-center text-white">
        {props.header ?? (
          <div className="space-y-3">
            <p className="text-xl">Help me make Panda Snap awesome!</p>
            <p className="text-base">
              Want to chat?
              <a className={linkClass} href={emailLink} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-mt-1 inline h-4"
                  viewBox="0 2 24 20"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </a>
              <a className={linkClass} href={urls.twitter} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-mt-1 inline h-4"
                  viewBox="0 2 24 20"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                </svg>
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="p-3">{props.children}</div>
    </div>
  )
}
