import { NextResponse } from "next/server"

// Economic event types
type EventImpact = "high" | "medium" | "low"

export type EconomicEvent = {
  id: string
  title: string
  date: string
  time: string
  currency: string
  impact: EventImpact
  forecast?: string
  previous?: string
  actual?: string
  description: string
}

// Generate events for the next 30 days
function generateEconomicEvents(): EconomicEvent[] {
  const events: EconomicEvent[] = []
  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"]
  const impacts: EventImpact[] = ["high", "medium", "low"]

  const eventTypes = [
    { title: "Interest Rate Decision", description: "Central bank decision on the key interest rate." },
    {
      title: "Non-Farm Payrolls",
      description: "Change in the number of employed people during the previous month, excluding the farming industry.",
    },
    {
      title: "GDP",
      description:
        "Gross Domestic Product - the monetary value of all finished goods and services made within a country during a specific period.",
    },
    {
      title: "CPI",
      description:
        "Consumer Price Index - changes in the price level of a weighted average market basket of consumer goods and services.",
    },
    {
      title: "Retail Sales",
      description: "An aggregated measure of the sales of retail goods over a stated time period.",
    },
    {
      title: "PMI",
      description:
        "Purchasing Managers' Index - an indicator of economic health for manufacturing and service sectors.",
    },
    {
      title: "Unemployment Rate",
      description: "The percentage of the total labor force that is unemployed but actively seeking employment.",
    },
    { title: "Trade Balance", description: "The difference between a country's imports and its exports." },
    { title: "Industrial Production", description: "Measures the output of the industrial sector of the economy." },
    { title: "Consumer Confidence", description: "A measure of consumer optimism on the state of the economy." },
  ]

  // Current date
  const now = new Date()

  // Generate events for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    // Generate 1-5 events per day
    const numEvents = Math.floor(Math.random() * 5) + 1

    for (let j = 0; j < numEvents; j++) {
      const currency = currencies[Math.floor(Math.random() * currencies.length)]
      const impact = impacts[Math.floor(Math.random() * impacts.length)]
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]

      // Generate random time between 8:00 and 17:00
      const hour = Math.floor(Math.random() * 9) + 8
      const minute = Math.floor(Math.random() * 4) * 15 // 00, 15, 30, 45
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      // Generate random values for forecast and previous
      const baseValue = Math.random() * 10
      const forecast = impact === "high" ? (baseValue + Math.random()).toFixed(1) + "%" : undefined
      const previous = (baseValue - 0.2 + Math.random() * 0.4).toFixed(1) + "%"

      // Only add actual value for past events
      const isPastEvent = date < now
      const actual = isPastEvent ? (baseValue - 0.3 + Math.random() * 0.6).toFixed(1) + "%" : undefined

      events.push({
        id: `${date.toISOString().split("T")[0]}-${currency}-${j}`,
        title: `${currency} ${eventType.title}`,
        date: date.toISOString().split("T")[0],
        time: timeString,
        currency,
        impact,
        forecast,
        previous,
        actual,
        description: eventType.description,
      })
    }
  }

  // Sort events by date and time
  events.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}:00`)
    const dateB = new Date(`${b.date}T${b.time}:00`)
    return dateA.getTime() - dateB.getTime()
  })

  return events
}

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const currency = searchParams.get("currency")
    const impact = searchParams.get("impact")

    // Generate all events
    let events = generateEconomicEvents()

    // Apply filters
    if (startDate) {
      events = events.filter((event) => event.date >= startDate)
    }

    if (endDate) {
      events = events.filter((event) => event.date <= endDate)
    }

    if (currency) {
      events = events.filter((event) => event.currency === currency)
    }

    if (impact) {
      events = events.filter((event) => event.impact === impact)
    }

    // Return with proper headers
    return new NextResponse(JSON.stringify({ events }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in economic calendar API:", error)
    // Return a proper error response as JSON
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate economic events",
        events: [],
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
