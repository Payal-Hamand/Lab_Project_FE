import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/pages/Footer'

const PublicLayout = ({ children }) => {
  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default PublicLayout
