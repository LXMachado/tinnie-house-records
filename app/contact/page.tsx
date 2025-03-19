"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Facebook, Twitter, Music2, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});

export default function ContactPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050d10] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#007afe] opacity-5 blur-[180px] animate-pulse" />
      <div className="absolute bottom-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#007afe] opacity-3 blur-[160px] animate-pulse" />

      {/* Content Wrapper */}
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
            <Link href="/releases" className="text-gray-400 hover:text-white text-sm font-orbitron">
              Releases
            </Link>
            <Link href="/contact" className="text-white text-sm font-orbitron">
              Contact Us
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Contact Header */}
            <div className="space-y-6 animate-fade-in mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-orbitron">Contact Us</h1>
              <p className="text-gray-400 text-lg max-w-3xl">
                Have questions about our label, releases, or submitting demos? We'd love to hear from you. Fill out the form below.
              </p>
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-8">
                <form 
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white font-orbitron text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full h-10 rounded-md border border-blue-500/20 bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-orbitron text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full h-10 rounded-md border border-blue-500/20 bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Subject field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-white font-orbitron text-sm">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full h-10 rounded-md border border-blue-500/20 bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white font-orbitron text-sm">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-md border border-blue-500/20 bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
                      placeholder="Your message here..."
                    />
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn-primary text-sm w-full">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="p-6 border border-blue-500/20 bg-blue-950/10 rounded-lg space-y-6">
                  <h3 className="text-xl font-bold text-white font-orbitron">Get In Touch</h3>
                  <p className="text-gray-400 text-sm">
                    Send us an email at <a href="mailto:tinniehouse@gmail.com" className="text-blue-400 hover:text-blue-300">tinniehouse@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 bg-[#0c1618] mt-8">
          <div className="container mx-auto py-6 px-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Tinnie House Records. All rights reserved.
          </div>
        </footer>
      </div>

      <MusicPlayer defaultTrack={currentTrack} />
    </div>
  );
}
