"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react"

type ForexPair = {
  symbol: string
  name: string
  base: string
  quote: string
  price: string
  change: string
  changePercent: string
  bid: string
  ask: string
  timestamp: string
}

export default function ForexTickerBar() {
  const [forexData, setForexData] = useState<ForexPair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const tickerRef = useRef<HTMLDivElement>(null)

  const fetchForexData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/forex-ticker")

      if (!response.ok) {
        throw new Error("Failed to fetch forex data")
      }

      const { data } = await response.json()
      setForexData(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching forex data:", err)
      setError("Failed to load forex data")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchForexData()

    // Set up auto-refresh every 10 seconds
    const intervalId = setInterval(fetchForexData, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const handleManualRefresh = () => {
    if (!isRefreshing) {
      fetchForexData()
    }
  }

  if (loading && forexData.length === 0) {
    return (
      <div className="w-full bg-gray-900 text-white py-3 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          <span>Loading forex data...</span>
        </div>
      </div>
    )
  }

  if (error && forexData.length === 0) {
    return (
      <div className="w-full bg-gray-900 text-white py-3 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="text-red-400">{error}</span>
          <button
            onClick={handleManualRefresh}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-900 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-400">FOREX LIVE RATES</h3>
        <div className="flex items-center">
          {lastUpdated && (
            <span className="text-xs text-gray-400 mr-3">Updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden" ref={tickerRef}>
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {/* Duplicate the data to create a seamless loop */}
          {[...forexData, ...forexData].map((pair, index) => (
            <div key={`${pair.symbol}-${index}`} className="flex items-center mx-4 first:ml-0">
              <div className="flex flex-col items-center mr-2 bg-gray-800 px-2 py-1 rounded">
                <span className="text-xs font-semibold">{pair.base}</span>
                <span className="text-xs font-semibold">{pair.quote}</span>
              </div>

              <div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">{pair.name}</span>
                  <span className="text-sm">{pair.price}</span>
                </div>

                <div className="flex items-center">
                  <span
                    className={`text-xs flex items-center ${
                      Number.parseFloat(pair.change) >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {Number.parseFloat(pair.change) >= 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {Number.parseFloat(pair.change) >= 0 ? "+" : ""}
                    {pair.change} ({Number.parseFloat(pair.changePercent) >= 0 ? "+" : ""}
                    {pair.changePercent}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Bid/Ask spreads are indicative only</span>
          <span>Data refreshes every 10 seconds</span>
        </div>
      </div>
    </div>
  )
}
