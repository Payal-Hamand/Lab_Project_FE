import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFileMedical,
  FaCalendarAlt,
  FaUser,
  FaDownload
} from 'react-icons/fa'

const VerifyReport = () => {

  const [reportId, setReportId] = useState('')

  const [loading, setLoading] = useState(false)

  const [reportData, setReportData] = useState(null)

  const [error, setError] = useState('')

  // Verify Report

  const handleVerify = async () => {

    if (!reportId) {

      return alert('Please Enter Report ID')
    }

    try {

      setLoading(true)

      setError('')

      setReportData(null)

      const { data } = await API.get(
        `/reports/verify/${reportId}`
      )

      setReportData(data)

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Invalid Report'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Hero */}

      <div className="bg-blue-950 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1 className="text-5xl font-bold">

            Verify Medical Report

          </h1>

          <p className="mt-5 text-lg text-blue-100">

            Verify authenticity of patient reports

          </p>

        </div>

      </div>

      {/* Search Section */}

      <div className="max-w-4xl mx-auto px-6 py-14">

        <div className="bg-white rounded-[35px] shadow-sm p-10">

          {/* Search */}

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex items-center flex-1 border rounded-2xl px-5">

              <FaSearch className="text-gray-400" />

              <input
                type="text"
                value={reportId}
                onChange={(e) =>
                  setReportId(e.target.value)
                }
                placeholder="Enter Report ID"
                className="w-full px-4 py-5 outline-none"
              />

            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-5 rounded-2xl font-semibold"
            >

              {
                loading
                  ? 'Verifying...'
                  : 'Verify Report'
              }

            </button>

          </div>

          {/* Error */}

          {
            error && (

              <div className="bg-red-100 text-red-600 rounded-2xl p-6 mt-10 flex items-center gap-4">

                <FaTimesCircle className="text-3xl" />

                <div>

                  <h2 className="text-xl font-bold">

                    Invalid Report

                  </h2>

                  <p className="mt-1">
                    {error}
                  </p>

                </div>

              </div>
            )
          }

          {/* Success */}

          {
            reportData?.verified && (

              <div className="mt-10">

                {/* Verified Banner */}

                <div className="bg-green-100 text-green-700 rounded-2xl p-6 flex items-center gap-4">

                  <FaCheckCircle className="text-4xl" />

                  <div>

                    <h2 className="text-2xl font-bold">

                      Verified Report

                    </h2>

                    <p className="mt-1">

                      This medical report is authentic.

                    </p>

                  </div>

                </div>

                {/* Details */}

                <div className="grid md:grid-cols-2 gap-8 mt-10">

                  {/* Card */}

                  <div className="bg-[#f8fbff] rounded-3xl p-8">

                    <div className="flex items-center gap-4">

                      <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl text-3xl">

                        <FaUser />

                      </div>

                      <div>

                        <p className="text-gray-500">

                          Patient Name

                        </p>

                        <h2 className="text-2xl font-bold text-blue-950">

                          {reportData.patientName}

                        </h2>

                      </div>

                    </div>

                  </div>

                  {/* Card */}

                  <div className="bg-[#f8fbff] rounded-3xl p-8">

                    <div className="flex items-center gap-4">

                      <div className="bg-purple-100 text-purple-600 p-5 rounded-2xl text-3xl">

                        <FaFileMedical />

                      </div>

                      <div>

                        <p className="text-gray-500">

                          Test Name

                        </p>

                        <h2 className="text-2xl font-bold text-blue-950">

                          {reportData.testName}

                        </h2>

                      </div>

                    </div>

                  </div>

                  {/* Card */}

                  <div className="bg-[#f8fbff] rounded-3xl p-8">

                    <div className="flex items-center gap-4">

                      <div className="bg-yellow-100 text-yellow-600 p-5 rounded-2xl text-3xl">

                        <FaCalendarAlt />

                      </div>

                      <div>

                        <p className="text-gray-500">

                          Booking Date

                        </p>

                        <h2 className="text-2xl font-bold text-blue-950">

                          {reportData.bookingDate}

                        </h2>

                      </div>

                    </div>

                  </div>

                  {/* Card */}

                  <div className="bg-[#f8fbff] rounded-3xl p-8">

                    <div className="flex items-center gap-4">

                      <div className="bg-green-100 text-green-600 p-5 rounded-2xl text-3xl">

                        <FaCheckCircle />

                      </div>

                      <div>

                        <p className="text-gray-500">

                          Status

                        </p>

                        <h2 className="text-2xl font-bold text-blue-950">

                          {reportData.status}

                        </h2>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Download */}

                {
                  reportData.report && (

                    <div className="mt-10 text-center">

                      <a
                        // href={`https://lab-project-be.vercel.app/${reportData.report}`}

                         href={`${import.meta.env.VITE_API_URL}/${reportData.report}`}

                        target="_blank"
                        rel="noreferrer"
                      >

                      

                        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-10 py-4 rounded-2xl text-lg font-semibold inline-flex items-center gap-3">

                          <FaDownload />

                          Download Report

                        </button>

                      </a>

                    </div>
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default VerifyReport