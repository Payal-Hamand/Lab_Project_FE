import React from 'react'

const EmptyState = ({ text, icon: Icon }) => {
  return (
    <div className="bg-[#EEF6FF] border border-[#C5DBF0] rounded-xl py-14 flex flex-col items-center justify-center text-center text-[#4A6A8A] text-xs mt-6">
      {Icon && <Icon size={48} strokeWidth={1} className="text-[#C5DBF0] mb-3" />}
      {text}
    </div>
  )
}

export default EmptyState
