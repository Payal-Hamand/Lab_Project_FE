import React from 'react'
import AppRoutes from '@/routes/AppRoutes'
import QueryProvider from '@/context/QueryProvider'
const App = () => {
  return (
    <QueryProvider>
      <div>
        <AppRoutes />
      </div>
    </QueryProvider>
  )
}
export default App
