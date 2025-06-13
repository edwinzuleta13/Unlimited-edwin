"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isOpen ? <X /> : <MessageCircle />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80 bg-gray-900 border border-purple-500 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b border-purple-500">
              <h3 className="text-lg font-semibold text-purple-300">Soporte Técnico</h3>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.sender === "user" ? "text-right" : "text-left"} p-2 rounded-lg ${
                    message.sender === "user" ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

