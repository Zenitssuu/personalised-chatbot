"use client"

import { SignIn } from "@/components/auth/sign-in"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignInPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <SignIn />
    </AuthLayout>
  )
}
