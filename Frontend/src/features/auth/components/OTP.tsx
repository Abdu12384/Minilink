

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"



interface OTPVerificationFormProps {
  otp: string
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onResendOtp: () => void
}

export const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  otp,
  onOtpChange,
  onSubmit,
  onResendOtp,
}) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Verify OTP</CardTitle>
      <CardDescription>Enter the 6-digit code sent to your email/phone.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="otp">OTP Code</Label>
        <Input id="otp" type="text" placeholder="123456" value={otp} onChange={onOtpChange} maxLength={6} />
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2">
      <Button className="w-full" onClick={onSubmit}>
        Verify
      </Button>
      <Button variant="link" className="w-full" onClick={onResendOtp}>
        Resend OTP
      </Button>
    </CardFooter>
  </Card>
)