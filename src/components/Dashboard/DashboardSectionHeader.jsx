import React from 'react'
import Button from '@/components/ui/Button'
const DashboardSectionHeader = ({ title, subtitle, button, buttonText, buttonIcon, onClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-950">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-2 text-sm md:text-base">{subtitle}</p>}
      </div>
      {button && (
        <Button onClick={onClick} className="flex items-center gap-2">
          {buttonIcon}
          {buttonText}
        </Button>
      )}
    </div>
  )
}
export default DashboardSectionHeader
