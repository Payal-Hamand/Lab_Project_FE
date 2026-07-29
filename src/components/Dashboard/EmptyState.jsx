import React from 'react'

const EmptyState = ({ text, icon: Icon }) => {
  return (
    <div className="bg-primary/10 border border-border rounded-xl py-14 flex flex-col items-center justify-center text-center text-muted-foreground text-xs mt-6">
      {Icon && <Icon size={48} strokeWidth={1} className="text-border mb-3" />}
      {text}
    </div>
  )
}

export default EmptyState
