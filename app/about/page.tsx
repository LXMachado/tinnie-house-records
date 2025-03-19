import Link from "next/link"
import { Mail, Facebook, Twitter, Music2, ShoppingCart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050d10] relative overflow-hidden">
      {/* Standardized subtle glow effects */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#007afe] opacity-5 blur-[180px] animate-pulse" />
      <div className="absolute bottom-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#007afe] opacity-3 blur-[160px] animate-pulse" />

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
            <Link href="/about" className="text-white text-sm font-orbitron">
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* About Section */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-orbitron">About Us</h1>

              <div className="space-y-6">
                <p className="text-gray-400 text-lg leading-relaxed">
                  Tinnie House Records is an underground electronic music label based in the Gold Coast, Australia.
                </p>

                <p className="text-gray-400 text-lg leading-relaxed">
                  With a deep appreciation for the local Australian techno, melodic techno, and progressive house
                  scenes, the label is committed to promoting fresh, innovative sounds.
                </p>

                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-500/5">
                  <p className="text-gray-300 text-lg italic">
                    Tinnie House Records supports emerging talent and invites demos.
                  </p>
                </div>

                <div className="pt-8">
                  <a href="mailto:tinniehouse@gmail.com">
                    <button className="btn-primary text-sm inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Submit Demos
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Our Sound */}
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-orbitron mb-6">Our Sound</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-500/5">
                  <h3 className="text-xl font-bold text-white font-orbitron mb-2">Techno</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-500/5">
                  <h3 className="text-xl font-bold text-white font-orbitron mb-2">Melodic Techno</h3>
                  <p className="text-gray-400"></p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-500/5">
                  <h3 className="text-xl font-bold text-white font-orbitron mb-2">Progressive House</h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
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
                <nav className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                  <Link href="/" className="text-sm text-gray-400 hover:text-white">
                    Home
                  </Link>
                  <Link href="/about" className="text-sm text-white">
                    About Us
                  </Link>
                  <Link href="/releases" className="text-sm text-gray-400 hover:text-white">
                    Releases
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

