import { useState } from "react"

const randomMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)]

export const useRandomMessage = (messages: string[]) =>
  useState(randomMessage(messages))[0]
