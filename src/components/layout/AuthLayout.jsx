import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 sm:px-6 py-6 md:py-10">
      {children}
    </div>
  )
}

export default AuthLayout
