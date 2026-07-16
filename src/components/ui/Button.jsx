import React from 'react'

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-orange-500 hover:bg-orange-600 text-white',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  'outline-danger': 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
  ghost: 'text-gray-600 hover:bg-gray-100',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-3 text-sm md:text-base rounded-xl md:rounded-2xl',
  lg: 'px-6 py-3 md:py-4 text-sm md:text-lg rounded-xl md:rounded-2xl',
  icon: 'p-3 rounded-xl',
  'icon-sm': 'p-2 rounded-lg',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        font-semibold transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
              fill="none"
            />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Please Wait...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
