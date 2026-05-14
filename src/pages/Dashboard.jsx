import React, {
  useEffect,
  useState,
  useContext
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import { AuthContext } from '../context/AuthContext'

import {
  FaUser,
  FaCalendarAlt,
  FaFileMedical,
  FaCheckCircle,
  FaClock,
  FaDownload
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const { user } = useContext(AuthContext)

  const [bookings, setBookings] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } = await API.get(
        '/bookings/my-bookings'
      )

      console.log(data)
      setBookings(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Header */}

      <div className="bg-blue-950 py-16">

        <div className="max-w-7xl mx-auto px-6 text-white">

          <h1 className="text-5xl font-bold">
            Patient Dashboard
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Welcome back, {user?.name}
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Bookings
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {bookings.length}
                </h2>

              </div>

              <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl text-3xl">
                <FaCalendarAlt />
              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {
                    bookings.filter(
                      item => item.status === 'Completed'
                    ).length
                  }
                </h2>

              </div>

              <div className="bg-green-100 text-green-600 p-5 rounded-2xl text-3xl">
                <FaCheckCircle />
              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Pending
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {
                    bookings.filter(
                      item => item.status === 'Pending'
                    ).length
                  }
                </h2>

              </div>

              <div className="bg-yellow-100 text-yellow-600 p-5 rounded-2xl text-3xl">
                <FaClock />
              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Reports
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {
                    bookings.filter(
                      item => item.report
                    ).length
                  }
                </h2>

              </div>

              <div className="bg-purple-100 text-purple-600 p-5 rounded-2xl text-3xl">
                <FaFileMedical />
              </div>

            </div>

          </div>

        </div>

        {/* Profile Section */}

        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-10">

          <div className="flex items-center gap-6">

            <div className="bg-blue-100 text-blue-600 p-8 rounded-full text-5xl">
              <FaUser />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-blue-950">
                {user?.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {user?.email}
              </p>

              <span className="inline-block mt-4 bg-blue-100 text-blue-600 px-5 py-2 rounded-full capitalize font-medium">
                {user?.role}
              </span>

            </div>

          </div>

        </div>

        {/* Booking Table */}

        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-8 overflow-x-auto">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-blue-950">
              My Bookings
            </h2>

            <Link to="/booking" className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl">
              Book New Test
            </Link>

          </div>

          {
            loading ? (

              <div className="text-center py-20 text-2xl">
                Loading...
              </div>

            ) : bookings.length === 0 ? (

              <div className="text-center py-20">

                <h2 className="text-3xl font-bold text-gray-400">
                  No Bookings Found
                </h2>

              </div>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-5">
                      Test
                    </th>

                    <th className="text-left py-5">
                      Date
                    </th>

                    <th className="text-left py-5">
                      Time
                    </th>

                    <th className="text-left py-5">
                      Status
                    </th>

                    <th className="text-left py-5">
                      Payment
                    </th>

                    <th className="text-left py-5">
                      Report
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    bookings.map((item) => (

                      <tr
                        key={item._id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="py-6">

                          <div>

                            <h3 className="font-bold">
                              {item?.test?.title}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                              {item?.patientName}
                            </p>

                          </div>

                        </td>

                        <td>
                          {item.bookingDate}
                        </td>

                        <td>
                          {item.bookingTime}
                        </td>

                        <td>

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium
                            
                            ${
                              item.status === 'Completed'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-yellow-100 text-yellow-600'
                            }
                            
                            `}
                          >

                            {item.status}

                          </span>

                        </td>

                        <td>

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium
                            
                            ${
                              item.paymentStatus === 'Paid'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-red-100 text-red-600'
                            }
                            
                            `}
                          >

                            {item.paymentStatus}

                          </span>

                        </td>

                        <td>

                          {
                            item.report ? (

                              <a
                               href={item.report}
                                target="_blank"
                                rel="noreferrer"
                              >

                                <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-xl flex items-center gap-2">

                                  <FaDownload />

                                  Download

                                </button>

                              </a>

                            ) : (

                              <span className="text-gray-400">
                                Not Available
                              </span>

                            )
                          }

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard