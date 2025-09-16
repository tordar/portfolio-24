'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Music, Play } from 'lucide-react'

interface AlbumImage {
  height: number
  url: string
  width: number
}

interface Album {
  name: string
  images: AlbumImage[]
}

interface Artist {
  name: string
  genres: string[]
}

interface AlbumData {
  duration_ms: number
  count: number
  albumId: string
  album: Album
  artist: Artist
  consolidated_count: number
  original_albumIds: string[]
  rank: number
}

interface AlbumsData {
  metadata: {
    originalTotalAlbums: number
    consolidatedTotalAlbums: number
    duplicatesRemoved: number
    consolidationRate: number
    timestamp: string
  }
  albums: AlbumData[]
}

// Lazy loading image component
const LazyAlbumImage = ({ album, rank }: { album: Album; rank: number }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  const imageUrl = album.images[0]?.url || ''
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    const imgRef = document.getElementById(`album-${rank}`)
    if (imgRef) {
      observer.observe(imgRef)
    }
    
    return () => observer.disconnect()
  }, [rank])
  
  return (
    <div 
      id={`album-${rank}`}
      className="relative aspect-square bg-muted rounded-lg overflow-hidden"
    >
      {isInView && (
        <Image
          src={imageUrl}
          alt={`${album.name} album cover`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
        />
      )}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <Music className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

export default function TopAlbumsPage() {
  const [albumsData, setAlbumsData] = useState<AlbumsData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/cleaned-top-albums-v1.json')
        const data = await response.json()
        setAlbumsData(data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAlbums()
  }, [])
  
  const filteredAlbums = albumsData?.albums.filter(album => 
    album.album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your top albums...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Top Albums</h1>
          <p className="text-muted-foreground mb-6">
            {albumsData?.metadata.consolidatedTotalAlbums} albums from the past 15 years
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search albums or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        
        {/* Albums Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredAlbums.map((album) => (
            <Card key={album.albumId} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-3">
                {/* Album Image */}
                <div className="mb-3">
                  <LazyAlbumImage album={album.album} rank={album.rank} />
                </div>
                
                {/* Album Info */}
                <div className="space-y-2">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      #{album.rank}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Play className="w-3 h-3 mr-1" />
                      {album.count}
                    </div>
                  </div>
                  
                  {/* Album Name */}
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {album.album.name}
                  </h3>
                  
                  {/* Artist Name */}
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {album.artist.name}
                  </p>
                  
                  {/* Duration */}
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      const totalMinutes = Math.floor(album.duration_ms / 60000)
                      const hours = Math.floor(totalMinutes / 60)
                      const minutes = totalMinutes % 60
                      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
                    })()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAlbums.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No albums found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
