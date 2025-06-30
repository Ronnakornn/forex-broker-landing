"use client"

import { Filter } from "lucide-react"
import { useState } from "react"

type CalendarFiltersProps = {
  selectedCountry: string | null
  setSelectedCountry: (country: string | null) => void
  selectedImpact: string | null
  setSelectedImpact: (impact: string | null) => void
}

export default function CalendarFilters({
  selectedCountry,
  setSelectedCountry,
  selectedImpact,
  setSelectedImpact,
}: CalendarFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const countries = [
    { code: "US", name: "United States" },
    { code: "EU", name: "European Union" },
    { code: "GB", name: "United Kingdom" },
    { code: "JP", name: "Japan" },
    { code: "AU", name: "Australia" },
    { code: "CA", name: "Canada" },
    { code: "CH", name: "Switzerland" },
    { code: "CN", name: "China" },
  ]

  const impacts = [
    { value: "high", label: "High Impact" },
    { value: "medium", label: "Medium Impact" },
    { value: "low", label: "Low Impact" },
  ]

  const resetFilters = () => {
    setSelectedCountry(null)
    setSelectedImpact(null)
  }

  return (
    <div className="bg-gray-50 p-4 border-t border-b">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-700">Filters</h3>

          <button onClick={() => setShowFilters(!showFilters)} className="ml-3 text-blue-500 text-sm md:hidden">
            {showFilters ? "Hide" : "Show"}
          </button>
        </div>

        <div className={`w-full md:w-auto flex flex-wrap gap-2 ${showFilters ? "block" : "hidden md:flex"}`}>
          {/* Country filter */}
          <select
            value={selectedCountry || ""}
            onChange={(e) => setSelectedCountry(e.target.value || null)}
            className="px-3 py-1 text-sm rounded-md bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          {/* Impact filter */}
          <select
            value={selectedImpact || ""}
            onChange={(e) => setSelectedImpact(e.target.value || null)}
            className="px-3 py-1 text-sm rounded-md bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Impact Levels</option>
            {impacts.map((impact) => (
              <option key={impact.value} value={impact.value}>
                {impact.label}
              </option>
            ))}
          </select>

          {/* Reset button - only show if filters are applied */}
          {(selectedCountry || selectedImpact) && (
            <button
              onClick={resetFilters}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Impact level legend */}
      <div className="flex items-center text-xs text-gray-500 mt-3">
        <div className="flex items-center mr-4">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          <span>High Impact</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
          <span>Medium Impact</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span>Low Impact</span>
        </div>
      </div>
    </div>
  )
}
