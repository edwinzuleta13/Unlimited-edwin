import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"
import type React from "react" // Added import for React

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Untitled Tech Company | Soluciones Tecnológicas Empresariales",
  description:
    "Transformamos empresas a través de soluciones tecnológicas innovadoras: desarrollo de software, implementación de CRM/ERP, y consultoría tecnológica.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

