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
  required = false,
  value,
  defaultValue,
  onChange,
  ...props
}) => {
  const generatedId = React.useId()
  const selectId = idProp || (name ? `select-${name}` : generatedId)
  const placeholderOption = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.value === ''
  )
  const floatingLabel = label || placeholderOption?.props.children

  return (
    <div className={containerClassName}>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            <Icon size={16} />
          </span>
        )}
        <select
          id={selectId}
          name={name}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`
            peer w-full border border-border rounded-lg px-4 py-3
            outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-foreground bg-card transition
            ${floatingLabel ? 'pt-4 pb-2' : ''}
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        {floatingLabel && (
          <label
            htmlFor={selectId}
            className={`
              pointer-events-none absolute z-10 bg-card px-1 text-xs transition-all
              ${Icon ? 'left-9' : 'left-3'}
              top-0 -translate-y-1/2 text-muted-foreground peer-focus:text-primary
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

export default Select
