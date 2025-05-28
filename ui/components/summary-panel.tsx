"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface SummaryPanelProps {
  summary: string
  onRefresh: () => void
}

export function SummaryPanel({ summary, onRefresh }: SummaryPanelProps) {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Conversation Summary</h3>
        <Button variant="ghost" size="icon" onClick={onRefresh} aria-label="Refresh summary">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <motion.div
        className="bg-secondary/30 p-4 rounded-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm">{summary}</p>
      </motion.div>
    </div>
  )
}
