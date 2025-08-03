"use client"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useIsMobile()

  const navLinks = (
    <>
      <Link
        to="/"
        className="text-gray-300 hover:text-emerald-400 transition-colors text-lg font-medium py-2"
        onClick={onClose}
      >
        Dashboard
      </Link>
      <Link
        to="/profile"
        className="text-gray-300 hover:text-emerald-400 transition-colors text-lg font-medium py-2"
        onClick={onClose}
      >
        Profile
      </Link>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="w-64 bg-gray-900/95 backdrop-blur-lg border-r border-gray-700/50 z-50 flex flex-col p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent"
              onClick={onClose}
            >
              Minilink
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
              <XIcon className="h-6 w-6 text-white" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop Sidebar
  return (
    <aside
      className={`hidden md:flex fixed top-0 left-0 flex-col h-screen bg-transparent backdrop-blur-lg border-r border-gray-700/50 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-64 p-6" : "w-0 overflow-hidden p-0"
      }`}
    >
      {/* Inner container for content to apply opacity transition */}
      <div
        className={`flex flex-col h-full transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent"
          >
            Minilink
          </Link>
        </div>
        <nav className="flex flex-col gap-4 flex-1">{navLinks}</nav>
      </div>
    </aside>
  )
}
