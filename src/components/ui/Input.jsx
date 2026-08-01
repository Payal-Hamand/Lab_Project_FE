import React from 'react'

const Input = ({
  label,
  icon: Icon,
  error,
  className = '',
  containerClassName = '',
  name,
  id: idProp,
  placeholder,
  required = false,
  type,
  ...props
}) => {
  const generatedId = React.useId()
  const inputId = idProp || (name ? `input-${name}` : generatedId)
  const floatingLabel = label || placeholder
  const hasFloatingLabel = Boolean(floatingLabel)
  const isDateField = type === 'date'

  return (
    <div className={containerClassName}>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            <Icon size={16} />
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          required={required}
          placeholder={hasFloatingLabel ? ' ' : placeholder}
          className={`
            peer w-full border border-border rounded-lg px-4 py-3
            outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-foreground bg-card transition
            ${hasFloatingLabel ? 'pt-4 pb-2' : ''}
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''}
            ${className}
          `}
          {...props}
        />
        {hasFloatingLabel && (
          <label
            htmlFor={inputId}
            className={`
              pointer-events-none absolute z-10 bg-card px-1 text-xs text-muted-foreground transition-all
              ${Icon ? 'left-9' : 'left-3'}
              ${isDateField ? 'top-0 -translate-y-1/2 text-primary' : 'top-1/2 -translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2'}
              ${error ? 'text-destructive peer-focus:text-destructive' : ''}
            `}
          >
            {floatingLabel}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </label>
        )}
      </div>
      {error && <p className="text-destructive text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  )
}

export default Input
