import { useEffect, useState } from "react"

export default function Flash({ onFinish }: { onFinish?: () => void }) {
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    setOpacity(0)
    onFinish && setTimeout(onFinish, 1000)
  }, [onFinish])
  return (
    <div
      className="fixed inset-0 z-max bg-white transition-opacity duration-2000"
      style={{ opacity }}
    ></div>
  )
}
