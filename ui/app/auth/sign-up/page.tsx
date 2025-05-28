"use client"

import { SignUp } from "@/components/auth/sign-up"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignUpPage() {
  return (
    <AuthLayout title="Create an account" subtitle="Sign up to get started with Voice AI Assistant">
      <SignUp />
    </AuthLayout>
  )
}
