import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { AdminProvider } from "./hooks/AdminContext"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EM Square | Ensus Media and Marketing",
  description:
    "EM Square is a media and marketing studio focused on brand acceleration through creative storytelling and campaign strategy.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0e0b1d] text-slate-100">
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  )
}
