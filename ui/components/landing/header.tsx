"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mic, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1">
            <Mic className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Voice AI</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
          >
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#features"
                  className="text-lg font-medium hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-lg font-medium hover:text-primary"
                >
                  How It Works
                </Link>
                <Link
                  href="#testimonials"
                  className="text-lg font-medium hover:text-primary"
                >
                  Testimonials
                </Link>
                <Link
                  href="#faq"
                  className="text-lg font-medium hover:text-primary"
                >
                  FAQ
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="w-full">
                    <Button
                      onClick={() => router.push("/auth/sign-in")}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button
                      onClick={() => router.push("/auth/sign-up")}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
