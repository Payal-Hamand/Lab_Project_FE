import React from 'react'

const Tooltip = ({ children, content, position = 'bottom', delay = 200 }) => {
  const [show, setShow] = React.useState(false)
  const [timeoutId, setTimeoutId] = React.useState(null)

  const handleMouseEnter = (e) => {
    e.stopPropagation()
    const id = setTimeout(() => setShow(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = (e) => {
    e.stopPropagation()
    clearTimeout(timeoutId)
    setShow(false)
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent',
  }

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && content && (
        <div className={`absolute z-50 pointer-events-none ${positionClasses[position]}`}>
          <div className="px-2.5 py-1.5 bg-foreground text-white text-xs font-medium rounded-md whitespace-nowrap shadow-md">
            {content}
          </div>
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  )
}

export default Tooltip
