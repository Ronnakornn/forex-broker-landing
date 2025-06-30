"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MarketChart from "@/components/market-chart"
import LiveMarketData from "@/components/live-market-data"
import AnimatedCandlestickChart from "@/components/animated-candlestick-chart"

export default function MarketPage() {
  const [selectedPair, setSelectedPair] = useState("EURUSD")
  const [timeframe, setTimeframe] = useState("1H")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background Chart */}
        <div className="absolute inset-0 opacity-10">
          <AnimatedCandlestickChart />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Market <span className="text-blue-500">Data</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Stay updated with real-time forex rates and market movements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Charts Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Currency Charts</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <MarketChart symbol={selectedPair} timeframe={timeframe} />
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-md h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Currency Pairs</h3>

                <div className="space-y-2">
                  {["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF"].map((pair) => (
                    <button
                      key={pair}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedPair === pair ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedPair(pair)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {pair.substring(0, 3)}/{pair.substring(3, 6)}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {pair === "EURUSD"
                            ? "Euro"
                            : pair === "GBPUSD"
                              ? "Pound"
                              : pair === "USDJPY"
                                ? "Yen"
                                : pair === "AUDUSD"
                                  ? "Aussie"
                                  : pair === "USDCAD"
                                    ? "Loonie"
                                    : "Swissy"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeframe</h3>
                  <div className="flex space-x-2">
                    {["1H", "1D", "1W"].map((tf) => (
                      <button
                        key={tf}
                        className={`flex-1 py-2 rounded-md ${
                          timeframe === tf ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Data */}
      <LiveMarketData />

      <Footer />
    </main>
  )
}
