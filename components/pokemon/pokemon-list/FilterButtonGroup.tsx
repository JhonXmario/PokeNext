"use client"

import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import type { FilterButtonGroupProps } from "@/types/pokemon-types"

const ChevronDown = FaChevronDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronUp = FaChevronUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export default function FilterButtonGroup({
  label,
  options,
  selectedValue,
  onChange,
  maxVisible = 6,
}: FilterButtonGroupProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleOptions = showAll ? options : options.slice(0, maxVisible)
  const hasMore = options.length > maxVisible

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedValue === ""
              ? "bg-pink-600 text-white shadow-lg transform scale-105"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
          }`}
        >
          Todos
        </button>
        {visibleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              selectedValue === option.value
                ? "bg-pink-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
            }`}
          >
            {option.color && <div className={`w-3 h-3 rounded-full ${option.color}`}></div>}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="flex items-center space-x-2 text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
        >
          {showAll ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          <span>{showAll ? "Ver menos" : `Ver ${options.length - maxVisible} más`}</span>
        </button>
      )}
    </div>
  )
}

