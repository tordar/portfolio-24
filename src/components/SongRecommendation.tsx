'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface SongInfo {
    name: string;
    artist: string;
    album: string;
    spotifyUrl: string;
}

export function SongRecommendationButton() {
    const [song, setSong] = useState<SongInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const fetchRandomSong = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://api.tordar.no/api/random-song')
            if (!response.ok) {
                throw new Error('Failed to fetch song')
            }
            const data = await response.json()
            setSong(data)
            setOpen(true)
        } catch (error) {
            console.error('Error fetching song:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    onClick={fetchRandomSong}
                    disabled={loading}
                    className="focus:outline-none"
                    aria-label="Get Song Recommendation"
                >
                    {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                    )}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Song Recommendation</DialogTitle>
                    <DialogDescription>Here&apos;s a song from my playlist you might enjoy!</DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="mt-4 flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                    </div>
                ) : song ? (
                    <div className="mt-4">
                        <h3 className="font-semibold text-lg">{song.name}</h3>
                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                        <p className="text-sm text-muted-foreground">{song.album}</p>
                        <a
                            href={song.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm text-primary hover:underline"
                        >
                            Listen on Spotify
                        </a>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}