import React from 'react'

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
    </div>
  )
}

export const InlineLoader = ({ text = 'Loading...' }) => {
  return <div className="text-center text-xl md:text-2xl font-semibold py-10">{text}</div>
}

export const SkeletonCard = ({ lines = 3 }) => {
  return (
    <div className="animate-pulse bg-white rounded-[35px] p-5 md:p-8 shadow-sm">
      <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded mb-3"
          style={{ width: `${80 - i * 15}%` }}
        ></div>
      ))}
    </div>
  )
}

const Loader = Spinner
export default Loader
