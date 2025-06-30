import { NextResponse } from "next/server"

// Define the currency pairs we want to track
const CURRENCY_PAIRS = [
  { symbol: "OANDA:EUR_USD", name: "EUR/USD", base: "EUR", quote: "USD" },
  { symbol: "OANDA:GBP_USD", name: "GBP/USD", base: "GBP", quote: "USD" },
  { symbol: "OANDA:USD_JPY", name: "USD/JPY", base: "USD", quote: "JPY" },
  { symbol: "OANDA:AUD_USD", name: "AUD/USD", base: "AUD", quote: "USD" },
  { symbol: "OANDA:USD_CAD", name: "USD/CAD", base: "USD", quote: "CAD" },
  { symbol: "OANDA:USD_CHF", name: "USD/CHF", base: "USD", quote: "CHF" },
  { symbol: "OANDA:NZD_USD", name: "NZD/USD", base: "NZD", quote: "USD" },
  { symbol: "OANDA:EUR_GBP", name: "EUR/GBP", base: "EUR", quote: "GBP" },
]

// Function to generate realistic mock data
function generateMockData() {
  const baseValues = {
    "EUR/USD": 1.0921,
    "GBP/USD": 1.2685,
    "USD/JPY": 156.78,
    "AUD/USD": 0.6612,
    "USD/CAD": 1.3642,
    "USD/CHF": 0.9034,
    "NZD/USD": 0.6042,
    "EUR/GBP": 0.8608,
  }

  return CURRENCY_PAIRS.map((pair) => {
    // Generate a small random change
    const changePercent = Math.random() * 0.4 - 0.2 // -0.2% to +0.2%
    const baseValue = baseValues[pair.name]
    const change = baseValue * (changePercent / 100)
    const currentValue = baseValue + change

    // Format based on typical decimal places for the pair
    const precision = pair.name.includes("JPY") ? 3 : 5

    return {
      ...pair,
      price: currentValue.toFixed(precision),
      change: change.toFixed(precision),
      changePercent: changePercent.toFixed(3),
      bid: (currentValue - 0.0002).toFixed(precision),
      ask: (currentValue + 0.0002).toFixed(precision),
      timestamp: new Date().toISOString(),
    }
  })
}

export async function GET() {
  try {
    // In a real implementation, we would fetch data from Finnhub or another API
    // For this example, we'll generate realistic mock data
    const forexData = generateMockData()

    // Add a small delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({ data: forexData })
  } catch (error) {
    console.error("Error fetching forex data:", error)
    return NextResponse.json({ error: "Failed to fetch forex data", data: [] }, { status: 500 })
  }
}
