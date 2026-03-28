'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Github } from 'lucide-react'

type Category = 'personal' | 'professional' | 'open-source'

interface Project {
    title: string
    description: string
    github: string
    live?: string
    tags: string[]
    image: string
    category: Category
}

const tabs: { label: string; value: Category }[] = [
    { label: 'Personal', value: 'personal' },
    { label: 'Professional', value: 'professional' },
    { label: 'Open Source', value: 'open-source' },
]

const projects: Project[] = [
    {
        title: "Pulse",
        description: "Dashboard to visualise historical listening data from Spotify, integrated with several listening sources. Continously updated with new listening history.",
        github: "https://github.com/tordar/spotify-pulse-data",
        live: "https://pulse.tordar.no/",
        tags: ["Next.js", "Data Viz"],
        image: "/PulseScreenshot.png",
        category: "personal"
    },
    {
        title: "Strava Visualiser",
        description: "Visualises personal Strava data pulled from the Strava API.",
        github: "https://github.com/tordar/shadcn-strava-visualiser",
        live: "https://strava.tordar.no/",
        tags: ["Next.js", "Strava API", "Data Viz"],
        image: "/StravaDashboard.png",
        category: "personal"
    },
    {
        title: "Photography Portfolio",
        description: "Personal photography gallery showcasing travel, nature and street photography.",
        github: "https://github.com/tordar/gallery",
        live: "https://gallery.tordar.no/",
        tags: ["Next.js", "Vercel"],
        image: "/GalleryScreenshot.png",
        category: "personal"
    },
    {
        title: "Meal Planner",
        description: "Personal recipe tracker with Google authentication and MongoDB.",
        github: "https://github.com/tordar/food-bank",
        live: "https://mealplanner.tordar.no",
        tags: ["Next.js", "MongoDB", "OAuth 2.0"],
        image: "/MealPlanner.png",
        category: "personal"
    },
    {
        title: "Event Newsletter",
        description: "Subscribe to new Oslo events by preference, powered by Broadcast API.",
        github: "https://github.com/tordar/events-bot",
        live: "https://concerts.tordar.no/",
        tags: ["Python", "SendGrid"],
        image: "/EventSubscription.png",
        category: "personal"
    },
    {
        title: "Nyss",
        description: "Real-time disease surveillance platform for Norwegian Red Cross / IFRC. Built and maintained the web application used across multiple countries. Deployed and set up in countries in Africa, Sentral-Asia and the Pacific.",
        github: "https://github.com/nyss-platform-norcross/nyss",
        live: "https://cbs.ifrc.org/what-nyss",
        tags: ["React", "Azure", "C#", ".NET"],
        image: "/NyssScreenshot.png",
        category: "professional"
    },
    {
        title: "Snapchat Memories Downloader",
        description: "Bulk downloader for Snapchat memories with a simple HTML interface.",
        github: "https://github.com/tordar/Download-Snapchat-Memories",
        tags: ["Python", "Snapchat API"],
        image: "/SnapchatDownloader.png",
        category: "open-source"
    },
    {
        title: "Loxodonta Function API",
        description: "Personal API with Vercel serverless functions and interactive Swagger UI docs.",
        github: "https://github.com/tordar/loxodonta-function-api",
        live: "https://api.tordar.no/",
        tags: ["React", "Vercel", "Serverless"],
        image: "/LoxodontaAPI.png",
        category: "open-source"
    }
]

export default function Projects() {
    const [activeTab, setActiveTab] = useState<Category>('personal')
    const [activeIndex, setActiveIndex] = useState(0)

    const filtered = projects.filter(p => p.category === activeTab)
    const active = filtered[activeIndex] ?? null

    const handleTabChange = (tab: Category) => {
        setActiveTab(tab)
        setActiveIndex(0)
    }

    return (
        <section className="mb-16">
            <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-3xl font-semibold">My Projects</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-border mb-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleTabChange(tab.value)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px cursor-pointer ${
                            activeTab === tab.value
                                ? 'border-foreground text-foreground'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {tab.label}
                        <span className={`ml-2 text-xs tabular-nums ${activeTab === tab.value ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                            {projects.filter(p => p.category === tab.value).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Desktop: split list + image */}
            <div className="hidden md:flex gap-8 items-start pt-0">

                {/* List */}
                <div className="flex-1 min-w-0">
                    {filtered.map((project, index) => (
                        <a
                            key={project.title}
                            href={project.live ?? project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center justify-between border-t border-border py-5 gap-4 transition-all duration-150 cursor-pointer ${
                                activeIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                            }`}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="flex items-center gap-5 min-w-0">
                                <div className="min-w-0">
                                    <span className="text-base font-medium">{project.title}</span>
                                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 flex-shrink-0">
                                <div className="hidden lg:flex gap-3">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs text-muted-foreground">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            window.open(project.github, '_blank', 'noopener,noreferrer')
                                        }}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                        aria-label="Source code"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                    </span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                            </div>
                        </a>
                    ))}
                    <div className="border-t border-border" />
                </div>

                {/* Sticky image panel */}
                {active && (
                    <div className="w-72 xl:w-80 flex-shrink-0 sticky top-8">
                        <div className="group relative w-full aspect-video rounded-xl overflow-visible border border-border cursor-default">
                            <div className="relative w-full h-full rounded-xl overflow-hidden transition-all duration-300 ease-out origin-top-right group-hover:scale-[1.6] group-hover:shadow-2xl group-hover:z-50 group-hover:rounded-xl">
                                {filtered.map((project, index) => (
                                    <div
                                        key={project.title}
                                        className="absolute inset-0 transition-opacity duration-300"
                                        style={{ opacity: activeIndex === index ? 1 : 0 }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded-xl"
                                            sizes="520px"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3 px-0.5">
                            <p className="text-sm font-medium">{active.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{active.description}</p>
                            {active.live && (
                                <a
                                    href={active.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                                >
                                    Visit site <ArrowUpRight className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: stacked cards with large screenshots */}
            <div className="md:hidden grid grid-cols-1 gap-4 pt-4">
                {filtered.map((project) => (
                    <a
                        key={project.title}
                        href={project.live ?? project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-200"
                    >
                        <div className="relative w-full aspect-video">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-medium text-sm">{project.title}</span>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}
