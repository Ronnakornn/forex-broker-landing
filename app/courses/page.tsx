"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import AnimatedCandlestickChart from "@/components/animated-candlestick-chart"

// Course data
const courses = [
  {
    id: 1,
    title: "Forex Fundamentals",
    description: "Learn the basics of forex trading, including market structure, currency pairs, and basic analysis.",
    level: "beginner",
    color: "from-blue-400 to-blue-300",
    duration: "4 weeks",
    lessons: 12,
  },
  {
    id: 2,
    title: "Technical Analysis",
    description: "Master chart patterns, indicators, and technical tools to improve your trading decisions.",
    level: "intermediate",
    color: "from-blue-500 to-blue-400",
    duration: "6 weeks",
    lessons: 18,
  },
  {
    id: 3,
    title: "Advanced Trading Strategies",
    description: "Develop complex trading strategies and risk management techniques for consistent profits.",
    level: "advanced",
    color: "from-blue-600 to-blue-500",
    duration: "8 weeks",
    lessons: 24,
  },
  {
    id: 4,
    title: "Risk Management",
    description: "Learn essential risk management principles to protect your capital and maximize returns.",
    level: "beginner",
    color: "from-blue-400 to-blue-300",
    duration: "3 weeks",
    lessons: 9,
  },
  {
    id: 5,
    title: "Price Action Trading",
    description: "Master the art of reading price action and making trading decisions without indicators.",
    level: "intermediate",
    color: "from-blue-500 to-blue-400",
    duration: "5 weeks",
    lessons: 15,
  },
  {
    id: 6,
    title: "Algorithmic Trading",
    description: "Learn to create, test, and implement automated trading strategies using programming.",
    level: "advanced",
    color: "from-blue-600 to-blue-500",
    duration: "10 weeks",
    lessons: 30,
  },
  {
    id: 7,
    title: "Fundamental Analysis",
    description: "Understand how economic events and news impact currency markets and trading opportunities.",
    level: "intermediate",
    color: "from-blue-500 to-blue-400",
    duration: "6 weeks",
    lessons: 18,
  },
  {
    id: 8,
    title: "Psychology of Trading",
    description: "Develop the mindset of successful traders and overcome emotional barriers to profitability.",
    level: "beginner",
    color: "from-blue-400 to-blue-300",
    duration: "4 weeks",
    lessons: 12,
  },
  {
    id: 9,
    title: "Institutional Trading Strategies",
    description: "Learn how banks and financial institutions trade and how to align your strategy with smart money.",
    level: "advanced",
    color: "from-blue-600 to-blue-500",
    duration: "8 weeks",
    lessons: 24,
  },
]

export default function CoursesPage() {
  const [filter, setFilter] = useState("all")

  const filteredCourses = filter === "all" ? courses : courses.filter((course) => course.level === filter)

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
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background Chart */}
        <div className="absolute inset-0 opacity-10">
          <AnimatedCandlestickChart />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Trading <span className="text-blue-500">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Enhance your trading skills with our comprehensive courses designed for all experience levels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-white p-1 rounded-lg shadow-md">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "all" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setFilter("beginner")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "beginner" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setFilter("intermediate")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "intermediate" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setFilter("advanced")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "advanced" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Advanced
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeIn}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className={`h-48 bg-gradient-to-r ${course.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">{course.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                      ${
                        course.level === "beginner"
                          ? "bg-green-100 text-green-600"
                          : course.level === "intermediate"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {course.duration} • {course.lessons} lessons
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
