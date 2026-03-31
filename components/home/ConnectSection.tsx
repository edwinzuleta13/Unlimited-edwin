"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { SlSocialLinkedin } from "react-icons/sl"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaWhatsapp, FaTiktok } from "react-icons/fa"

export default function ConnectSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-12 gradient-text"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Conecta con Nosotros
        </motion.h2>

        <motion.div
          className="flex justify-center space-x-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* WhatsApp */}
          <a
            href="tel:+584243296034"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +58 424-3296034"
            className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
          >
            <FaWhatsapp className="w-8 h-8" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@untitledtechco?_t=ZM-8wVCrqpCtlt&_r=1&brid=CKKLqA97M0vUTnBEFheQNQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok- Untitled Tech"
            className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
          >
            <FaTiktok className="w-8 h-8" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/untitled-tech-company"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn - Untitled Tech"
            className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
          >
            <SlSocialLinkedin className="w-8 h-8" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/untitledtechco?igsh=MWU5aHpweDZyaDJuZQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram - Untitled Tech"
            className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
          >
            <AiOutlineInstagram className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
