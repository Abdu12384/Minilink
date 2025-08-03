"use client"

import { useState } from "react"
import { Navbar } from "@/components/Home/Navbar"
import { Sidebar } from "@/components/Home/Sidebar"
import { Outlet } from "react-router-dom"


export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-950 via-gray-900 to-black">
      <Navbar
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          {" "}
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}
