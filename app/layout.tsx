import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'icomoon/style.css'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import AppLoader from '@/components/AppLoader'
import Navbar from '@/components/navbar'
import { siteMetadata } from '@/config/siteMetadata'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.author}`,
  },
  description: siteMetadata.description,
  keywords: ['Robin te Hofstee', 'blog', 'programming', 'React', 'NextJS', 'web development', 'TypeScript', 'JavaScript'],
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: siteMetadata.locale,
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.twitterHandle,
    images: [`${siteMetadata.siteUrl}/api/og`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#e93139" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppLoader>
          {/* Header */}
          <Navbar />

          {/* Main content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mt-20">
            <div className="max-w-5xl mx-auto px-4 py-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-6">
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-titans-red transition-colors"
                  >
                    Email
                  </a>
                  <a
                    href={siteMetadata.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-titans-red transition-colors"
                  >
                    𝕏 / Twitter
                  </a>
                  <a
                    href="https://robintehofstee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-titans-red transition-colors"
                  >
                    Portfolio
                  </a>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 italic hidden">
                  "You become what you believe." - Oprah Winfrey
                </p>
              </div>
            </div>
          </footer>
        </AppLoader>
      </body>
    </html>
  )
}
