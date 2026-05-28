import React, {
  createContext,
  useEffect,
  useState
} from 'react'

export const AuthContext =
  createContext()

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  // Restore User

  useEffect(() => {

    try {

      const savedUser =
        sessionStorage.getItem(
          'user'
        )

      if (savedUser) {

        const parsedUser =
          JSON.parse(savedUser)

        if (
          parsedUser?.token
        ) {

          setUser(parsedUser)

        } else {

          sessionStorage.removeItem(
            'user'
          )
        }
      }

    } catch (error) {

      console.log(error)

      sessionStorage.removeItem(
        'user'
      )
    }

    setLoading(false)

  }, [])

  // Login

  const login = (data) => {

    setUser(data)

    sessionStorage.setItem(

      'user',

      JSON.stringify(data)
    )
  }

  // Logout

  const logout = () => {

    setUser(null)

    sessionStorage.removeItem(
      'user'
    )
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