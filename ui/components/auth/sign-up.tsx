"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCreateUser } from "@/hooks/useUserReq";
import { setToken } from "@/lib/stores/features/auth/authSlice";
import { useDispatch } from "react-redux";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { createUserAsync, isError, isSuccess, error, isPending } =
    useCreateUser();

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate account creation

    try {
      const user = await createUserAsync({ email, password, name });
      const userToken = user?.token;
      // localStorage.setItem("token", userToken);
      dispatch(setToken(userToken.token));
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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.replace("/dashboard");
  //   }
  // }, []);

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
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-background/50 backdrop-blur-sm"
          />
        </motion.div>

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
          <Label htmlFor="password">Password</Label>
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

        <motion.div className="space-y-2" variants={formControl}>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-background/50 backdrop-blur-sm"
          />
        </motion.div>

        <motion.div variants={formControl}>
          <Button
            type="submit"
            className="w-full shadow-glow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </motion.div>

        <motion.div className="text-center text-sm" variants={formControl}>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
