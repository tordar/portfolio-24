'use client'

import React from 'react'
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type SkillCategory = 'Frontend' | 'Backend & Data' | 'Infrastructure'

type Example = {
    projectName: string
    url: string
    description: string
}

type Skill = {
    name: string
    description: string
    imageUrl: string
    category: SkillCategory
    examples?: Example[]
}

const skills: Skill[] = [
    {
        name: "React",
        description: "Building interactive user interfaces with reusable components",
        imageUrl: "/img/React Logo.svg",
        category: "Frontend",
        examples: [
            { projectName: "Meal Planner", url: "https://mealplanner.tordar.no", description: "Used React for building the UI components and state management" },
            { projectName: "Strava Visualiser", url: "https://strava.tordar.no/", description: "Implemented data visualization components with React" },
            { projectName: "Sats Map", url: "https://sats-visualiser.vercel.app/", description: "Created interactive map interface using React and Leaflet" }
        ]
    },
    {
        name: "Next.js",
        description: "The go-to framework for server-side rendered and statically generated applications.",
        imageUrl: "/img/Next.js Logo.svg",
        category: "Frontend",
        examples: [
            { projectName: "Meal Planner", url: "https://mealplanner.tordar.no", description: "Built with Next.js for server-side rendering and API routes" },
            { projectName: "Strava Visualiser", url: "https://strava.tordar.no/", description: "Leveraged Next.js for API routes and static generation" }
        ]
    },
    {
        name: "TypeScript",
        description: "Enhancing JavaScript with static type definitions for improved development",
        imageUrl: "/img/TypeScript Logo.svg",
        category: "Frontend",
        examples: [
            { projectName: "Strava Visualiser", url: "https://strava.tordar.no/", description: "Used TypeScript for type-safe data handling and API integration" }
        ]
    },
    {
        name: "Tailwind CSS",
        description: "Rapidly building custom user interfaces with utility-first CSS",
        imageUrl: "/img/Tailwind Logo.svg",
        category: "Frontend",
        examples: [
            { projectName: "Meal Planner", url: "https://mealplanner.tordar.no", description: "Styled the entire application using Tailwind's utility classes" }
        ]
    },
    {
        name: "Python",
        description: "Favourite language for scripts, automation, and data work",
        imageUrl: "/img/Python Logo.svg",
        category: "Backend & Data",
        examples: [
            { projectName: "Snapchat Memories Downloader", url: "https://github.com/tordar/Download-Snapchat-Memories", description: "Created a Python script to bulk download Snapchat memories" },
            { projectName: "Event Newsletter", url: "https://concerts.tordar.no/", description: "Built a newsletter service using Python" },
            { projectName: "Garmin Sleep Extractor", url: "https://github.com/tordar/garmin-sleep-extractor", description: "Developed a Python script to extract sleep data from Garmin Connect" }
        ]
    },
    {
        name: "MongoDB",
        description: "Working with flexible, document-based NoSQL databases",
        imageUrl: "/img/MongoDB Logo.svg",
        category: "Backend & Data",
        examples: [
            { projectName: "Meal Planner", url: "https://mealplanner.tordar.no", description: "Used MongoDB to store and retrieve recipe data" }
        ]
    },
    {
        name: "Git",
        description: "Version control and collaboration for efficient project management",
        imageUrl: "/img/Git Logo.svg",
        category: "Infrastructure",
        examples: [
            { projectName: "GitHub Profile", url: "https://github.com/tordar", description: "All projects are version controlled with Git" }
        ]
    },
    {
        name: "Vercel",
        description: "Deploying and scaling web applications with ease",
        imageUrl: "/img/Vercel Logo.svg",
        category: "Infrastructure",
        examples: [
            { projectName: "This Portfolio", url: "#", description: "Deployed on Vercel for seamless continuous deployment" },
            { projectName: "Photography Portfolio", url: "https://gallery.tordar.no/", description: "Using Vercel for hosting and blob storage" },
            { projectName: "Loxodonta Function API", url: "https://api.tordar.no/", description: "API using Vercel serverless functions" }
        ]
    },
    {
        name: "Azure",
        description: "Cloud services for large enterprise applications and serverless architecture",
        imageUrl: "/img/Azure Logo.svg",
        category: "Infrastructure",
        examples: [
            { projectName: "Nyss", url: "https://cbs.ifrc.org/what-nyss", description: "Azure Functions, Storage, Service Bus, IoT Hub, and SQL databases for the Norwegian Red Cross platform" }
        ]
    }
]

const categories: SkillCategory[] = ['Frontend', 'Backend & Data', 'Infrastructure']

const isWhiteLogo = (name: string) => name === "Next.js" || name === "Vercel"

const SkillChip = ({ skill }: { skill: Skill }) => (
    <Popover>
        <PopoverTrigger asChild>
            <button className="group flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-accent transition-all duration-200 cursor-pointer">
                <Image
                    src={skill.imageUrl}
                    width={20}
                    height={20}
                    alt={`${skill.name} logo`}
                    className={`w-4 h-4 flex-shrink-0 ${isWhiteLogo(skill.name) ? "dark:brightness-0 dark:invert" : ""}`}
                />
                <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
            </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-border" side="top">
            <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                    <Image
                        src={skill.imageUrl}
                        width={20}
                        height={20}
                        alt={skill.name}
                        className={`w-5 h-5 ${isWhiteLogo(skill.name) ? "dark:brightness-0 dark:invert" : ""}`}
                    />
                    <h4 className="font-semibold text-sm">{skill.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                {skill.examples && skill.examples.length > 0 && (
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Used in</p>
                        <div className="space-y-2">
                            {skill.examples.map((example, i) => (
                                <div key={i}>
                                    <Link
                                        href={example.url}
                                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                                        target={example.url !== "#" ? "_blank" : undefined}
                                        rel={example.url !== "#" ? "noopener noreferrer" : undefined}
                                    >
                                        {example.projectName}
                                        {example.url !== "#" && <ExternalLink className="h-3 w-3" />}
                                    </Link>
                                    <p className="text-xs text-muted-foreground mt-0.5">{example.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PopoverContent>
    </Popover>
)

export default function SkillsSection() {
    return (
        <section className="py-8">
            <h2 className="text-3xl font-semibold mb-2">Tech Stack</h2>
            <p className="text-muted-foreground mb-8">Preferred technologies when building new things</p>

            <div className="space-y-8">
                {categories.map((category) => {
                    const categorySkills = skills.filter(s => s.category === category)
                    return (
                        <div key={category}>
                            <div className="flex items-center gap-3 mb-3">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{category}</p>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => (
                                    <SkillChip key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
