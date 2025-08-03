"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import type { IUrlItem } from "@/types/url"
import { DeleteUrlButton } from "./DeleteButton"
import { useDeleteUrlMutation } from "@/features/auth/hooks/UserCustomHook"
import toast from "react-hot-toast"

interface UrlListProps {
  urls: IUrlItem[]
  onDeleteConfirm: () => void
}

export const UrlList: React.FC<UrlListProps> = ({ urls, onDeleteConfirm }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const deleteUrlMutation = useDeleteUrlMutation()

  const handleCopy = (id: string, shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (urls.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-400 mt-8"
      >
        No shortened URLs yet. Shorten one above!
      </motion.div>
    )
  }

  const handleDeleteUrl = (id: string) => {
    deleteUrlMutation.mutate(
      id,
      {
        onSuccess: (response) => {
          console.log(response)
          toast.success(response.message)
          onDeleteConfirm()
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Your Shortened Links</h2>
      {urls.map((url) => (
        <motion.div
          key={url._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * urls.indexOf(url) }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 shadow-lg">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 truncate">Original URL:</p>
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-400 text-lg font-medium truncate block"
                >
                  {url.originalUrl}
                </a>
                <p className="text-sm text-gray-400 mt-2 truncate">Minilink:</p>
                <div className="flex items-center gap-2">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-500 text-xl font-bold truncate flex-1"
                  >
                    {url.shortUrl}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(url._id, url.shortUrl)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                    aria-label="Copy shortened URL"
                  >
                    {copiedId === url._id ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                  <DeleteUrlButton urlItem={url} onDeleteConfirm={handleDeleteUrl} />
                </div>
              </div>
              <div className="text-right md:text-left text-sm text-gray-500 mt-2 md:mt-0 md:ml-4">
                Created: {new Date(url.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
