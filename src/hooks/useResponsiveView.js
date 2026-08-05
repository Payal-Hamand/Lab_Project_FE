import { useState, useEffect } from 'react'

const useResponsiveView = () => {
  const [view, setView] = useState(() => (window.innerWidth < 768 ? 'card' : 'table'))

  useEffect(() => {
    const handleResize = () => {
      setView(window.innerWidth < 768 ? 'card' : 'table')
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [view, setView]
}

export default useResponsiveView
