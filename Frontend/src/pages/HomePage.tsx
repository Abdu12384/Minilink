"use client"

import { useState } from "react"
import { Navbar } from "@/components/Home/Navbar"
import { Sidebar } from "@/components/Home/Sidebar"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

export default function HomePage() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth)

  const handleLoginLogout = () => {
    setIsAuthenticated(!isAuthenticated)
  }

  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-950 via-gray-900 to-black">
      <Navbar
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isAuthenticated={isAuthenticated}
          onLoginLogout={handleLoginLogout}
        />
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          {" "}
          {/* Changed to flex-col and justify-start */}
          <Outlet /> {/* This will render DashboardContent or UserProfilePage */}
        </main>
      </div>
    </div>
  )
}
