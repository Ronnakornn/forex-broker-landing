"use client"
import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Calendar, Clock, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import EventRow from "./event-row"
import CalendarFilters from "./calendar-filters"
import { Skeleton } from "@/components/ui/skeleton"

// Types
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

export default function CalendarWidget() {
  const [events, setEvents] = useState<EconomicEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState<string>(getDatePlusDays(7))
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null)

  // Helper function to get date plus days
  function getDatePlusDays(days: number): string {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString().split("T")[0]
  }

  // Fetch economic events
  const fetchEvents = async () => {
    try {
      setLoading(true)

      // Build query parameters
      const params = new URLSearchParams()
      params.append("startDate", startDate)
      params.append("endDate", endDate)
      if (selectedCountry) params.append("country", selectedCountry)
      if (selectedImpact) params.append("impact", selectedImpact)

      const response = await fetch(`/api/economic-events?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch economic events")
      }

      const data = await response.json()
      setEvents(data.events)
      setError(null)
    } catch (err) {
      console.error("Error fetching economic events:", err)
      setError("Failed to load economic calendar. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch events when filters change
  useEffect(() => {
    fetchEvents()
  }, [startDate, endDate, selectedCountry, selectedImpact])

  // Group events by date
  const groupedEvents: { [key: string]: EconomicEvent[] } = {}
  events.forEach((event) => {
    if (!groupedEvents[event.date]) {
      groupedEvents[event.date] = []
    }
    groupedEvents[event.date].push(event)
  })

  // Navigate to previous/next week
  const navigatePreviousWeek = () => {
    const prevStart = new Date(startDate)
    prevStart.setDate(prevStart.getDate() - 7)
    const prevEnd = new Date(endDate)
    prevEnd.setDate(prevEnd.getDate() - 7)

    setStartDate(prevStart.toISOString().split("T")[0])
    setEndDate(prevEnd.toISOString().split("T")[0])
  }

  const navigateNextWeek = () => {
    const nextStart = new Date(startDate)
    nextStart.setDate(nextStart.getDate() + 7)
    const nextEnd = new Date(endDate)
    nextEnd.setDate(nextEnd.getDate() + 7)

    setStartDate(nextStart.toISOString().split("T")[0])
    setEndDate(nextEnd.toISOString().split("T")[0])
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Economic Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={navigatePreviousWeek}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">
              {format(parseISO(startDate), "MMM d")} - {format(parseISO(endDate), "MMM d, yyyy")}
            </span>
            <button
              onClick={navigateNextWeek}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <CalendarFilters
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedImpact={selectedImpact}
        setSelectedImpact={setSelectedImpact}
      />

      {loading ? (
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-400" />
          <p>No economic events found for the selected filters.</p>
        </div>
      ) : (
        <div className="divide-y">
          {Object.keys(groupedEvents)
            .sort()
            .map((date) => (
              <div key={date} className="p-4">
                <div className="flex items-center mb-3 bg-gray-50 p-2 rounded">
                  <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-700">{format(parseISO(date), "EEEE, MMMM d, yyyy")}</h3>
                </div>

                <div className="space-y-3">
                  {groupedEvents[date].map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="bg-gray-50 p-3 text-xs text-gray-500 flex justify-between items-center">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>All times are displayed in your local timezone</span>
        </div>
        <div>Data source: Economic Calendar API</div>
      </div>
    </div>
  )
}
