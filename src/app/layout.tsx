import type { Metadata } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import { SongRecommendationButton } from '../components/SongRecommendation'
import { ThemeProvider } from "../components/theme-provider"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { TimeSlider } from "../components/TimeSlider"
import { DynamicFavicon } from "../components/DynamicFavicon"
import { HeaderTitle } from "../components/HeaderTitle"
import Schema from './Schema'
import GoogleTagManager from '../lib/google-tag-manager'

const archivo = Archivo({
    subsets: ['latin'],
    variable: '--font-archivo',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700']
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
    metadataBase: new URL('https://tordar.no'),
    title: {
        default: 'Tordar Tømmervik | Full-stack Developer',
        template: '%s | Tordar Tømmervik'
    },
    description: 'Personal portfolio of Tordar Tømmervik, a full-stack developer specializing in React, Next.js, and modern JavaScript applications.',
    keywords: 'Tordar, Tordar Tømmervik, full-stack developer, software engineer, React developer, Next.js, JavaScript',
    authors: [{ name: 'Tordar Tømmervik' }],
    creator: 'Tordar Tømmervik',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://tordar.no',
        title: 'Tordar Tømmervik | Full-stack Developer',
        description: 'Personal portfolio of Tordar Tømmervik, a full-stack developer specializing in React, Next.js, and modern JavaScript applications.',
        siteName: 'Tordar Tømmervik',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Tordar Tømmervik Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tordar Tømmervik | Full-stack Developer',
        description: 'Personal portfolio of Tordar Tømmervik, a full-stack developer specializing in React, Next.js, and modern JavaScript applications.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://tordar.no',
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
        <head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <Schema />
        </head>
        <body className={`${archivo.variable} ${spaceGrotesk.variable}`}>
        <GoogleTagManager />
        <ThemeProvider>
            <DynamicFavicon/>
            <div className="min-h-screen flex flex-col transition-colors duration-100">
                <header className="py-16 text-center relative border-b border-border">
                    <div className="absolute top-4 right-4">
                        <ThemeSwitcher/>
                    </div>
                    <HeaderTitle />
                    <p className="text-lg text-muted-foreground mt-2 tracking-wide">Full-stack developer</p>
                    <p className="flex items-center justify-center mt-2 mb-0 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 mr-1.5"/>
                        Oslo, Norway
                    </p>
                    <div className="absolute bottom-0 left-0 right-0">
                        <TimeSlider/>
                    </div>
                </header>
                <main className="flex-grow container mx-auto px-4 max-w-5xl py-8">
                    {children}
                </main>
                <footer className="border-t border-border py-8 mt-16">
                    <div className="container mx-auto px-4 flex justify-center space-x-6">
                        <a href="https://github.com/tordar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                            <Github className="h-5 w-5"/>
                        </a>
                        <a href="https://linkedin.com/in/tordar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                            <Linkedin className="h-5 w-5"/>
                        </a>
                        <a href="mailto:tordar.tommervik@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                            <Mail className="h-5 w-5"/>
                        </a>
                        <a href="https://www.strava.com/athletes/29745314" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                 className="w-5 h-5 fill-current">
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
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="d18cf312-3157-4359-a4b8-39a7be2ea567" strategy="afterInteractive" />
        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    )
}