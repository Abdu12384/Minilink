"use client"

import type React from "react"
import { useState } from "react"
import { LoginForm } from "../components/Login"
import { SignupForm } from "../components/Signin"
import { OTPVerificationForm } from "../components/OTP"

type AuthMode = "login" | "signup" | "otp"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [otp, setOtp] = useState("")

  const handleLoginSubmit = () => {
    console.log("Login submitted:", { email, password })
    // In a real app, you'd send this to your backend
    // For demo, let's simulate OTP for signup flow
    setMode("otp") // Simulate moving to OTP after login (or signup)
  }

  const handleSignupSubmit = () => {
    console.log("Signup submitted:", { name, email, phone, password, confirmPassword, profileImage })
    // In a real app, you'd send this to your backend
    setMode("otp") // Simulate moving to OTP after signup
  }

  const handleOtpSubmit = () => {
    console.log("OTP submitted:", { otp })
    // In a real app, verify OTP with backend
    alert("OTP Verified! (Simulated)")
    setMode("login") // Go back to login after successful OTP
  }

  const handleResendOtp = () => {
    console.log("Resending OTP...")
    alert("OTP Resent! (Simulated)")
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    } else {
      setProfileImage(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {mode === "login" && (
        <LoginForm
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLoginSubmit}
          onSwitchToSignup={() => setMode("signup")}
        />
      )}
      {mode === "signup" && (
        <SignupForm
          name={name}
          onNameChange={(e) => setName(e.target.value)}
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          phone={phone}
          onPhoneChange={(e) => setPhone(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          profileImage={profileImage}
          onProfileImageChange={handleProfileImageChange}
          onSubmit={handleSignupSubmit}
          onSwitchToLogin={() => setMode("login")}
        />
      )}
      {mode === "otp" && (
        <OTPVerificationForm
          otp={otp}
          onOtpChange={(e) => setOtp(e.target.value)}
          onSubmit={handleOtpSubmit}
          onResendOtp={handleResendOtp}
        />
      )}
    </div>
  )
}
