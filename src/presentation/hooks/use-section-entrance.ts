import { useRef } from "react"
import { gsap, useGSAP } from "../lib/motion"
import { useReducedMotion } from "./use-reduced-motion"

export function useSectionEntrance(ready = true) {
  const scope = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!ready || reducedMotion) return

      gsap.fromTo(
        "[data-entrance]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform" },
      )
    },
    { scope, dependencies: [ready, reducedMotion], revertOnUpdate: true },
  )

  return scope
}
