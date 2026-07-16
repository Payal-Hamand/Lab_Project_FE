import React from 'react'

const Input = ({ label, icon: Icon, error, className = '', containerClassName = '', ...props }) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="font-medium text-gray-700 text-sm md:text-base block mb-2">
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
      <div className="relative">
        {Icon && !label && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon />
          </span>
        )}
        <input
          className={`
            w-full border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4
            outline-none focus:border-blue-500 text-sm md:text-base
            ${Icon && !label ? 'pl-11' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
