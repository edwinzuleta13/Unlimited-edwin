"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function TechCursor() {
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
      backgroundColor: "rgba(147, 51, 234, 0.3)",
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      mixBlendMode: "difference" as const,
    },
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  }

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorVariant("text")
      }
    }

    const handleMouseOut = () => {
      setCursorVariant("default")
    }

    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <motion.div
      className="tech-cursor"
      variants={variants}
      animate={cursorVariant}
      transition={spring}
      style={{
        position: "fixed",
        zIndex: 9999,
        pointerEvents: "none",
        borderRadius: "50%",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" stroke="rgba(147, 51, 234, 0.8)" strokeWidth="2" />
        <path
          d="M16 8V24M8 16H24"
          stroke="rgba(147, 51, 234, 0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

