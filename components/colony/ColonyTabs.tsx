"use client"

import React from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Colony } from "@/lib/data"

interface ColonyTabsProps {
  colonies: Colony[]
  selectedColonyId: string
  onColonyChange: (colonyId: string) => void
}

export function ColonyTabs({ colonies, selectedColonyId, onColonyChange }: ColonyTabsProps) {
  const getStatusColor = (status: Colony["status"]) => {
    switch (status) {
      case "active":
        return "bg-neon-green/20 text-neon-green border-neon-green/30"
      case "setup":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "maintenance":
        return "bg-alert-orange/20 text-alert-orange border-alert-orange/30"
      case "offline":
        return "bg-chart-5/20 text-chart-5 border-chart-5/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden sm:flex items-center gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
        {colonies.map((colony) => (
          <motion.button
            key={colony.id}
            onClick={() => onColonyChange(colony.id)}
            className={`relative flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedColonyId === colony.id
                ? "bg-neon-green text-dark-charcoal shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Colony {colony.id}</span>
                <Badge className={`${getStatusColor(colony.status)} text-xs`}>
                  {colony.status}
                </Badge>
              </div>
              <div className="text-xs opacity-70">
                {colony.activeSlots}/{colony.capacity}
              </div>
            </div>
            
            {/* Active indicator */}
            {selectedColonyId === colony.id && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-neon-green"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
        
        {/* Add new colony button */}
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="sm:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {colonies.map((colony) => (
            <motion.button
              key={colony.id}
              onClick={() => onColonyChange(colony.id)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedColonyId === colony.id
                  ? "bg-neon-green text-dark-charcoal shadow-lg"
                  : "bg-white/10 text-white/70 border border-white/20"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">Colony {colony.id}</span>
                <Badge className={`${getStatusColor(colony.status)} text-xs`}>
                  {colony.status}
                </Badge>
                <div className="text-xs opacity-70">
                  {colony.activeSlots}/{colony.capacity}
                </div>
              </div>
            </motion.button>
          ))}
          
          {/* Add new colony button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0 text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
