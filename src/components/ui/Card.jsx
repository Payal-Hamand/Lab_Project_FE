import React from 'react'

const Card = ({ children, className = '', padding = true, hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-white rounded-[35px] shadow-sm
        ${hover ? 'hover:shadow-2xl transition duration-300' : ''}
        ${padding ? 'p-5 md:p-8' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
