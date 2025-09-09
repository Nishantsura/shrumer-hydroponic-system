"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedValueProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
  decimals?: number
}

export function AnimatedValue({ 
  value, 
  suffix = "", 
  prefix = "", 
  className = "", 
  duration = 1.5,
  decimals = 0
}: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = displayValue
    const difference = value - startValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (difference * easeOutQuart)
      
      setDisplayValue(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </motion.span>
  )
}
