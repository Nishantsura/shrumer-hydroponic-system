"use client"

import React, { useState, useRef } from "react"
import { motion, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CropCard } from "./CropCard"
import { Crop } from "@/lib/data"

interface CropCarouselProps {
  crops: Crop[]
}

export function CropCarousel({ crops }: CropCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextCrop = () => {
    setCurrentIndex((prev) => (prev + 1) % crops.length)
  }

  const prevCrop = () => {
    setCurrentIndex((prev) => (prev - 1 + crops.length) % crops.length)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    
    if (info.offset.x > threshold) {
      prevCrop()
    } else if (info.offset.x < -threshold) {
      nextCrop()
    }
  }

  if (crops.length === 0) {
    return (
      <div className="flex items-center justify-center h-[420px] mx-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-muted-foreground">No crops in this colony yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add your first crop to get started</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden px-4">
        <motion.div
          ref={carouselRef}
          className="flex"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          style={{ width: `${crops.length * 100}%` }}
        >
          {crops.map((crop, index) => (
            <div key={crop.id} className="w-full flex-shrink-0 px-2">
              <CropCard 
                crop={crop} 
                isActive={index === currentIndex}
                index={index}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Only show if more than 1 crop */}
      {crops.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevCrop}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-card hover:glow-subtle z-10"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextCrop}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-card hover:glow-subtle z-10"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </>
      )}

      {/* Dot Indicators */}
      {crops.length > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {crops.map((_, index) => (
            <motion.button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-neon-green w-6" 
                  : "bg-white/30 hover:bg-white/50 w-1.5"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Crop Counter */}
      <motion.div 
        className="text-center mt-2 text-xs text-white/70 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentIndex + 1} of {crops.length} crops
      </motion.div>
    </div>
  )
}
