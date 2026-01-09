import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"
import { AlertProvider, GlobalAlerts } from "@/components/alert-context"
import type React from "react" // Added import for React
import ViewportSwitcher from "@/components/ViewportSwitcher"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Untitled Tech Company | Soluciones Tecnológicas Empresariales",
  description:
    "Transformamos empresas a través de soluciones tecnológicas innovadoras: desarrollo de software, implementación de CRM/ERP, y consultoría tecnológica.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Manual favicon links to force browser load */}
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${spaceGrotesk.className} bg-background text-foreground font-sans min-h-screen`}>
        <ViewportSwitcher />
        <Providers>
          <AlertProvider>
            {children}
            {/* Global alerts rendered here so they are visible across pages */}
            <GlobalAlerts />
            <Analytics />
          </AlertProvider>
        </Providers>
      </body>
    </html>
  )
}

