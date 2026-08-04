import { useEffect, useRef } from 'react'

const useClickOutside = (handler, enabled = true) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, enabled])

  return ref
}

export default useClickOutside
