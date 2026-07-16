import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ open, onClose, title, subtitle, children, size = 'md', className = '' }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl',
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-3xl w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] overflow-y-auto ${className}`}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl">
            <div>
              {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
              {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-2xl text-gray-400 hover:text-red-500 transition"
              >
                <FaTimes />
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
