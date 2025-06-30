import CalendarWidget from "@/components/economic-calendar/calendar-widget"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Economic Calendar | ForexPro",
  description: "Stay informed about important economic events that impact the forex market",
}

export default function EconomicCalendarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Page content - with padding for the fixed header and ticker */}
      <div className="pt-[140px] pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Economic Calendar</h1>
            <p className="text-gray-600 mb-8">
              Stay informed about important economic events that impact the forex market. Our economic calendar provides
              real-time updates on key indicators, central bank announcements, and other market-moving events.
            </p>

            <CalendarWidget />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
