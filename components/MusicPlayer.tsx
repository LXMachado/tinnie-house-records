"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"

interface MusicPlayerProps {
  defaultTrack?: string
}

export function MusicPlayer({
  defaultTrack = "https://w.soundcloud.com/player/?url=https://on.soundcloud.com/sfspcx6eWqxxYPiEA",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const widget = window.SC?.Widget(iframeRef.current)

    if (widget) {
      widget.bind(window.SC.Widget.Events.READY, () => {
        setIsLoaded(true)
      })

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true)
      })

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    const widget = window.SC?.Widget(iframeRef.current)
    if (widget) {
      if (isPlaying) {
        widget.pause()
      } else {
        widget.play()
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c1618]/95 border-t border-blue-500/20 backdrop-blur-sm transition-transform duration-300 ease-in-out translate-y-0 hover:translate-y-0 translate-y-[65px]">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <CustomButton onClick={togglePlay} className="h-8 w-8 p-0">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </CustomButton>
              <CustomButton className="h-8 w-8 p-0">
                <SkipBack className="h-4 w-4" />
              </CustomButton>
              <CustomButton className="h-8 w-8 p-0">
                <SkipForward className="h-4 w-4" />
              </CustomButton>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Volume2 className="h-4 w-4" />
              <div className="h-1 w-24 bg-gray-800 rounded-full">
                <div className="h-full w-1/2 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center">
            <p className="text-sm text-white font-orbitron animate-fade-in">
              Now Playing: Ritual - Rafa Kao & Gabriel Samny
            </p>
          </div>
          <div className="flex-1" />
        </div>
      </div>
      <iframe
        ref={iframeRef}
        width="100%"
        height="0"
        scrolling="no"
        allow="autoplay"
        src={defaultTrack}
        className="hidden"
      />
    </div>
  )
}

