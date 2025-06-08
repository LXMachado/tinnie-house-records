"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"

interface MusicPlayerProps {
  defaultTrack?: string | null
}

export default function MusicPlayer({ defaultTrack }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("Loading...")
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)
  const currentTrackRef = useRef<string | null>(null)
  const isInitializedRef = useRef(false)

  // Log when defaultTrack changes
  useEffect(() => {
    console.log("MusicPlayer defaultTrack changed:", defaultTrack)
  }, [defaultTrack])

  // Extract track ID from URL
  const getTrackId = useCallback((url: string) => {
    console.log("Getting track ID from URL:", url)

    // Handle direct API URLs with track ID
    const apiMatch = url.match(/tracks\/(\d+)/)
    if (apiMatch) {
      console.log("Found API track ID:", apiMatch[1])
      return apiMatch[1]
    }

    // Handle SoundCloud URLs with username/track-name format
    const userTrackMatch = url.match(/soundcloud\.com\/([^/]+)\/([^/]+)/)
    if (userTrackMatch) {
      console.log("Found user/track format:", userTrackMatch[1], userTrackMatch[2])
      return `${userTrackMatch[1]}/${userTrackMatch[2]}`
    }

    // If it's just a number, assume it's a track ID
    if (/^\d+$/.test(url)) {
      console.log("URL is just a track ID:", url)
      return url
    }

    console.log("Could not extract track ID from URL")
    return null
  }, [])

  // Format track URL to ensure it's in the correct format for the widget
  const formatTrackUrl = useCallback(
    (url: string) => {
      if (!url) return null
      console.log("Formatting track URL:", url)

      // If it's already a SoundCloud URL, use it directly
      if (url.includes("soundcloud.com/")) {
        console.log("URL is already a SoundCloud URL")
        return url
      }

      // If it's an API URL, use it directly
      if (url.includes("api.soundcloud.com/tracks/")) {
        console.log("URL is already an API URL")
        return url
      }

      // Extract the track ID and create a proper URL
      const trackId = getTrackId(url)
      if (!trackId) {
        console.log("Could not get track ID")
        return null
      }

      // If it contains a slash, it's a user/track format
      if (trackId.includes("/")) {
        console.log("Creating URL from user/track format")
        return `https://soundcloud.com/${trackId}`
      }

      // Otherwise it's just a track ID
      console.log("Creating URL from track ID")
      return `https://api.soundcloud.com/tracks/${trackId}`
    },
    [getTrackId],
  )

  // Load SoundCloud Widget API script
  useEffect(() => {
    if (window.SC || document.querySelector('script[src*="api.js"]')) return

    const script = document.createElement("script")
    script.src = "https://w.soundcloud.com/player/api.js"
    script.async = true
    script.onload = () => console.log(new Date().toISOString(), "SoundCloud API loaded")
    script.onerror = () => setError("Failed to load SoundCloud API")
    document.body.appendChild(script)

    return () => {
      const scriptElement = document.querySelector('script[src*="api.js"]')
      if (scriptElement) {
        document.body.removeChild(scriptElement)
      }
    }
  }, [])

  // Initialize widget
  const initializeWidget = useCallback(() => {
    if (!iframeRef.current || !window.SC || isInitializedRef.current) return

    console.log(new Date().toISOString(), "Initializing widget...")
    isInitializedRef.current = true
    const widget = window.SC.Widget(iframeRef.current)
    widgetRef.current = widget

    widget.bind(window.SC.Widget.Events.READY, () => {
      console.log(new Date().toISOString(), "Widget ready")
      setIsLoading(false)
      if (defaultTrack) {
        const formattedUrl = formatTrackUrl(defaultTrack)
        if (formattedUrl) {
          console.log(new Date().toISOString(), "Loading initial track:", formattedUrl)
          loadTrack(formattedUrl)
        }
      }
    })

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      console.log(new Date().toISOString(), "Track playing")
      setIsPlaying(true)
      widget.getCurrentSound((sound: any) => {
        if (sound?.title) {
          console.log(new Date().toISOString(), "Current sound:", sound)
          setCurrentTitle(sound.title)
        }
      })
    })

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      console.log(new Date().toISOString(), "Track paused")
      setIsPlaying(false)
    })

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      console.log(new Date().toISOString(), "Track finished")
      setIsPlaying(false)
      setCurrentTitle("No track selected")
    })

    widget.bind(window.SC.Widget.Events.ERROR, (e: any) => {
      console.error(new Date().toISOString(), "Widget error:", e)
      setError("Error playing track")
      setIsPlaying(false)
      setIsLoading(false)
    })
  }, [defaultTrack, formatTrackUrl])

  // Wait for SC to be available and initialize widget
  useEffect(() => {
    if (window.SC) {
      initializeWidget()
    } else {
      const interval = setInterval(() => {
        if (window.SC) {
          clearInterval(interval)
          initializeWidget()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [initializeWidget])

  // Load and play track
  const loadTrack = useCallback(
    (trackUrl: string) => {
      if (!widgetRef.current || currentTrackRef.current === trackUrl || !trackUrl) return

      console.log(new Date().toISOString(), "Loading track:", trackUrl)
      setIsLoading(true)
      setError(null)
      currentTrackRef.current = trackUrl

      try {
        widgetRef.current.load(trackUrl, {
          auto_play: true,
          buying: false,
          liking: false,
          download: false,
          sharing: false,
          show_artwork: false,
          show_comments: false,
          show_playcount: false,
          show_user: false,
          callback: (err: any) => {
            if (err) {
              console.error(new Date().toISOString(), "Load error:", err)
              setError("Error loading track. The track may have been removed or is unavailable.")
              setIsLoading(false)

              // Try alternative URL format if the track fails to load
              if (trackUrl.includes("soundcloud.com/") && !trackUrl.includes("api.soundcloud.com")) {
                const parts = trackUrl.split("/")
                const username = parts[parts.length - 2]
                const trackName = parts[parts.length - 1]

                if (username && trackName) {
                  console.log("Trying alternative API URL format...")
                  // Try to load using the API URL format
                  const apiUrl = `https://api.soundcloud.com/tracks/${trackName}`
                  currentTrackRef.current = null // Reset to allow reloading
                  loadTrack(apiUrl)
                }
              }
              return
            }
            console.log(new Date().toISOString(), "Track loaded successfully")
            setIsLoading(false)
            widgetRef.current.setVolume(volume / 100)

            // Get track info including artwork
            widgetRef.current.getCurrentSound((sound: any) => {
              if (sound) {
                console.log("Track info:", sound)
                setCurrentTitle(sound.title || "Unknown Track")
              }
            })
          },
        })
      } catch (err) {
        console.error(new Date().toISOString(), "Load track error:", err)
        setError("Error loading track. Please try again.")
        setIsLoading(false)
      }
    },
    [volume],
  )

  // Handle track changes
  useEffect(() => {
    if (!defaultTrack || !widgetRef.current) return

    const formattedUrl = formatTrackUrl(defaultTrack)
    console.log(new Date().toISOString(), "Formatted URL:", formattedUrl)

    if (formattedUrl && currentTrackRef.current !== formattedUrl) {
      loadTrack(formattedUrl)
    }
  }, [defaultTrack, formatTrackUrl, loadTrack])

  const togglePlay = useCallback(() => {
    if (!widgetRef.current || isLoading || !currentTrackRef.current) return

    console.log(new Date().toISOString(), "Toggling play state:", !isPlaying)
    if (isPlaying) {
      widgetRef.current.pause()
    } else {
      widgetRef.current.play()
    }
  }, [isLoading, isPlaying])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (widgetRef.current) {
      widgetRef.current.setVolume(newVolume / 100)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (!widgetRef.current) return

    if (isMuted) {
      setVolume(50)
      widgetRef.current.setVolume(0.5)
    } else {
      setVolume(0)
      widgetRef.current.setVolume(0)
    }
    setIsMuted(!isMuted)
  }, [isMuted])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c1618]/95 border-t border-blue-500/20 backdrop-blur-sm z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="btn-primary h-9 w-9 p-0 hover:bg-blue-500/30"
            disabled={isLoading || !defaultTrack}
            style={{ padding: 0 }}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white" disabled={!defaultTrack}>
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!defaultTrack}
              className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full"
              style={{
                background: `linear-gradient(to right, #007afe ${volume}%, #4b5563 ${volume}%)`,
              }}
            />
          </div>
        </div>

        <div className="flex-1 text-center">
          <p className="text-sm text-white font-orbitron truncate px-4">
            {error || (isLoading ? "Loading..." : currentTitle)}
          </p>
        </div>

        <div className="w-32" />
      </div>

      <iframe
        ref={iframeRef}
        id="soundcloud-player"
        width="100%"
        height="0"
        scrolling="no"
        allow="autoplay"
        frameBorder="0"
        className="hidden"
        src="https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/293"
      />
    </div>
  )
}

