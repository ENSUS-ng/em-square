import type { Metadata } from "next"
import { Geist, Geist_Mono, Questrial, Poppins } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

import { AdminProvider } from "./hooks/AdminContext"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const questrialSans = Questrial({
  weight: ["400"],
  variable: "--font-questrial",
})

const poppinsSans = Poppins({
  weight: ["300"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ensusmediaandmarketing.com"),
  applicationName: "Ensus Media and Marketing",
  title: {
    default: "Ensus Media and Marketing | Creative Strategy, Branding & Growth",
    template: "%s | Ensus Media and Marketing",
  },
  description:
    "Ensus Media and Marketing helps brands grow through strategic storytelling, creative campaigns, digital experiences, and measurable marketing execution.",
  keywords: [
    "media agency",
    "marketing agency",
    "brand strategy",
    "creative marketing",
    "digital campaigns",
    "brand storytelling",
    "content strategy",
    "social media marketing",
    "EM Square",
    "Ensus Media",
    "Ensus Marketing",
  ],
  authors: [{ name: "Ensus Media and Marketing" }],
  creator: "Ensus Media and Marketing",
  publisher: "Ensus Media and Marketing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ensusmediaandmarketing.com",
    title: "Ensus Media and Marketing | Creative Strategy, Branding & Growth",
    description:
      "Helping modern brands stand out through strategic storytelling, creative direction, and marketing execution that moves audiences to act.",
    siteName: "Ensus Media and Marketing",
    images: [
      {
        url: "/em-logo.png",
        width: 1200,
        height: 630,
        alt: "Ensus Media and Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ensus Media and Marketing | Creative Strategy, Branding & Growth",
    description:
      "Helping modern brands stand out through strategic storytelling, creative direction, and marketing execution that moves audiences to act.",
    creator: "@ensusmedia",
    site: "@ensusmedia",
    images: ["/em-logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable}  ${poppinsSans.variable} ${questrialSans.variable}   h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        {/* <AdminProvider> */}
        <ClerkProvider>
          <Suspense>{children}</Suspense>
        </ClerkProvider>

        {/* </AdminProvider> */}
      </body>
    </html>
  )
}
