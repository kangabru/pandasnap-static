import { useState } from "react"

export const randomMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)]

export const useRandomMessage = (messages: string[]) =>
  useState(randomMessage(messages))[0]

export const errorMessages = [
  "Something broke 😥",
  "Opps, it died 😥",
  "Something happened 😥",
]

export const shortErrorMessages = ["It broke 😥", "Opps 😥", "Error 😥"]

export const useRandomError = () => useRandomMessage(errorMessages)
export const useRandomErrorShort = () => useRandomMessage(shortErrorMessages)

export const searchTerms = ["Search something...", "Search anything..."]
