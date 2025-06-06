"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Mic,
  MessageSquare,
  Brain,
  Sparkles,
  ChevronRight,
  Play,
  ArrowDown,
} from "lucide-react";
import { LandingFeatureCard } from "@/components/landing/feature-card";
import { LandingTestimonial } from "@/components/landing/testimonial";
import { LandingFaq } from "@/components/landing/faq";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import { LandingHowItWorks } from "@/components/landing/how-it-works";
import { LandingDemoModal } from "@/components/landing/demo-modal";
import { LandingStats } from "@/components/landing/stats";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const router = useRouter();

  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.replace("/dashboard");
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"
          style={{ x, y }}
        />
      </div>

      <LandingHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Next-generation AI Assistant
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Voice AI that{" "}
                  <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                    understands you
                  </span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
                  Experience the future of voice interaction with our AI
                  assistant. Natural conversations, personalized responses, and
                  powerful voice recognition in one elegant interface.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="group shadow-glow-lg hover:shadow-glow-xl transition-all duration-300"
                  >
                    Get Started Free
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                  className="group border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative mx-auto max-w-lg">
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl backdrop-blur-sm border border-primary/20"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl backdrop-blur-sm border border-secondary/20"
                />

                {/* Main demo interface */}
                <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Voice AI Assistant
                    </div>
                  </div>

                  {/* Chat interface */}
                  <div className="p-6 space-y-4 min-h-[300px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-medium">
                        AI
                      </div>
                      <div className="bg-muted/50 rounded-2xl rounded-tl-md p-4 max-w-[80%] backdrop-blur-sm">
                        <p className="text-sm">
                          Hello! I'm your AI assistant. How can I help you
                          today?
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-start gap-3 justify-end"
                    >
                      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl rounded-tr-md p-4 max-w-[80%] text-primary-foreground">
                        <p className="text-sm">
                          What's the weather like today?
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground text-sm font-medium">
                        U
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-medium">
                        AI
                      </div>
                      <div className="bg-muted/50 rounded-2xl rounded-tl-md p-4 max-w-[80%] backdrop-blur-sm">
                        <p className="text-sm">
                          It's currently 72°F and sunny! Perfect weather for
                          outdoor activities. Would you like me to suggest some?
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Voice control */}
                  <div className="p-6 border-t border-border/50 bg-muted/20">
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow-lg"
                      >
                        <Mic className="w-6 h-6 text-primary-foreground" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      {/* <LandingStats /> */}

      {/* Features Section */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Powerful Voice Capabilities
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Our AI assistant combines cutting-edge voice recognition with
              natural language processing to deliver an exceptional
              conversational experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LandingFeatureCard
              icon={<Mic className="h-10 w-10" />}
              title="Advanced Voice Recognition"
              description="Accurate speech recognition that understands natural language and adapts to your speaking style."
              delay={0.1}
            />
            <LandingFeatureCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="Contextual Conversations"
              description="Maintains context throughout your conversation for more natural and meaningful interactions."
              delay={0.2}
            />
            <LandingFeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="Personalized Responses"
              description="Adapts to your preferences and provides tailored responses based on your interaction history."
              delay={0.3}
            />
            <LandingFeatureCard
              icon={<Sparkles className="h-10 w-10" />}
              title="Multiple Personas"
              description="Choose from different assistant personalities to match your mood or task requirements."
              delay={0.4}
            />
            <LandingFeatureCard
              icon={<CheckCircle className="h-10 w-10" />}
              title="Conversation History"
              description="Review and organize past conversations with searchable and editable history."
              delay={0.5}
            />
            <LandingFeatureCard
              icon={<Play className="h-10 w-10" />}
              title="Voice Synthesis"
              description="Natural-sounding text-to-speech that makes conversations feel more human and engaging."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <LandingHowItWorks />

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Discover how our voice assistant is transforming the way people
              interact with technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LandingTestimonial
              quote="The voice recognition is incredibly accurate, even with my accent. It's changed how I interact with technology."
              author="Sarah J."
              role="Product Manager"
              delay={0.1}
            />
            <LandingTestimonial
              quote="I love how it remembers our previous conversations and maintains context. It feels like talking to a real assistant."
              author="Michael T."
              role="Software Developer"
              delay={0.2}
            />
            <LandingTestimonial
              quote="The different personas are fantastic. I use the professional one for work and the friendly one for casual conversations."
              author="Elena R."
              role="Marketing Director"
              delay={0.3}
            />
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <LandingFaq /> */}

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-primary/5 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
                Join thousands of users who are already experiencing the future
                of voice interaction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="shadow-glow-lg hover:shadow-glow-xl transition-all duration-300"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/50 hover:border-primary/50"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />

      {/* Demo Modal */}
      <LandingDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
