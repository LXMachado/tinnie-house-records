"use client"

import { useState, useEffect, useMemo } from "react"
import { Play, Loader2, AlertCircle } from "lucide-react"
import { CustomButton } from "@/components/CustomButton"

interface Track {
  id: string
  title: string
  user: {
    username: string
  }
  artwork_url: string | null
  description: string | null
  permalink_url: string
}

interface SoundcloudFetcherProps {
  username?: string
  limit?: number
  onTrackSelect?: (trackUrl: string) => void
  className?: string
}

export default function SoundcloudFetcher({
  username = "tinniehouserecords",
  limit = 4,
  onTrackSelect,
  className = "",
}: SoundcloudFetcherProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log(`Fetching tracks for username: ${username}`)
        const response = await fetch(`/api/soundcloud?username=${encodeURIComponent(username)}&limit=${limit}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("API response error:", response.status, errorData)
          throw new Error(errorData.error || `API returned ${response.status}`)
        }

        const data = await response.json()

        if (!data.tracks || !Array.isArray(data.tracks)) {
          console.error("Invalid response format:", data)
          throw new Error("Invalid response format from API")
        }

        console.log(`Received ${data.tracks.length} tracks`)
        setTracks(data.tracks)
      } catch (err) {
        console.error("Error fetching tracks:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [username, limit])

  // Get a higher resolution artwork
  const getHighResArtwork = (url: string | null) => {
    if (!url) return "https://placeholder.svg?height=300&width=300"
    return url.replace("large", "t500x500")
  }

  // Fallback to demo tracks if there's an error or no tracks
  const demoTracks = useMemo(
    () => [
      {
        id: "1",
        title: "Morphing (Original Mix)",
        user: { username: "G.U.R.I" },
        artwork_url: "https://i1.sndcdn.com/artworks-gp7zOz3Q7fImFubN-pJQ5sg-t500x500.jpg",
        permalink_url: "https://api.soundcloud.com/tracks/1533941911",
      },
      {
        id: "2",
        title: "Magnetosphere (Original Mix)",
        user: { username: "G.U.R.I" },
        artwork_url: "https://i1.sndcdn.com/artworks-Oq3gqfhqeF1Llmmr-uWJV9w-t500x500.jpg",
        permalink_url: "https://api.soundcloud.com/tracks/1375445389",
      },
      {
        id: "3",
        title: "Aurora (Original Mix)",
        user: { username: "G.U.R.I" },
        artwork_url: "https://i1.sndcdn.com/artworks-vSmG712akh96ZUTV-LbyOXw-t500x500.jpg",
        permalink_url: "https://api.soundcloud.com/tracks/1375437160",
      },
      {
        id: "4",
        title: "Flotian (Original Mix)",
        user: { username: "Rafa Kao, Cam Harris" },
        artwork_url: "https://i1.sndcdn.com/artworks-000445814340-1cd4k0-t500x500.jpg",
        permalink_url: "https://api.soundcloud.com/tracks/534618756",
      },
    ],
    [],
  )

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  // If there's an error or no tracks, use demo tracks but show a warning
  const displayTracks = tracks.length > 0 ? tracks : demoTracks

  return (
    <div className={className}>
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error} - Showing demo tracks instead.</p>
        </div>
      )}

      {tracks.length === 0 && !error && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <p className="text-yellow-300 text-sm">No tracks found - Showing demo tracks instead.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayTracks.map((track) => (
          <div
            key={track.id}
            className="flex flex-col md:flex-row gap-4 p-4 border border-blue-500/20 bg-blue-950/10 hover:bg-blue-950/20 transition-colors rounded-sm"
          >
            <div className="w-full md:w-24 h-24 bg-gray-800 flex-shrink-0">
              <img
                src={getHighResArtwork(track.artwork_url) || "/placeholder.svg?height=300&width=300"}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-orbitron text-sm font-medium truncate">{track.title}</h3>
                <p className="text-blue-500 text-xs">{track.user.username}</p>
              </div>
              <CustomButton
                onClick={() => onTrackSelect && onTrackSelect(track.permalink_url)}
                className="mt-2 text-xs py-1 px-3 h-auto"
              >
                <Play className="h-3 w-3 mr-1" />
                Listen
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

