import React, {
  useEffect,
  useState
} from 'react'

import {
  FaHeartbeat
} from 'react-icons/fa'

import { Link } from 'react-router-dom'

import API from '../services/api'

const Packages = () => {

  const [packages, setPackages] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchPackages()

  }, [])

  const fetchPackages = async () => {

    try {

      const { data } = await API.get(
        '/packages'
      )
      console.log(data)

      setPackages(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <section className="py-20 bg-[#f4f8ff]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-blue-950">

            Explore Health Packages

          </h2>

          <div className="w-28 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>

        </div>

        {/* Loading */}

        {
          loading ? (

            <div className="text-center text-2xl">
              Loading...
            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                packages.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-[35px] overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
                  >

                    {/* Image */}

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />

                    {/* Content */}

                    <div className="p-8">

                      <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl">

                        <FaHeartbeat />

                      </div>

                      <h3 className="text-2xl font-bold text-blue-950 mt-6">

                        {item.title}

                      </h3>

                      <p className="text-gray-500 mt-4 leading-7">

                        {item.description}

                      </p>

                      {/* Tests */}

                      <div className="mt-6">

                        <h4 className="font-bold text-lg mb-3">

                          Included Tests

                        </h4>

                        <div className="flex flex-wrap gap-2">

                          {
                            item.testsIncluded.map(
                              (test, index) => (

                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                >

                                  {test}

                                </span>
                              ))
                          }

                        </div>

                      </div>

                      {/* Price */}

                      <div className="flex items-center justify-between mt-8">

                        <div>

                          <p className="text-gray-500">
                            Starting From
                          </p>

                          <h2 className="text-3xl font-bold text-blue-600">

                            ₹{item.price}

                          </h2>

                        </div>

                        <Link to="/booking">

                          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl">

                            Book Now

                          </button>

                        </Link>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </section>
  )
}

export default Packages