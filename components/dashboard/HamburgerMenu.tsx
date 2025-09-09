"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Home, 
  Sprout, 
  Activity, 
  BarChart3, 
  Bell, 
  Settings,
  User,
  HelpCircle,
  LogOut
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
  currentPath?: string
}

interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
  description?: string
  badge?: string
}

const mainMenuItems: MenuItem[] = [
  { 
    icon: Home, 
    label: "Dashboard", 
    href: "/", 
    description: "System overview"
  },
  { 
    icon: Sprout, 
    label: "Colonies", 
    href: "/colonies", 
    description: "Manage growing areas"
  },
  { 
    icon: Activity, 
    label: "System Status", 
    href: "/system", 
    description: "Hardware monitoring"
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    href: "/analytics", 
    description: "Growth insights"
  },
  { 
    icon: Bell, 
    label: "Alerts", 
    href: "/alerts", 
    description: "Notifications",
    badge: "2"
  }
]

const settingsMenuItems: MenuItem[] = [
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings", 
    description: "App preferences"
  },
  { 
    icon: User, 
    label: "Profile", 
    href: "/profile", 
    description: "Account settings"
  },
  { 
    icon: HelpCircle, 
    label: "Help & Support", 
    href: "/help", 
    description: "Get assistance"
  }
]

export function HamburgerMenu({ isOpen, onClose, currentPath = "/" }: HamburgerMenuProps) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const drawerVariants = {
    hidden: { 
      x: "100%",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.05,
        duration: 0.3
      }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer - Slides from right to left */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-80 z-50"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <GlassCard className="h-full rounded-l-2xl rounded-r-none p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-chart-2 flex items-center justify-center">
                    <span className="text-xl">🌱</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Shrumer</h2>
                    <p className="text-xs text-muted-foreground">Hydroponic System</p>
                  </div>
                </motion.div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-muted/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* System Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <GlassCard className="p-4 bg-neon-green/10 border border-neon-green/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neon-green">System Status</p>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-neon-green"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </div>
                </GlassCard>
              </motion.div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto">
                {/* Main Navigation */}
                <div className="space-y-2 mb-6">
                  {mainMenuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = currentPath === item.href
                    
                    return (
                      <motion.div
                        key={item.href}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start p-4 h-auto ${
                            isActive 
                              ? "bg-gradient-to-r from-neon-green/20 to-chart-2/20 border border-neon-green/30" 
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${
                              isActive ? "bg-neon-green/20" : "bg-muted/50"
                            }`}>
                              <Icon className={`h-4 w-4 ${
                                isActive ? "text-neon-green" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between">
                                <p className={`font-medium ${
                                  isActive ? "text-neon-green" : "text-foreground"
                                }`}>
                                  {item.label}
                                </p>
                                {item.badge && (
                                  <motion.span
                                    className="px-2 py-1 text-xs bg-alert-orange text-white rounded-full"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ 
                                      duration: 1.5,
                                      repeat: Infinity
                                    }}
                                  >
                                    {item.badge}
                                  </motion.span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>

                <Separator className="my-6" />

                {/* Settings Navigation */}
                <div className="space-y-2">
                  {settingsMenuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = currentPath === item.href
                    const adjustedIndex = index + mainMenuItems.length
                    
                    return (
                      <motion.div
                        key={item.href}
                        custom={adjustedIndex}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-4 h-auto hover:bg-muted/50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-muted/50">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-foreground">{item.label}</p>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-border"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start p-4 h-auto hover:bg-destructive/10 text-destructive hover:text-destructive"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </div>
                </Button>
              </motion.div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
