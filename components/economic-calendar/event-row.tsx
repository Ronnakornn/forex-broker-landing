import { Clock, TrendingUp, TrendingDown } from "lucide-react"
import type { EconomicEvent } from "./calendar-widget"

// Country flags and colors
const countryInfo: Record<string, { flag: string; color: string }> = {
  US: { flag: "🇺🇸", color: "bg-blue-100 text-blue-800" },
  EU: { flag: "🇪🇺", color: "bg-blue-100 text-blue-800" },
  GB: { flag: "🇬🇧", color: "bg-red-100 text-red-800" },
  JP: { flag: "🇯🇵", color: "bg-red-100 text-red-800" },
  AU: { flag: "🇦🇺", color: "bg-green-100 text-green-800" },
  CA: { flag: "🇨🇦", color: "bg-red-100 text-red-800" },
  CH: { flag: "🇨🇭", color: "bg-red-100 text-red-800" },
  CN: { flag: "🇨🇳", color: "bg-red-100 text-red-800" },
}

// Default values if country not found
const defaultCountryInfo = { flag: "🏳️", color: "bg-gray-100 text-gray-800" }

export default function EventRow({ event }: { event: EconomicEvent }) {
  const { flag, color } = countryInfo[event.country] || defaultCountryInfo

  // Determine if actual is better or worse than forecast
  const getActualStatus = () => {
    if (!event.actual || !event.forecast) return null

    // Remove % sign and convert to numbers
    const actualValue = Number.parseFloat(event.actual.replace("%", ""))
    const forecastValue = Number.parseFloat(event.forecast.replace("%", ""))

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
    <div className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex items-center mb-2 sm:mb-0 sm:w-1/4">
          <div className="flex items-center">
            <span className="mr-2 text-lg" aria-hidden="true">
              {flag}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{event.country}</span>
          </div>
          <div className="flex items-center ml-3">
            <Clock className="w-3 h-3 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{event.time}</span>
          </div>
        </div>

        <div className="sm:w-2/5">
          <div className="flex items-start">
            <span
              className={`
                w-3 h-3 rounded-full mt-1 mr-2 flex-shrink-0
                ${event.impact === "high" ? "bg-red-500" : event.impact === "medium" ? "bg-yellow-500" : "bg-green-500"}
              `}
            ></span>
            <span className="font-medium">{event.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2 sm:mt-0 sm:w-1/3">
          {event.previous && (
            <div className="text-center">
              <div className="text-xs text-gray-500">Previous</div>
              <div className="text-sm font-medium">{event.previous}</div>
            </div>
          )}

          {event.forecast && (
            <div className="text-center">
              <div className="text-xs text-gray-500">Forecast</div>
              <div className="text-sm font-medium">{event.forecast}</div>
            </div>
          )}

          {event.actual ? (
            <div className="text-center">
              <div className="text-xs text-gray-500">Actual</div>
              <div
                className={`text-sm font-medium flex items-center justify-center ${
                  actualStatus === "better" ? "text-green-600" : actualStatus === "worse" ? "text-red-600" : ""
                }`}
              >
                {event.actual}
                {actualStatus && (
                  <span className="ml-1">
                    {actualStatus === "better" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-xs text-gray-500">Actual</div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
