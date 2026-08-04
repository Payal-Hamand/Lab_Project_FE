import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/pages/Footer'

const PublicLayout = ({ children }) => {
  return (
    <div className="bg-accent min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}

export default PublicLayout
