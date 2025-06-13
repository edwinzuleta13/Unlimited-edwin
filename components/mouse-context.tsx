"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MouseContextType {
  cursorVariant: string
  setCursorVariant: (variant: string) => void
}

const MouseContext = createContext<MouseContextType>({
  cursorVariant: "default",
  setCursorVariant: () => {},
})

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      border: "2px solid rgba(147, 51, 234, 0.5)",
    },
    button: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      border: "2px solid rgba(147, 51, 234, 0.3)",
    },
    text: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      border: "2px solid rgba(147, 51, 234, 0.4)",
    },
  }

  return (
    <MouseContext.Provider value={{ cursorVariant, setCursorVariant }}>
      <div className="cursor-none">
        <AnimatePresence>
          <motion.div
            className="cursor"
            variants={variants}
            animate={cursorVariant}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
            }}
          />
        </AnimatePresence>
        {children}
      </div>
    </MouseContext.Provider>
  )
}

export const useMouse = () => useContext(MouseContext)

