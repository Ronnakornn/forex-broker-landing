"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

// Define the EconomicEvent type directly in this file to avoid import issues
type EventImpact = "high" | "medium" | "low"

type EconomicEvent = {
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

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EconomicEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simplified function to generate mock events
    const generateMockEvents = (): EconomicEvent[] => {
      const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"]
      const impacts: EventImpact[] = ["high", "medium"]
      const eventTypes = [
        { title: "Interest Rate Decision", description: "Central bank decision on the key interest rate." },
        {
          title: "Non-Farm Payrolls",
          description: "Change in the number of employed people during the previous month.",
        },
        {
          title: "GDP",
          description: "Gross Domestic Product - the monetary value of all finished goods and services.",
        },
        {
          title: "CPI",
          description: "Consumer Price Index - changes in the price level of consumer goods and services.",
        },
        {
          title: "Retail Sales",
          description: "An aggregated measure of the sales of retail goods over a stated time period.",
        },
      ]

      const today = new Date()
      const todayStr = today.toISOString().split("T")[0]
      const events: EconomicEvent[] = []

      // Generate 3-5 events for today
      const numEvents = Math.floor(Math.random() * 3) + 3

      for (let i = 0; i < numEvents; i++) {
        const currency = currencies[Math.floor(Math.random() * currencies.length)]
        const impact = impacts[Math.floor(Math.random() * impacts.length)]
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]

        // Generate time between 8:00 and 17:00
        const hour = Math.floor(Math.random() * 9) + 8
        const minute = Math.floor(Math.random() * 4) * 15 // 00, 15, 30, 45
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        events.push({
          id: `mock-${i}`,
          title: `${currency} ${eventType.title}`,
          date: todayStr,
          time: timeString,
          currency,
          impact,
          forecast: impact === "high" ? (Math.random() * 5 + 1).toFixed(1) + "%" : undefined,
          previous: (Math.random() * 5 + 1).toFixed(1) + "%",
          description: eventType.description,
        })
      }

      // Sort by time
      events.sort((a, b) => a.time.localeCompare(b.time))
      return events
    }

    const fetchEvents = async () => {
      try {
        setLoading(true)

        // Skip API call and use mock data directly
        console.log("Using mock data for economic events")
        const mockEvents = generateMockEvents()
        setEvents(mockEvents)
      } catch (err) {
        console.error("Error generating mock events:", err)
        // Ensure we have at least an empty array
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Today's Economic Events</h3>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Today's Economic Events</h3>
          <Link href="/economic-calendar" className="text-blue-500 hover:text-blue-600 text-sm flex items-center">
            View Calendar
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="text-center text-gray-500 py-8">No major economic events scheduled for today.</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Today's Economic Events</h3>
        <Link href="/economic-calendar" className="text-blue-500 hover:text-blue-600 text-sm flex items-center">
          View Calendar
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start border-b border-gray-100 pb-4 last:border-0"
          >
            <div className="flex items-center mr-3">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">{event.time}</span>
            </div>

            <div>
              <div className="flex items-center">
                <span
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2
                    ${
                      event.currency === "USD"
                        ? "bg-blue-500"
                        : event.currency === "EUR"
                          ? "bg-yellow-500"
                          : event.currency === "GBP"
                            ? "bg-purple-500"
                            : event.currency === "JPY"
                              ? "bg-red-500"
                              : event.currency === "AUD"
                                ? "bg-green-500"
                                : event.currency === "CAD"
                                  ? "bg-orange-500"
                                  : event.currency === "CHF"
                                    ? "bg-pink-500"
                                    : "bg-gray-500"
                    }
                  `}
                >
                  {event.currency.charAt(0)}
                </span>
                <span className="font-medium text-sm">{event.title}</span>
              </div>

              <div className="flex items-center mt-1">
                <span
                  className={`
                    w-2 h-2 rounded-full mr-1
                    ${
                      event.impact === "high"
                        ? "bg-red-500"
                        : event.impact === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }
                  `}
                ></span>
                <span className="text-xs text-gray-500">
                  {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)} Impact
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/economic-calendar"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm"
        >
          View Full Calendar
        </Link>
      </div>
    </div>
  )
}
