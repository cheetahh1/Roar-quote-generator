import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginModal({
  showLogin,
  setShowLogin,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  authError,
  authLoading,
  handleLoginSubmit,
}) {
  if (!showLogin) return null
  return (
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
  )
}