"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: string
}

interface MessageFeedProps {
  messages: Message[]
}

export function MessageFeed({ messages }: MessageFeedProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2">Voice Assistant</h2>
          <p className="text-muted-foreground mb-6">Click the microphone button below to start talking</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>• Ask questions or give commands</p>
            <p>• Your conversation will appear here</p>
            <p>• Choose different personas from the sidebar</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar className={`${message.sender === "user" ? "ml-3" : "mr-3"} ring-2 ring-border`}>
              <AvatarFallback className={message.sender === "user" ? "bg-primary" : "bg-secondary"}>
                {message.sender === "user" ? "U" : "AI"}
              </AvatarFallback>
              <AvatarImage
                src={
                  message.sender === "user"
                    ? "/placeholder.svg?height=40&width=40"
                    : "/placeholder.svg?height=40&width=40"
                }
                alt={message.sender}
              />
            </Avatar>
            <div>
              <div
                className={`rounded-lg p-4 shadow-sm ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground message-bubble-user"
                    : "bg-secondary/30 backdrop-blur-sm message-bubble-assistant"
                }`}
              >
                <p>{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(message.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
