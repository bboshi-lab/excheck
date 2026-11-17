import { useRef } from "react"
import { gsap, useGSAP } from "../lib/motion"
import { useReducedMotion } from "./use-reduced-motion"

export function useTaskTransition(done: boolean) {
  const row = useRef<HTMLLIElement>(null)
  const previousDone = useRef(done)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (previousDone.current === done) return

      previousDone.current = done

      if (reducedMotion) return

      gsap.fromTo(
        row.current,
        { backgroundColor: "#ad96ff18" },
        {
          backgroundColor: "transparent",
          duration: 0.7,
          ease: "power2.out",
          clearProps: "backgroundColor",
        },
      )
    },
    { scope: row, dependencies: [done, reducedMotion], revertOnUpdate: true },
  )

  return row
}
