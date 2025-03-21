"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Facebook, Twitter, Music2, ShoppingCart, ArrowRight, Play, Instagram } from "lucide-react"
import dynamic from "next/dynamic"

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
})

const genres = [
  {
    title: "Techno",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techno-bg-gSITQpXu3GCMDLZJAg6sXcMzWNvl5P.jpg",
  },
  {
    title: "Melodic Techno",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/melodic-techno-bg-2F6bXnJHDKnXxYkvRXMDG1teTGBPg4.jpg",
  },
  {
    title: "Progressive House",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/progressive-house-bg-CcqqOH2Ydb8Vn8Dz9tNUb4rJtUMpOo.jpg",
  },
]

export default function HomePage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)

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
            <Link href="/" className="text-white text-sm font-orbitron">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white text-sm font-orbitron">
              About Us
            </Link>
            <Link href="/releases" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Releases
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Contact Us
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          {/* Removed all background dividers and gradients that create separation */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-orbitron tracking-wider leading-tight">
                PUSHING THE BOUNDARIES OF UNDERGROUND ELECTRONIC MUSIC
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                Tinnie House Records is an independent label dedicated to showcasing innovative techno, melodic techno,
                and progressive house from Australia and beyond.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentTrack("https://soundcloud.com/tinniehouserecords/ritual-preview")}
                  className="btn-primary text-sm"
                >
                  <Play className="h-4 w-4" />
                  Listen
                </button>
                <Link href="/releases" className="inline-block">
                  <button className="btn-outline text-sm">Explore Releases</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section - no container padding-top to eliminate separation */}
        <section className="container mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg border border-blue-500/20 shadow-lg shadow-blue-500/10 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-[#050d10] flex items-center justify-center">
                <div className="text-center p-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tinnie%20House%20Records%20(1)-35JIRngsVC27bYDztxm3uwgPYb8Bq8.png"
                    alt="Tinnie House Records Logo"
                    className="h-16 w-16 object-contain mx-auto mb-4"
                  />
                  <h4 className="text-xl font-bold text-white font-orbitron">TINNIE HOUSE RECORDS</h4>
                  <p className="text-blue-400 mt-2">Gold Coast, Australia</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-blue-500 font-orbitron">WHO WE ARE</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white font-orbitron">
                  GOLD COAST'S PREMIER UNDERGROUND ELECTRONIC LABEL
                </h3>
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Founded in the heart of Australia's Gold Coast, Tinnie House Records has grown from a local passion
                  project into a respected platform for electronic music innovation.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our mission is to discover and nurture authentic talent, pushing the boundaries of electronic music
                  while staying true to our underground roots.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="text-white font-medium mb-1">Techno</h4>
                    <p className="text-gray-400 text-sm"></p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="text-white font-medium mb-1">Melodic Techno</h4>
                    <p className="text-gray-400 text-sm"></p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="text-white font-medium mb-1">Progressive House</h4>
                    <p className="text-gray-400 text-sm"></p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <button className="btn-primary text-sm inline-flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Learn More About Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Artist Submissions - added more top margin to create spacing */}
        <section className="container mx-auto p-4 md:p-8 py-16 md:py-32 mt-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron">
                BECOME PART OF OUR LABEL FAMILY
              </h2>
              <p className="text-gray-300 text-lg">
                We're always on the lookout for fresh talent and innovative sounds that push the boundaries of
                electronic music.
              </p>
              <div className="pt-4">
                <a href="mailto:tinniehouse@gmail.com">
                  <button className="btn-primary text-sm inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Submit Your Demos
                  </button>
                </a>
              </div>
            </div>

            <div className="p-8 border border-blue-500/20 bg-blue-950/10 space-y-6 rounded-lg">
              <h3 className="text-xl font-bold text-white font-orbitron">JOIN OUR COMMUNITY</h3>
              <p className="text-gray-300">
                Sign up for exclusive updates on releases, events, and special announcements.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-10 rounded-md border border-blue-500/20 bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400"
                />
                <button className="btn-primary w-full h-10 text-sm">Subscribe</button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 bg-[#0c1618] mt-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 p-4 md:p-8">
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
                  <Link href="/releases" className="text-sm text-gray-400 hover:text-white">
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
          <div className="border-t border-blue-500/20">
            <div className="container mx-auto py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
        </footer>
      </div>
      <MusicPlayer defaultTrack={currentTrack} />
    </div>
  )
}

