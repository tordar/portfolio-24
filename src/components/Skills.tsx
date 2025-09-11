import React from 'react'
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type Example = {
    projectName: string
    url: string
    description: string
}

type Skill = {
    name: string
    description: string
    imageUrl: string
    examples?: Example[]
}

const skills: Skill[] = [
    { 
        name: "React", 
        description: "Building interactive user interfaces with reusable components", 
        imageUrl: "/img/React Logo.svg",
        examples: [
            {
                projectName: "Meal Planner",
                url: "https://mealplanner.tordar.no",
                description: "Used React for building the UI components and state management"
            },
            {
                projectName: "Strava-Visualiser",
                url: "https://strava.tordar.no/",
                description: "Implemented data visualization components with React"
            },
            {
                projectName: "Sats Map",
                url: "https://sats-visualiser.vercel.app/",
                description: "Created interactive map interface using React and Leaflet"
            }
        ]
    },
    { 
        name: "Next.js", 
        description: "Next.js has become the go-to tool to create server-side rendered and statically generated applications.", 
        imageUrl: "/img/Next.js Logo.svg",
        examples: [
            {
                projectName: "Meal Planner",
                url: "https://mealplanner.tordar.no",
                description: "Built with Next.js for server-side rendering and API routes"
            },
            {
                projectName: "Strava-Visualiser",
                url: "https://strava.tordar.no/",
                description: "Leveraged Next.js for API routes and static generation"
            }
        ]
    },
    { 
        name: "TypeScript", 
        description: "Enhancing JavaScript with static type definitions for improved development", 
        imageUrl: "/img/TypeScript Logo.svg",
        examples: [
            {
                projectName: "Strava-Visualiser",
                url: "https://strava.tordar.no/",
                description: "Used TypeScript for type-safe data handling and API integration"
            }
        ]
    },
    { 
        name: "Tailwind CSS", 
        description: "Rapidly building custom user interfaces with utility-first CSS", 
        imageUrl: "/img/Tailwind Logo.svg",
        examples: [
            {
                projectName: "Meal Planner",
                url: "https://mealplanner.tordar.no",
                description: "Styled the entire application using Tailwind's utility classes"
            }
        ]
    },
    { 
        name: "Git", 
        description: "Version control and collaboration for efficient project management", 
        imageUrl: "/img/Git Logo.svg",
        examples: [
            {
                projectName: "GitHub Profile",
                url: "https://github.com/tordar",
                description: "All projects are version controlled with Git"
            }
        ]
    },
    { 
        name: "MongoDB", 
        description: "Working with flexible, document-based NoSQL databases", 
        imageUrl: "/img/MongoDB Logo.svg",
        examples: [
            {
                projectName: "Meal Planner",
                url: "https://mealplanner.tordar.no",
                description: "Used MongoDB to store and retrieve recipe data"
            }
        ]
    },
    { 
        name: "Python", 
        description: "Favorite language for making simple scripts, and data cleaning", 
        imageUrl: "/img/Python Logo.svg",
        examples: [
            {
                projectName: "Snapchat Memories Downloader",
                url: "https://github.com/tordar/Download-Snapchat-Memories",
                description: "Created a Python script to bulk download Snapchat memories"
            },
            {
                projectName: "Event Newsletter",
                url: "https://concerts.tordar.no/",
                description: "Built a newsletter service using Python"
            },
            {
                projectName: "Garmin Sleep Extractor",
                url: "https://github.com/tordar/garmin-sleep-extractor",
                description: "Developed a Python script to extract sleep data from Garmin Connect"
            }
        ]
    },
    { 
        name: "Vercel", 
        description: "Deploying and scaling web applications with ease", 
        imageUrl: "/img/Vercel Logo.svg",
        examples: [
            {
                projectName: "This Portfolio",
                url: "#",
                description: "Deployed on Vercel for seamless continuous deployment"
            },
            {
                projectName: "Photography Portfolio",
                url: "https://gallery.tordar.no/",
                description: "Using Vercel for hosting the portfolio and storing images on their blob storage solution."
            },
            {
                projectName: "Personal API project",
                url: "https://api.tordar.no/",
                description: "API that uses Vercel serverless functions to create microserves. An example of a microservice is the random Spotify song fetcher that can be executed at the bottom of this page."
            }
        ]
    },
    { 
        name: "Azure", 
        description: "Using cloud services for large enterprise applications and serverless architecture", 
        imageUrl: "/img/Azure Logo.svg",
        examples: [
            {
                projectName: "Nyss - A CBS Platform",
                url: "https://cbs.ifrc.org/what-nyss",
                description: "Utilized Azure for cloud infrastructure in professional work. This included working with features such as: Azure Functions, Azure Storage, Service Bus, IoT Hub, and SQL databases."
            }
        ]
    }
]

const TechTile = ({ skill }: { skill: Skill }) => {
    // Handle white logos (Next.js and Vercel)
    const isWhiteLogo = skill.name === "Next.js" || skill.name === "Vercel";
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center justify-center aspect-square bg-slate-100 dark:bg-slate-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-border rounded-lg shadow hover:shadow-md hover:bg-accent transition-all duration-200 cursor-pointer p-4 md:p-6">
                    <Image
                        src={skill.imageUrl}
                        width={64}
                        height={64}
                        alt={`${skill.name} logo`}
                        className={`w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 ${isWhiteLogo ? "dark:brightness-0 dark:invert" : ""}`}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 backdrop-blur-sm bg-opacity-90 border-border">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-lg leading-none mb-2">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {skill.description}
                        </p>
                    </div>
                    
                    {skill.examples && skill.examples.length > 0 && (
                        <div>
                            <h5 className="text-sm font-medium mb-2">Projects using {skill.name}:</h5>
                            <div className="space-y-3">
                                {skill.examples.map((example, index) => (
                                    <div key={index} className="text-sm">
                                        <div className="flex items-center gap-1">
                                            <Link 
                                                href={example.url} 
                                                className="font-medium hover:underline text-primary flex items-center"
                                                target={example.url !== "#" ? "_blank" : undefined}
                                                rel={example.url !== "#" ? "noopener noreferrer" : undefined}
                                            >
                                                {example.projectName}
                                                {example.url !== "#" && <ExternalLink className="ml-1 h-3 w-3" />}
                                            </Link>
                                        </div>
                                        <p className="text-muted-foreground text-xs mt-1">{example.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default function SkillsSection() {
    return (
        <section className="py-16">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-card-foreground">Tech Stack</h2>
                <p className="text-muted-foreground">Preferred technologies when building new things</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills.map((skill, index) => (
                    <TechTile key={index} skill={skill}/>
                ))}
            </div>
        </section>
    )
} 