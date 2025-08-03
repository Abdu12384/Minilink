"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useGetUserProfileMutation } from "@/features/auth/hooks/UserCustomHook"
import { useEffect, useState } from "react"

interface IUser {
  name?: string
  email?: string
  phone?: string
}

export default function UserProfilePage() {
  
  const [user , setUser] = useState<IUser>({})
  const getUserProfile = useGetUserProfileMutation()
  
  const userInitial = user ? user?.name?.charAt(0).toUpperCase() : ""
  useEffect(() => {
    getUserProfile.mutate(
      undefined,
      {
        onSuccess: (data) => {
          console.log(data)
          setUser(data.user)
        },
        onError: (error) => {
          console.error("Failed to fetch user profile", error)
        },
      }
    )
  }, [])

  return (
    <Card className="w-full max-w-md bg-gray-900 text-white border-emerald-500/50 shadow-lg shadow-emerald-500/20 rounded-xl">
      <CardHeader className="flex flex-col items-center gap-4 p-6">
        <Avatar className="h-24 w-24 border-2 border-emerald-500">
          <AvatarFallback className="bg-emerald-600 text-white text-5xl font-bold">{userInitial}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-bold text-center text-emerald-300">{user?.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="email" className="text-gray-400 text-sm">
            Email
          </Label>
          <p id="email" className="text-lg font-medium">
            {user?.email}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="phone" className="text-gray-400 text-sm">
            Phone
          </Label>
          <p id="phone" className="text-lg font-medium">
            {user?.phone}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
