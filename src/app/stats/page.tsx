'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Disc, Music2, Users } from 'lucide-react'
import Link from 'next/link'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTheme } from '../../components/theme-provider'

interface YearlyListeningTime {
  year: string
  totalListeningTimeMs: number
  totalListeningHours: number
  playCount: number
}

interface YearlyTopItems {
  year: string
  topSongs: Array<{
    songId: string
    name: string
    artist: string
    playCount: number
    totalListeningTimeMs: number
  }>
  topArtists: Array<{
    artistName: string
    playCount: number
    totalListeningTimeMs: number
    uniqueSongs: number
  }>
}

interface StatsData {
  metadata?: {
    timestamp: string
    source: string
  }
  stats: {
    yearlyListeningTime: YearlyListeningTime[]
    yearlyTopItems: YearlyTopItems[]
    totalListeningHours: number
    totalListeningDays: number
  }
}

// Helper function to get computed CSS variable value
const getCSSVariable = (variable: string): string => {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
}

export default function StatsPage() {
  const [statsData, setStatsData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || 'https://qcdjhj2hg6vos6cu.public.blob.vercel-storage.com'
        const blobUrl = `${baseUrl}/detailed-stats.json`
        const response = await fetch(blobUrl, {
          cache: 'no-cache'
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
        const data = await response.json()
        setStatsData(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStatsData(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  // Prepare chart options for yearly listening hours
  const getChartOptions = (): Highcharts.Options => {
    if (!statsData?.stats?.yearlyListeningTime || statsData.stats.yearlyListeningTime.length === 0) {
      return {
        chart: {
          type: 'column',
          height: 400
        },
        title: {
          text: 'No data available'
        }
      }
    }

    const categories = statsData.stats.yearlyListeningTime.map(item => item.year)
    const data = statsData.stats.yearlyListeningTime.map(item => item.totalListeningHours)

    // Get theme colors
    const foreground = getCSSVariable('--foreground')
    const mutedForeground = getCSSVariable('--muted-foreground')
    const card = getCSSVariable('--card')
    const border = getCSSVariable('--border')
    const primary = getCSSVariable('--primary')
    
    const foregroundColor = foreground ? `rgb(${foreground})` : (theme === 'dark' ? '#f3f4f6' : '#1f2937')
    const mutedColor = mutedForeground ? `rgb(${mutedForeground})` : (theme === 'dark' ? '#9ca3af' : '#6b7280')
    const cardColor = card ? `rgb(${card})` : (theme === 'dark' ? '#374151' : '#ffffff')
    const borderColor = border ? `rgb(${border})` : (theme === 'dark' ? '#4b5563' : '#e5e7eb')
    const primaryColor = primary ? `rgb(${primary})` : '#4f46e5'

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: 500,
        style: {
          fontFamily: 'inherit'
        }
      },
      title: {
        text: 'Total Listening Hours by Year',
        style: {
          color: foregroundColor
        }
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Year',
          style: {
            color: mutedColor
          }
        },
        labels: {
          style: {
            color: mutedColor
          }
        },
        lineColor: borderColor,
        tickColor: borderColor
      },
      yAxis: {
        title: {
          text: 'Hours',
          style: {
            color: mutedColor
          }
        },
        labels: {
          style: {
            color: mutedColor
          }
        },
        gridLineColor: borderColor
      },
      legend: {
        enabled: false
      },
      tooltip: {
        backgroundColor: cardColor,
        borderColor: borderColor,
        style: {
          color: foregroundColor
        },
        formatter: function() {
          return `<b>${this.x}</b><br/>${this.y?.toFixed(2)} hours`
        }
      },
      plotOptions: {
        column: {
          color: primaryColor,
          borderRadius: 4,
          dataLabels: {
            enabled: true,
            format: '{y:.0f}h',
            style: {
              color: foregroundColor,
              textOutline: 'none'
            }
          }
        }
      },
      series: [{
        name: 'Listening Hours',
        data: data,
        type: 'column'
      }],
      credits: {
        enabled: false
      }
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Spotify Statistics</h1>
          <p className="text-muted-foreground mb-6">
            Detailed insights into your listening habits
          </p>
          
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
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
                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                <Disc className="w-4 h-4" />
                Detailed
              </Link>
              <Link
                href="/stats"
                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-primary text-primary-foreground rounded-r-md"
              >
                <BarChart3 className="w-4 h-4" />
                Stats
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Display */}
        <div className="space-y-6">
          {statsData ? (
            <>
              {/* Yearly Listening Hours Chart */}
              {statsData.stats?.yearlyListeningTime && statsData.stats.yearlyListeningTime.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Yearly Listening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full">
                      {mounted && (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={getChartOptions()}
                          ref={chartComponentRef}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Yearly Listening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {statsData.stats?.yearlyListeningTime ? 'No yearly data available' : 'Loading chart data...'}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Summary Stats */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {statsData.stats?.totalListeningHours && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Listening Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {statsData.stats.totalListeningHours.toLocaleString(undefined, {
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </CardContent>
                  </Card>
                )}
                {statsData.stats?.totalListeningDays && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Listening Days</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {statsData.stats.totalListeningDays.toLocaleString(undefined, {
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : !loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stats data available</p>
              <p className="text-sm text-muted-foreground mt-2">
                Check console for errors
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

