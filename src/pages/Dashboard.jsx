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

     {/* Header */}

<div className="bg-blue-950">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">

    <div className="flex flex-col gap-4">

      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full w-fit text-xs sm:text-sm">

        <div className="w-2 h-2 rounded-full bg-green-400"></div>

        Patient Management Portal

      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">

        Patient Dashboard

      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-blue-100 leading-7">

        Welcome back,
        {' '}
        <span className="font-semibold">
          {user?.name}
        </span>

      </p>

    </div>

  </div>

</div>

{/* Main Content */}

<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
     

        {/* Top Stats */}

<div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

  {/* Total */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Total Bookings

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-blue-950">

          {bookings.length}

        </h2>

      </div>

      <div className="bg-blue-100 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaCalendarAlt />

      </div>

    </div>

  </div>

  {/* Completed */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Completed

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-green-600">

          {
            bookings.filter(
              item =>
                item.status ===
                'Completed'
            ).length
          }

        </h2>

      </div>

      <div className="bg-green-100 text-green-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaCheckCircle />

      </div>

    </div>

  </div>

  {/* Pending */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Pending

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-yellow-600">

          {
            bookings.filter(
              item =>
                item.status ===
                'Pending'
            ).length
          }

        </h2>

      </div>

      <div className="bg-yellow-100 text-yellow-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaClock />

      </div>

    </div>

  </div>

  {/* Reports */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Reports

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-purple-600">

          {
            bookings.filter(
              item =>
                item.report
            ).length
          }

        </h2>

      </div>

      <div className="bg-purple-100 text-purple-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaFileMedical />

      </div>

    </div>

  </div>

</div>

        {/* Profile Section */}
{/* Profile Section */}

<div className="bg-white rounded-2xl md:rounded-[35px] shadow-sm mt-6 md:mt-10 p-4 md:p-8 border border-gray-100">

  <div className="flex items-center gap-4 md:gap-6">

    {/* Avatar */}

    <div className="bg-blue-100 text-blue-600 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-full flex items-center justify-center text-2xl md:text-4xl shrink-0">

      <FaUser />

    </div>

    {/* Info */}

    <div className="flex-1 min-w-0">

      <h2 className="text-xl md:text-3xl font-bold text-blue-950 truncate">

        {user?.name}

      </h2>

      <p className="text-gray-500 mt-1 text-xs md:text-base break-all">

        {user?.email}

      </p>

      {/* Badges */}

      <div className="flex flex-wrap gap-2 mt-4">

        <span className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full capitalize font-medium text-xs md:text-sm">

          {user?.role}

        </span>

        <span className="bg-green-100 text-green-600 px-3 py-1.5 rounded-full font-medium text-xs md:text-sm">

          Active

        </span>

      </div>

    </div>

  </div>

</div>

        {/* Booking Table */}

       {/* Booking Section */}

<div className="bg-white rounded-2xl md:rounded-[35px] shadow-sm mt-8 md:mt-10 p-4 md:p-8 border border-gray-100">

  {/* Top */}

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

    <div>

      <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

        My Bookings

      </h2>

      <p className="text-gray-500 mt-2 text-sm md:text-base">

        View all your booked tests & reports

      </p>

    </div>

    <Link
      to="/booking"
      className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 md:px-6 py-3 rounded-2xl text-sm md:text-base font-medium text-center"
    >

      Book New Test

    </Link>

  </div>

  {
    loading ? (

      <div className="text-center py-20 text-xl md:text-2xl font-semibold text-blue-950">

        Loading...

      </div>

    ) : bookings.length === 0 ? (

      <div className="text-center py-20">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-400">

          No Bookings Found

        </h2>

      </div>

    ) : (

      <>

        {/* Desktop Table */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-gray-600">

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
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* Test */}

                    <td className="py-6">

                      <div>

                        <h3 className="font-bold text-blue-950">

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

                    {/* Status */}

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium

                        ${
                          item.status ===
                          'Completed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }
                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                    {/* Payment */}

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium

                        ${
                          item.paymentStatus ===
                          'Paid'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-red-100 text-red-600'
                        }
                        `}
                      >

                        {item.paymentStatus}

                      </span>

                    </td>

                    {/* Report */}

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

        </div>

        {/* Mobile Cards */}

        <div className="lg:hidden space-y-4">

          {
            bookings.map((item) => (

              <div
                key={item._id}
                className="border border-gray-100 rounded-2xl p-4 shadow-sm"
              >

                {/* Top */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-blue-950 text-[16px] leading-6">

                      {item?.test?.title}

                    </h3>

                    <p className="text-sm text-gray-500 mt-1">

                      {item?.patientName}

                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap

                    ${
                      item.status ===
                      'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                    `}
                  >

                    {item.status}

                  </span>

                </div>

                {/* Info */}

                <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

                  <div>

                    <p className="text-gray-500">
                      Date
                    </p>

                    <p className="font-medium mt-1">

                      {item.bookingDate}

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Time
                    </p>

                    <p className="font-medium mt-1">

                      {item.bookingTime}

                    </p>

                  </div>

                </div>

                {/* Payment */}

                <div className="mt-5">

                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium

                    ${
                      item.paymentStatus ===
                      'Paid'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-red-100 text-red-600'
                    }
                    `}
                  >

                    {item.paymentStatus}

                  </span>

                </div>

                {/* Report */}

                <div className="mt-5">

                  {
                    item.report ? (

                      <a
                        href={item.report}
                        target="_blank"
                        rel="noreferrer"
                      >

                        <button className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">

                          <FaDownload />

                          Download Report

                        </button>

                      </a>

                    ) : (

                      <div className="text-sm text-gray-400">

                        Report Not Available

                      </div>

                    )
                  }

                </div>

              </div>
            ))
          }

        </div>

      </>
    )
  }

</div>

      </div>

    </div>
  )
}

export default Dashboard