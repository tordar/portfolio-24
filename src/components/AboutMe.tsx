'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Camera, Music, MapPin, Briefcase } from 'lucide-react'

const profileImage = '/DSC09739.jpeg'

const interestImages: Record<string, string> = {
    'Live music': '/E38E658F-02DE-49FA-BABE-CB40055F18E3_1_105_c.jpeg',
    'Running': '/945B8FE1-BE09-4B84-ACF6-92AAC721C7B9_1_102_a.jpeg',
    'Hiking': '/7ED2419D-630A-48E7-A9DF-E397A6530A03_1_201_a.jpeg',
    'Travelling': '/C2BA8D90-9A42-496D-A93E-2B0396A3CCF8_1_201_a.jpeg',
}

const interests = ['Running', 'Hiking', 'Photography', 'Live music', 'Travelling']

const links = [
    {
        label: 'Download CV',
        href: '/Tordar_Tommervik_CV.pdf',
        icon: Download,
        download: true,
    },
    {
        label: 'Photo Gallery',
        href: 'https://gallery.tordar.no/',
        icon: Camera,
        external: true,
    },
    {
        label: 'Spotify Stats',
        href: 'https://pulse.tordar.no/',
        icon: Music,
        external: true,
    },
]

export default function AboutMe() {
    const [activeInterest, setActiveInterest] = useState<string | null>(null)

    return (
        <section className="mb-16">

            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-5 gap-8 items-start">

                {/* Photo — tall portrait, takes 2 cols */}
                <div
                    className="col-span-2 rounded-2xl overflow-hidden bg-muted relative transition-all duration-500 ease-out"
                    style={{
                        transform: activeInterest ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: activeInterest
                            ? '0 20px 50px -12px rgba(99,102,241,0.4), 0 8px 20px -8px rgba(99,102,241,0.2)'
                            : '0 8px 30px -8px rgba(99,102,241,0.15)',
                    }}
                >
                    <Image
                        src={profileImage}
                        alt="Tordar Tømmervik"
                        width={1312}
                        height={1965}
                        className="w-full h-auto rounded-2xl"
                        sizes="400px"
                        priority
                    />
                    {Object.entries(interestImages).map(([interest, src]) => (
                        <Image
                            key={interest}
                            src={src}
                            alt={`Tordar — ${interest}`}
                            width={1312}
                            height={1965}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-500 ease-out"
                            sizes="400px"
                            style={{
                                opacity: activeInterest === interest ? 1 : 0,
                                transform: activeInterest === interest ? 'scale(1)' : 'scale(1.08)',
                                filter: activeInterest === interest ? 'blur(0px)' : 'blur(8px)',
                            }}
                        />
                    ))}
                </div>

                {/* Content — takes 3 cols */}
                <div className="col-span-3 py-2">
                    <h2 className="text-3xl font-semibold mb-2">About Me</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Oslo, Norway</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Full-stack developer</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                        I&apos;m a full-stack developer with experience in React, Next.js, and modern web technologies.
                        I&apos;m largely self-taught, starting with Python during the pandemic to complement my degree
                        in international relations. I then went on to work for Norwegian Red Cross, maintaining their
                        disease tracking application Nyss. From there, I started working for digital product consultancy
                        Umain, where I&apos;m currently working on several very exciting projects.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        I enjoy working on side-projects (of which I have too many), learning new technologies, and
                        keeping up with new developments. I try to be forward-leaning when it comes to AI development
                        and I&apos;m generally excited about how fast technology is moving.
                    </p>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {interests.map((interest) => (
                            <span
                                key={interest}
                                className={`text-xs px-2.5 py-1 rounded-full border text-muted-foreground transition-colors duration-200 ${interest in interestImages ? 'cursor-pointer border-primary/40 hover:bg-accent' : 'border-border'}`}
                                {...(interest in interestImages ? { onMouseEnter: () => setActiveInterest(interest), onMouseLeave: () => setActiveInterest(null) } : {})}
                            >
                                {interest}
                            </span>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border mb-6" />

                    {/* Action links */}
                    <div className="flex gap-2">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                {...(link.download ? { download: true } : {})}
                                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="flex items-center gap-2 px-3.5 py-2 text-sm rounded-lg border border-border hover:border-primary/40 hover:bg-accent transition-all duration-200 cursor-pointer"
                            >
                                <link.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <span className="whitespace-nowrap">{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
                {/* Photo */}
                <div
                    className="rounded-2xl overflow-hidden bg-muted mb-5 relative transition-all duration-500 ease-out"
                    style={{
                        transform: activeInterest ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: activeInterest
                            ? '0 20px 50px -12px rgba(99,102,241,0.4), 0 8px 20px -8px rgba(99,102,241,0.2)'
                            : '0 8px 30px -8px rgba(99,102,241,0.15)',
                    }}
                >
                    <Image
                        src={profileImage}
                        alt="Tordar Tømmervik"
                        width={1312}
                        height={1965}
                        className="w-full h-auto rounded-2xl"
                        sizes="100vw"
                        priority
                    />
                    {Object.entries(interestImages).map(([interest, src]) => (
                        <Image
                            key={interest}
                            src={src}
                            alt={`Tordar — ${interest}`}
                            width={1312}
                            height={1965}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-500 ease-out"
                            sizes="100vw"
                            style={{
                                opacity: activeInterest === interest ? 1 : 0,
                                transform: activeInterest === interest ? 'scale(1)' : 'scale(1.08)',
                                filter: activeInterest === interest ? 'blur(0px)' : 'blur(8px)',
                            }}
                        />
                    ))}
                </div>

                {/* Bio */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Oslo, Norway</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Full-stack developer</span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                    I&apos;m a full-stack developer with experience in React, Next.js, and modern web technologies.
                    Self-taught, starting with Python during the pandemic. Worked for Norwegian Red Cross on their
                    disease tracking application Nyss, and now at digital product consultancy Umain. I enjoy
                    side-projects, learning new technologies, and I&apos;m excited about AI development.
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {interests.map((interest) => (
                        <span
                            key={interest}
                            className={`text-xs px-2.5 py-1 rounded-full border text-muted-foreground transition-colors duration-200 ${interest in interestImages ? 'cursor-pointer border-primary/40 hover:bg-accent' : 'border-border'}`}
                            {...(interest in interestImages ? { onMouseEnter: () => setActiveInterest(interest), onMouseLeave: () => setActiveInterest(null) } : {})}
                        >
                            {interest}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="grid grid-cols-3 gap-2">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            {...(link.download ? { download: true } : {})}
                            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="flex flex-col items-center gap-1.5 py-3 text-center rounded-lg border border-border hover:border-primary/40 hover:bg-accent transition-all duration-200"
                        >
                            <link.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs">{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
