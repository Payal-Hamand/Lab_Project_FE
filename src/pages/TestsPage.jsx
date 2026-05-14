import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import { Link } from 'react-router-dom'

import {
  FaSearch,
  FaClock,
  FaFlask,
  FaArrowRight
} from 'react-icons/fa'

const TestsPage = () => {

  const [tests, setTests] = useState([])

  const [filteredTests, setFilteredTests] = useState([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  // Fetch Tests

  useEffect(() => {

    fetchTests()

  }, [])

  const fetchTests = async () => {

    try {

      const { data } = await API.get('/tests')

      setTests(data)

      setFilteredTests(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // Search

  const handleSearch = (e) => {

    const value = e.target.value

    setSearch(value)

    const filtered = tests.filter((item) =>

      item.title
        .toLowerCase()
        .includes(value.toLowerCase())

    )

    setFilteredTests(filtered)
  }

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Hero */}

      <div className="bg-blue-950 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1 className="text-5xl font-bold">

            Lab Tests

          </h1>

          <p className="mt-5 text-lg text-blue-100">

            Explore all diagnostic lab tests

          </p>

        </div>

      </div>

      {/* Search */}

      <div className="max-w-7xl mx-auto px-6 mt-10">

        <div className="bg-white rounded-3xl shadow-sm p-4 flex items-center">

          <FaSearch className="text-gray-400 text-xl ml-4" />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search tests..."
            className="w-full px-5 py-4 outline-none text-lg"
          />

        </div>

      </div>

      {/* Tests */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        {
          loading ? (

            <div className="text-center text-3xl font-bold">

              Loading...

            </div>

          ) : filteredTests.length === 0 ? (

            <div className="text-center text-3xl font-bold text-gray-400">

              No Tests Found

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                filteredTests.map((item) => (

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

                      {/* Category */}

                      <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">

                        {item.category}

                      </div>

                      {/* Title */}

                      <h2 className="text-2xl font-bold text-blue-950 mt-5">

                        {item.title}

                      </h2>

                      {/* Description */}

                      <p className="text-gray-500 leading-7 mt-4">

                        {item.description}

                      </p>

                      {/* Info */}

                      <div className="flex items-center justify-between mt-8">

                        <div className="flex items-center gap-2 text-gray-600">

                          <FaClock />

                          {item.reportTime}

                        </div>

                        <div className="flex items-center gap-2 text-blue-600">

                          <FaFlask />

                          Lab Certified

                        </div>

                      </div>

                      {/* Bottom */}

                      <div className="flex items-center justify-between mt-10">

                        <div>

                          <p className="text-gray-500">
                            Price
                          </p>

                          <h2 className="text-3xl font-bold text-blue-600">

                            ₹{item.price}

                          </h2>

                        </div>

                        <Link
                          to="/booking"
                        >

                          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl flex items-center gap-2">

                            Book

                            <FaArrowRight />

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

    </div>
  )
}

export default TestsPage