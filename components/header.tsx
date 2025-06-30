"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-[52px] ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-blue-500">
              ForexPro
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-500 transition-colors">
                Courses
              </Link>
              <Link href="/market" className="text-gray-700 hover:text-blue-500 transition-colors">
                Market Data
              </Link>
              <Link href="/economic-calendar" className="text-gray-700 hover:text-blue-500 transition-colors">
                Economic Calendar
              </Link>
              <Link href="/promotions" className="text-gray-700 hover:text-blue-500 transition-colors">
                Promotions
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-500 transition-colors">
                About
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t mt-4"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/courses"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    href="/market"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Market Data
                  </Link>
                  <Link
                    href="/economic-calendar"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Economic Calendar
                  </Link>
                  <Link
                    href="/promotions"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Promotions
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
