"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "@/features/auth/hooks/UserCustomHook"
import { Avatar, AvatarFallback } from "@/components/ui/avatar" // Added import
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" // Added imports
import { useAppDispatch } from "@/store/store"
import { logout } from "@/store/slice/userSliece"

interface NavbarProps {
  onSidebarToggle: () => void
}

export function Navbar({ onSidebarToggle }: NavbarProps) {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()
  const logoutMutation = useLogoutMutation()
  const dispatch = useAppDispatch()

  const userInitial = user ? user.name.charAt(0).toUpperCase() : "" // Get first letter for avatar

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          dispatch(logout())
        },
        onError: (error) => {
          console.error("Logout failed", error)
        },
      })
    } else {
      navigate("/login")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-950 via-gray-900 to-black backdrop-blur-md border-b border-emerald-500/30 shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Group toggle button and logo for left alignment */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700/50 -ml-2" // Added -ml-2 for tighter left alignment
            onClick={onSidebarToggle}
            aria-label="Toggle sidebar menu"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <a
            href="/"
            className="flex items-center gap-2 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent"
          >
            Minilink
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-emerald-500 text-white">{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={handleLoginLogout}>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="default"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-base"
                onClick={handleLoginLogout}
              >
                Login
              </Button>
            </motion.div>
          )}
        </nav>
      </div>
    </header>
  )
}
