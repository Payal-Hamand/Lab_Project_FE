import React, { useEffect, useRef, useCallback, useId } from 'react'
import { X } from 'lucide-react'

const Modal = ({ open, onClose, title, subtitle, children, size = 'md', className = '' }) => {
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)
  const generatedId = useId()
  const titleId = title ? `modal-title-${generatedId}` : undefined
  const subtitleId = subtitle ? `modal-subtitle-${generatedId}` : undefined

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement
      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable) focusable.focus()
        }
      }, 100)
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
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
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

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl',
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-3xl w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] overflow-y-auto ${className}`}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl">
            <div>
              {title && (
                <h2 id={titleId} className="text-xl font-bold text-gray-900">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p id={subtitleId} className="text-xs text-gray-500 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="text-2xl text-gray-400 hover:text-red-500 transition"
              >
                <X />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
