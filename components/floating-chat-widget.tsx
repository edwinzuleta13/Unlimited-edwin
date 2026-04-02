"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createPortal } from "react-dom"

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      setInput("")
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Gracias por tu mensaje. Un experto te responderá pronto.", sender: "bot" },
        ])
      }, 1000)
    }
  }

  if (!mounted) return null

  const portalContent = (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-4 right-4 z-[9999]"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full glass-effect-purple border-purple-500/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 hover:scale-110 active:scale-95"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-4 w-80 glass-effect-2 border-purple-500/40 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
          >
            <div className="p-4 border-b border-purple-500/30 bg-purple-500/10">
              <h3 className="text-lg text-white ALONGSANSS-REGULAR tracking-tight">Soporte Técnico</h3>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-4 AlongSanss2-Thin scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center py-8 text-white/40 text-sm">
                   ¿En qué podemos ayudarte hoy?
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.sender === "user" ? "ml-auto" : "mr-auto"} max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.sender === "user" 
                      ? "bg-purple-600/80 text-white rounded-tr-none shadow-lg shadow-purple-500/20" 
                      : "bg-white/10 text-white/90 rounded-tl-none border border-white/5"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500/30 bg-black/20">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow AlongSanss2-Thin bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50 rounded-xl"
                />
                <Button 
                  type="submit" 
                  className="AlongSanss2-Thin bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20 px-4"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  return createPortal(portalContent, document.body)
}

