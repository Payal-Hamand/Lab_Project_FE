import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaVial,
  FaClipboardCheck,
  FaUpload,
  FaUserInjured,
  FaCheckCircle,
  FaFlask,
  FaClipboardList,
  
} from 'react-icons/fa'

const LabAssistantDashboard = () => {

  const [bookings, setBookings] = useState([])

  const [loading, setLoading] = useState(true)

  const [selectedReport, setSelectedReport] =
  useState({})

  // Fetch Bookings

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } = await API.get(
        '/bookings/all'
      )

      setBookings(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // Upload Report

  const handleUploadReport = async (
    bookingId
  ) => {

    if (!selectedReport[bookingId]) {

      return alert(
        'Please Select Report File'
      )
    }

    try {

     const formData = new FormData()

formData.append(
  'report',
  selectedReport[bookingId]
)

await API.put(

  `/bookings/upload-report/${bookingId}`,

  formData,

  {
    headers: {

      'Content-Type':
        'multipart/form-data'
    }
  }
)
        

      alert('Report Uploaded')

      fetchBookings()

    } catch (error) {

      alert(
        error.response?.data?.message
      )
    }
  }

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />
      {/* Dashboard Hero */}

<div className="bg-blue-950">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16 text-white">

    <div className="flex flex-col gap-4">

      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full w-fit text-xs sm:text-sm">

        <div className="w-2 h-2 rounded-full bg-green-400"></div>

        Lab Management System

      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">

        Lab Assistant Dashboard

      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl leading-7">

        Manage patient reports, upload medical files,
        track bookings and monitor laboratory operations
        efficiently.

      </p>

    </div>

  </div>

</div>

{/* Main */}

<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">


{/* Stats Cards */}

<div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-8">

  {/* Total Tests */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Total Tests

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-blue-950">

          {bookings.length}

        </h2>

      </div>

      <div className="bg-blue-100 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaFlask />

      </div>

    </div>
  </div>

  {/* Pending */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Pending Reports

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-yellow-600">

          {
            bookings.filter(
              (item) =>
                item.status === 'Pending'
            ).length
          }

        </h2>

      </div>

      <div className="bg-yellow-100 text-yellow-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaClipboardList />

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
              (item) =>
                item.status === 'Completed'
            ).length
          }

        </h2>

      </div>

      <div className="bg-green-100 text-green-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaCheckCircle />

      </div>

    </div>
  </div>

</div>

        {/* Patient Booking Section */}

<div className="bg-white rounded-[35px] shadow-sm mt-12 p-4 md:p-8">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

    <div>

      <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

        Patient Bookings

      </h2>

      <p className="text-gray-500 mt-2">

        Manage patient reports & uploads

      </p>

    </div>

    <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl font-semibold w-fit">

      Total:
      {' '}
      {bookings.length}

    </div>

  </div>

  {
    loading ? (

      <div className="text-center py-20 text-2xl md:text-3xl font-semibold text-blue-950">

        Loading...

      </div>

    ) : (

      <>

        {/* Desktop Table */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-gray-600">

                <th className="text-left py-5">
                  Patient
                </th>

                <th className="text-left py-5">
                  Test
                </th>

                <th className="text-left py-5">
                  Date
                </th>

                <th className="text-left py-5">
                  Status
                </th>

                <th className="text-left py-5">
                  Upload Report
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

                    {/* Patient */}

                    <td className="py-6">

                      <div className="flex items-center gap-4">

                        <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl text-xl">

                          <FaUserInjured />

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">

                            {item.patientName}

                          </h3>

                          <p className="text-sm text-gray-500">

                            {item.gender},
                            {' '}
                            {item.age}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Test */}

                    <td className="font-medium">

                      {item?.test?.title}

                    </td>

                    {/* Date */}

                    <td>

                      {item.bookingDate}

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

                    {/* Upload */}

                    <td>

                      {
                        item.report ? (

                          <a
                            href={item.report}
                            target="_blank"
                            rel="noreferrer"
                          >

                            <button className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-3 rounded-2xl">

                              View Report

                            </button>

                          </a>

                        ) : (

                          <div className="flex items-center gap-3">

                            <input
                              type="file"
                              onChange={(e) =>
                                setSelectedReport({

                                  ...selectedReport,

                                  [item._id]:
                                    e.target.files[0]

                                })
                              }
                              className="border rounded-xl p-2"
                            />

                            <button
                              onClick={() =>
                                handleUploadReport(
                                  item._id
                                )
                              }
                              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl flex items-center gap-2"
                            >

                              <FaUpload />

                              Upload

                            </button>

                          </div>

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

        <div className="lg:hidden space-y-5">

          {
            bookings.map((item) => (

              <div
                key={item._id}
                className="border rounded-3xl p-5 bg-[#f8fbff] shadow-sm"
              >

                {/* Top */}

                <div className="flex items-center gap-4">

                  <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl text-xl">

                    <FaUserInjured />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">

                      {item.patientName}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {item.gender},
                      {' '}
                      {item.age}

                    </p>

                  </div>

                </div>

                {/* Details */}

                <div className="mt-5 space-y-4">

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Test
                    </span>

                    <span className="font-semibold text-right">

                      {item?.test?.title}

                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Date
                    </span>

                    <span className="font-medium">

                      {item.bookingDate}

                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                      Status
                    </span>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium

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

                  </div>

                </div>

                {/* Upload Section */}

                <div className="mt-6">

                  {
                    item.report ? (

                      <a
                        href={item.report}
                        target="_blank"
                        rel="noreferrer"
                      >

                        <button className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-2xl font-medium">

                          View Report

                        </button>

                      </a>

                    ) : (

                      <div className="space-y-4">

                        <input
                          type="file"
                          onChange={(e) =>
                            setSelectedReport({

                              ...selectedReport,

                              [item._id]:
                                e.target.files[0]

                            })
                          }
                          className="w-full border rounded-xl p-3 bg-white"
                        />

                        <button
                          onClick={() =>
                            handleUploadReport(
                              item._id
                            )
                          }
                          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-medium"
                        >

                          <FaUpload />

                          Upload Report

                        </button>

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

export default LabAssistantDashboard