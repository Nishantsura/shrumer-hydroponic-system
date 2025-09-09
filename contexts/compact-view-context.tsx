"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CompactViewContextType {
  isCompactView: boolean
  toggleCompactView: () => void
  setCompactView: (compact: boolean) => void
}

const CompactViewContext = createContext<CompactViewContextType | undefined>(undefined)

export function CompactViewProvider({ children }: { children: ReactNode }) {
  const [isCompactView, setIsCompactView] = useState(false)

  // Load compact view preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compact-view")
    if (saved !== null) {
      setIsCompactView(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever compact view changes
  useEffect(() => {
    localStorage.setItem("compact-view", JSON.stringify(isCompactView))
  }, [isCompactView])

  const toggleCompactView = () => {
    setIsCompactView((prev) => !prev)
  }

  const setCompactView = (compact: boolean) => {
    setIsCompactView(compact)
  }

  return (
    <CompactViewContext.Provider value={{ isCompactView, toggleCompactView, setCompactView }}>
      {children}
    </CompactViewContext.Provider>
  )
}

export function useCompactView() {
  const context = useContext(CompactViewContext)
  if (context === undefined) {
    throw new Error("useCompactView must be used within a CompactViewProvider")
  }
  return context
}
