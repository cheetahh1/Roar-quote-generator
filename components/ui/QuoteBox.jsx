import Image from "next/image"
import { Button } from "@/components/ui/Button"

export default function QuoteBox({ currentQuote, generateQuote }) {
  return (
    <div className="relative w-full max-w-6xl mb-14 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="rounded-3xl p-8 mb-6 shadow-sm" style={{ backgroundColor: "#FCE7F3" }}>
          <div className="rounded-2xl p-12 text-center min-h-56 flex items-center justify-center ring-1 ring-black/5" style={{ backgroundColor: "#F5E6CC" }}>
            <p className="text-gray-800" style={{ fontSize: "18px" }}>{currentQuote}</p>
          </div>
        </div>
        <div className="text-center">
          <Button onClick={generateQuote} className="px-12 py-5 text-white font-semibold rounded-full text-2xl shadow-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F9A8D4", border: "none" }}>
            Generate
          </Button>
        </div>
      </div>
      <div className="hidden md:block absolute -left-24 bottom-2">
        <Image src="/quotebox1.png" alt="Quote box left" width={300} height={300} style={{ transform: "scaleX(-1)" }} />
      </div>
      <div className="hidden md:block absolute -right-6 bottom-2">
        <Image src="/quotebox2.png" alt="Quote box right" width={260} height={260} />
      </div>
    </div>
  )
}