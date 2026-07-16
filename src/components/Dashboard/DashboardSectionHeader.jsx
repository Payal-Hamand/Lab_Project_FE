import React from 'react'
const DashboardSectionHeader = ({ title, subtitle, button, buttonText, buttonIcon, onClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-950">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-2 text-sm md:text-base">{subtitle}</p>}
      </div>
      {button && (
        <button
          onClick={onClick}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
        >
          {buttonIcon}
          {buttonText}
        </button>
      )}
    </div>
  )
}
export default DashboardSectionHeader
