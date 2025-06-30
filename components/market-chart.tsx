"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type ChartData = {
  time: string
  value: number
}

type ChartProps = {
  symbol: string
  timeframe: string
}

export default function MarketChart({ symbol = "EURUSD", timeframe = "1H" }: ChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [priceInfo, setPriceInfo] = useState({
    current: 0,
    open: 0,
    high: 0,
    low: 0,
    change: 0,
    changePercent: 0,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeframeState, setTimeframe] = useState(timeframe)

  // Generate simulated historical data
  useEffect(() => {
    setLoading(true)

    // Generate random price data
    const generateData = () => {
      const now = new Date()
      const data: ChartData[] = []

      // Base price depends on the currency pair
      let basePrice = 1.0
      if (symbol === "EURUSD") basePrice = 1.1
      if (symbol === "GBPUSD") basePrice = 1.3
      if (symbol === "USDJPY") basePrice = 110
      if (symbol === "AUDUSD") basePrice = 0.7

      // Volatility depends on the timeframe
      let volatility = 0.0005
      if (timeframeState === "1D") volatility = 0.002
      if (timeframeState === "1W") volatility = 0.005

      // Number of data points depends on the timeframe
      let points = 60
      if (timeframeState === "1D") points = 24
      if (timeframeState === "1W") points = 7

      let currentPrice = basePrice

      for (let i = points; i >= 0; i--) {
        const time = new Date(
          now.getTime() - i * (timeframeState === "1H" ? 3600000 : timeframeState === "1D" ? 86400000 : 604800000),
        )

        // Random walk with slight trend
        const change = (Math.random() - 0.48) * volatility
        currentPrice += change

        data.push({
          time: time.toISOString(),
          value: currentPrice,
        })
      }

      // Calculate price info
      const current = data[data.length - 1].value
      const open = data[0].value
      const high = Math.max(...data.map((d) => d.value))
      const low = Math.min(...data.map((d) => d.value))
      const change = current - open
      const changePercent = (change / open) * 100

      setPriceInfo({
        current,
        open,
        high,
        low,
        change,
        changePercent,
      })

      return data
    }

    const newData = generateData()
    setData(newData)
    setLoading(false)
  }, [symbol, timeframeState])

  // Draw the chart
  useEffect(() => {
    if (loading || data.length === 0 || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Find min and max values for scaling
    const values = data.map((d) => d.value)
    const minValue = Math.min(...values) * 0.999
    const maxValue = Math.max(...values) * 1.001
    const valueRange = maxValue - minValue

    // Draw the line
    ctx.beginPath()
    data.forEach((point, i) => {
      const x = (i / (data.length - 1)) * rect.width
      const y = rect.height - ((point.value - minValue) / valueRange) * rect.height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    // Style the line
    ctx.strokeStyle = priceInfo.change >= 0 ? "#10b981" : "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(rect.width, rect.height)
    ctx.lineTo(0, rect.height)
    ctx.closePath()

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
    if (priceInfo.change >= 0) {
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)")
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.2)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
    }

    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, loading, priceInfo.change])

  // Format price with appropriate decimal places
  const formatPrice = (price: number) => {
    if (symbol.includes("JPY")) {
      return price.toFixed(2)
    }
    return price.toFixed(4)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {symbol.substring(0, 3)}/{symbol.substring(3, 6)}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold mr-2">{formatPrice(priceInfo.current)}</span>
            <div className={`flex items-center ${priceInfo.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceInfo.change >= 0 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              <span className="font-medium">
                {priceInfo.change >= 0 ? "+" : ""}
                {formatPrice(priceInfo.change)}
              </span>
              <span className="text-xs ml-1">
                ({priceInfo.change >= 0 ? "+" : ""}
                {priceInfo.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {["1H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 text-xs rounded-md ${
                timeframeState === tf ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => timeframeState !== tf && setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="h-64 relative">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <div className="text-xs text-gray-500">Open</div>
          <div className="font-medium">{formatPrice(priceInfo.open)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">High</div>
          <div className="font-medium">{formatPrice(priceInfo.high)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Low</div>
          <div className="font-medium">{formatPrice(priceInfo.low)}</div>
        </div>
      </div>
    </div>
  )
}
