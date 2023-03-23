import ClientOnly from "@/common/client-only"
import { Footer, Header } from "@/components/common"
import Image, { StaticImageData } from "next/image"
import imageCode from "public/images/upgrade/code-snippet.jpg"
import imageSnap from "public/images/upgrade/instant-snap.jpg"
import imageSource from "public/images/upgrade/page-source.jpg"
import UpgradeAnimation from "./upgradeAnimation"

export default function Upgrade() {
  return (
    <main>
      <Header />

      <section className="mb-5 px-4 sm:px-6 lg:px-8">
        <div className="col text-center">
          <h1 className="font-display mt-9 text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Unlock premium features
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xl leading-7 text-gray-700 lg:max-w-3xl lg:text-2xl lg:leading-8">
            Get the following features and take unlimited snaps.
          </p>
        </div>
      </section>

      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}

type Feature = {
  title: string
  image: StaticImageData | string
  notes: string[]
}

const features: Feature[] = [
  {
    title: "Save source code",
    image: imageCode,
    notes: [
      "Websites change over time so save the entire page source code.",
      "We save all code and images as a single file - even JS.",
    ],
  },

  {
    title: "Save code snippets",
    image: imageSnap,
    notes: [
      "Extract the code of specific elements to help you in future.",
      "Perfect for capturing nifty CSS tricks for example.",
    ],
  },

  {
    title: "Video snaps",
    image: "#video",
    notes: [
      "Capture gifs just like you can with images.",
      "Great for animations, mouse interactions, and UX flows.",
    ],
  },

  {
    title: "Instant snap",
    image: imageSource,
    notes: [
      "Free users must wait for images to upload but large ones take time.",
      "We'll upload them in the background so you can continue instantly.",
    ],
  },
]

function Features() {
  return (
    <div className="container max-w-screen-md px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      {features.map((feature) => (
        <>
          <section className="flex flex-col items-center space-y-4 md:flex-row-reverse md:space-y-0">
            <div className="prose prose-xl mt-2 flex-1 md:ml-6">
              <h2 className="id-highlight mb-3 text-3xl font-semibold leading-none">
                {feature.title}
              </h2>
              <ul>
                {feature.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            {feature.image == "#video" ? (
              <div className="w-full max-w-xs">
                <div className="aspect-w-3 aspect-h-2 relative h-full w-full overflow-hidden rounded bg-gray-200">
                  <ClientOnly>
                    <UpgradeAnimation />
                  </ClientOnly>
                </div>
              </div>
            ) : (
              <Image
                alt=""
                src={feature.image}
                className="block max-w-xs rounded object-cover"
              />
            )}
          </section>

          <hr className="my-10" />
        </>
      ))}
    </div>
  )
}

type Plan = {
  title: string
  features: string[]
  amount: string
  period: string
  primary?: boolean
  amountCutout?: string
}

const plansCasual: Plan = {
  title: "Casual Panda",
  amount: "5",
  period: "month",
  features: ["Cancel at anytime!", "Unlimited snaps", "Premium features *"],
}

const plansPower: Plan = {
  title: "Power Panda",
  amount: "50",
  amountCutout: "60",
  primary: true,
  period: "year",
  features: ["2 months free!", "Unlimited snaps", "Premium features *"],
}

function Pricing() {
  return (
    <section className="lg:items-normal mx-auto mb-20 flex w-full max-w-4xl flex-col flex-wrap items-center justify-center space-y-5 sm:space-y-0 md:flex-row lg:flex-nowrap">
      <div className="z-10 max-w-sm justify-center lg:-my-5 lg:-mb-5 lg:flex-1">
        <div className="flex w-full transform flex-col items-center justify-center space-y-3 rounded-lg border-4 border-green-400 bg-white px-12 py-8 text-gray-800 shadow-md transition-transform duration-150 hover:scale-101 sm:m-5 sm:w-auto lg:m-0 lg:h-full lg:px-20 lg:py-14">
          <PricingBlock plan={plansPower} />
        </div>
      </div>

      <div className="max-w-xs md:-ml-1 lg:flex-1">
        <div className="flex w-full flex-col items-center justify-center space-y-3 rounded-lg border-2 border-green-400 bg-white px-12 py-8 text-gray-800 shadow-md sm:m-5 sm:w-auto lg:m-0 lg:rounded-l-none lg:px-20 lg:py-12">
          <PricingBlock plan={plansCasual} />
        </div>
      </div>
    </section>
  )
}

function PricingBlock({ plan }: { plan: Plan }) {
  return (
    <>
      <p
        className={`font-display ${
          plan.primary ? "text-3xl" : "text-2xl"
        } text-center font-semibold leading-9 text-gray-800`}
      >
        {plan.title}
      </p>

      <p className="font-display mb-4 flex items-center justify-center">
        {plan.amountCutout && (
          <span className="-ml-8 text-right text-2xl font-semibold leading-8 tracking-wide text-gray-400 line-through sm:text-3xl sm:leading-9">
            ${plan.amountCutout}
          </span>
        )}
        <span className="sm:text-7xl flex items-start px-3 text-6xl font-medium leading-none tracking-tight text-gray-900">
          <span className="mt-2 mr-1 text-4xl leading-none sm:text-5xl">$</span>
          <span>{plan.amount}</span>
        </span>
        {plan.period && (
          <span className="text-2xl font-semibold leading-8 tracking-wide text-gray-400 sm:text-3xl sm:leading-9">
            /{plan.period}
          </span>
        )}
      </p>

      <ul className="space-y-2 py-5 text-lg font-semibold">
        {plan.features.map((feature) => (
          <li key={feature} className="row -ml-3 text-center">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 text-teal-500 opacity-50"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-3 whitespace-nowrap pl-2 text-lg font-medium leading-6 text-gray-600">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <div className="pt-3">
        <button
          className={`inline-flex items-center whitespace-nowrap px-4 font-semibold shadow-md ${
            plan.primary
              ? "button button-primary pb-3 text-3xl"
              : "button text-2xl"
          }`}
        >
          Buy now
        </button>
      </div>
    </>
  )
}
