"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  email: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  password: string
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onSwitchToSignup: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
  onSwitchToSignup,
}) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Login</CardTitle>
      <CardDescription>Enter your email and password to sign in.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={onEmailChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={onPasswordChange} />
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2">
      <Button className="w-full" onClick={onSubmit}>
        Sign In
      </Button>
      <Button variant="link" className="w-full" onClick={onSwitchToSignup}>
        Don't have an account? Sign Up
      </Button>
    </CardFooter>
  </Card>
)