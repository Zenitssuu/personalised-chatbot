"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Clock, Star } from "lucide-react";

export function LandingStats() {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "50K+",
      label: "Active Users",
      description: "Growing community",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      value: "1M+",
      label: "Conversations",
      description: "Daily interactions",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: "99.9%",
      label: "Uptime",
      description: "Reliable service",
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: "4.9/5",
      label: "User Rating",
      description: "Highly rated",
    },
  ];

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
