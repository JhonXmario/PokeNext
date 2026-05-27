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
  maxVisible = 8,
}: FilterButtonGroupProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleOptions = showAll ? options : options.slice(0, maxVisible)
  const hasMore = options.length > maxVisible

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide uppercase">
          {label}
        </label>
        {selectedValue && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-pink-600 dark:text-pink-400 hover:underline"
          >
            Reestablecer tipo
          </button>
        )}
      </div>
      
      {/* Container responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center border hover:cursor-pointer ${
            selectedValue === ""
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent shadow-lg scale-105"
              : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102"
          }`}
        >
          Todos los tipos
        </button>
        
        {visibleOptions.map((option) => {
          const isSelected = selectedValue === option.value;
          const bgClass = option.color || "bg-pink-600";
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 border hover:cursor-pointer ${
                isSelected
                  ? `${bgClass} text-white border-transparent shadow-lg shadow-black/10 scale-105`
                  : `bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102`
              }`}
            >
              {!isSelected && option.color && (
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${option.color}`}></div>
              )}
              <span className="truncate">{option.label}</span>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-2 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 bg-pink-50 dark:bg-pink-900/10 px-4 py-2 rounded-xl transition-all duration-200 hover:cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/20"
          >
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showAll ? "Ver menos tipos" : `Ver ${options.length - maxVisible} tipos más`}</span>
          </button>
        </div>
      )}
    </div>
  )
}

