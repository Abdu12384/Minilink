"use client"

import { UrlShortenerForm } from "@/features/shortner/components/UrlShortenerForm"
import { UrlList } from "@/features/shortner/components/UrlList"
import { useState, useEffect } from "react"
import { useGetAllUrlsMutation } from "@/features/auth/hooks/UserCustomHook"
import type { IUrlItem } from "@/types/url"
import { Pagination } from "@/components/Home/Pagination"


export default function DashboardContent() {
  // In a real app, this would come from a global state or API
  const [urls, setUrls] = useState<IUrlItem[]>([])
  const [get, setGet] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 5
  const getAllUrlsMutation = useGetAllUrlsMutation()

  useEffect(() => {
    getAllUrlsMutation.mutate(
      {
        limit,
        page: currentPage
      },
      {
      onSuccess: (data) => {
        console.log("data",data)
        setUrls(data.urls.items)
        setTotalPages(data.urls.totalPages)
      },
      onError: (error) => {
        console.error("Failed to fetch user urls", error)
      },
    })
  }, [get, currentPage])

  return (
    <>
      <UrlShortenerForm onSuccess={() => setGet(!get)} />
      <UrlList urls={urls} onDeleteConfirm={() => setGet(!get)} />
      {totalPages > 1 && (
      <Pagination totalPages={totalPages} currPage={currentPage} setCurrPage={setCurrentPage} />
      )}
    </>
  )
}