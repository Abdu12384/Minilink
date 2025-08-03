"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { IUrlItem } from "@/types/url"



interface DeleteUrlButtonProps {
  urlItem: IUrlItem
  onDeleteConfirm: (id: string) => void
}

export const DeleteUrlButton: React.FC<DeleteUrlButtonProps> = ({ urlItem, onDeleteConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = () => {
    onDeleteConfirm(urlItem._id)
    setIsModalOpen(false) 
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsModalOpen(true)} // Open delete confirmation modal
        className="text-red-400 hover:text-red-500 hover:bg-gray-700/50"
        aria-label={`Delete shortened URL ${urlItem.shortUrl}`}
      >
        <Trash2 className="w-5 h-5" />
      </Button>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="bg-gray-900 text-white border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action cannot be undone. This will permanently delete your shortened URL{" "}
              <span className="font-bold text-emerald-300">{urlItem.shortUrl}</span> and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600 border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
