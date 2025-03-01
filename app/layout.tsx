import { Orbitron } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import type React from "react"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <head>
        <Script src="https://w.soundcloud.com/player/api.js" strategy="afterInteractive" />
      </head>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
