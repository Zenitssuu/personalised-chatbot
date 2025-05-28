"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, PanelRight, PanelRightClose, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface AppHeaderProps {
  title: string
  onToggleSummary: () => void
  isSummaryOpen: boolean
  onSignOut: () => void
  showMenuButton?: boolean
  onMenuClick?: () => void
}

export function AppHeader({
  title,
  onToggleSummary,
  isSummaryOpen,
  onSignOut,
  showMenuButton = false,
  onMenuClick,
}: AppHeaderProps) {
  const isMobile = useMobile()

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border/50 p-4 bg-card/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Menu button and title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {showMenuButton && onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="flex-shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSummary}
              title="Toggle summary panel"
              className="hidden md:flex"
            >
              {isSummaryOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
            </Button>
          )}
          <ThemeToggle />
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
