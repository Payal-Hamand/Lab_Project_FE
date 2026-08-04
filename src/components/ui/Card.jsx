import React from 'react'

const Card = ({ children, className = '', padding = true, hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-white rounded-xl border border-border shadow-card
        ${hover ? 'hover:shadow-card-hover transition duration-300' : ''}
        ${padding ? 'p-5 md:p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
