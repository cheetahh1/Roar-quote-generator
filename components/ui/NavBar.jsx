import Image from "next/image"


export default function NavBar({ goHome, setShowSignUp, setShowLogin }) {
  return (
    <div className="w-full flex justify-center pt-5 px-4">
      <div
        className="w-full max-w-7xl flex items-center justify-between rounded-full px-8"
        style={{ backgroundColor: "#F9A8D4", height: "72px" }}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Roar logo" width={120} height={125} />
          <span className="text-2xl font-bold text-white">ROAR</span>
        </div>
        <nav className="flex items-center gap-4">
          <button className="text-white/90 bg-white/10 hover:bg-white/20 transition-colors text-base rounded-full px-5 py-2.5" onClick={goHome}>Home</button>
          <button onClick={() => setShowSignUp(true)} className="text-white/90 hover:bg-white/20 bg-white/10 transition-colors text-base rounded-full px-5 py-2.5">Sign up</button>
          <button onClick={() => setShowLogin(true)} className="text-white/90 hover:bg-white/20 bg-white/10 transition-colors text-base rounded-full px-5 py-2.5">Login</button>
        </nav>
      </div>
    </div>
  )
}