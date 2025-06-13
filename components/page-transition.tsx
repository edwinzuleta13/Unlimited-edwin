"use client"

import { motion } from "framer-motion"
import { useTransition } from "@/app/providers"

export default function PageTransition() {
  const { isTransitioning } = useTransition()

  if (!isTransitioning) return null

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-purple-600 origin-bottom z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-full w-full flex items-center justify-center"
      >
        <div className="glitch-wrapper">
          <div className="glitch" data-text="UNTITLED">
            UNTITLED
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

