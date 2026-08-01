import React from 'react'

const Textarea = ({
  label,
  error,
  rows = 4,
  className = '',
  containerClassName = '',
  name,
  id: idProp,
  placeholder,
  required = false,
  ...props
}) => {
  const generatedId = React.useId()
  const textareaId = idProp || (name ? `textarea-${name}` : generatedId)
  const floatingLabel = label || placeholder
  const hasFloatingLabel = Boolean(floatingLabel)

  return (
    <div className={containerClassName}>
      <div className="relative">
        <textarea
          id={textareaId}
          name={name}
          rows={rows}
          required={required}
          placeholder={hasFloatingLabel ? ' ' : placeholder}
          className={`
            peer w-full border border-border rounded-lg px-3 py-2.5
            outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs text-foreground bg-card resize-none transition
            ${hasFloatingLabel ? 'pt-4' : ''}
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''}
            ${className}
          `}
          {...props}
        />
        {hasFloatingLabel && (
          <label
            htmlFor={textareaId}
            className={`
              pointer-events-none absolute left-2.5 top-3 z-10 bg-card px-1 text-xs text-muted-foreground transition-all
              peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-primary
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2
              ${error ? 'text-destructive peer-focus:text-destructive' : ''}
            `}
          >
            {floatingLabel}
            {required && <span className="ml-0.5">*</span>}
          </label>
        )}
      </div>
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Textarea
