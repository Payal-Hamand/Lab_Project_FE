import React from 'react'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const statusStyles = {
  [BOOKING_STATUS.COMPLETED]: 'bg-green-50 text-green-700',
  [BOOKING_STATUS.PENDING]: 'bg-[#EEF6FF] text-[#0C447C]',
  [BOOKING_STATUS.CANCELLED]: 'bg-red-100 text-red-700',
  [BOOKING_STATUS.RESCHEDULED]: 'bg-[#EEF6FF] text-[#0C447C]',
  [BOOKING_STATUS.ASSIGNED]: 'bg-[#EEF6FF] text-[#0C447C]',
  [BOOKING_STATUS.REACHED]: 'bg-[#E6F1FB] text-[#185FA5]',
  [BOOKING_STATUS.SAMPLE_COLLECTED]: 'bg-[#E6F1FB] text-[#185FA5]',
  [PAYMENT_STATUS.PAID]: 'bg-green-50 text-green-700',
  [PAYMENT_STATUS.UNPAID]: 'bg-red-100 text-red-700',
  [PAYMENT_STATUS.FAILED]: 'bg-red-100 text-red-700',
}

const Badge = ({ children, variant = 'default', status, className = '' }) => {
  const statusClass = status ? statusStyles[status] || 'bg-[#EEF6FF] text-[#4A6A8A]' : ''

  const variantStyles = {
    default: 'bg-[#EEF6FF] text-[#4A6A8A]',
    primary: 'bg-[#EEF6FF] text-[#0C447C]',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-[#FFF7ED] text-orange-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-[#E6F1FB] text-[#185FA5]',
  }

  return (
    <span
      className={`
        px-2.5 py-0.5 rounded-full text-[10px] font-semibold inline-block
        ${statusClass || variantStyles[variant] || variantStyles.default}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
