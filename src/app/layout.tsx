import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { SongRecommendationButton } from '../components/SongRecommendation'
import { ThemeProvider } from "../components/theme-provider"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { TimeSlider } from "../components/TimeSlider"
import { DynamicFavicon } from "../components/DynamicFavicon"
import Schema from './Schema'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://tordar.no'),
    title: {
        default: 'Tordar Tømmervik | Web Developer',
        template: '%s | Tordar Tømmervik'
    },
    description: 'Personal portfolio of Tordar Tømmervik, a web developer specializing in React, Next.js, and modern JavaScript applications.',
    keywords: 'Tordar, Tordar Tømmervik, web developer, software engineer, React developer, Next.js, JavaScript',
    authors: [{ name: 'Tordar Tømmervik' }],
    creator: 'Tordar Tømmervik',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://tordar.no',
        title: 'Tordar Tømmervik | Web Developer',
        description: 'Personal portfolio and projects by Tordar Tømmervik',
        siteName: 'Tordar Portfolio',
        images: [
            {
                url: '/og-image.png', // Create an Open Graph image
                width: 1200,
                height: 630,
                alt: 'Tordar Tømmervik Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tordar Tømmervik | Web Developer',
        description: 'Personal portfolio and projects by Tordar Tømmervik',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://tordar.no/',
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta name="description" content={metadata.description as string}/>
            <meta httpEquiv="Cache-Control" content="max-age=86400, public" />
            <meta httpEquiv="Pragma" content="no-cache"/>
            <meta httpEquiv="Expires" content="0"/>
            <link rel="canonical" href="https://tordar.no/" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <Schema />
        </head>
        <body className={inter.className}>
        <ThemeProvider>
            <DynamicFavicon/>
            <div className="min-h-screen font-sans flex flex-col transition-colors duration-100">
                <header className="py-12 text-center relative bg-muted">
                    <div className="absolute top-4 right-4">
                        <ThemeSwitcher/>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Tordar Tømmervik</h1>
                    <p className="text-xl">Full-stack developer</p>
                    <p className="flex items-center justify-center mt-2 mb-4 opacity-80">
                        <MapPin className="w-4 h-4 mr-1"/>
                        Oslo, Norway
                    </p>
                    <div className="absolute bottom-0 left-0 right-0">
                        <TimeSlider/>
                    </div>
                </header>
                <main className="flex-grow container mx-auto px-4 max-w-5xl py-8">
                    {children}
                </main>
                <footer className="bg-muted py-6 mt-12">
                    <div className="container mx-auto px-4 flex justify-center space-x-4">
                        <a href="https://github.com/tordar" target="_blank" rel="noopener noreferrer">
                            <Github className="h-6 w-6"/>
                        </a>
                        <a href="https://linkedin.com/in/tordar" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-6 w-6"/>
                        </a>
                        <a href="mailto:tordar.tommervik@gmail.com">
                            <Mail className="h-6 w-6"/>
                        </a>
                        <a href="https://www.strava.com/athletes/29745314" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                 className="w-6 h-6 fill-current">
                                <path
                                    d="M158.4 0L7 292h89.2l62.2-116.1L220.1 292h88.5zm150.2 292l-43.9 88.2-44.6-88.2h-67.6l112.2 220 111.5-220z"/>
                            </svg>
                            <span className="sr-only">Strava</span>
                        </a>
                        <SongRecommendationButton/>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    )
}