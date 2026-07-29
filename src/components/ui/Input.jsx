import React from 'react'

const Input = ({
  label,
  icon: Icon,
  error,
  className = '',
  containerClassName = '',
  name,
  id: idProp,
  ...props
}) => {
  const inputId =
    idProp ||
    (label ? `input-${(name || label || '').toLowerCase().replace(/\s+/g, '-')}` : undefined)
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
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
      <div className="relative">
        {Icon && !label && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon size={16} />
          </span>
        )}
        <input
          id={inputId}
          name={name}
          className={`
            w-full border border-border rounded-lg px-4 py-3
            outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-foreground bg-card placeholder:text-muted-foreground/60 transition
            ${Icon && !label ? 'pl-10' : ''}
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-destructive text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  )
}

export default Input
