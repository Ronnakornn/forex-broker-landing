"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

type CurrencyPair = {
  symbol: string
  name: string
  rate: string
  change: string
}

export default function MiniTicker() {
  const [marketData, setMarketData] = useState<CurrencyPair[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("/api/forex")

        if (!response.ok) {
          throw new Error("Failed to fetch market data")
        }

        const { data } = await response.json()

        // Simplify the data for the ticker
        const simplifiedData = data.map((pair: any) => ({
          symbol: pair.symbol,
          name: pair.name,
          rate: pair.rate,
          change: pair.change,
        }))

        setMarketData(simplifiedData)
      } catch (err) {
        console.error("Error fetching market data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(fetchMarketData, 30000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading || marketData.length === 0) {
    return (
      <div className="bg-gray-900 text-white py-2 overflow-hidden">
        <div className="container mx-auto">
          <div className="h-6 flex items-center">
            <div className="animate-pulse bg-gray-700 h-3 w-32 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 30,
            ease: "linear",
          }}
          className="flex items-center whitespace-nowrap"
        >
          {/* Duplicate the data to create a seamless loop */}
          {[...marketData, ...marketData].map((pair, index) => (
            <div key={`${pair.symbol}-${index}`} className="flex items-center mx-6">
              <span className="font-medium mr-2">{pair.name}</span>
              <span className="mr-1">{pair.rate}</span>
              <span
                className={`flex items-center ${Number.parseFloat(pair.change) >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {Number.parseFloat(pair.change) >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                <span>
                  {Number.parseFloat(pair.change) >= 0 ? "+" : ""}
                  {pair.change}
                </span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
