import type React from "react"
import type { Metadata } from "next"
import { Nunito, Poppins } from "next/font/google"
import { CompactViewProvider } from "@/contexts/compact-view-context"
import { AppProvider } from "@/contexts/app-context"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Shrumer - Your Farm at Home",
  description: "Family-friendly hydroponic farming app with colony management and gamification",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable} dark antialiased`}>
      <body className="font-nunito">
        <AppProvider>
          <CompactViewProvider>{children}</CompactViewProvider>
        </AppProvider>
      </body>
    </html>
  )
}
