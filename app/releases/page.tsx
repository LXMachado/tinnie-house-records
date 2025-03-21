"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Music2, ShoppingCart, Instagram } from "lucide-react"
import dynamic from "next/dynamic"
import ReleaseCarousel from "@/components/ReleaseCarousel"

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
})

export default function ReleasesPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)

  // Handle track selection with logging
  const handleTrackSelect = (trackUrl: string) => {
    console.log("Setting current track in ReleasesPage:", trackUrl)
    setCurrentTrack(trackUrl)
  }

  return (
    <div className="min-h-screen bg-[#050d10] relative overflow-hidden">
      {/* Standardized subtle glow effects */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#007afe] opacity-8 blur-[160px] animate-pulse" />
      <div className="absolute bottom-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#007afe] opacity-6 blur-[140px] animate-pulse" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tinnie%20House%20Records%20(1)-35JIRngsVC27bYDztxm3uwgPYb8Bq8.png"
              alt="Tinnie House Records Logo"
              className="h-6 w-6 object-contain"
            />
            <span className="text-white font-orbitron text-sm">Tinnie House Records</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white text-sm font-orbitron">
              About Us
            </Link>
            <Link href="/releases" className="text-white text-sm font-orbitron">
              Releases
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Contact Us
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Releases Header */}
            <div className="space-y-8 animate-fade-in mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-orbitron">Our Releases</h1>
              <p className="text-gray-400 text-lg max-w-3xl">
                Explore our catalog of underground electronic music, featuring innovative techno, melodic techno, and
                progressive house from Australia and beyond.
              </p>
            </div>

            {/* Featured Release */}
            <div className="mb-20">
              <h2 className="text-xl font-medium text-blue-500 font-orbitron mb-6">LATEST RELEASE</h2>
              <ReleaseCarousel
                username="tinniehouserecords"
                limit={1}
                onTrackSelect={handleTrackSelect}
                featured={true}
                offset={0}
              />
            </div>

            {/* All Releases */}
            <div>
              <h2 className="text-xl font-medium text-blue-500 font-orbitron mb-6">SOME OF OUR PAST RELEASES</h2>
              <ReleaseCarousel
                username="tinniehouserecords"
                limit={3}
                onTrackSelect={handleTrackSelect}
                offset={0}
                excludeLatest={true} // Add this prop to exclude the latest track
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 bg-[#0c1618] mt-8">
          <div className="container mx-auto py-6 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              {/* Links Sections */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-orbitron">Social Media</h3>
                  <nav className="flex flex-col gap-3">
                    <Link
                      href="https://www.facebook.com/TinnieHouse/"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Link>
                    <Link
                      href="https://x.com/Tinnie_House"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4" />X / Twitter
                    </Link>
                    <Link
                      href="https://soundcloud.com/tinniehouserecords"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <Music2 className="h-4 w-4" />
                      SoundCloud
                    </Link>
                    <Link
                      href="https://www.instagram.com/tinnie_house_records/"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Link>
                  </nav>
                </div>
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-orbitron">Music Platforms</h3>
                  <nav className="flex flex-col gap-3">
                    <Link
                      href="https://www.beatport.com/en/label/tinnie-house-records/50650"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Beatport
                    </Link>
                    <Link
                      href="https://www.traxsource.com/label/24177/"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Traxsource
                    </Link>
                    <Link
                      href="https://www.junodownload.com/labels/Tinnie+House/"
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Juno Download
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-5">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-orbitron">Quick Links</h3>
                  <nav className="grid grid-cols-2 gap-3">
                    <Link href="/" className="text-sm text-gray-400 hover:text-white">
                      Home
                    </Link>
                    <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                      About Us
                    </Link>
                    <Link href="/releases" className="text-sm text-white">
                      Releases
                    </Link>
                    <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                      Contact
                    </Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white">
                      Submit Demos
                    </Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-500/20 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tinnie%20House%20Records%20(1)-35JIRngsVC27bYDztxm3uwgPYb8Bq8.png"
                    alt="Tinnie House Records Logo"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="text-white font-orbitron">Tinnie House Records</span>
                </div>
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Tinnie House Records. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <MusicPlayer defaultTrack={currentTrack} />
    </div>
  )
}

