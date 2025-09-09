"use client"

import React from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 w-full"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Mobile App Style Header */}
      <div className="w-full bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between max-w-full">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Logo Icon - Green rounded square with sprout */}
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-2xl"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌱
              </motion.div>
            </motion.div>
            
            {/* Brand Name */}
            <div className="flex flex-col">
              <motion.h1 
                className="text-xl font-bold text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Shrumer
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-300 -mt-1 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hydroponic System
              </motion.p>
            </div>
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5 text-white" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
