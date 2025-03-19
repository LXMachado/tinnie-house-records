"use client"

import { useState } from "react"
import Link from "next/link"
import { useActionState } from "react"
import { Mail, Facebook, Twitter, Music2, ShoppingCart, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm, type ContactFormState } from "../actions/contact"
import dynamic from "next/dynamic"

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
})

const initialState: ContactFormState = {}

export default function ContactPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission with loading state
  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true)
    const originalAction = formAction(formData)

    // Reset submitting state after form action completes
    Promise.resolve(originalAction).finally(() => {
      setIsSubmitting(false)
    })

    return originalAction
  }

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
                Have questions about our label, releases, or interested in submitting your demos? We'd love to hear from
                you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Form Section */}
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-8">
                <form action={handleSubmit} className="space-y-6">
                  {/* Form success message */}
                  {state.success && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded flex items-center gap-3 animate-fade-in">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-300 text-sm">
                        Your message has been sent successfully! We'll be in touch soon.
                      </p>
                    </div>
                  )}

                  {/* Form error message */}
                  {state.errors?._form && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded flex items-center gap-3 animate-fade-in">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{state.errors._form}</p>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white font-orbitron text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full h-10 rounded-md border ${state.errors?.name ? "border-red-500/50" : "border-blue-500/20"} bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      placeholder="Your name"
                    />
                    {state.errors?.name && <p className="text-red-400 text-xs">{state.errors.name[0]}</p>}
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
                      className={`w-full h-10 rounded-md border ${state.errors?.email ? "border-red-500/50" : "border-blue-500/20"} bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      placeholder="your.email@example.com"
                    />
                    {state.errors?.email && <p className="text-red-400 text-xs">{state.errors.email[0]}</p>}
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
                      className={`w-full h-10 rounded-md border ${state.errors?.subject ? "border-red-500/50" : "border-blue-500/20"} bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      placeholder="What's this about?"
                    />
                    {state.errors?.subject && <p className="text-red-400 text-xs">{state.errors.subject[0]}</p>}
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
                      className={`w-full rounded-md border ${state.errors?.message ? "border-red-500/50" : "border-blue-500/20"} bg-blue-950/40 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      placeholder="Your message here..."
                    ></textarea>
                    {state.errors?.message && <p className="text-red-400 text-xs">{state.errors.message[0]}</p>}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-sm w-full flex justify-center items-center h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="p-6 border border-blue-500/20 bg-blue-950/10 rounded-lg space-y-6">
                  <h3 className="text-xl font-bold text-white font-orbitron">Get In Touch</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Email Us</h4>
                        <a href="mailto:tinniehouse@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm">
                          tinniehouse@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Music2 className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Demo Submissions</h4>
                        <p className="text-gray-400 text-sm">
                          We're always looking for fresh talent. Send your demos to our email with the subject "Demo
                          Submission".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-6 border border-blue-500/20 bg-blue-950/10 rounded-lg space-y-6">
                  <h3 className="text-xl font-bold text-white font-orbitron">Follow Us</h3>

                  <div className="space-y-4">
                    <Link
                      href="https://www.facebook.com/TinnieHouse/"
                      target="_blank"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-500" />
                      <span>Facebook</span>
                    </Link>

                    <Link
                      href="https://x.com/Tinnie_House"
                      target="_blank"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-blue-500" />
                      <span>X / Twitter</span>
                    </Link>

                    <Link
                      href="https://soundcloud.com/tinniehouserecords"
                      target="_blank"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Music2 className="h-5 w-5 text-blue-500" />
                      <span>SoundCloud</span>
                    </Link>
                  </div>
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
                    <Link href="/contact" className="text-sm text-white">
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

