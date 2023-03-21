import { PropsWithChildren, useEffect, useState } from "react"

export default function ClientOnly({ children }: PropsWithChildren) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => void setHasMounted(true), [])
  return hasMounted ? <>{children}</> : null
}
