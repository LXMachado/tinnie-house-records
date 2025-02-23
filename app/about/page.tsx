import Link from "next/link"
import { Mail } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"

export default function AboutPage() {
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
            <Link href="/" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Home
            </Link>
            <Link href="/about" className="text-white text-sm font-orbitron">
              About Us
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Artists
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Releases
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm font-orbitron">
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
                    <CustomButton className="text-sm inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Submit Demos
                    </CustomButton>
                  </a>
                </div>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-blue-500/20 bg-blue-950/20 space-y-4">
                <h3 className="text-xl font-bold text-white font-orbitron">Techno</h3>
                <p className="text-gray-400">Exploring the depths of underground electronic music.</p>
              </div>
              <div className="p-6 border border-blue-500/20 bg-blue-950/20 space-y-4">
                <h3 className="text-xl font-bold text-white font-orbitron">Melodic Techno</h3>
                <p className="text-gray-400">Blending emotive melodies with driving rhythms.</p>
              </div>
              <div className="p-6 border border-blue-500/20 bg-blue-950/20 space-y-4">
                <h3 className="text-xl font-bold text-white font-orbitron">Progressive House</h3>
                <p className="text-gray-400">Crafting journeys through progressive soundscapes.</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 bg-[#0c1618] mt-8">
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
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-sm text-white">
                About Us
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Artists
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Releases
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}

