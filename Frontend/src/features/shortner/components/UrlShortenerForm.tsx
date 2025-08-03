"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { LinkIcon, Copy, Check, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { bgIcons } from "@/utils/icons/bg.Icons"
import { useShortenUrlMutation } from "@/features/auth/hooks/UserCustomHook"
import toast from "react-hot-toast"


export const UrlShortenerForm: React.FC<{onSuccess: () => void}> = ({onSuccess}) => {
  const [longUrl, setLongUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const shortenUrlMutation = useShortenUrlMutation()

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShortenedUrl(null)
    setError(null)
    setCopied(false)

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)")
      setIsLoading(false)
      return
    }
    shortenUrlMutation.mutate(longUrl, {
      onSuccess: (data) => {
        console.log("data here the adding",data)
        setTimeout(() => {
          onSuccess() 
          setIsLoading(false)
          toast.success("URL shortened successfully!")
        }, 2000)     
        },
      onError: (error) => {
        console.error("Failed to shorten URL:", error)
        setError(error.message)
        setIsLoading(false)
      },
    })
  }

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgIcons.map(({ Icon, className, duration, rotate, x, y, textClass, sizeClass }, index) => (
          <motion.div
            key={index}
            animate={{
              rotate: rotate,
              x: x,
              y: y,
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className={`absolute opacity-5 ${className}`}
          >
            <Icon className={`${textClass} ${sizeClass}`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <LinkIcon className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardTitle className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Minilink: Shorten & Share
              </CardTitle>
            </motion.h1>
            <CardDescription className="text-gray-300 text-lg mt-2">
              Transform your long URLs into concise, memorable links in an instant.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="longUrl" className="text-gray-200 text-base">
                  Enter Your Long URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="longUrl"
                    type="url"
                    placeholder="e.g., https://very-long-website.com/some/path/to/a/resource"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className={`pl-10 pr-4 py-3 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 text-base ${
                      error ? "border-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Shortening...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Generate Minilink
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
            {shortenedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600"
              >
                <Label htmlFor="shortenedUrl" className="text-gray-200 text-base">
                  Your Minilink
                </Label>
                <div className="relative flex items-center">
                  <Input
                    id="shortenedUrl"
                    type="text"
                    value={shortenedUrl}
                    readOnly
                    className="pr-12 py-3 bg-gray-700/50 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20 text-base"
                  />
                  <Button
                    type="button"
                    onClick={handleCopy}
                    className="absolute right-0 top-0 h-full rounded-l-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                    aria-label="Copy shortened URL"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Your short link is ready! Click the copy button to share it.
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
