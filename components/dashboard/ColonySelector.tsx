"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Colony } from "@/lib/data"

interface ColonySelectorProps {
  colonies: Colony[]
  selectedColony: Colony
  onColonyChange: (colony: Colony) => void
  isOpen: boolean
  onToggle: () => void
}

export function ColonySelector({ 
  colonies, 
  selectedColony, 
  onColonyChange, 
  isOpen, 
  onToggle 
}: ColonySelectorProps) {
  const getStatusColor = (status: Colony["status"]) => {
    switch (status) {
      case "active": return "neon-green"
      case "setup": return "alert-orange"
      case "maintenance": return "chart-4"
      case "offline": return "chart-5"
      default: return "muted"
    }
  }

  const getStatusGlow = (status: Colony["status"]) => {
    switch (status) {
      case "active": return "subtle"
      case "setup": return "orange"
      default: return "none"
    }
  }

  return (
    <div className="relative z-40">
      {/* Main Selector Button - Full Width */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <div 
          className={`w-full bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 ${
            selectedColony.status === "active" 
              ? "shadow-lg shadow-green-500/20 border-green-500/30" 
              : "hover:bg-gray-700/90"
          }`}
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Status Indicator - Green Circle */}
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  selectedColony.status === "active" 
                    ? "bg-green-500" 
                    : selectedColony.status === "setup"
                    ? "bg-yellow-500"
                    : selectedColony.status === "maintenance"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
                animate={{ 
                  scale: selectedColony.status === "active" ? [1, 1.2, 1] : [1],
                  opacity: selectedColony.status === "active" ? [0.7, 1, 0.7] : [1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: selectedColony.status === "active" ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
              
              {/* Colony Info */}
              <div className="flex flex-col">
                <motion.span 
                  className="font-semibold text-white text-lg"
                  layout
                >
                  {selectedColony.name}
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-300 font-medium"
                  layout
                >
                  {selectedColony.activeSlots}/{selectedColony.capacity} plants • {selectedColony.location}
                </motion.span>
              </div>
            </div>
            
            {/* Dropdown Arrow */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={onToggle}
            />
            
            {/* Dropdown List - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2"
            >
              <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl py-2 max-h-64 overflow-y-auto shadow-lg">
                {colonies.map((colony, index) => (
                  <motion.div
                    key={colony.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                      selectedColony.id === colony.id ? "bg-gray-700/30" : ""
                    }`}
                    onClick={() => {
                      onColonyChange(colony)
                      onToggle()
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Status Indicator */}
                      <motion.div
                        className={`w-2.5 h-2.5 rounded-full ${
                          colony.status === "active" 
                            ? "bg-green-500" 
                            : colony.status === "setup"
                            ? "bg-yellow-500"
                            : colony.status === "maintenance"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                        animate={{ 
                          scale: colony.status === "active" ? [1, 1.1, 1] : [1]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: colony.status === "active" ? Infinity : 0
                        }}
                      />
                      
                      {/* Colony Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">
                            {colony.name}
                          </span>
                          <span className="text-xs text-gray-400 capitalize">
                            {colony.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                          <span>{colony.location}</span>
                          <span>{colony.activeSlots}/{colony.capacity} plants</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
