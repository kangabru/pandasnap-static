"use client"

import Image, { StaticImageData } from "next/image"

import iconChrome from "public/icons/chrome.png"
import iconFirefox from "public/icons/firefox.png"
import iconLogo from "public/icons/logo.png"

import imageDemo1 from "public/images/demo1.jpg"
import imageDemo2 from "public/images/demo2.jpg"
import imageDemo3 from "public/images/demo3.jpg"
import imageLandingPanda from "public/images/landing-panda.jpg"
import imageLandingStripe from "public/images/landing.jpg"
import imagePromoCover from "public/images/promo-cover.jpg"

import ClientOnly from "@/common/client-only"
import { IDS } from "@/common/constants"
import { isOneOf, Wait } from "@/common/utils"
import Flash, { Disclaimer, Footer } from "@/components/common"
import { scrollToElement } from "@/components/website/landing"
import ImageForm, {
  SetImage,
  SnappedImage,
} from "@/components/website/landing/imageForm"
import ImageSelect from "@/components/website/landing/imageSelect"
import Link from "next/link"
import { useMemo, useState } from "react"

let ImageSnapMap = {
  [SnappedImage.elem1]: imageDemo1,
  [SnappedImage.elem2]: imageDemo2,
  [SnappedImage.elem3]: imageDemo3,
  [SnappedImage.landingStripe]: imageLandingStripe,
  [SnappedImage.landingPanda]: imageLandingPanda,
}

export default function LandingPage() {
  return (
    <main className="w-full border-b-8 border-green-200 bg-white">
      <LandingHeader />
      <div className="h-28 bg-indigo-100 sm:h-40"></div>
      <Banner />
      <Interactive />
      <Footer />
      <MadeByFlaticon />
    </main>
  )
}

function LandingHeader() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <Disclaimer />
      <div className="row justify-between bg-white py-2 px-4 text-lg shadow-lg sm:py-3 sm:px-6 sm:text-xl">
        <div className="row button-outline group space-x-4 rounded px-3 py-2">
          <Image
            src={iconLogo}
            alt="Logo"
            className="pointer-events-none h-6 w-8 scale-100 transform sm:h-8 sm:w-10 lg:h-10 lg:w-12"
          />

          <span className="hidden whitespace-nowrap sm:block md:text-2xl lg:text-3xl">
            Panda Snap
          </span>
        </div>

        <div className="row space-x-3 sm:space-x-5">
          <Link
            href="/dashboard"
            className="font-semibold text-gray-800 hover:underline"
          >
            Dashboard
          </Link>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 1 1 1"
        preserveAspectRatio="none"
        className="h-1 w-full fill-current text-white sm:h-2 lg:h-3"
      >
        <path d="M 0 2 Q 0.5 0 1 2 L 1 0 L 0 0 Z"></path>
      </svg>
    </header>
  )
}

function Interactive() {
  let [imageSnapped, setImageSnapped] = useState<SnappedImage>(
    SnappedImage.landingStripe
  )
  let [imageSaved, setImageSaved] = useState<SnappedImage>()

  const reset = () => {
    scrollToElement(IDS.section1)
    Wait(1000).then(() => {
      setImageSnapped(SnappedImage.landingStripe)
      setImageSaved(undefined)
    })
  }

  return (
    <ClientOnly>
      <Step1 onSnap={setImageSnapped} />
      <BrowserExtensions />
      <SelectAnElement onSnap={setImageSnapped} />
      <ArrowBreak />
      <Step2 snapped={imageSnapped} onSave={setImageSaved} />
      <Step3 reset={reset} />
      <FinalSnap saved={imageSaved} />
    </ClientOnly>
  )
}

