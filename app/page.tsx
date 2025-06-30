"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, TrendingUp, HeadphonesIcon, Zap, ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedCandlestickChart from "@/components/animated-candlestick-chart"
import LiveMarketData from "@/components/live-market-data"
import UpcomingEvents from "@/components/upcoming-events"

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Chart */}
        <div className="absolute inset-0 opacity-20">
          <AnimatedCandlestickChart />
        </div>

        {/* Content Overlay */}
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
              Trade Smarter, <span className="text-blue-500">Learn Faster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience premium trading conditions with competitive spreads, lightning-fast execution, and expert
              support available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
              >
                Start Trading
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-500 font-medium rounded-lg shadow-md border border-blue-100 hover:bg-blue-50 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center pt-2">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600">We provide the tools and resources you need to succeed in the forex market</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Feature 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-blue-100/50"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Regulated Broker</h3>
              <p className="text-gray-600">Trade with confidence knowing your funds are secure and protected</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-blue-100/50"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tight Spreads</h3>
              <p className="text-gray-600">Trade with competitive spreads across all major currency pairs</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-blue-100/50"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it with our dedicated support team</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-blue-100/50"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning-fast Execution</h3>
              <p className="text-gray-600">Execute trades instantly with our advanced trading infrastructure</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Market Data Section */}
      <LiveMarketData />

      {/* Economic Calendar & Featured Courses Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Market Insights & Education</h2>
            <p className="text-gray-600">
              Stay informed with economic events and enhance your trading skills with our comprehensive resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Economic Calendar Preview */}
            <UpcomingEvents />

            {/* Featured Course Preview */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-400 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Featured Course</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium mb-4">
                  Intermediate
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Analysis Mastery</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to analyze charts, identify patterns, and make informed trading decisions based on technical
                  indicators.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 shadow-xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <AnimatedCandlestickChart />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Trading Journey?</h2>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of successful traders and take your trading skills to the next level
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                >
                  Start Trading
                </Link>
                <Link
                  href="/economic-calendar"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-colors"
                >
                  View Economic Calendar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
