"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedVoiceInputProps {
  isListening: boolean;
  isSpeaking: boolean;
  onStartTalking: () => void;
  onSendMessage: (message: string) => void;
  autoTTS: boolean;
  setAutoTTS: (value: boolean) => void;
}

export function EnhancedVoiceInput({
  isListening,
  isSpeaking,
  onStartTalking,
  onSendMessage,
  autoTTS,
  setAutoTTS,
}: EnhancedVoiceInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate microphone volume for waveform visualization
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setVolume((prev) => {
          const newVolume = [...prev, Math.random() * 50 + 10];
          if (newVolume.length > 20) {
            return newVolume.slice(newVolume.length - 20);
          }
          return newVolume;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setVolume([]);
    }
  }, [isListening]);

  const handleMicClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    onStartTalking();
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleInputBlur = () => {
    if (!inputValue.trim() && !isListening) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status indicator */}
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2 text-destructive"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-destructive"
              />
              <span className="text-sm font-medium">Listening...</span>
            </motion.div>
          ) : isSpeaking ? (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2 text-primary"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-primary"
              />
              <span className="text-sm font-medium">Speaking...</span>
            </motion.div>
          ) : (
            <motion.span
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground"
            >
              Ready to chat
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Input field with microphone */}
      <motion.div layout className="relative">
        <motion.div
          initial={false}
          animate={{
            width: isExpanded ? "100%" : "auto",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          className="flex items-center gap-2"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1 overflow-hidden"
              >
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Type your message or use voice..."
                    className="pr-12 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200"
                  />
                  {inputValue.trim() && (
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Microphone button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={isExpanded ? "flex-shrink-0" : "mx-auto"}
          >
            <Button
              onClick={handleMicClick}
              size="lg"
              className={`rounded-full h-14 w-14 shadow-glow-lg transition-all duration-300 ${
                isListening
                  ? "bg-destructive hover:bg-destructive/90 shadow-glow-xl"
                  : isSpeaking
                  ? "bg-primary hover:bg-primary/90 shadow-glow-xl"
                  : "hover:shadow-glow-xl"
              }`}
              aria-label={
                isSpeaking
                  ? "Stop Speaking"
                  : isListening
                  ? "Stop Listening"
                  : "Start Voice Input"
              }
            >
              <AnimatePresence mode="wait">
                {isSpeaking ? (
                  <motion.div
                    key="volume-x"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VolumeX className="h-7 w-7" />
                  </motion.div>
                ) : isListening ? (
                  <motion.div
                    key="mic-off"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MicOff className="h-7 w-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic className="h-7 w-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Waveform visualization */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "3rem" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-end justify-center space-x-1 overflow-hidden"
          >
            {volume.map((v, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-destructive/70 to-destructive rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(v, 10)}%` }}
                transition={{ duration: 0.1 }}
              />
            ))}
            {Array.from({ length: 20 - volume.length }).map((_, i) => (
              <div
                key={i + volume.length}
                className="w-1 bg-muted/30 rounded-full h-2"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto TTS toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center space-x-3"
      >
        <Switch id="auto-tts" checked={autoTTS} onCheckedChange={setAutoTTS} />
        <Label htmlFor="auto-tts" className="flex items-center cursor-pointer">
          <Volume2 className="h-4 w-4 mr-2" />
          <span className="text-sm">Auto-TTS</span>
        </Label>
      </motion.div>
    </div>
  );
}
