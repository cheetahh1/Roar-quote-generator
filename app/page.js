"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { X } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabaseClient"

const dinoQuotes = [
  "Life finds a way to be awesome! 🦕",
  "Don't let anyone make you extinct! 🦖",
  "Roar with confidence, stomp with purpose! 🦕",
  "Big dreams require big steps! 🦖",
  "Stay fierce, stay fabulous! 🦕",
  "Every day is a new adventure in the Jurassic! 🦖",
  "Be the T-Rex of your own story! 🦕",
  "Herbivore or carnivore, we all need love! 🦖",
  "Don't be a fossil, be a legend! 🦕",
  "Stomp your way to success! 🦖",
]

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState("Quotes appear here!")
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [signUpName, setSignUpName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [newQuote, setNewQuote] = useState("")
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState("")
  const [addOk, setAddOk] = useState("")

  const generateQuote = async () => {
    try {
      const res = await fetch("/api/quotes", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch quote")
      const data = await res.json()
      setCurrentQuote(data.quote)
    } catch (err) {
      setCurrentQuote("Unable to fetch quote. Please try again.")
    }
  }

  const goHome = () => {
    setShowSignUp(false)
    setShowLogin(false)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSignUpSubmit = async () => {
    setAuthError("")
    setAuthLoading(true)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: { name: signUpName },
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}`
              : undefined,
        },
      })
      if (error) throw error
      setShowSignUp(false)
      setShowLogin(true)
    } catch (err) {
      setAuthError(String(err?.message || err))
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLoginSubmit = async () => {
    setAuthError("")
    setAuthLoading(true)
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })
      if (error) throw error
      setUserEmail(data.user?.email || "")
      setShowLogin(false)
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } catch (err) {
      setAuthError(String(err?.message || err))
    } finally {
      setAuthLoading(false)
    }
  }

  const handleAddQuote = async () => {
    setAddError("")
    setAddOk("")
    const content = newQuote.trim()
    if (!content) {
      setAddError("Enter a quote first")
      return
    }
    setAddLoading(true)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('quotes').insert([{ content }])
      if (error) throw error
      setAddOk("Added!")
      setNewQuote("")
    } catch (err) {
      setAddError(String(err?.message || err))
    } finally {
      setAddLoading(false)
    }
  }

  useEffect(() => {
    try {
      const supabase = getSupabaseClient()
      supabase.auth.getUser().then(({ data }) => {
        setUserEmail(data.user?.email || "")
      })
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserEmail(session?.user?.email || "")
      })
      return () => {
        sub.subscription.unsubscribe()
      }
    } catch (_err) {
      // Env not set for client; ignore here to avoid UI crash
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Top navigation pill */}
      <div className="w-full flex justify-center pt-5 px-4">
        <div
          className="w-full max-w-7xl flex items-center justify-between rounded-full px-8"
          style={{ backgroundColor: "#F9A8D4", height: "72px" }}
        >
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Roar logo" width={48} height={48} />
            <span className="text-2xl font-bold text-white">ROAR</span>
          </div>
          <nav className="flex items-center gap-4">
            <button
              className="text-white/90 bg-white/10 hover:bg-white/20 transition-colors text-base rounded-full px-5 py-2.5"
              onClick={goHome}
            >
              Home
            </button>
            {userEmail && (
              <span className="text-white/90 text-base">{userEmail}</span>
            )}
            <button
              onClick={() => setShowSignUp(true)}
              className="text-white/90 hover:bg-white/20 bg-white/10 transition-colors text-base rounded-full px-5 py-2.5"
            >
              Sign up
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="text-white/90 hover:bg-white/20 bg-white/10 transition-colors text-base rounded-full px-5 py-2.5"
            >
              Login
            </button>
          </nav>
        </div>
      </div>

      <main className="flex flex-col items-center px-6 py-8">
        <div
          className="w-full max-w-5xl rounded-3xl p-8 mb-8 text-center"
          style={{ backgroundColor: "#F9A8D4" }}
        >
          <h1 className="font-bold mb-4 text-gray-800" style={{ fontSize: "48px", lineHeight: "56px" }}>
            RANDOM QUOTE GENERATOR
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src="/hero1.png" alt="Hero icon left" width={120} height={120} />
            <h3 className="font-semibold text-gray-700" style={{ fontSize: "24px" }}>
              Get Your Daily Dino Wisdom
            </h3>
            <Image src="/hero2.png" alt="Hero icon right" width={120} height={120} />
          </div>
          <p className="text-gray-600" style={{ fontSize: "14px", lineHeight: "24px" }}>
            Get inspired and roar like dinosaurs
          </p>
          {/* dotted divider near bottom */}
          <div className="mt-6 border-b-4 border-dotted border-white/60" />
        </div>

        {/* Quote Section */}
        <div className="relative w-full max-w-6xl mb-14 flex justify-center">
          {/* Quote Box */}
          <div className="w-full max-w-3xl">
            <div className="rounded-3xl p-8 mb-6 shadow-sm" style={{ backgroundColor: "#FCE7F3" }}>
              <div
                className="rounded-2xl p-12 text-center min-h-56 flex items-center justify-center ring-1 ring-black/5"
                style={{ backgroundColor: "#F5E6CC" }}
              >
                <p className="text-gray-800" style={{ fontSize: "18px" }}>
                  {currentQuote}
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={generateQuote}
                className="px-12 py-5 text-white font-semibold rounded-full text-2xl shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F9A8D4", border: "none" }}
              >
                Generate
              </Button>
            </div>
            <div className="mt-6 rounded-3xl p-6" style={{ backgroundColor: "#FCE7F3" }}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Input
                  placeholder="Add a new quote"
                  className="flex-1 p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#F5E6CC" }}
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                />
                <Button
                  onClick={handleAddQuote}
                  className="px-6 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#F9A8D4" }}
                  disabled={addLoading}
                >
                  {addLoading ? 'Adding...' : 'Add Quote'}
                </Button>
              </div>
              {(addError || addOk) && (
                <p className={`mt-2 text-sm ${addError ? 'text-red-600' : 'text-green-700'}`}>
                  {addError || addOk}
                </p>
              )}
            </div>
          </div>

          {/* Left Dinosaur - anchored bottom-left of section */}
          <div className="hidden md:block absolute -left-24 bottom-2">
            <Image src="/quotebox1.png" alt="Quote box left" width={300} height={300} style={{ transform: "scaleX(-1)" }} />
          </div>

          {/* Right Dinosaur - anchored bottom-right of section */}
          <div className="hidden md:block absolute -right-6 bottom-2">
            <Image src="/quotebox2.png" alt="Quote box right" width={260} height={260} />
          </div>
        </div>
      </main>

      {showSignUp && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative" style={{ backgroundColor: "#FCE7F3" }}>
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%94%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D1%87%D0%B8%D0%BA-removebg-preview-MASJnLJjS0rTi8WCSzsP5iFsR7WAPI.png"
                  alt="Sitting Dinosaur"
                  className="w-32 h-32"
                />
              </div>
              <h2 className="font-semibold text-gray-800 mb-2" style={{ fontSize: "36px", lineHeight: "44px" }}>
                Sign Up
              </h2>
              <h3 className="text-gray-600" style={{ fontSize: "24px" }}>
                Sign up to create your account in Roar!
              </h3>
            </div>

            <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#F5E6CC" }}>
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  className="w-full p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#FCE7F3" }}
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#FCE7F3" }}
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="w-full p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#FCE7F3" }}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
                {authError && (
                  <p className="text-red-600 text-sm">{authError}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-end">
              <Button
                onClick={handleSignUpSubmit}
                className="px-8 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F9A8D4" }}
                disabled={authLoading}
              >
                {authLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>
      )}

{showLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative" style={{ backgroundColor: "#FCE7F3" }}>
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download__2_-removebg-preview-wvLrH4wNcxk8rpM32VZI6VdyJjIgkL.png"
                  alt="Princess Dinosaur"
                  className="w-32 h-32"
                />
              </div>
              <h2 className="font-semibold text-gray-800 mb-2" style={{ fontSize: "36px", lineHeight: "44px" }}>
                Login
              </h2>
              <h3 className="text-gray-600" style={{ fontSize: "24px" }}>
                Welcome back brave dinos!
              </h3>
            </div>

            <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#F5E6CC" }}>
              <div className="space-y-4">
                <Input
                  placeholder="Email"
                  type="email"
                  className="w-full p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#FCE7F3" }}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="w-full p-3 rounded-xl border-0"
                  style={{ backgroundColor: "#FCE7F3" }}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {authError && (
                  <p className="text-red-600 text-sm">{authError}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-end">
              <Button
                onClick={handleLoginSubmit}
                className="px-8 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F9A8D4" }}
                disabled={authLoading}
              >
                {authLoading ? "Logging In..." : "Login"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
