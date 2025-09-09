import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Mulish } from "next/font/google"
import { CompactViewProvider } from "@/contexts/compact-view-context"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased`}>
      <body>
        <CompactViewProvider>{children}</CompactViewProvider>
      </body>
    </html>
  )
}
