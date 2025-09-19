import Image from 'next/image'
import Link from 'next/link'
import profileImage from '../../src/app/resources/img.jpeg'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Disc, Music2, Users } from 'lucide-react'

export default function AboutMe() {
    return (
        <section  className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                    <Image
                        src={profileImage}
                        alt="Tordar Tømmervik"
                        width={300}
                        height={300}
                        className="rounded-full"
                    />
                    <div className="mt-4 w-full max-w-[300px]">
                        <Button 
                            asChild 
                            variant="outline" 
                            className="w-full bg-white hover:bg-gray-100 border-gray-300 mb-2"
                        >
                            <a 
                                href="/Tordar_Tommervik_CV.pdf" 
                                download 
                                className="flex items-center justify-center gap-2 !text-black hover:!text-black"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="!text-black"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download CV
                            </a>
                        </Button>
                        <Button 
                            asChild 
                            variant="outline" 
                            className="w-full bg-white hover:bg-gray-100 border-gray-300 mb-2"
                        >
                            <a 
                                href="https://gallery.tordar.no/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 !text-black hover:!text-black"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="!text-black"
                                >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                                Photography Portfolio
                            </a>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="w-full bg-white hover:bg-gray-100 border-gray-300 mb-2 flex items-center justify-center gap-2 !text-black hover:!text-black"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="!text-black"
                                    >
                                        <path d="M9 18V5l12-2v13" />
                                        <circle cx="6" cy="18" r="3" />
                                        <circle cx="18" cy="16" r="3" />
                                    </svg>
                                    Spotify Stats
                                    <ChevronDown className="w-4 h-4 !text-black" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full min-w-[200px]">
                                <DropdownMenuItem asChild>
                                    <Link 
                                        href="/top-albums"
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <Disc className="w-4 h-4" />
                                        Top 500 Albums
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link 
                                        href="/top-songs"
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <Music2 className="w-4 h-4" />
                                        Top 500 Songs
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link 
                                        href="/top-artists"
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <Users className="w-4 h-4" />
                                        Top 500 Artists
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="md:w-2/3">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-3xl font-semibold mb-4 text-card-foreground">About Me</h2>
                    <p className="text-muted-foreground mb-4">
                        I&apos;m a full-stack developer with experience in React, Next.js, and modern web technologies.
                        I&apos;m a largely self-taught developer, after beginning to learn Python during the pandemic,
                        to accomodate my degree in international relations. From there, I went on to work for Norwegian
                        Red Cross, maintaining their in-house developed web application Nyss. 
                        I also enjoy working on different side-projects, learning new technologies, and keeping up to date
                        with new developments and ways of making things.
                    </p>
                    <p className="text-muted-foreground mb-4">
                        When I&apos;m not coding, you can find me:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-4">
                        <li>Running</li>
                        <li>Cooking</li>
                        <li>Taking pictures</li>
                        <li>Going to concerts</li>
                        <li>Planning a new adventure</li>
                    </ul>
                </div>
            </div>
        </div>
        </section>
    )
}