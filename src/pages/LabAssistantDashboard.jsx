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
  FaCheckCircle
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

      {/* Header */}

      <div className="bg-blue-950 py-16">

        <div className="max-w-7xl mx-auto px-6 text-white">

          <h1 className="text-5xl font-bold">

            Lab Assistant Dashboard

          </h1>

          <p className="mt-4 text-blue-100 text-lg">

            Manage reports & patient tests

          </p>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6">

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Tests
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {bookings.length}

                </h2>

              </div>

              <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl text-3xl">

                <FaVial />

              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Pending Reports
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    bookings.filter(
                      item =>
                        item.status === 'Pending'
                    ).length
                  }

                </h2>

              </div>

              <div className="bg-yellow-100 text-yellow-600 p-5 rounded-2xl text-3xl">

                <FaClipboardCheck />

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
                      item =>
                        item.status === 'Completed'
                    ).length
                  }

                </h2>

              </div>

              <div className="bg-green-100 text-green-600 p-5 rounded-2xl text-3xl">

                <FaCheckCircle />

              </div>

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-[35px] shadow-sm mt-12 p-8 overflow-x-auto">

          <h2 className="text-3xl font-bold text-blue-950 mb-8">

            Patient Bookings

          </h2>

          {
            loading ? (

              <div className="text-center py-20 text-3xl">

                Loading...

              </div>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-4">
                      Patient
                    </th>

                    <th className="text-left py-4">
                      Test
                    </th>

                    <th className="text-left py-4">
                      Date
                    </th>

                    <th className="text-left py-4">
                      Status
                    </th>

                    <th className="text-left py-4">
                      Upload Report
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    bookings.map((item) => (

                      <tr
                        key={item._id}
                        className="border-b"
                      >

                        {/* Patient */}

                        <td className="py-5">

                          <div className="flex items-center gap-3">

                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">

                              <FaUserInjured />

                            </div>

                            <div>

                              <h3 className="font-bold">

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

                        <td>

                          {item?.test?.title}

                        </td>

                        {/* Date */}

                        <td>

                          {item.bookingDate}

                        </td>

                        {/* Status */}

                        <td>

                          <span
                            className={`px-4 py-2 rounded-full text-sm
                            
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

                                <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-2xl">

                                  View Report

                                </button>

                              </a>

                            ) : (

                              <div className="flex items-center gap-3">

                                <input
                                  type="file"
                                  onChange={(e) =>
                                    setSelectedReport(
                                      {

    ...selectedReport,

    [item._id]:
      e.target.files[0]

  }
                                    )
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
            )
          }

        </div>

      </div>

    </div>
  )
}

export default LabAssistantDashboard