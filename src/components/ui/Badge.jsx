import React from 'react'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const statusStyles = {
  [BOOKING_STATUS.COMPLETED]: 'bg-green-100 text-green-700',
  [BOOKING_STATUS.PENDING]: 'bg-yellow-100 text-yellow-700',
  [BOOKING_STATUS.CANCELLED]: 'bg-red-100 text-red-700',
  [BOOKING_STATUS.RESCHEDULED]: 'bg-purple-100 text-purple-700',
  [BOOKING_STATUS.ASSIGNED]: 'bg-blue-100 text-blue-700',
  [BOOKING_STATUS.REACHED]: 'bg-blue-100 text-blue-700',
  [BOOKING_STATUS.SAMPLE_COLLECTED]: 'bg-purple-100 text-purple-700',
  [PAYMENT_STATUS.PAID]: 'bg-green-100 text-green-700',
  [PAYMENT_STATUS.UNPAID]: 'bg-red-100 text-red-700',
  [PAYMENT_STATUS.FAILED]: 'bg-red-100 text-red-700',
}

const Badge = ({ children, variant = 'default', status, className = '' }) => {
  const statusClass = status ? statusStyles[status] || 'bg-gray-100 text-gray-700' : ''

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-purple-100 text-purple-700',
  }

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold inline-block
        ${statusClass || variantStyles[variant] || variantStyles.default}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
