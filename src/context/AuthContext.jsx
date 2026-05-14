import { createContext, useEffect, useState } from 'react'
import React from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setLoading(false)

  }, [])

  const login = (data) => {

    setUser(data)

    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {

    setUser(null)

    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}