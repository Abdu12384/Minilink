"use client"

import type * as React from "react"
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  totalPages: number
  currPage: number
  setCurrPage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currPage, setCurrPage }) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5 // Number of page links to show directly

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currPage}
              onClick={() => setCurrPage(i)}
              className={
                i === currPage ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-gray-300 hover:bg-gray-700/50"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    } else {
      // Logic for showing ellipses
      const startPage = Math.max(1, currPage - Math.floor(maxPagesToShow / 2))
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

      if (startPage > 1) {
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => setCurrPage(1)} className="text-gray-300 hover:bg-gray-700/50">
              1
            </PaginationLink>
          </PaginationItem>,
        )
        if (startPage > 2) {
          pages.push(<PaginationEllipsis key="start-ellipsis" />)
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currPage}
              onClick={() => setCurrPage(i)}
              className={
                i === currPage ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-gray-300 hover:bg-gray-700/50"
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<PaginationEllipsis key="end-ellipsis" />)
        }
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => setCurrPage(totalPages)}
              className="text-gray-300 hover:bg-gray-700/50"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    }
    return pages
  }

  return (
    <ShadcnPagination className="mt-8 mb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setCurrPage(Math.max(1, currPage - 1))}
            className={`text-gray-300 hover:bg-gray-700/50 ${currPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setCurrPage(Math.min(totalPages, currPage + 1))}
            className={`text-gray-300 hover:bg-gray-700/50 ${currPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
