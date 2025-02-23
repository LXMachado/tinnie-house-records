"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"

interface MusicPlayerProps {
  defaultTrack?: string | null
}

export default function MusicPlayer({ defaultTrack }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("No track selected")
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)
  const currentTrackRef = useRef<string | null>(null)
  const isInitializedRef = useRef(false)

  // Extract track ID from URL
  const getTrackId = useCallback((url: string) => {
    // Handle full widget URLs
    const widgetMatch = url.match(/tracks%2F(\d+)/)
    if (widgetMatch) return widgetMatch[1]

    // Handle direct API URLs
    const apiMatch = url.match(/tracks\/(\d+)/)
    if (apiMatch) return apiMatch[1]

    return null
  }, [])

  // Format track URL to ensure it's in the correct format
  const formatTrackUrl = useCallback(
    (url: string) => {
      if (!url) return null
      const trackId = getTrackId(url)
      return trackId ? `https://api.soundcloud.com/tracks/${trackId}` : null
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
              setError("Error loading track")
              setIsLoading(false)
              return
            }
            console.log(new Date().toISOString(), "Track loaded successfully")
            setIsLoading(false)
            widgetRef.current.setVolume(volume / 100)
          },
        })
      } catch (err) {
        console.error(new Date().toISOString(), "Load track error:", err)
        setError("Error loading track")
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
          <CustomButton
            onClick={togglePlay}
            className="h-9 w-9 p-0 hover:bg-blue-500/30"
            disabled={isLoading || !defaultTrack}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </CustomButton>
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

