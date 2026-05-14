// import React from 'react'
// import { FaSearch, FaShieldAlt, FaTruck, FaClock } from 'react-icons/fa'

// const Hero = () => {
//   return (
//     <section className="bg-[#f4f8ff] overflow-hidden">

//       <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

//         {/* Left Content */}

//         <div>

//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
//             <FaShieldAlt />
//             India's Most Trusted Lab
//           </div>

//           <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-blue-950">
//             Trusted Lab Tests <br />
//             for a <span className="text-blue-600">Healthier You</span>
//           </h1>

//           <p className="text-gray-600 text-lg mt-6 leading-8">
//             Book lab tests online with ease and get accurate reports
//             from certified labs with home sample collection.
//           </p>

//           {/* Features */}

//           <div className="flex flex-wrap gap-6 mt-8 text-blue-700 font-medium">

//             <div className="flex items-center gap-2">
//               <FaShieldAlt />
//               Accurate Reports
//             </div>

//             <div className="flex items-center gap-2">
//               <FaTruck />
//               Home Collection
//             </div>

//             <div className="flex items-center gap-2">
//               <FaClock />
//               Fast Delivery
//             </div>

//           </div>

//           {/* Search Bar */}

//           <div className="bg-white p-2 rounded-2xl shadow-lg mt-10 flex items-center">

//             <div className="flex items-center flex-1 px-4">
//               <FaSearch className="text-gray-400" />

//               <input
//                 type="text"
//                 placeholder="Search tests like CBC, Thyroid, Vitamin D..."
//                 className="w-full px-4 py-3 outline-none"
//               />
//             </div>

//             <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-semibold">
//               Search Tests
//             </button>

//           </div>

//           {/* Popular */}

//           <div className="mt-6 flex flex-wrap gap-4 items-center">

//             <p className="text-gray-500 font-medium">
//               Popular Searches:
//             </p>

//             <span className="text-blue-600 cursor-pointer">
//               CBC
//             </span>

//             <span className="text-blue-600 cursor-pointer">
//               Thyroid
//             </span>

//             <span className="text-blue-600 cursor-pointer">
//               Vitamin D
//             </span>

//             <span className="text-blue-600 cursor-pointer">
//               Diabetes
//             </span>

//           </div>

//         </div>

//         {/* Right Image */}

//         <div className="relative">

//           <img
//             src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
//             alt="Lab"
//             className="rounded-[40px] shadow-2xl"
//           />

//           {/* Offer Card */}

//           <div className="absolute top-10 -right-4 bg-white shadow-2xl rounded-3xl p-6 w-[280px] hidden lg:block">

//             <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">
//               %
//             </div>

//             <h3 className="text-center text-2xl font-bold mt-6 text-blue-950">
//               Get 20% OFF
//             </h3>

//             <p className="text-center text-gray-500 mt-2">
//               on all lab tests
//             </p>

//             <div className="border border-dashed border-blue-300 rounded-xl p-3 mt-5 text-center text-blue-600 font-bold">
//               MEDILAB20
//             </div>

//             <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-xl mt-5 font-semibold">
//               Book Now
//             </button>

//           </div>

//         </div>

//       </div>

//     </section>
//   )
// }

// export default Hero


import React, { useContext, useState } from 'react'

import {
  FaSearch,
  FaShieldAlt,
  FaTruck,
  FaClock
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Hero = () => {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [search, setSearch] = useState('')

  // Handle Booking Flow

  const handleBookNow = () => {

    // If user not logged in

    if (!user) {

      navigate('/login')

      return
    }

    // If logged in

    navigate('/booking')
  }

  // Handle Search

  const handleSearch = () => {

    if (!user) {

      navigate('/login')

      return
    }

    navigate('/booking')
  }

  return (

    <section className="bg-[#f4f8ff] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}

        <div>

          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">

            <FaShieldAlt />

            India's Most Trusted Lab

          </div>

          {/* Heading */}

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-blue-950">

            Trusted Lab Tests <br />

            for a <span className="text-blue-600">
              Healthier You
            </span>

          </h1>

          {/* Paragraph */}

          <p className="text-gray-600 text-lg mt-6 leading-8">

            Book lab tests online with ease and get accurate reports
            from certified labs with home sample collection.

          </p>

          {/* Features */}

          <div className="flex flex-wrap gap-6 mt-8 text-blue-700 font-medium">

            <div className="flex items-center gap-2">

              <FaShieldAlt />

              Accurate Reports

            </div>

            <div className="flex items-center gap-2">

              <FaTruck />

              Home Collection

            </div>

            <div className="flex items-center gap-2">

              <FaClock />

              Fast Delivery

            </div>

          </div>

          {/* Search */}

          <div className="bg-white p-2 rounded-2xl shadow-lg mt-10 flex items-center">

            <div className="flex items-center flex-1 px-4">

              <FaSearch className="text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tests like CBC, Thyroid, Vitamin D..."
                className="w-full px-4 py-3 outline-none"
              />

            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-semibold"
            >

              Search Tests

            </button>

          </div>

          {/* Popular Searches */}

          <div className="mt-6 flex flex-wrap gap-4 items-center">

            <p className="text-gray-500 font-medium">
              Popular Searches:
            </p>

            <span className="text-blue-600 cursor-pointer">
              CBC
            </span>

            <span className="text-blue-600 cursor-pointer">
              Thyroid
            </span>

            <span className="text-blue-600 cursor-pointer">
              Vitamin D
            </span>

            <span className="text-blue-600 cursor-pointer">
              Diabetes
            </span>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="rounded-[40px] shadow-2xl"
          />

          {/* Offer Card */}

          <div className="absolute top-10 -right-4 bg-white shadow-2xl rounded-3xl p-6 w-[280px] hidden lg:block">

            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">

              %

            </div>

            <h3 className="text-center text-2xl font-bold mt-6 text-blue-950">

              Get 20% OFF

            </h3>

            <p className="text-center text-gray-500 mt-2">

              on all lab tests

            </p>

            <div className="border border-dashed border-blue-300 rounded-xl p-3 mt-5 text-center text-blue-600 font-bold">

              MEDILAB20

            </div>

            <button
              onClick={handleBookNow}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-xl mt-5 font-semibold"
            >

              Book Now

            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero