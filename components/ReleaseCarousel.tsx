"use client"

import { useState, useEffect } from "react"
import { Play, ChevronLeft, ChevronRight, Loader2, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Track {
  id: string
  title: string
  user: { username: string }
  artwork_url: string | null
  permalink_url: string
}

interface ReleaseCarouselProps {
  username?: string
  limit?: number
  onTrackSelect?: (trackUrl: string) => void
  featured?: boolean
  offset?: number
  excludeLatest?: boolean // New prop to exclude the latest track
}

export default function ReleaseCarousel({
  username = "tinniehouserecords",
  limit = 10,
  onTrackSelect,
  featured = false,
  offset = 0,
  excludeLatest = false, // Default to false to maintain backward compatibility
}: ReleaseCarouselProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(featured ? 1 : 3)

  // Fetch tracks
  useEffect(() => {
    async function fetchTracks() {
      try {
        setLoading(true)
        // Fetch one extra track if we need to exclude the latest
        const fetchLimit = excludeLatest ? limit + 1 : limit
        const response = await fetch(`/api/soundcloud?username=${username}&limit=${fetchLimit}&offset=${offset}`)

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || `Error: ${response.status}`)
        }

        const data = await response.json()

        if (!data.tracks || data.tracks.length === 0) {
          throw new Error("No tracks found")
        }

        // If excludeLatest is true, remove the first track (latest)
        const displayTracks = excludeLatest ? data.tracks.slice(1) : data.tracks
        setTracks(displayTracks)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tracks")
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [username, limit, offset, excludeLatest])

  // Update visible count based on screen size
  useEffect(() => {
    function handleResize() {
      if (featured) {
        setVisibleCount(1)
      } else if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [featured])

  // Get high-res artwork
  function getArtwork(url: string | null) {
    if (!url) return "/placeholder.svg?height=500&width=500"
    return url.replace("-large.", "-t500x500.").replace("large", "t500x500")
  }

  // Navigation
  function nextSlide() {
    setCurrentIndex((prev) => (prev + visibleCount >= tracks.length ? 0 : prev + visibleCount))
  }

  function prevSlide() {
    setCurrentIndex((prev) =>
      prev - visibleCount < 0 ? Math.max(0, tracks.length - visibleCount) : prev - visibleCount,
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error || tracks.length === 0) {
    return (
      <div className="p-8 text-center border border-blue-500/20 bg-blue-950/10 rounded-lg">
        <AlertCircle className="h-10 w-10 text-blue-500 mx-auto mb-4" />
        <h3 className="text-white font-orbitron text-lg mb-2">Unable to load tracks</h3>
        <p className="text-gray-400 mb-4">{error || "No tracks found"}</p>
      </div>
    )
  }

  // Featured view (single track)
  if (featured && tracks.length > 0) {
    const track = tracks[0]
    return (
      <div className="grid md:grid-cols-2 gap-8 bg-blue-950/10 border border-blue-500/20 p-6 rounded-lg">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={getArtwork(track.artwork_url) || "/placeholder.svg"}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-orbitron">{track.title}</h3>
            <p className="text-blue-400">{track.user.username}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={() => onTrackSelect && onTrackSelect(track.permalink_url)} className="btn-primary text-sm">
              <Play className="h-4 w-4" />
              Listen
            </button>

            <Link href={track.permalink_url} target="_blank" className="inline-block">
              <button className="btn-outline text-sm flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View on SoundCloud
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Regular carousel view
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevSlide}
          className="p-2 bg-blue-950/30 hover:bg-blue-950/50 rounded-full text-white"
          aria-label="Previous releases"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="p-2 bg-blue-950/30 hover:bg-blue-950/50 rounded-full text-white"
          aria-label="Next releases"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            width: `${(tracks.length / visibleCount) * 100}%`,
          }}
        >
          {tracks.map((track) => (
            <div key={track.id} className="px-2" style={{ width: `${(100 / tracks.length) * visibleCount}%` }}>
              <div className="border border-blue-500/20 bg-blue-950/10 hover:bg-blue-950/20 transition-colors rounded-lg overflow-hidden h-full flex flex-col">
                <div className="aspect-square relative">
                  <img
                    src={getArtwork(track.artwork_url) || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onTrackSelect && onTrackSelect(track.permalink_url)}
                    className="absolute bottom-4 right-4 p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors"
                    aria-label={`Play ${track.title}`}
                  >
                    <Play className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-white font-orbitron font-medium text-lg line-clamp-1">{track.title}</h3>
                  <p className="text-blue-400 text-sm">{track.user.username}</p>

                  <div className="mt-auto pt-4">
                    <Link
                      href={track.permalink_url}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View on SoundCloud
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(tracks.length / visibleCount) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleCount)}
            className={`h-2 rounded-full transition-all ${
              index * visibleCount === currentIndex ? "w-6 bg-blue-500" : "w-2 bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

