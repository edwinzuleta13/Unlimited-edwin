"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { ThemeProvider } from "next-themes"
import { MouseProvider } from "@/components/mouse-context"
import { AnimatePresence } from "framer-motion"

interface TransitionContextType {
  isTransitioning: boolean
  startTransition: () => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
})

export const useTransition = () => useContext(TransitionContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = () => setIsTransitioning(true)
  const endTransition = () => setIsTransitioning(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
        <MouseProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </MouseProvider>
      </TransitionContext.Provider>
    </ThemeProvider>
  )
}

