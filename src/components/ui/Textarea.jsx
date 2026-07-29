import React from 'react'

const Textarea = ({
  label,
  error,
  rows = 4,
  className = '',
  containerClassName = '',
  name,
  id: idProp,
  ...props
}) => {
  const textareaId =
    idProp ||
    (label ? `textarea-${(name || label || '').toLowerCase().replace(/\s+/g, '-')}` : undefined)
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-[10px] text-[#4A6A8A] font-medium tracking-[0.3px] block mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        className={`
          w-full border border-[#C5DBF0] rounded-lg px-3 py-2.5
          outline-none focus:border-[#1A6FD4] text-xs text-[#4A6A8A] resize-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Textarea
