import React from 'react'
import { Table as TableIcon, LayoutGrid } from 'lucide-react'

const ViewToggle = ({ view, onChange, className = '' }) => {
  const options = [
    { key: 'table', label: 'Table', icon: <TableIcon size={14} /> },
    { key: 'card', label: 'Card', icon: <LayoutGrid size={14} /> },
  ]

  return (
    <div
      className={`inline-flex items-center bg-accent rounded-lg p-1 gap-1 ${className}`}
      role="tablist"
      aria-label="Toggle view"
    >
      {options.map((option) => {
        const isActive = view === option.key
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              isActive
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default ViewToggle
