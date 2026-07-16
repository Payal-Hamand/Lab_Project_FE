import React, { useEffect, useState } from 'react'
import { FaHeartbeat } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import API from '@/services/api'
import { ROUTES } from '@/constants/routes'
import { API_ENDPOINTS } from '@/constants/api'
const Packages = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchPackages = async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.PACKAGES)
      setPackages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPackages()
  }, [])
  const handleBookNow = (item, type = 'package') => {
    const userData = sessionStorage.getItem('user')
    const user = userData ? JSON.parse(userData) : null
    if (!user?.token) {
      navigate(ROUTES.LOGIN, {
        state: {
          message: 'Please login to continue booking',
          redirectTo: ROUTES.BOOKING,
          selectedItem: item,
          bookingType: type,
        },
      })
    } else {
      navigate(ROUTES.BOOKING, {
        state: {
          selectedItem: item,
          bookingType: type,
        },
      })
    }
  }
  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950">Explore Health Packages</h2>
          <div className="w-24 md:w-28 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>
        {/* Loading */}
        {loading ? (
          <div className="text-center text-xl md:text-2xl font-semibold">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {packages.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl md:rounded-[35px] overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 md:h-56 object-cover"
                />
                {/* Content */}
                <div className="p-5 md:p-8">
                  <div className="bg-blue-100 text-blue-600 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">
                    <FaHeartbeat />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-950 mt-5 md:mt-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-3 md:mt-4 leading-7 text-sm md:text-base">
                    {item.description}
                  </p>
                  {/* Tests */}
                  <div className="mt-5 md:mt-6">
                    <h4 className="font-bold text-base md:text-lg mb-3">Included Tests</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.testsIncluded?.length > 0 ? (
                        item.testsIncluded.map((test, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm"
                          >
                            {test?.title || 'Test'}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">No Tests Available</p>
                      )}
                    </div>
                  </div>
                  {/* Price */}
                  <div className="flex items-center justify-between gap-4 mt-6 md:mt-8">
                    <div>
                      <p className="text-gray-500 text-sm">Starting From</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">
                        ₹{item.price}
                      </h2>
                    </div>
                    <button
                      onClick={() => handleBookNow(item, 'package')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
export default Packages
