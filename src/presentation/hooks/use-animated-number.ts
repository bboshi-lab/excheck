import { useEffect, useRef, useState } from "react"
import { gsap } from "../lib/motion"
import { useReducedMotion } from "./use-reduced-motion"

export function useAnimatedNumber(value: number) {
  const reducedMotion = useReducedMotion()
  const animated = useRef({ value })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reducedMotion) {
      animated.current.value = value
      setDisplay(value)
      return
    }

    const tween = gsap.to(animated.current, {
      value,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(animated.current.value)),
    })

    return () => {
      tween.kill()
    }
  }, [value, reducedMotion])

  return display
}
