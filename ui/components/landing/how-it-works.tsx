"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MessageSquare, Settings } from "lucide-react"

export function LandingHowItWorks() {
  const [activeTab, setActiveTab] = useState("speak")

  const steps = {
    speak: [
      {
        title: "Click the microphone button",
        description: "Start speaking by clicking the prominent microphone button in the interface.",
      },
      {
        title: "Speak naturally",
        description: "Ask questions, give commands, or just chat - the AI understands natural language.",
      },
      {
        title: "Get instant responses",
        description: "The AI processes your speech and responds with accurate, helpful information.",
      },
    ],
    customize: [
      {
        title: "Choose your assistant persona",
        description: "Select from multiple personas to match your preferences or specific tasks.",
      },
      {
        title: "Adjust voice settings",
        description: "Customize the voice, speed, and other parameters to your liking.",
      },
      {
        title: "Set up preferences",
        description: "Configure how the assistant responds and what information it remembers.",
      },
    ],
    manage: [
      {
        title: "View conversation history",
        description: "Access and search through your past conversations with the assistant.",
      },
      {
        title: "Organize by topics",
        description: "Group conversations by topic for easy reference and retrieval.",
      },
      {
        title: "Export or share insights",
        description: "Save important information or share it with others securely.",
      },
    ],
  }

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple & Intuitive</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our voice assistant is designed to be easy to use while providing powerful capabilities.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="speak" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="speak" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Speak</span>
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Customize</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2 data-[state=active]:bg-background">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Manage</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-8 rounded-lg border bg-card/50 backdrop-blur-sm p-6 shadow-sm">
              <TabsContent value="speak" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1"
                  >
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden relative border">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="h-24 w-24 rounded-full bg-primary/90 flex items-center justify-center shadow-glow"
                        >
                          <Mic className="h-12 w-12 text-primary-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex-1 space-y-6">
                    {steps.speak.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                          {index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="customize" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1"
                  >
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden relative border">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-24 w-24 rounded-full bg-primary/90 flex items-center justify-center shadow-glow"
                        >
                          <Settings className="h-12 w-12 text-primary-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex-1 space-y-6">
                    {steps.customize.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                          {index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manage" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1"
                  >
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden relative border">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="h-24 w-24 rounded-full bg-primary/90 flex items-center justify-center shadow-glow"
                        >
                          <MessageSquare className="h-12 w-12 text-primary-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex-1 space-y-6">
                    {steps.manage.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                          {index + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
