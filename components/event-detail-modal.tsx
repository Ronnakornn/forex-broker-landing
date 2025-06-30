"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Calendar, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { format, parseISO } from "date-fns"

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

type EventDetailModalProps = {
  event: EconomicEvent
  onClose: () => void
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  // Determine if actual is better or worse than forecast
  const getActualStatus = () => {
    if (!event.actual || !event.forecast) return null

    const actualValue = Number.parseFloat(event.actual)
    const forecastValue = Number.parseFloat(event.forecast)

    if (isNaN(actualValue) || isNaN(forecastValue)) return null

    // For some indicators, higher is better (e.g., GDP, retail sales)
    // For others, lower is better (e.g., unemployment rate)
    // This is a simplified approach
    const isPositiveIndicator = !event.title.toLowerCase().includes("unemployment")

    if (isPositiveIndicator) {
      return actualValue > forecastValue ? "better" : "worse"
    } else {
      return actualValue < forecastValue ? "better" : "worse"
    }
  }

  const actualStatus = getActualStatus()

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <span
                className={`
                  w-4 h-4 rounded-full mr-2
                  ${
                    event.impact === "high"
                      ? "bg-red-500"
                      : event.impact === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }
                `}
              ></span>
              <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-600">{format(parseISO(event.date), "EEEE, MMMM d, yyyy")}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-600">{event.time} GMT</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <span
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 mr-3
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
                  {event.currency}
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800">Currency</h4>
                  <p className="text-gray-600">
                    {event.currency === "USD"
                      ? "United States Dollar"
                      : event.currency === "EUR"
                        ? "Euro"
                        : event.currency === "GBP"
                          ? "British Pound"
                          : event.currency === "JPY"
                            ? "Japanese Yen"
                            : event.currency === "AUD"
                              ? "Australian Dollar"
                              : event.currency === "CAD"
                                ? "Canadian Dollar"
                                : event.currency === "CHF"
                                  ? "Swiss Franc"
                                  : event.currency === "NZD"
                                    ? "New Zealand Dollar"
                                    : event.currency}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {event.previous && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Previous</h4>
                  <p className="text-xl font-semibold">{event.previous}</p>
                </div>
              )}

              {event.forecast && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm text-gray-500 mb-1">Forecast</h4>
                  <p className="text-xl font-semibold">{event.forecast}</p>
                </div>
              )}

              {event.actual && (
                <div
                  className={`rounded-lg p-4 ${
                    actualStatus === "better" ? "bg-green-50" : actualStatus === "worse" ? "bg-red-50" : "bg-gray-50"
                  }`}
                >
                  <h4 className="text-sm text-gray-500 mb-1">Actual</h4>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold">{event.actual}</p>
                    {actualStatus && (
                      <span className="ml-2">
                        {actualStatus === "better" ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {event.impact === "high" && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-700">High Impact Event</h4>
                    <p className="text-red-600">
                      This event is likely to cause significant volatility in the {event.currency} and related currency
                      pairs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Potential Market Impact</h4>
              <p className="text-gray-600">
                {event.impact === "high"
                  ? `This ${event.title} release typically causes significant volatility in ${event.currency} pairs. Traders should be cautious during this announcement.`
                  : event.impact === "medium"
                    ? `This ${event.title} release may cause moderate volatility in ${event.currency} pairs.`
                    : `This ${event.title} release typically has a limited impact on ${event.currency} pairs, but should still be monitored.`}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
