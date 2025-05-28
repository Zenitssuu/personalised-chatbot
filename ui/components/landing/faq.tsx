"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function LandingFaq() {
  const faqs = [
    {
      question: "How accurate is the voice recognition?",
      answer:
        "Our voice recognition system achieves over 95% accuracy across various accents and environments. It continuously improves through machine learning to adapt to your specific speech patterns over time.",
    },
    {
      question: "Can I use the assistant offline?",
      answer:
        "The core functionality requires an internet connection to process voice commands and generate responses. However, we offer limited offline capabilities for basic commands and previously cached information.",
    },
    {
      question: "How is my data protected?",
      answer:
        "We employ end-to-end encryption for all voice data and conversations. Your data is never sold to third parties, and you have complete control over your conversation history, including the ability to delete it at any time.",
    },
    {
      question: "What languages are supported?",
      answer:
        "Currently, we support English (US, UK, AU, CA), Spanish, French, German, Japanese, and Mandarin Chinese. We're continuously adding support for more languages and regional accents.",
    },
    {
      question: "Can I customize the assistant's voice?",
      answer:
        "Yes, you can choose from multiple voice options with different tones, accents, and speaking styles. Premium users can also adjust speech rate, pitch, and other voice characteristics.",
    },
    {
      question: "Is there a free plan available?",
      answer:
        "Yes, we offer a free plan with core voice assistant features. Premium plans provide additional capabilities like advanced customization, longer conversation history, and priority processing.",
    },
  ]

  return (
    <section id="faq" className="bg-muted/50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our voice assistant.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
