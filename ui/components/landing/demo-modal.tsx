"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Mic, Play, Pause, Volume2, Settings } from "lucide-react"

interface LandingDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LandingDemoModal({ isOpen, onClose }: LandingDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [volume, setVolume] = useState([75])
  const [speed, setSpeed] = useState([1])
  const [showSettings, setShowSettings] = useState(false)

  const demoSteps = [
    {
      title: "Start with a question",
      description: "Ask the assistant anything using your voice",
      userMessage: "What's the weather forecast for this weekend?",
      delay: 1000,
    },
    {
      title: "Get detailed responses",
      description: "The assistant provides comprehensive information",
      assistantMessage:
        "This weekend will be mostly sunny with temperatures around 75°F (24°C) on Saturday and 78°F (26°C) on Sunday. There's a slight chance of rain on Sunday evening, around 20% probability.",
      delay: 2000,
    },
    {
      title: "Follow-up questions",
      description: "The assistant maintains context for natural conversations",
      userMessage: "Should I plan an outdoor activity?",
      delay: 1500,
    },
    {
      title: "Personalized recommendations",
      description: "Get tailored advice based on your conversation",
      assistantMessage:
        "Based on the forecast, Saturday would be ideal for outdoor activities. If you're planning something for Sunday, I'd recommend scheduling it earlier in the day before the potential evening rain.",
      delay: 2500,
    },
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isPlaying && currentStep < demoSteps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, demoSteps[currentStep].delay)
    } else if (isPlaying && currentStep >= demoSteps.length - 1) {
      setTimeout(() => {
        setIsPlaying(false)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [isPlaying, currentStep])

  const handlePlayDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  const handleStopDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Assistant Demo
          </DialogTitle>
          <DialogDescription>See how the voice assistant works in a real conversation</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          {/* Demo Chat Interface */}
          <div className="border rounded-lg overflow-hidden bg-card">
            {/* Chat Header */}
            <div className="border-b bg-muted/50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Voice Assistant</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b bg-muted/30 px-4 py-3 space-y-3 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Volume: {volume[0]}%</span>
                    </div>
                    <div className="w-32">
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Speed: {speed[0]}x</span>
                    </div>
                    <div className="w-32">
                      <Slider value={speed} onValueChange={setSpeed} min={0.5} max={2} step={0.1} className="w-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {isPlaying || currentStep > 0 ? (
                <>
                  {demoSteps.slice(0, currentStep + 1).map((step, index) => (
                    <div key={index} className="space-y-3">
                      {step.userMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex justify-end"
                        >
                          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm">{step.userMessage}</p>
                          </div>
                        </motion.div>
                      )}
                      {step.assistantMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium flex-shrink-0">
                            AI
                          </div>
                          <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm">{step.assistantMessage}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                  {isPlaying && currentStep < demoSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center py-4"
                    >
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                        <span className="text-sm">
                          {currentStep % 2 === 0 ? "Assistant is thinking..." : "Listening..."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      <Mic className="h-8 w-8 text-primary" />
                    </motion.div>
                    <p className="text-muted-foreground text-sm">Click play to start the demo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Voice Control Area */}
            <div className="border-t bg-muted/30 p-4">
              <div className="flex items-center justify-center">
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    isPlaying ? "bg-primary shadow-glow" : "bg-muted"
                  }`}
                >
                  <Mic className={`h-6 w-6 ${isPlaying ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Demo Info */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              {isPlaying && currentStep < demoSteps.length && (
                <div className="font-medium">
                  {demoSteps[currentStep].title}
                  <p className="text-muted-foreground text-xs">{demoSteps[currentStep].description}</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {currentStep > 0 && !isPlaying && (
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              )}
              {isPlaying ? (
                <Button onClick={handleStopDemo}>
                  <Pause className="mr-2 h-4 w-4" />
                  Stop Demo
                </Button>
              ) : (
                <Button onClick={handlePlayDemo}>
                  <Play className="mr-2 h-4 w-4" />
                  {currentStep > 0 ? "Resume Demo" : "Play Demo"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
