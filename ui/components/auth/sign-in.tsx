"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCreateUser, useLoginUser } from "@/hooks/useUserReq";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { loginUserAsync, isPending, isError, isSuccess, error } =
    useLoginUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // // Simulate authentication
    // setTimeout(() => {
    //   setIsLoading(false);
    //   toast({
    //     title: "Success",
    //     description: "You have been signed in successfully",
    //   });
    //   router.push("/dashboard");
    // }, 1500);

    try {
      const user = await loginUserAsync({ email, password });
      const userToken = user?.token;

      localStorage.setItem("token", userToken);
      toast({
        title: "Success",
        description: "You have been signed in successfully",
      });
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Sigup failed",
      });
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  }, []);

  const formControls = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const formControl = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        variants={formControls}
        initial="hidden"
        animate="show"
      >
        <motion.div className="space-y-2" variants={formControl}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background/50 backdrop-blur-sm"
          />
        </motion.div>
        <motion.div className="space-y-2" variants={formControl}>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background/50 backdrop-blur-sm"
          />
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          variants={formControl}
        >
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </Label>
        </motion.div>

        <motion.div variants={formControl}>
          <Button
            type="submit"
            className="w-full shadow-glow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </motion.div>

        <motion.div className="text-center text-sm" variants={formControl}>
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
