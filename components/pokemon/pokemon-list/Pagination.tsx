"use client"

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const ChevronLeft = FaChevronLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronRight = FaChevronRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Botón anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-pink-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
