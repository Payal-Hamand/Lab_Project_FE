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
          className="text-xs text-foreground font-semibold tracking-wide block mb-2"
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
          w-full border border-border rounded-lg px-4 py-3
          outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-foreground bg-card transition
          ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-destructive text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  )
}

export default Select
