"use client"

import { useRouter } from "next/navigation"
import { FaArrowLeft, FaList } from "react-icons/fa"

const icons = [
  FaArrowLeft, 
  FaList, 
].map(
  icon => icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>
);

const [ArrowLeft, List] = icons;

export default function ButtonBack() {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group hover:cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-pink-600 dark:text-pink-400 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Regresar</span>
          <List className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
