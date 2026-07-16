import React from 'react'

const Textarea = ({
  label,
  error,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="font-medium text-gray-700 text-sm md:text-base block mb-2">{label}</label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4
          outline-none focus:border-blue-500 text-sm md:text-base resize-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Textarea
