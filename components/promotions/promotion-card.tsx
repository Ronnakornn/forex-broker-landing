"use client"
import { motion } from "framer-motion"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import type React from "react"

interface PromotionCardProps {
  promotion: {
    id: string
    title: string
    description: string
    validUntil: string
    status: "active" | "upcoming" | "expired"
    label?: "NEW" | "LIMITED TIME" | "HOT" | "EXCLUSIVE" | "POPULAR"
    icon: React.ReactNode
    gradient: string
  }
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  // Get label color based on label type
  const getLabelColor = (label?: string) => {
    switch (label) {
      case "NEW":
        return "bg-green-500"
      case "LIMITED TIME":
        return "bg-orange-500"
      case "HOT":
        return "bg-red-500"
      case "EXCLUSIVE":
        return "bg-purple-500"
      case "POPULAR":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get button style based on promotion status
  const getButtonStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "upcoming":
        return "bg-gray-200 text-gray-700 cursor-not-allowed"
      case "expired":
        return "bg-gray-200 text-gray-500 cursor-not-allowed"
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white"
    }
  }

  // Get button text based on promotion status
  const getButtonText = (status: string) => {
    switch (status) {
      case "active":
        return "Claim Now"
      case "upcoming":
        return "Coming Soon"
      case "expired":
        return "Expired"
      default:
        return "Learn More"
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-gradient-to-br ${promotion.gradient} rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/20`}
    >
      <div className="relative p-6">
        {/* Label */}
        {promotion.label && (
          <div className="absolute top-4 right-4">
            <span className={`${getLabelColor(promotion.label)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {promotion.label}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 text-blue-600">
          {promotion.icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{promotion.title}</h3>
        <p className="text-gray-600 mb-4">{promotion.description}</p>

        {/* Validity */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          {promotion.status === "upcoming" ? <Calendar className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
          <span>
            {promotion.status === "upcoming"
              ? promotion.validUntil
              : promotion.status === "expired"
                ? "Expired on " + promotion.validUntil
                : "Valid until " + promotion.validUntil}
          </span>
        </div>

        {/* Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${getButtonStyle(
            promotion.status,
          )}`}
          disabled={promotion.status !== "active"}
        >
          {getButtonText(promotion.status)}
          {promotion.status === "active" && <ChevronRight className="w-4 h-4 ml-1" />}
        </button>
      </div>
    </motion.div>
  )
}
