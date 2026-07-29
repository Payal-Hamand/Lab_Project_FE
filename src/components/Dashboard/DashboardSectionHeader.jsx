import React from 'react'
import Button from '@/components/ui/Button'

const DashboardSectionHeader = ({ title, subtitle, button, buttonText, buttonIcon, onClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="font-serif text-xl text-[#0A2240]">{title}</h2>
        {subtitle && <p className="text-[#4A6A8A] mt-1 text-xs">{subtitle}</p>}
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
