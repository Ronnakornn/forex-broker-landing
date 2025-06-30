"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react"

type CurrencyPair = {
  symbol: string
  name: string
  base: string
  quote: string
  rate: string
  bid: string
  ask: string
  change: string
  changePercent: string
  timestamp: string
}

export default function LiveMarketData() {
  const [marketData, setMarketData] = useState<CurrencyPair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchMarketData = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/forex")

      if (!response.ok) {
        throw new Error("Failed to fetch market data")
      }

      const { data } = await response.json()
      setMarketData(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching market data:", err)
      setError("Failed to load market data. Please try again later.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchMarketData()

    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(fetchMarketData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleManualRefresh = () => {
    fetchMarketData()
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  if (loading && marketData.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Market Data</h2>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && marketData.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Market Data</h2>
            <button onClick={handleManualRefresh} className="flex items-center text-blue-500 hover:text-blue-600">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Live Market Data</h2>
          <div className="flex items-center">
            {lastUpdated && (
              <span className="text-sm text-gray-500 mr-4">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="flex items-center text-blue-500 hover:text-blue-600 disabled:text-gray-400"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {marketData.map((pair) => (
            <motion.div
              key={pair.symbol}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{pair.name}</h3>
                  <p className="text-sm text-gray-500">
                    {pair.base} / {pair.quote}
                  </p>
                </div>
                <div
                  className={`flex items-center ${Number.parseFloat(pair.change) >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {Number.parseFloat(pair.change) >= 0 ? (
                    <TrendingUp className="w-5 h-5 mr-1" />
                  ) : (
                    <TrendingDown className="w-5 h-5 mr-1" />
                  )}
                  <span className="font-medium">
                    {Number.parseFloat(pair.change) >= 0 ? "+" : ""}
                    {pair.change}
                  </span>
                  <span className="text-xs ml-1">
                    ({Number.parseFloat(pair.changePercent) >= 0 ? "+" : ""}
                    {pair.changePercent}%)
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Bid</div>
                  <div className="text-lg font-semibold">{pair.bid}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Rate</div>
                  <div className="text-2xl font-bold text-blue-600">{pair.rate}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Ask</div>
                  <div className="text-lg font-semibold">{pair.ask}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
