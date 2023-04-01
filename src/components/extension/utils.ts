import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useKeyUpEffect(
  keyup: (e: KeyboardEvent) => void,
  inputs: any[] = []
) {
  useEffect(() => {
    document.addEventListener("keyup", keyup)
    return () => document.removeEventListener("keyup", keyup)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}

export function Wait(timeout: number, ...args: any[]) {
  return new Promise((accept) => setTimeout(accept, timeout, ...args))
}

export function useOpenExperiment() {
  const router = useRouter()
  const openExperiment = () => router.push("/upgrade")
  return openExperiment
}
