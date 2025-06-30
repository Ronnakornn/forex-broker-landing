"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { ChevronRight, AlertTriangle, Gift, Award, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PromotionCard from "@/components/promotions/promotion-card"
import AnimatedBackground from "@/components/promotions/animated-background"

// Promotion types
type PromotionStatus = "active" | "upcoming" | "expired"
type PromotionLabel = "NEW" | "LIMITED TIME" | "HOT" | "EXCLUSIVE" | "POPULAR"

interface Promotion {
  id: string
  title: string
  description: string
  validUntil: string
  status: PromotionStatus
  label?: PromotionLabel
  icon: React.ReactNode
  gradient: string
}

export default function PromotionsPage() {
  const [activeFilter, setActiveFilter] = useState<PromotionStatus | "all">("all")

  // Sample promotions data
  const promotions: Promotion[] = [
    {
      id: "promo1",
      title: "30% Deposit Bonus",
      description: "Get a 30% bonus on your first deposit. Minimum deposit $100.",
      validUntil: "May 31, 2025",
      status: "active",
      label: "HOT",
      icon: <Gift className="w-6 h-6" />,
      gradient: "from-blue-300 to-blue-200",
    },
    {
      id: "promo2",
      title: "Zero Commission Trading",
      description: "Trade major forex pairs with zero commission for a limited time.",
      validUntil: "June 15, 2025",
      status: "active",
      label: "NEW",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-purple-300 to-blue-200",
    },
    {
      id: "promo3",
      title: "Loyalty Rewards Program",
      description: "Earn points for every trade and redeem them for bonuses and benefits.",
      validUntil: "Ongoing",
      status: "active",
      label: "POPULAR",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-cyan-300 to-blue-200",
    },
    {
      id: "promo4",
      title: "Refer a Friend Bonus",
      description: "Get $50 for each friend you refer who opens an account and makes a deposit.",
      validUntil: "July 31, 2025",
      status: "active",
      icon: <Gift className="w-6 h-6" />,
      gradient: "from-blue-300 to-cyan-200",
    },
    {
      id: "promo5",
      title: "Summer Trading Challenge",
      description: "Compete with other traders for a chance to win prizes worth up to $10,000.",
      validUntil: "Starts June 1, 2025",
      status: "upcoming",
      label: "EXCLUSIVE",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-indigo-300 to-blue-200",
    },
    {
      id: "promo6",
      title: "Free VPS Hosting",
      description: "Get free VPS hosting for 3 months when you deposit $1,000 or more.",
      validUntil: "April 15, 2025",
      status: "expired",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-gray-300 to-blue-200",
    },
  ]

  // Filter promotions based on active filter
  const filteredPromotions =
    activeFilter === "all" ? promotions : promotions.filter((promo) => promo.status === activeFilter)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Header Section with animated background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Latest <span className="text-blue-500">Promotions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get more from your trades. Discover our latest bonuses and exclusive offers.
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
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "all" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                All Promotions
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "active" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter("upcoming")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "upcoming" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveFilter("expired")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === "expired" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Expired
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPromotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </motion.div>

          {filteredPromotions.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No promotions found</h3>
              <p className="text-gray-500">There are currently no {activeFilter} promotions available.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Disclaimer Footer */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  *Terms and conditions apply. All promotions are subject to approval and can be changed or withdrawn at
                  any time without prior notice. Trading forex/CFDs carries significant risk.
                </p>
                <a href="#" className="text-blue-500 hover:text-blue-600 text-sm flex items-center">
                  View full terms and conditions
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
