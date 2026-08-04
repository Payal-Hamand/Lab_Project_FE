import React, { useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'

const DashboardSidePanel = ({ open, title, subtitle, children, onClose }) => {
  const panelRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement
    } else {
      document.body.style.overflow = 'auto'
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus()
      }
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/20 flex justify-end"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="bg-white w-full sm:w-[90%] md:max-w-2xl h-full sm:h-screen flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-border px-4 sm:px-5 md:px-8 py-4 sm:py-5 shrink-0">
          <div className="min-w-0">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground truncate">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1 sm:mt-1.5 text-[11px] sm:text-xs truncate">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="text-muted-foreground hover:text-foreground transition p-1 shrink-0 ml-3"
          >
            <X size={20} />
          </button>
        </div>
        {/* BODY */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 md:px-8 py-5 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardSidePanel
