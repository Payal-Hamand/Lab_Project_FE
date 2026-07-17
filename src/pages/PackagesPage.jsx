import React from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import Packages from '@/components/Packages'

const PackagesPage = () => {
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl font-bold">Health Packages</h1>
          <p className="mt-5 text-lg text-blue-100">Explore complete health checkup packages</p>
        </div>
      </div>
      {/* Packages */}
      <Packages />
    </PublicLayout>
  )
}
export default PackagesPage
