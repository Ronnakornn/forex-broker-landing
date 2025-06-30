import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ForexTickerBar from "@/components/forex-ticker-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ForexPro - Trade Smarter, Learn Faster",
  description: "Premium forex trading platform with educational resources and expert support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ForexTickerBar />
        {children}
      </body>
    </html>
  )
}
