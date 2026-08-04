import React from 'react'
import Button from '@/components/ui/Button'

const DashboardStatsCard = ({ title, value, icon, active, onClick }) => {
  return (
    <Button
      variant="ghost"
      fullWidth
      onClick={onClick}
      className={`bg-card rounded-xl p-5 shadow-sm text-left transition border hover:shadow-md h-full
        ${active ? 'border-primary ring-1 ring-primary' : 'border-border'}
      `}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{title}</p>
          <h2 className="font-mono font-bold text-foreground text-3xl mt-2">
            {value}
          </h2>
        </div>
        <div
          className={`text-primary w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary`}
        >
          {icon}
        </div>
      </div>
    </Button>
  )
}

export default DashboardStatsCard
