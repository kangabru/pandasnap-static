"use client"

import { useCallback, useEffect, useState } from "react"
import { animated, useSpring, useTrail } from "react-spring"
import { join } from "../../common/utils"

export default function UpgradeAnimation() {
  return (
    <div>
      <Animation />
      <CropUi />
    </div>
  )
}

const colors = ["bg-red-400 w-4/5", "bg-blue-400 w-full", "bg-yellow-400 w-3/4"]
const angles = [5, -7, 12]

function Animation() {
  const [open, setOpen] = useState(true)
  const trail = useTrail(colors.length, {
    angle: open ? 1 : 0,
  })

  const getPos = useCallback(
    () => ({ pLeft: open ? 10 : -40, pTop: open ? 10 : -10 }),
    [open]
  )
  const [{ pLeft, pTop }, setPos] = useSpring(() => getPos())

  useEffect(() => {
    setPos(getPos())
    const int = setTimeout(() => setOpen(!open), 2000)
    return () => clearTimeout(int)
  }, [getPos, open, setPos])

  return (
    <div className="absolute inset-10">
      {trail.map(({ angle, ...rest }, index) => (
        <animated.div
          key={colors[index]}
          className={join(
            colors[index],
            "absolute left-1/2 top-1/2 h-full rounded-sm"
          )}
          style={{
            ...rest,
            transform: angle.interpolate(
              (a) =>
                `translateX(-50%) translateY(-50%) rotate(${
                  a * angles[index]
                }deg`
            ),
          }}
        ></animated.div>
      ))}
      <div className="absolute inset-0 h-full w-full rounded-sm bg-gray-200 bg-gradient-to-r from-purple-200 via-transparent to-purple-200 shadow"></div>
      <svg
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform"
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

      <animated.svg
        className="absolute h-12 w-12"
        fill="currentColor"
        viewBox="0 -10 20 20"
        style={{
          right: pLeft.interpolate((x) => `${x}%`),
          bottom: pTop.interpolate((x) => `${x}%`),
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="m3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
          clipRule="evenodd"
        ></path>
      </animated.svg>
    </div>
  )
}

function CropUi() {
  return (
    <>
      <div className="absolute inset-2 m-2 border-4 border-dashed border-gray-500"></div>
      <div className="absolute top-2 left-2 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute right-2 bottom-2 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute bottom-2 left-2 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute top-2 left-1/2 -ml-3 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute bottom-2 left-1/2 -ml-3 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute left-2 top-1/2 -mt-3 h-5 w-5 rounded-full bg-white shadow"></div>
      <div className="absolute right-2 top-1/2 -mt-3 h-5 w-5 rounded-full bg-white shadow"></div>
    </>
  )
}
