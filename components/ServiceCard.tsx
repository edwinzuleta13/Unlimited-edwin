"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useMouse } from "@/components/mouse-context"

interface ServiceCardProps {
    icon: React.ReactNode
    title: string
    description: string
    features: string[]
    className?: string
}

export function ServiceCard({
    icon,
    title,
    description,
    features,
    className,
}: ServiceCardProps) {
    const { setCursorVariant } = useMouse()

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
        >
            <Card
                className={`${className ? className + " " : ""}group p-8 bg-black/30 border-2 border-purple-300/40 overflow-hidden relative hover:bg-purple-900/25 hover:border-purple-400/60`}
                style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Dynamic animated purple gradient on hover */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: 'linear-gradient(45deg, rgba(101, 0, 195, 0.85) 0%, rgba(147,51,234,0.5) 25%, rgba(168,85,247,0.6) 50%, rgba(147,51,234,0.5) 75%, rgba(168,85,247,0.6) 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite',
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
                <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

                {/* Enhanced purple glow on hover */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-xl z-20 opacity-0 group-hover:opacity-100"
                    style={{
                        boxShadow: '0 0 40px 8px rgba(168,85,247,0.5), 0 20px 40px -10px rgba(147,51,234,0.3)',
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
                <div className="parallax-card-content relative z-10">
                    <div className="mb-4 text-purple-400 transition-colors group-hover:text-white">{icon}</div>
                    <h3 className="text-xl font-bold mb-2 transition-all">{title}</h3>
                    <p className="text-gray-300 transition-colors mb-4">{description}</p>
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </motion.div>
    )
}
