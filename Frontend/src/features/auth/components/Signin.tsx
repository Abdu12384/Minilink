import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"



interface SignupFormProps {
  name: string
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  email: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  phone: string
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  password: string
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  confirmPassword: string
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  profileImage: File | null
  onProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onSwitchToLogin: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  profileImage,
  onProfileImageChange,
  onSubmit,
  onSwitchToLogin,
}) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Sign Up</CardTitle>
      <CardDescription>Create your account.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="John Doe" value={name} onChange={onNameChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={onEmailChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1234567890" value={phone} onChange={onPhoneChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={onPasswordChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input id="confirm-password" type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-image">Profile Image</Label>
        <Input id="profile-image" type="file" onChange={onProfileImageChange} />
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2">
      <Button className="w-full" onClick={onSubmit}>
        Sign Up
      </Button>
      <Button variant="link" className="w-full" onClick={onSwitchToLogin}>
        Already have an account? Login
      </Button>
    </CardFooter>
  </Card>
)