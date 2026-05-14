import React from 'react'

import Navbar from '../components/Navbar'

import Packages from '../components/Packages'

const PackagesPage = () => {

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Header */}

      <div className="bg-blue-950 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1 className="text-5xl font-bold">

            Health Packages

          </h1>

          <p className="mt-5 text-lg text-blue-100">

            Explore complete health checkup packages

          </p>

        </div>

      </div>

      {/* Packages */}

      <Packages />

    </div>
  )
}

export default PackagesPage