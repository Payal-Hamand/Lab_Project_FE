import React from 'react'
import Button from '@/components/ui/Button'

const DashboardSidePanel = ({ open, title, subtitle, children, onClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-tertiary/40 flex justify-end">
      <div className="bg-white w-full sm:w-[90%] md:max-w-2xl h-screen overflow-y-auto p-5 md:p-8 border-l border-border">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-border pb-5">
          <div>
            <h2 className="font-serif text-2xl text-foreground">{title}</h2>
            <p className="text-muted-foreground mt-1.5 text-xs">{subtitle}</p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-red-500 text-2xl leading-none"
          >
            ×
          </Button>
        </div>
        {/* BODY */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export default DashboardSidePanel
