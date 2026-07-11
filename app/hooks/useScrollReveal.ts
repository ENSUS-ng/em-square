"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!ref.current || revealed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [revealed])

  return {
    ref,
    revealed,
  }
}
