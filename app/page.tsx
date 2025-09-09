"use client"

import React, { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Header } from "@/components/dashboard/Header"
import { ColonySelector } from "@/components/dashboard/ColonySelector"
import { CropCarousel } from "@/components/dashboard/CropCarousel"
import { MetricsGrid } from "@/components/dashboard/MetricsGrid"
import { BottomNav } from "@/components/dashboard/BottomNav"
import { HamburgerMenu } from "@/components/dashboard/HamburgerMenu"
import { COLONIES, CROPS, getCropsByColony, getColonyById } from "@/lib/data"

export default function HydroponicDashboard() {
  // Next.js router for navigation
  const router = useRouter()
  
  // State for the new futuristic dashboard
  const [selectedColony, setSelectedColony] = useState(COLONIES[0])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isColonySelectorOpen, setIsColonySelectorOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  // Get crops for selected colony
  const colonyId = selectedColony.id
  const colonyCrops = getCropsByColony(colonyId)
  const currentCrop = colonyCrops[0] // Default to first crop for metrics
  
  // Alert count for bottom nav
  const alertsCount = CROPS.filter(crop => 
    crop.status === "warning" || crop.status === "critical"
  ).length

  // Pull to refresh functionality
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    setPullDistance(0)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (typeof window !== "undefined" && window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (typeof window !== "undefined" && window.scrollY === 0 && !isRefreshing) {
        const currentY = e.touches[0].clientY
        const distance = Math.max(0, Math.min(120, currentY - startY))
        setPullDistance(distance)
      }
    },
    [startY, isRefreshing],
  )

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 80 && !isRefreshing) {
      handleRefresh()
    } else {
      setPullDistance(0)
    }
  }, [pullDistance, isRefreshing, handleRefresh])

  // Event handlers
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleColonyChange = (colony: typeof COLONIES[0]) => {
    setSelectedColony(colony)
  }

  const handleColonySelectorToggle = () => {
    setIsColonySelectorOpen(!isColonySelectorOpen)
  }

  const handleAlertsClick = () => {
    // Navigate to alerts page
    console.log("Navigate to alerts")
  }

  const handleAddClick = () => {
    // Show add crop/colony modal
    console.log("Show add modal")
  }

  const handleOverviewClick = () => {
    // Navigate to overview page
    router.push("/overview")
  }


  return (
    <div
      className="min-h-screen bg-dark-charcoal bg-gradient-to-br from-dark-charcoal to-deep-green-tint mobile-optimized"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${pullDistance * 0.4}px)`,
        transition: isRefreshing || pullDistance === 0 ? "transform 0.3s ease" : "none",
      }}
    >
      {/* Pull to Refresh - Water Ripple Effect */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center glass-card"
            style={{
              height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
              transition: isRefreshing ? "height 0.3s ease" : "none",
            }}
          >
            <motion.div 
              className="flex items-center gap-3 text-neon-green"
              animate={{ scale: isRefreshing ? [1, 1.05, 1] : [1] }}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
            >
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
              >
                💧
              </motion.div>
              <span className="text-sm font-medium">
                {isRefreshing ? "Refreshing..." : pullDistance > 80 ? "Release to refresh" : "Pull to refresh"}
              </span>
            </motion.div>
            
            {/* Water ripple effect */}
            {isRefreshing && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-green"
                animate={{ 
                  scale: [0, 2],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header onMenuClick={handleMenuToggle} />

      {/* Main Content - Mobile First Layout */}
      <div className="pt-20 pb-24 space-y-4">
        {/* Colony Selector */}
        <ColonySelector
          colonies={COLONIES}
          selectedColony={selectedColony}
          onColonyChange={handleColonyChange}
          isOpen={isColonySelectorOpen}
          onToggle={handleColonySelectorToggle}
        />

        {/* Crop Cards Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <CropCarousel crops={colonyCrops} />
        </motion.div>

        {/* Metrics Grid - Only show if we have a current crop */}
        {currentCrop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <MetricsGrid crop={currentCrop} />
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        alertsCount={alertsCount}
        onAlertsClick={handleAlertsClick}
        onAddClick={handleAddClick}
        onOverviewClick={handleOverviewClick}
      />

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPath="/"
      />
    </div>
  )
}
