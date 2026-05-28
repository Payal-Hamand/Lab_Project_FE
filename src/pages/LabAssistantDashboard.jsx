import React, {
  useEffect,
  useState,
  useRef
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaFlask,
  FaClipboardList,
  FaCheckCircle,
} from 'react-icons/fa'

import {

  DashboardStatsCard,

  LoadingSpinner,

  EmptyState

} from '../components/dashboard'

const LabAssistantDashboard = () => {

  const [bookings, setBookings] =
    useState([])

  const [loading, setLoading] =
    useState(true)
    const [activeSection,
  setActiveSection
] = useState('all')
    const tableRef = useRef(null)

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } = await API.get(
        '/bookings/assigned'
      )

      setBookings(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  const scrollToTable = () => {

  setTimeout(() => {

    tableRef.current
      ?.scrollIntoView({

        behavior: 'smooth'

      })

  }, 100)
}
 const filteredBookings =

  activeSection ===
  'pending'

    ? bookings.filter(
        item =>
          item.status ===
          'Pending'
      )

    : activeSection ===
      'completed'

    ? bookings.filter(
        item =>
          item.status ===
          'Completed'
      )

    : bookings
  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Hero */}

      <div className="bg-blue-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            Lab Assistant Portal

          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-5">

            Lab Assistant Dashboard

          </h1>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

  <DashboardStatsCard
    title="Total Tests"
    value={bookings.length}
    icon={<FaFlask />}
    color="blue"
    bgColor="bg-blue-100 text-blue-600"
    active={
      activeSection === 'all'
    }
    onClick={() =>
      setActiveSection('all')
    }
  />

  <DashboardStatsCard
    title="Pending Reports"
    value={
      bookings.filter(
        item =>
          item.status === 'Pending'
      ).length
    }
    icon={<FaClipboardList />}
    color="yellow"
    bgColor="bg-yellow-100 text-yellow-600"
    active={
      activeSection ===
      'pending'
    }
    onClick={() =>
      setActiveSection(
        'pending'
      )
    }
  />

  <DashboardStatsCard
    title="Completed"
    value={
      bookings.filter(
        item =>
          item.status === 'Completed'
      ).length
    }
    icon={<FaCheckCircle />}
    color="green"
    bgColor="bg-green-100 text-green-600"
    active={
      activeSection ===
      'completed'
    }
    onClick={() =>
      setActiveSection(
        'completed'
      )
    }
  />

</div>

        {/* Table */}

        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">

          {
            loading ? (

              <LoadingSpinner />

            ) : bookings.length === 0 ? (

              <EmptyState text="No Assigned Bookings" />

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="bg-blue-50">

                    <tr>

                      <th className="px-6 py-4 text-left">

                        Patient

                      </th>

                      <th className="px-6 py-4 text-left">

                        Test

                      </th>

                      <th className="px-6 py-4 text-left">

                        Date

                      </th>

                      <th className="px-6 py-4 text-left">

                        Status

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredBookings.map(item => (

                        <tr
                          key={item._id}
                          className="border-b"
                        >

                          <td className="px-6 py-5">

                            {item.patientName}

                          </td>

                          <td className="px-6 py-5">

                            {item?.test?.title}

                          </td>

                          <td className="px-6 py-5">

                            {item.bookingDate}

                          </td>

                          <td className="px-6 py-5">

                            <span
                              className={`px-4 py-2 rounded-full text-xs font-semibold

                              ${
                                item.status ===
                                'Completed'

                                  ? 'bg-green-100 text-green-700'

                                  : 'bg-yellow-100 text-yellow-700'
                              }
                              `}
                            >

                              {item.status}

                            </span>

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default LabAssistantDashboard
