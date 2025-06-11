"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100
    const connectionDistance = 150
    const mouseRadius = 200 // Increased interaction radius

    const mouse = { x: 0, y: 0 }

    class Particle {
      x: number
      y: number
      dx: number
      dy: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.size = Math.random() * 2 + 1
        this.dx = (Math.random() - 0.5) * 2
        this.dy = (Math.random() - 0.5) * 2
        this.color = `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.5})`
      }

      update() {
        this.x += this.dx
        this.y += this.dy

        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy

        // Añadir un movimiento ondulatorio
        this.x += Math.sin(this.y / 30) * 0.5
        this.y += Math.cos(this.x / 30) * 0.5
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    function init() {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function drawConnections() {
      if (!ctx) return
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.5
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity})`)
            gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity * 0.5})`)

            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      drawConnections()
      requestAnimationFrame(animate)
    }

    init()
    setInterval(() => {
      particles.forEach((particle) => {
        particle.dx = (Math.random() - 0.5) * 2
        particle.dy = (Math.random() - 0.5) * 2
      })
    }, 5000) // Cambiar la dirección cada 5 segundos
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

