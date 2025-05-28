"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react"

interface LandingTestimonialProps {
  quote: string
  author: string
  role: string
  delay?: number
}

export function LandingTestimonial({ quote, author, role, delay = 0 }: LandingTestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="pt-6 relative">
          <QuoteIcon className="h-8 w-8 text-primary/20 absolute top-2 left-2" />
          <p className="text-muted-foreground relative z-10">{quote}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
