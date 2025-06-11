import type React from "react"
import { motion } from "framer-motion"

interface AnimatedSVGProps {
  width?: number
  height?: number
  color?: string
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({ width = 200, height = 200, color = "#9333ea" }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      }
    },
  }

  return (
    <motion.svg width={width} height={height} viewBox="0 0 200 200" initial="hidden" animate="visible">
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke={color}
        strokeWidth="5"
        fill="none"
        variants={pathVariants}
        custom={0}
      />
      <motion.line
        x1="100"
        y1="50"
        x2="100"
        y2="150"
        stroke={color}
        strokeWidth="5"
        variants={pathVariants}
        custom={1}
      />
      <motion.line
        x1="50"
        y1="100"
        x2="150"
        y2="100"
        stroke={color}
        strokeWidth="5"
        variants={pathVariants}
        custom={2}
      />
    </motion.svg>
  )
}

export default AnimatedSVG

