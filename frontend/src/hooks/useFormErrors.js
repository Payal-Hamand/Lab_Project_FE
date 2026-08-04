import { useState, useCallback } from 'react'

const useFormErrors = () => {
  const [errors, setErrors] = useState({})

  const validate = useCallback((rules) => {
    const nextErrors = {}
    Object.entries(rules).forEach(([key, rule]) => {
      const message = typeof rule === 'function' ? rule() : rule
      if (message) nextErrors[key] = message
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [])

  const onFieldChange = useCallback((fieldName, nextRules) => {
    const rule = nextRules?.[fieldName]
    const message = typeof rule === 'function' ? rule() : rule
    setErrors((prev) => {
      const next = { ...prev }
      if (message) next[fieldName] = message
      else delete next[fieldName]
      return next
    })
  }, [])

  return {
    errors,
    validate,
    onFieldChange,
  }
}

export default useFormErrors