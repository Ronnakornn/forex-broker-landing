"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Generate random candlestick data
const generateCandlesticks = (count: number) => {
  const candlesticks = []
  let price = 1.2 + Math.random() * 0.1

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 0.01
    const open = price
    const close = price + change
    const high = Math.max(open, close) + Math.random() * 0.005
    const low = Math.min(open, close) - Math.random() * 0.005

    candlesticks.push({
      open,
      high,
      low,
      close,
      isUp: close >= open,
    })

    price = close
  }

  return candlesticks
}

export default function AnimatedCandlestickChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Generate initial data
    const candlesticks = generateCandlesticks(50)

    // Animation variables
    let animationFrameId: number
    let lastTimestamp = 0
    const updateInterval = 1000 // Update every 1 second

    // Draw function
    const draw = (timestamp: number) => {
      if (timestamp - lastTimestamp > updateInterval) {
        // Add new candlestick
        const lastPrice = candlesticks[candlesticks.length - 1].close
        const change = (Math.random() - 0.5) * 0.01
        const open = lastPrice
        const close = lastPrice + change
        const high = Math.max(open, close) + Math.random() * 0.005
        const low = Math.min(open, close) - Math.random() * 0.005

        candlesticks.push({
          open,
          high,
          low,
          close,
          isUp: close >= open,
        })

        // Remove oldest candlestick
        candlesticks.shift()

        lastTimestamp = timestamp
      }

      // Clear canvas
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Find min and max prices for scaling
      const prices = candlesticks.flatMap((c) => [c.high, c.low])
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const priceRange = maxPrice - minPrice

      // Draw candlesticks
      const candleWidth = rect.width / candlesticks.length
      const padding = candleWidth * 0.2
      const bodyWidth = candleWidth - padding * 2

      candlesticks.forEach((candle, i) => {
        const x = i * candleWidth

        // Scale prices to canvas height
        const scaleY = (price: number) => {
          return rect.height - ((price - minPrice) / priceRange) * rect.height * 0.8 - rect.height * 0.1
        }

        const openY = scaleY(candle.open)
        const closeY = scaleY(candle.close)
        const highY = scaleY(candle.high)
        const lowY = scaleY(candle.low)

        // Draw wick
        ctx.beginPath()
        ctx.moveTo(x + candleWidth / 2, highY)
        ctx.lineTo(x + candleWidth / 2, lowY)
        ctx.strokeStyle = candle.isUp ? "#4ade80" : "#f87171"
        ctx.stroke()

        // Draw body
        ctx.fillStyle = candle.isUp ? "#4ade80" : "#f87171"
        const bodyHeight = Math.abs(closeY - openY)
        const bodyY = candle.isUp ? closeY : openY

        ctx.fillRect(x + padding, bodyY, bodyWidth, bodyHeight || 1) // Ensure at least 1px height
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
