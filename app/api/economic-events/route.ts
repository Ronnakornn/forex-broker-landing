import { NextResponse } from "next/server"

// Define types for economic events
export type EventImpact = "high" | "medium" | "low"

export type EconomicEvent = {
  id: string
  title: string
  country: string
  date: string
  time: string
  impact: EventImpact
  forecast?: string
  previous?: string
  actual?: string
}

// Function to fetch economic events from a public API
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate") || new Date().toISOString().split("T")[0]
    const endDate = searchParams.get("endDate") || getDatePlusDays(7)
    const country = searchParams.get("country") || null
    const impact = searchParams.get("impact") || null

    // In a production environment, you would use your API key to fetch from a real source
    // const apiKey = process.env.FINNHUB_API_KEY
    // const url = `https://finnhub.io/api/v1/calendar/economic?from=${startDate}&to=${endDate}&token=${apiKey}`

    // For now, we'll use mock data that resembles real economic calendar data
    const events = await getMockEconomicEvents(startDate, endDate, country, impact)

    return NextResponse.json(
      {
        events,
        meta: {
          startDate,
          endDate,
          totalEvents: events.length,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "max-age=60, stale-while-revalidate=300",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching economic events:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch economic events",
        events: [],
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// Helper function to get date plus days
function getDatePlusDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split("T")[0]
}

// Mock data generator that resembles real economic calendar data
async function getMockEconomicEvents(
  startDate: string,
  endDate: string,
  country: string | null,
  impact: string | null,
): Promise<EconomicEvent[]> {
  // Countries and their currencies
  const countries = [
    { code: "US", name: "United States", currency: "USD", flag: "🇺🇸" },
    { code: "EU", name: "European Union", currency: "EUR", flag: "🇪🇺" },
    { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
    { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵" },
    { code: "AU", name: "Australia", currency: "AUD", flag: "🇦🇺" },
    { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦" },
    { code: "CH", name: "Switzerland", currency: "CHF", flag: "🇨🇭" },
    { code: "CN", name: "China", currency: "CNY", flag: "🇨🇳" },
  ]

  // Economic indicators
  const indicators = [
    { name: "Interest Rate Decision", impact: "high" },
    { name: "Non-Farm Payrolls", impact: "high" },
    { name: "GDP", impact: "high" },
    { name: "CPI", impact: "high" },
    { name: "Retail Sales", impact: "medium" },
    { name: "Unemployment Rate", impact: "medium" },
    { name: "PMI", impact: "medium" },
    { name: "Trade Balance", impact: "medium" },
    { name: "Industrial Production", impact: "low" },
    { name: "Consumer Confidence", impact: "low" },
    { name: "Housing Starts", impact: "low" },
    { name: "Building Permits", impact: "low" },
  ]

  const events: EconomicEvent[] = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Generate events for each day in the range
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (day.getDay() === 0 || day.getDay() === 6) continue

    // Generate 3-8 events per day
    const numEvents = Math.floor(Math.random() * 6) + 3

    for (let i = 0; i < numEvents; i++) {
      const countryIndex = Math.floor(Math.random() * countries.length)
      const indicatorIndex = Math.floor(Math.random() * indicators.length)

      const selectedCountry = countries[countryIndex]
      const selectedIndicator = indicators[indicatorIndex]

      // Generate time between 8:00 and 17:00
      const hour = Math.floor(Math.random() * 10) + 8
      const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      // Generate realistic values
      const baseValue = Math.random() * 5
      const previous = (baseValue - 0.2).toFixed(1) + "%"
      const forecast = baseValue.toFixed(1) + "%"

      // Only add actual value for past events
      const isPastEvent = day < new Date()
      const actual = isPastEvent ? (baseValue + (Math.random() - 0.5) * 0.4).toFixed(1) + "%" : undefined

      const event: EconomicEvent = {
        id: `${day.toISOString().split("T")[0]}-${selectedCountry.code}-${i}`,
        title: `${selectedCountry.name} ${selectedIndicator.name}`,
        country: selectedCountry.code,
        date: day.toISOString().split("T")[0],
        time: timeString,
        impact: selectedIndicator.impact as EventImpact,
        forecast,
        previous,
        actual,
      }

      events.push(event)
    }
  }

  // Filter by country if specified
  let filteredEvents = events
  if (country) {
    filteredEvents = filteredEvents.filter((event) => event.country === country)
  }

  // Filter by impact if specified
  if (impact) {
    filteredEvents = filteredEvents.filter((event) => event.impact === impact)
  }

  // Sort by date and time
  filteredEvents.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.time.localeCompare(b.time)
  })

  return filteredEvents
}