function Banner() {
  return (
    <section className="bg-gradient-to-b from-indigo-100 text-center">
      <div className="container">
        <h1 className="text-4xl font-semibold leading-snug sm:text-5xl lg:text-6xl">
          Design faster by &apos;snapping&apos; website designs that inspire you
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-800 sm:text-2xl">
          Use our extension to snapshot elements, entire pages, and even source
          code.
        </p>

        <div className="col mt-10 space-y-4">
          <Link
            href="/dashboard"
            className="button button-primary row button-shadow button-outline justify-center space-x-3 rounded-lg py-3 px-4 text-2xl font-bold text-white"
          >
            <span className="text-2xl sm:text-3xl">Get started</span>
          </Link>
          <p className="mt-4 text-xl text-gray-800">
            Unlimited lifetime snaps starting at $0
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-2xl">
          {process.env.NODE_ENV === "production" ? (
            <video
              className="button-outline overflow-hidden rounded"
              controls={false}
              preload="auto"
              src="https://kb-elemental.s3.amazonaws.com/videos/promo-264.mp4"
            />
          ) : (
            <div className="aspect-w-16 aspect-h-9 mx-auto w-full max-w-6xl overflow-hidden rounded-lg border-1 border-gray-400 shadow-lg">
              <Image
                alt=""
                src={imagePromoCover}
                className="w-full overflow-hidden rounded bg-cover bg-center object-cover"
              />
            </div>
          )}

          <p className="mt-10 text-lg">
            Made with 🤟 by
            <a
              href="https://twitter.com/kanga_bru"
              target="_blank"
              rel="noreferrer"
              className="button-outline rounded p-1 text-green-500 hover:underline"
            >
              kangabru
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

function Step1({ onSnap }: { onSnap: SetImage }) {
  const [showFlash, setShowFlash] = useState(false)

  const flashOn = () => {
    onSnap(SnappedImage.landingPanda)
    setShowFlash(true)
  }
  const flashOff = () => {
    scrollToElement(IDS.section2)
    setShowFlash(false)
  }

  return (
    <section className="col container mt-8 text-center">
      {showFlash && <Flash onFinish={flashOff} />}

      <svg
        className="mb-5 h-32 rotate-90 transform text-green-200"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 375.01 375.01"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          d="M330.254,210.966c-56.916,1.224-110.16,25.704-167.076,28.764c-16.524,0.612-33.048-1.224-45.9-8.568 c23.256-4.283,45.288-12.239,61.812-27.54c17.749-15.911,19.584-45.287,8.568-66.095c-10.404-19.584-36.72-20.196-55.08-15.3 C89.125,132.63,59.75,184.65,84.229,221.369c-26.928,1.836-53.856,0-80.172,1.225c-5.508,0.611-5.508,8.567,0.612,8.567 c26.928,1.836,59.364,4.284,91.188,2.448c1.836,1.225,3.672,3.061,5.508,4.284c64.872,45.288,159.732-11.628,229.5-13.464 C338.821,223.817,338.821,210.354,330.254,210.966z M89.737,196.277c-6.732-25.091,15.3-46.511,35.496-56.916 c20.196-10.404,48.96-10.404,55.692,15.912c7.956,30.6-18.36,48.959-43.452,56.916c-11.628,3.672-22.644,6.12-34.272,7.344 C96.47,213.413,92.186,206.069,89.737,196.277z"
        />
        <path
          fill="currentColor"
          d="M371.869,211.577c-8.567-5.508-16.523-11.016-24.479-16.523c-6.732-4.896-13.464-10.404-21.42-12.24 c-6.12-1.836-12.24,7.344-6.732,11.627c6.732,4.896,14.076,9.18,20.809,13.464c4.896,3.061,9.792,6.732,14.075,9.792 c-4.896,2.448-9.792,4.284-14.688,6.732c-3.672,1.836-7.956,3.672-11.628,5.508c-1.224,0.612-2.448,1.836-3.061,3.06 c-1.836,2.448-0.611,1.225,0,0.612c-2.447,1.836-2.447,7.956,1.837,7.344l0,0c1.224,0.612,2.447,0.612,4.283,0.612 c4.284-1.224,9.181-3.06,13.464-4.896c9.181-3.673,18.36-7.345,26.929-12.24C376.153,220.758,376.153,214.025,371.869,211.577z"
        />
      </svg>

      <h2 id={IDS.section1} className="row mb-4 text-4xl">
        <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-400 p-2 text-lg font-bold text-white">
          1
        </span>
        Snap designs you care about
      </h2>
      <p className="max-w-3xl text-xl leading-loose">
        Screenshot entire landing pages or specific elements that inspire you.
        <br />
        Forget bookmarks, save the actual designs!
        <span className="text-lg">(We save the url too)</span>
      </p>

      <h2 className="mt-10 text-3xl">
        <span>Try it out!</span>
      </h2>

      <div className="row relative mt-5 space-x-1 rounded-lg bg-white p-3 text-center text-xl shadow-md">
        <svg
          className="absolute top-0 left-0 h-20 w-20 -translate-x-8 -translate-y-8 transform text-green-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
        >
          <path
            fill="currentColor"
            d="M283.25,18.46c-115.78,8.72-162-18.46-254-7.3A23,23,0,0,0,10.39,25,27.61,27.61,0,0,0,8.17,35.69C5.86,157.47,23.06,195.39,15.69,283c-1,17,13.59,13.94,19.18,1.59,28.84-71.16-5.93-168.61-1.29-232,.68-9.26,8.48-15.39,17.77-15.26,75.31,1,135.61,22.32,235.59.23a14.91,14.91,0,0,0,1.85-.51C300.43,32.77,298.89,17.64,283.25,18.46Z"
          />
        </svg>

        <svg
          className="absolute bottom-0 right-0 h-20 w-20 translate-x-8 translate-y-8 rotate-180 transform text-green-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
        >
          <path
            fill="currentColor"
            d="M283.25,18.46c-115.78,8.72-162-18.46-254-7.3A23,23,0,0,0,10.39,25,27.61,27.61,0,0,0,8.17,35.69C5.86,157.47,23.06,195.39,15.69,283c-1,17,13.59,13.94,19.18,1.59,28.84-71.16-5.93-168.61-1.29-232,.68-9.26,8.48-15.39,17.77-15.26,75.31,1,135.61,22.32,235.59.23a14.91,14.91,0,0,0,1.85-.51C300.43,32.77,298.89,17.64,283.25,18.46Z"
          />
        </svg>

        <button
          className="col button-outline w-40 rounded border-blue-500 py-2 px-4 transition-colors duration-150 hover:border-1 hover:bg-blue-100"
          onClick={flashOn}
        >
          <div className="relative my-3 mx-auto h-16 w-24">
            <div className="absolute inset-0 -my-2 mx-1 bg-blue-200"></div>
            <div className="absolute inset-0 border-4 border-blue-900   "></div>
          </div>
          <span className="whitespace-nowrap">Snap Page</span>
        </button>

        <button
          id="root-snap-elem"
          className="col button-outline w-40 rounded border-blue-500 py-2 px-6 transition-colors duration-150 hover:border-1 hover:bg-blue-100"
          onClick={() => scrollToElement(IDS.snapAnElement)}
        >
          <div className="relative my-3 mx-auto h-16 w-24">
            <div className="absolute inset-0 bg-blue-200"></div>
            <div className="absolute inset-0 border-4 border-blue-900"></div>
          </div>
          <span className="whitespace-nowrap">Snap Element</span>
        </button>
      </div>
    </section>
  )
}

function BrowserExtensions() {
  return (
    <section className="col container text-center">
      <svg
        className="mt-10 mb-8 h-32 rotate-180 transform text-green-200"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 346.393 346.393"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          d="M204.651,58.521c-4.284-21.42-15.3-39.78-28.764-56.305c-3.061-3.672-9.181-2.447-11.629,1.225   c-11.016,19.584-20.196,41.004-22.644,63.647c-0.612,6.732,9.792,7.345,11.016,1.225c4.284-16.524,10.404-32.437,18.36-47.736   c3.06,4.284,6.121,9.18,8.569,14.076c-4.284-4.284-14.077-2.448-14.077,5.508c-0.612,99.756-23.256,202.571-5.508,301.104   c1.224,7.956,14.688,6.12,14.076-1.836c-7.956-100.368,7.345-198.899,7.957-299.268c0-0.612,0-1.224,0-1.224   c3.672,7.344,6.119,14.688,7.956,23.256C191.188,71.985,206.487,68.313,204.651,58.521z"
        />
      </svg>

      <h3 className="mb-3 text-3xl">Snapshot specific elements</h3>
      <p className="max-w-3xl text-xl">
        Use our browser extension to quickly snapshot elements on the go.
      </p>

      <div className="row mt-5 flex-wrap justify-center">
        <Link
          className="row button bg-white-200 mx-2 mt-2 block space-x-1.5 whitespace-nowrap rounded-lg py-3 px-4 text-xl"
          href="/extension"
        >
          <Image
            alt=""
            className="pointer-events-none -ml-1 -mt-1 inline h-6 w-6"
            src={iconChrome}
          />
          <span>Chrome</span>
        </Link>
        <Link
          className="row button bg-white-200 mx-2 mt-2 block space-x-1.5 whitespace-nowrap rounded-lg py-3 px-4 text-xl"
          href="/extension"
        >
          <Image
            alt=""
            className="pointer-events-none -ml-1 -mt-1 inline h-6 w-6"
            src={iconFirefox}
          />
          <span>Firefox</span>
        </Link>
      </div>
    </section>
  )
}

function SelectAnElement({ onSnap }: { onSnap: SetImage }) {
  let onClick: SetImage = (image) => {
    onSnap(image)
    scrollToElement(IDS.section2)
  }
  return (
    <section className="mt-12">
      <div className="row justify-center space-x-5">
        <span id={IDS.snapAnElement} className="text-center text-3xl">
          Select an element
        </span>
        <svg
          className="w-32 rotate-90 transform text-green-200"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 365.28 365.28"
          xmlSpace="preserve"
        >
          <path
            fill="currentColor"
            d="M364.091,335.48c-19.584-32.436-40.392-64.26-59.976-96.695c-3.672-6.12-14.076-3.673-13.465,3.672   c0,14.076,0.612,27.54,0.612,41.616c-9.792-10.404-12.24-22.645-14.076-37.332c-1.224-6.12-3.672-12.853-10.403-14.688   c-10.404-3.06-22.032,7.344-29.988,12.852c-20.196,14.076-38.556,30.601-60.588,42.229c-25.704,12.852-26.316-5.508-20.808-25.704   c5.508-21.42,15.3-42.84,26.316-61.812c19.584-33.048,42.229-67.32,47.736-105.876c3.06-21.42-7.956-53.856-34.885-52.632   c-33.047,1.224-70.992,25.704-92.412,50.184c-12.24,12.24-82.008,104.04-88.74,51.408c-4.896-38.556,26.928-85.68,45.9-117.504   c2.448-4.284-3.672-8.568-6.732-4.896C28.715,49.677,9.743,87.009,1.175,124.341c-4.284,20.196,2.448,57.528,31.824,49.572   c34.272-9.18,56.916-47.736,78.948-73.44c13.464-16.524,34.884-28.764,53.244-38.556c39.168-20.808,56.916,9.792,47.124,45.288   c-12.239,43.452-43.452,78.947-61.2,119.952c-6.12,14.688-28.152,63.647-4.284,75.888c27.54,14.076,64.26-20.809,83.844-36.108   c-1.224,0.612,31.212-25.704,33.048-20.195c1.836,5.508,1.836,12.239,3.061,18.359c2.447,11.628,7.344,20.809,15.3,28.152   c-11.628-0.612-23.256,0-34.884,1.836c-6.12,1.224-6.732,10.404-1.836,13.464c34.884,19.584,74.052,24.48,111.384,37.332   C362.255,348.333,367.763,340.989,364.091,335.48z M297.995,304.269c3.672,0,4.896-3.06,4.284-5.508   c1.836-1.224,3.06-3.06,3.06-5.508c0-7.956,0-16.524,0-24.48c12.24,19.584,24.48,38.557,36.72,58.141   c-23.256-6.732-47.124-11.628-69.155-20.809C280.859,305.493,289.427,304.881,297.995,304.269z"
          />
        </svg>
      </div>

      <ClientOnly>
        <ImageSelect onSave={onClick} />
      </ClientOnly>
    </section>
  )
}

function ArrowBreak() {
  return (
    <section className="row justify-center">
      <svg
        className="mt-20 w-40 rotate-180 transform text-green-200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 352.2 352.2"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          d="M348.232,100.282c-13.464-32.436-35.496-60.588-45.9-94.86c-1.836-5.508-11.016-7.956-13.464-1.836
                c-14.688,34.272-36.72,65.484-47.124,101.592c-1.836,6.732,7.344,13.464,12.24,7.344c7.344-9.18,15.912-16.524,24.479-25.092
                c-1.224,52.632,0,105.264-9.18,157.284c-4.896,28.152-11.628,59.977-31.824,81.396c-24.479,25.704-55.08,2.448-68.544-21.42
                c-11.628-20.809-31.823-110.772-72.215-79.561c-23.868,18.36-29.988,43.452-37.332,70.992c-1.836,7.956-4.896,15.3-8.568,22.032
                c-14.076,26.316-32.436-16.524-33.048-26.928c-1.224-20.809,4.896-42.229,9.792-62.424c1.836-6.12-7.344-8.568-9.792-2.448
                c-11.016,28.764-26.316,77.724,0,102.815c23.256,21.42,42.84,7.345,52.02-17.748c6.12-16.523,29.376-108.323,56.304-65.483
                c17.748,28.151,22.644,61.812,44.064,88.128c15.3,18.359,42.84,22.644,64.26,13.464c25.704-11.628,36.72-45.9,43.452-70.38
                c16.523-61.2,16.523-127.296,14.688-190.332c14.688,9.792,31.212,18.972,47.736,25.092
                C347.008,113.746,350.681,105.178,348.232,100.282z M268.672,78.25c7.956-17.136,17.748-34.272,26.316-51.408
                c9.18,21.42,20.808,40.392,31.824,61.2c-12.853-7.956-25.092-17.136-39.168-18.972c-3.061-0.612-5.509,1.224-6.732,3.672
                C276.628,73.354,272.345,75.19,268.672,78.25z"
        />
      </svg>
    </section>
  )
}

function Step2(props: { snapped: SnappedImage | undefined; onSave: SetImage }) {
  let imageSrc = useSnappedImageSrc(props.snapped) || imageLandingStripe

  return (
    <section className="col container pt-20 lg:flex-row-reverse lg:justify-evenly lg:space-y-0">
      <div className="col max-w-lg flex-1 items-center justify-center space-y-3 text-center lg:ml-5 lg:items-start lg:text-left">
        <span className="row h-8 w-8 justify-center rounded-full bg-green-400 p-2 text-lg font-bold text-white">
          2
        </span>
        <h2 id={IDS.section2} className="text-4xl">
          Save for the future
        </h2>
        <p className="text-xl">
          Designing from scratch is <i>hard</i>. Build up a collection of
          inspiring designs specific to you.
        </p>

        <div className="row h-16 space-x-4 text-lg">
          <div className="w-32 text-green-200">
            <svg
              className="hidden w-full lg:block"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 346.4 97.8"
              xmlSpace="preserve"
            >
              <path
                fill="currentColor"
                d="M62.2,17.4C41.4,21.7,23.6,32.7,7.7,46.2c-3.6,3.1-2.3,9.2,1.2,11.6c19,11,39.7,20.2,61.7,22.7 c6.5,0.6,7.1-9.8,1.2-11c-16-4.3-31.4-10.4-46.2-18.4c4.2-3.1,8.9-6.1,13.6-8.6c-4.2,4.3-2.3,14.1,5.3,14.1 c96.6,0.6,196.1,23.3,291.5,5.5c7.7-1.2,5.9-14.7-1.7-14.1c-97.2,8-192.5-7.3-289.7-8c-0.6,0-1.2,0-1.2,0c7.1-3.7,14.2-6.1,22.6-8 C75.2,30.9,71.6,15.6,62.2,17.4z"
              />
            </svg>
            <svg
              className="block w-full lg:hidden"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 346.4 97.8"
              xmlSpace="preserve"
            >
              <path
                fill="currentColor"
                d="M18.9,17.4C9.2,36.9,6.8,58.2,7.3,79.5c0.2,4.8,5.8,7.5,10,6.1C38,76.9,58.3,65.5,74.1,49 c4.6-5-3.3-11.8-8-7.7C52.6,51.8,38.1,60.7,22.4,68c0.2-5.3,0.8-11,1.8-16.4c0.8,6,9.7,10.5,14.5,4.2c61.4-78.6,198,29.3,296.5,11.6 c8-1.2,6.1-14.7-1.8-14.1c-100.4,8-246-86.7-307.8-7.6c-0.4,0.5-0.7,1-0.7,1c1.6-8.1,4.1-15.4,7.9-23.3 C37.8,14.9,23.5,8.5,18.9,17.4z"
              />
            </svg>
          </div>
          <span className="text-2xl">Try, it&apos;s interactive</span>
        </div>
      </div>

      <div className="max-w-3xl p-5">
        <div className="pointer-events-auto max-h-full rounded-lg bg-gray-200 shadow-lg">
          <div className="col mb-0 h-100 space-y-3 overflow-hidden p-5">
            <ClientOnly>
              <ImageForm snapped={props.snapped} onSave={props.onSave} />
            </ClientOnly>
            <div className="scrollbar h-full w-full overflow-hidden overflow-y-auto overscroll-contain rounded">
              <Image
                id="root-image"
                src={imageSrc}
                alt="Screenshot"
                className="pointer-events-none w-full rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step3({ reset }: { reset: () => void }) {
  return (
    <section className="col container text-center">
      <svg
        className="my-20 mr-6 w-40 rotate-45 transform text-green-200"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 386.334 386.334"
        xmlSpace="preserve"
      >
        <path
          fill="currentColor"
          d="M335.46,292.346c-16.523-17.136-31.212-35.496-43.452-55.692c-2.447-3.672-7.344-5.508-11.016-3.06    c-21.42,15.912-41.616,33.66-65.484,45.288c28.765-58.14,60.589-115.668,77.112-178.704c1.836-7.344-7.956-14.076-13.464-7.956    c-52.632,61.812-108.937,119.952-168.913,175.032c47.736-59.977,99.145-118.116,121.176-192.168    c2.448-7.344-5.508-11.628-11.628-9.18c-66.708,28.152-129.132,67.932-198.9,88.74c14.688-34.884,33.66-66.708,59.364-94.86    c4.284-4.284-2.448-11.016-6.732-6.732C42.312,84.266,18.444,122.21,0.696,162.602c-2.448,6.12,1.836,12.852,8.568,11.628    C80.256,156.481,143.904,117.313,210,87.326c-32.436,89.964-108.936,157.284-160.956,235.62    c-5.508,7.956,6.12,15.301,12.852,9.792c72.216-61.812,140.148-129.132,203.796-200.124    c-19.584,54.468-48.96,105.264-73.44,157.896c-3.06,6.12,1.836,14.076,9.181,11.628c31.212-9.18,55.691-29.988,81.396-48.96    c12.24,18.36,25.704,35.496,41.004,51.408C331.176,311.93,342.805,300.302,335.46,292.346z"
        />
        <path
          fill="currentColor"
          d="M386.256,324.781c-4.283-24.479-9.792-57.527-26.928-76.5c-4.896-5.508-14.076,0-11.628,6.732    c3.672,12.24,10.404,23.256,14.076,35.496c3.06,9.18,5.508,18.36,7.344,28.152c-22.644-0.612-45.288-3.673-67.932-6.732    c-7.344-0.612-9.181,11.628-1.836,12.852c26.315,5.509,52.632,9.181,79.56,9.792C383.809,335.186,386.868,329.678,386.256,324.781    z"
        />
      </svg>

      <div className="col space-y-5">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-400 p-2 text-xl font-bold text-white">
          3
        </span>
        <h2 className="text-4xl" id={IDS.section3}>
          Browse snaps for inspiration
        </h2>

        <p className="text-xl leading-loose sm:text-2xl">
          We help you organise and find snaps to inspire your next project.
          Create <b>better</b> designs and <b>save time</b> by emulating them.
        </p>
        <div className="pt-4 pb-6">
          <Link
            href="/dashboard"
            className="button button-primary row button-shadow button-outline justify-center space-x-3 rounded-lg py-3 px-5 text-2xl font-bold text-white"
          >
            <span className="text-3xl sm:text-4xl">Join now!</span>
          </Link>
          <p className="mt-4 text-xl text-gray-800">
            It&apos;s free! Unlimited lifetime snaps.
          </p>
        </div>
        <button className="row group cursor-pointer text-xl" onClick={reset}>
          <span className="group-hover:underline">Play again? Go back to </span>
          <span className="ml-2 -mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-300 p-1 text-sm font-bold text-white">
            1
          </span>
        </button>
      </div>
    </section>
  )
}

function FinalSnap(props: { saved: SnappedImage | undefined }) {
  const imgSrc = useSnappedImageSrc(props.saved)
  const isLarge = isOneOf(props.saved, [
    SnappedImage.landingPanda,
    SnappedImage.landingStripe,
  ])

  return (
    <section className="mt-10">
      <div className="row h-16 justify-center space-x-4 px-4 text-center text-lg">
        <div className="w-32 text-green-200">
          <svg
            className="lg block w-full"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 346.4 97.8"
            xmlSpace="preserve"
          >
            <path
              fill="currentColor"
              d="M18.9,17.4C9.2,36.9,6.8,58.2,7.3,79.5c0.2,4.8,5.8,7.5,10,6.1C38,76.9,58.3,65.5,74.1,49 c4.6-5-3.3-11.8-8-7.7C52.6,51.8,38.1,60.7,22.4,68c0.2-5.3,0.8-11,1.8-16.4c0.8,6,9.7,10.5,14.5,4.2c61.4-78.6,198,29.3,296.5,11.6 c8-1.2,6.1-14.7-1.8-14.1c-100.4,8-246-86.7-307.8-7.6c-0.4,0.5-0.7,1-0.7,1c1.6-8.1,4.1-15.4,7.9-23.3 C37.8,14.9,23.5,8.5,18.9,17.4z"
            />
          </svg>
        </div>
        <span className="text-2xl text-green-400">
          Your snap was saved here
        </span>
      </div>

      <div className="row mt-5 h-100 w-full justify-center space-x-4 overflow-hidden">
        <div className="col hidden h-full py-8 lg:flex">
          <div className="h-full w-40 rounded bg-blue-400"></div>
        </div>
        <div className="col hidden h-full space-y-4 py-20 sm:flex">
          <div className="w-40 flex-2 rounded bg-red-400"></div>
          <div className="w-40 flex-1 rounded bg-gray-300"></div>
        </div>
        <div className="col h-full">
          <div className="h-full w-40 rounded bg-yellow-400 p-1">
            {imgSrc && isLarge && (
              <Image
                alt=""
                className="h-full w-full rounded-sm object-cover object-top"
                src={imgSrc}
              />
            )}
          </div>
        </div>
        <div className="col h-full space-y-4 py-4">
          <div className="w-40 flex-1 rounded bg-purple-400 p-1">
            {imgSrc && !isLarge && (
              <Image
                alt=""
                className="h-full w-full rounded-sm object-cover object-top"
                src={imgSrc}
                width="100"
                height="100"
              />
            )}
          </div>
          <div className="w-40 flex-2 rounded bg-red-400"></div>
        </div>
        <div className="col hidden h-full py-16 md:flex">
          <div className="h-full w-40 rounded bg-pink-300"></div>
        </div>
        <div className="col hidden h-full space-y-4 xl:flex">
          <div className="w-40 flex-1 rounded bg-orange-400"></div>
          <div className="w-40 flex-1 rounded bg-green-400"></div>
        </div>
        <div className="col hidden h-full py-24 xl:flex">
          <div className="h-full w-40 rounded bg-yellow-300"></div>
        </div>
      </div>
    </section>
  )
}

function MadeByFlaticon() {
  return (
    <p className="mb-10 pt-3 text-center text-gray-600">
      Icons made by
      <a
        className="link"
        href="https://www.flaticon.com/authors/freepik"
        title="Freepik"
      >
        Freepik
      </a>
      from
      <a className="link" href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </p>
  )
}

function useSnappedImageSrc(
  image: SnappedImage | undefined
): StaticImageData | undefined {
  return useMemo(
    () => (image === undefined ? undefined : ImageSnapMap[image]),
    [image]
  )
}
