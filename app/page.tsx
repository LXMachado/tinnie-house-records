"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Mail, Facebook, Twitter, Music2, ShoppingCart, Play } from "lucide-react"
import dynamic from "next/dynamic"

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
})

const slides = [
  {
    title: "Ritual",
    artist: "Rafa Kao & Gabriel Samny",
    description: "29/03/2025",
  },
  {
    title: "Cabarita",
    artist: "Rafa Kao & Gabriel Samny",
    description: "Coming Soon",
  },
  {
    title: "Medusa",
    artist: "G.U.R.I",
    description: "Coming Soon",
  },
]

const releases = [
  {
    artist: "G.U.R.I",
    title: "Morphing (Original Mix)",
    description: "2024",
    image: "https://i1.sndcdn.com/artworks-gp7zOz3Q7fImFubN-pJQ5sg-t500x500.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1533941911",
  },
  {
    artist: "Rafa Kao, Cam Harris",
    title: "Flotian (Original Mix)",
    description: "2018",
    image: "https://i1.sndcdn.com/artworks-000445814340-1cd4k0-t500x500.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/534618756",
  },
  {
    artist: "G.U.R.I",
    title: "Magnetosphere (Original Mix)",
    description: "2023",
    image: "https://i1.sndcdn.com/artworks-Oq3gqfhqeF1Llmmr-uWJV9w-t500x500.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1375445389",
  },
  {
    artist: "G.U.R.I",
    title: "Aurora (Original Mix)",
    description: "2022",
    image: "https://i1.sndcdn.com/artworks-vSmG712akh96ZUTV-LbyOXw-t500x500.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1375437160",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#050d10] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#007afe] opacity-20 blur-[150px] animate-pulse" />
      <div className="absolute bottom-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#007afe] opacity-15 blur-[130px] animate-pulse" />

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
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Home
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              About Us
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Releases
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Contact Us
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="relative">
          <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Text Content */}
              <div className="space-y-4 animate-fade-in text-center md:text-left order-2 md:order-1">
                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-blue-500 font-orbitron">Release date:</h2>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-orbitron tracking-wider">
                    29/03/2025
                  </h1>
                </div>
                <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
                  TH018: Rafa Kao & Gabriel Samy – Ritual (Original Mix) Tinnie House Records proudly presents "Ritual",
                  the latest melodic house & techno masterpiece from Rafa Kao & Gabriel Samy. A deep, hypnotic journey
                  driven by pulsating rhythms, ethereal synths, and an entrancing groove, "Ritual" blends raw energy
                  with atmospheric textures to captivate dancefloors. Available March 29, 2025, on Beatport, Spotify,
                  and all major digital platforms. 🔥🎶
                </p>
                <button
                  onClick={() => setCurrentTrack("https://api.soundcloud.com/tracks/2045752144")}
                  className="custom-button text-sm inline-flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Listen
                </button>
                <div className="pt-8 md:pt-12">
                  <p className="text-xs text-gray-500 uppercase font-orbitron">
                    STEP INTO THE FUTURE, ONE
                    <br />
                    DECIBEL AT A TIME
                  </p>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative max-w-[580px] w-full mx-auto aspect-square order-1 md:order-2">
                <div className="group relative">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rafa%20Kao%20&%20Gabriel%20Samny%20-%20Ritual-hSyCJQ7qsAQqbRnOwKlLGiEDAlCaXx.webp"
                    alt="RITUAL - Rafa Kao & Gabriel Samny"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* NEW RELEASE Overlay */}
                  <div className="absolute -bottom-12 left-0 w-full hidden md:block">
                    <h2 className="text-[80px] leading-none font-bold text-white/10 font-orbitron whitespace-nowrap">
                      NEW RELEASE
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* About Us Section */}
        <section className="container mx-auto p-4 md:p-8">
          <h2 className="mb-8 text-xl md:text-2xl font-bold text-white font-orbitron text-center md:text-left">
            About Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                Tinnie House Records is an underground electronic music label based in the Gold Coast, Australia.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                With a deep appreciation for the local Australian techno, melodic techno, and progressive house scenes,
                the label is committed to promoting fresh, innovative sounds.
              </p>
            </div>
            <div className="p-8 border border-blue-500/20 bg-blue-950/20 space-y-6">
              <p className="text-gray-300 text-lg font-medium">
                Tinnie House Records supports emerging talent and invites demos.
              </p>
              <a href="mailto:tinniehouse@gmail.com">
                <button className="custom-button text-sm inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Submit Demos
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Upcoming Releases */}
        <section className="container mx-auto p-4 md:p-8">
          <h2 className="mb-8 text-xl md:text-2xl font-bold text-white font-orbitron text-center md:text-left">
            Upcoming Releases
          </h2>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-[16/9] bg-blue-950/20 border border-blue-500/20 rounded-lg overflow-hidden relative">
              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-orbitron mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-lg text-blue-500 font-orbitron mb-2">{slides[currentSlide].artist}</p>
                <p className="text-sm text-gray-400 font-orbitron">{slides[currentSlide].description}</p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() => setCurrentSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-blue-500/20 bg-blue-950/20 flex items-center justify-center text-white hover:bg-blue-900/30 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-blue-500/20 bg-blue-950/20 flex items-center justify-center text-white hover:bg-blue-900/30 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? "bg-blue-500" : "bg-blue-500/20"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Previous Releases */}
        <section className="container mx-auto p-4 md:p-8">
          <h2 className="mb-8 text-xl md:text-2xl font-bold text-white font-orbitron text-center md:text-left">
            Some of Our Previous Releases
          </h2>
          <div className="space-y-8">
            {releases.map((release, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div
                  className={`${i % 2 === 1 ? "md:order-last" : ""} w-full md:w-48 aspect-square bg-gray-800 border border-blue-500/20 overflow-hidden`}
                >
                  {release.image ? (
                    <img
                      src={release.image || "/placeholder.svg"}
                      alt={`${release.artist} - ${release.title}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      Connected Beyond the Grid
                    </div>
                  )}
                </div>
                <div className={`flex-1 space-y-4 text-center ${i % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                  <div>
                    <h3 className="text-xl font-semibold text-white font-orbitron">{release.artist}</h3>
                    <h4 className="text-lg text-blue-500 font-orbitron">{release.title}</h4>
                  </div>
                  <p className="text-gray-400">{release.description}</p>
                  <button className="custom-button" onClick={() => setCurrentTrack(release.soundcloudUrl)}>
                    Listen
                  </button>
                </div>
              </div>
            ))}
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

            {/* Contact Form */}
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron mb-8">
                GET
                <br />
                IN TOUCH
              </h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full h-9 rounded-md border border-blue-500/20 bg-blue-950/20 px-3 py-2 text-sm text-white placeholder-gray-400"
                />
                <button className="custom-button w-32 h-8 text-sm">Subscribe</button>
              </form>
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
              <nav className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  About Us
                </Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  Releases
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
      <MusicPlayer defaultTrack={currentTrack} />
    </div>
  )
}

