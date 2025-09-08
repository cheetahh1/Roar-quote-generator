"use client"

import { useEffect, useState } from "react"
import NavBar from "@/components/ui/NavBar"
import QuoteBox from "@/components/ui/QuoteBox"
import SignUpModal from "@/components/ui/SignUpModal"
import LoginModal from "@/components/ui/LoginModal"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabaseClient"

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
      <NavBar
        goHome={goHome}
        setShowSignUp={setShowSignUp}
        setShowLogin={setShowLogin}
      />
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
          <div className="mt-6 border-b-4 border-dotted border-white/60" />
        </div>
        <QuoteBox
          currentQuote={currentQuote}
          generateQuote={generateQuote}
        />
      </main>
      <SignUpModal
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        signUpName={signUpName}
        setSignUpName={setSignUpName}
        signUpEmail={signUpEmail}
        setSignUpEmail={setSignUpEmail}
        signUpPassword={signUpPassword}
        setSignUpPassword={setSignUpPassword}
        authError={authError}
        authLoading={authLoading}
        handleSignUpSubmit={handleSignUpSubmit}
      />
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        authError={authError}
        authLoading={authLoading}
        handleLoginSubmit={handleLoginSubmit}
      />
    </div>
  )
}