"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface VoiceControlProps {
  isListening: boolean
  isSpeaking: boolean
  onStartTalking: () => void
  autoTTS: boolean
  setAutoTTS: (value: boolean) => void
}

export function VoiceControl({ isListening, isSpeaking, onStartTalking, autoTTS, setAutoTTS }: VoiceControlProps) {
  const [volume, setVolume] = useState<number[]>([])

  // Simulate microphone volume for waveform visualization
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setVolume((prev) => {
          const newVolume = [...prev, Math.random() * 50 + 10]
          if (newVolume.length > 20) {
            return newVolume.slice(newVolume.length - 20)
          }
          return newVolume
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setVolume([])
    }
  }, [isListening])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center w-full">
        {/* Status indicator */}
        <div className="text-sm text-muted-foreground mr-4 w-24 text-right">
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.span
                key="listening"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-destructive flex items-center justify-end"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
                Listening...
              </motion.span>
            ) : isSpeaking ? (
              <motion.span
                key="speaking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-primary flex items-center justify-end"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Speaking...
              </motion.span>
            ) : (
              <motion.span key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Ready
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Microphone button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onStartTalking}
            size="lg"
            className={`rounded-full h-16 w-16 shadow-glow ${
              isListening
                ? "bg-destructive hover:bg-destructive/90"
                : isSpeaking
                  ? "bg-primary hover:bg-primary/90"
                  : ""
            }`}
            aria-label={isSpeaking ? "Stop Speaking" : isListening ? "Stop Listening" : "Start Talking"}
          >
            <AnimatePresence mode="wait">
              {isSpeaking ? (
                <motion.div
                  key="volume-x"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <VolumeX className="h-8 w-8" />
                </motion.div>
              ) : isListening ? (
                <motion.div
                  key="mic-off"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MicOff className="h-8 w-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mic className="h-8 w-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Auto TTS toggle */}
        <div className="flex items-center space-x-2 ml-4">
          <Switch id="auto-tts" checked={autoTTS} onCheckedChange={setAutoTTS} />
          <Label htmlFor="auto-tts" className="flex items-center">
            <Volume2 className="h-4 w-4 mr-1" />
            <span className="text-sm">Auto-TTS</span>
          </Label>
        </div>
      </div>

      {/* Waveform visualization */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "2rem" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-end space-x-1 w-full max-w-md justify-center overflow-hidden"
          >
            {volume.map((v, i) => (
              <motion.div
                key={i}
                className="w-1 bg-destructive/70 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.1 }}
              ></motion.div>
            ))}
            {Array.from({ length: 20 - volume.length }).map((_, i) => (
              <div key={i + volume.length} className="w-1 bg-muted rounded-full h-2"></div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
