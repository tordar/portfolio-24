'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Music, Play, Grid3X3, List, X, Disc, Music2, Users, ChevronDown, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface AlbumImage {
  height: number
  url: string
  width: number
}

interface Song {
  songId: string
  name: string
  duration_ms: number
  track_number: number
  disc_number: number
  explicit: boolean
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  play_count: number
  total_listening_time_ms: number
  artists: string[]
}

interface Album {
  albumId: string
  name: string
  album_type: string
  artists: string[]
  release_date: string
  release_date_precision: string
  popularity: number
  images: AlbumImage[]
  external_urls: {
    spotify: string
  }
  genres: string[]
  total_play_count: number
  total_listening_time_ms: number
  total_songs: number
  played_songs: number
  unplayed_songs: number
  songs: Song[]
}

interface AlbumsData {
  metadata: {
    originalTotalAlbums: number
    consolidatedTotalAlbums: number
    duplicatesRemoved: number
    consolidationRate: number
    timestamp: string
    source: string
    totalListeningEvents: number
  }
  albums: Album[]
}

// Lazy loading image component
const LazyAlbumImage = ({ album, rank, size = 'default' }: { album: Album; rank: number; size?: 'default' | 'mobile' }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
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
    
    const imgRef = document.getElementById(`album-${rank}-${size}`)
    if (imgRef) {
      observer.observe(imgRef)
    }
    
    return () => observer.disconnect()
  }, [rank, size])
  
  // Guard clause to prevent errors with invalid album data
  if (!album) {
    return (
      <div className={`relative bg-muted rounded-lg overflow-hidden ${
        size === 'mobile' ? 'w-16 h-16' : 'aspect-square'
      }`}>
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <Disc className={`${size === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'} text-muted-foreground`} />
        </div>
      </div>
    )
  }
  
  const imageUrl = album.images?.[0]?.url || ''
  
  // Debug logging
  if (rank <= 3) {
    console.log(`Album ${rank} (${album.name}):`, {
      hasImages: !!album.images,
      imagesLength: album.images?.length,
      imageUrl,
      albumImages: album.images
    })
  }
  
  return (
    <div 
      id={`album-${rank}-${size}`}
      className={`relative bg-muted rounded-lg overflow-hidden ${
        size === 'mobile' ? 'w-16 h-16' : 'w-20 h-20'
      }`}
    >
      {isInView && imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={`${album.name} album cover`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => {
              console.log(`Image loaded for ${album.name}`)
              setIsLoaded(true)
            }}
            onError={(e) => {
              console.log(`Image failed to load for ${album.name}:`, e)
              setIsLoaded(false)
            }}
            sizes={size === 'mobile' ? '64px' : "(max-width: 768px) 80px, (max-width: 1024px) 80px, 80px"}
            unoptimized={true}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <Music className={`${size === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'} text-muted-foreground`} />
            </div>
          )}
        </>
      )}
      {!imageUrl && isInView && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <Music className={`${size === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'} text-muted-foreground`} />
        </div>
      )}
    </div>
  )
}

// Format duration helper
const formatDuration = (durationMs: number) => {
  const duration = durationMs || 0
  const totalMinutes = Math.floor(duration / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

// Format song duration helper
const formatSongDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function TopAlbumsWithDetailsPage() {
  const [albumsData, setAlbumsData] = useState<AlbumsData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(new Set())
  
  // Add CSS keyframes for animation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || 'https://qcdjhj2hg6vos6cu.public.blob.vercel-storage.com'
        const blobUrl = `${baseUrl}/cleaned-albums-with-songs.json`
        const response = await fetch(blobUrl, {
          cache: 'force-cache' // Use browser cache
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
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

  console.log(albumsData)
  
  const filteredAlbums = albumsData?.albums.filter(album => 
    album.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artists?.some(artist => artist.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || []

  
  const toggleAlbumExpansion = (albumId: string) => {
    setExpandedAlbums(prev => {
      const newSet = new Set(prev)
      if (newSet.has(albumId)) {
        newSet.delete(albumId)
      } else {
        newSet.add(albumId)
      }
      return newSet
    })
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your top albums with details...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Top Albums (Detailed)</h1>
          <p className="text-muted-foreground mb-6">
            {albumsData?.metadata.consolidatedTotalAlbums} albums with song breakdowns
          </p>
          
          {/* Controls */}
          <div className="space-y-4">
            {/* Navigation and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              {/* Navigation */}
              <div className="flex border border-input rounded-md bg-background w-fit">
                <Link
                  href="/top-albums"
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground rounded-l-md"
                >
                  <Disc className="w-4 h-4" />
                  Albums
                </Link>
                <Link
                  href="/top-songs"
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Music2 className="w-4 h-4" />
                  Songs
                </Link>
                <Link
                  href="/top-artists"
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Users className="w-4 h-4" />
                  Artists
                </Link>
                <Link
                  href="/top-albums-with-details"
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-primary text-primary-foreground rounded-r-md"
                >
                  <Disc className="w-4 h-4" />
                  Detailed
                </Link>
              </div>
              
              {/* View Toggle */}
              <div className="flex border border-input rounded-md bg-background w-fit">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-l-md ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-r-md ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search albums or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Albums Display */}
        <div className="space-y-4">
          {filteredAlbums.map((album, index) => {
            const isExpanded = expandedAlbums.has(album.albumId)
            const rank = index + 1
            
            return (
              <Card key={album.albumId} className="group hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  {/* Album Header */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    {/* Album Image */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <LazyAlbumImage album={album} rank={rank} />
                    </div>
                    
                    {/* Album Info */}
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Badge variant="secondary" className="text-xs">
                            #{rank}
                          </Badge>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {album.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => toggleAlbumExpansion(album.albumId)}
                          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Hide Songs
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4" />
                              Show Songs
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-2">
                        <span>{album.artists[0]}</span>
                        <span>•</span>
                        <span>{album.release_date}</span>
                        <span>•</span>
                        <span>{album.total_songs} songs</span>
                      </div>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          <span>{album.total_play_count} plays</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(album.total_listening_time_ms)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          <span>{album.played_songs}/{album.total_songs} played</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Songs List */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-3">Songs ({album.songs.length})</h4>
                      <div className="space-y-2">
                        {album.songs
                          .sort((a, b) => b.play_count - a.play_count)
                          .map((song, songIndex) => (
                            <div 
                              key={song.songId} 
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                              style={{
                                animationDelay: `${songIndex * 50}ms`,
                                animation: isExpanded ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                              }}
                            >
                              <div className="flex-shrink-0 w-6 text-xs text-muted-foreground text-center">
                                {songIndex + 1}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm truncate">{song.name}</span>
                                  {song.explicit && (
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      E
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Track {song.track_number} • {formatSongDuration(song.duration_ms)}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  <span>{song.play_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatDuration(song.total_listening_time_ms)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {filteredAlbums.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No albums found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>
    </div>
  )
}
