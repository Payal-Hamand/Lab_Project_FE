import React from 'react'

const Select = ({
  label,
  icon: Icon,
  error,
  children,
  className = '',
  containerClassName = '',
  name,
  id: idProp,
  ...props
}) => {
  const selectId =
    idProp ||
    (label ? `select-${(name || label || '').toLowerCase().replace(/\s+/g, '-')}` : undefined)
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={selectId}
          className="font-medium text-gray-700 text-sm md:text-base block mb-2"
        >
          {Icon ? (
            <span className="flex items-center gap-2">
              <Icon />
              {label}
            </span>
          ) : (
            label
          )}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        className={`
          w-full border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4
          outline-none focus:border-blue-500 text-sm md:text-base bg-white
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Select
