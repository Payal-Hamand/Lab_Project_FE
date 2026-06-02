import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaUserPlus
} from 'react-icons/fa'

import {

  DashboardStatsCard,

  DashboardSectionHeader,

  DashboardTable,

  LoadingSpinner,

  EmptyState

} from '../components/Dashboard'

const LabOwnerDashboard = () => {

  const tableRef = useRef(null)

  const [bookings, setBookings] =
    useState([])

  const [assistants, setAssistants] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [activeSection,
    setActiveSection
  ] = useState('all')

  const [selectedAssistant,
    setSelectedAssistant
  ] = useState(null)

  const [showAssistantForm,
    setShowAssistantForm
  ] = useState(false)

  const [assistantData,
    setAssistantData
  ] = useState({

    name: '',

    email: '',

    password: '',
    mobile : '',

    document: ''

  })

  useEffect(() => {

    fetchBookings()

    fetchAssistants()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } =
        await API.get(
          '/bookings/lab-owner'
        )

      setBookings(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  const fetchAssistants =
    async () => {

      try {

        const { data } =
          await API.get(
            '/users/my-assistants'
          )

        setAssistants(data)

      } catch (error) {

        console.log(error)
      }
    }

  const handleChange = (e) => {

    setAssistantData({

      ...assistantData,

      [e.target.name]:
        e.target.value

    })
  }

  const handleCreateAssistant =
    async (e) => {

      e.preventDefault()

      try {

        await API.post(

          '/admin/create-lab-assistant',

          assistantData
        )

        fetchAssistants()

        setAssistantData({

          name: '',

          email: '',

          password: '',

          mobile: '',

          document: ''

        })

        setShowAssistantForm(false)

      } catch (error) {

        console.log(error)
      }
    }

  const handleAssignAssistant =
    async (
      bookingId,
      assistantId
    ) => {

      try {

        await API.put(

          '/bookings/assign-assistant',

          {

            bookingId,

            assistantId

          }
        )

        fetchBookings()

      } catch (error) {

        console.log(error)
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

    selectedAssistant

      ? bookings.filter(
          booking =>

            booking
              .assignedLabAssistant
              ?._id ===
            selectedAssistant
        )

      : activeSection ===
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

      {/* HERO */}

      <div className="bg-blue-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            Laboratory Management Portal

          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-5">

            Lab Owner Dashboard

          </h1>

          <p className="mt-4 text-blue-100 max-w-2xl">

            Manage bookings, assign assistants,
            and monitor laboratory operations.

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* STATS */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

          <DashboardStatsCard
            title="Total Bookings"
            value={bookings.length}
            icon={<FaClipboardList />}
            color="blue"
            bgColor="bg-blue-100 text-blue-600"
            active={
              activeSection === 'all'
            }
            onClick={() => {

              setSelectedAssistant(
                null
              )

              setActiveSection('all')

              scrollToTable()
            }}
          />

          <DashboardStatsCard
            title="Pending"
            value={
              bookings.filter(
                item =>
                  item.status ===
                  'Pending'
              ).length
            }
            icon={<FaClock />}
            color="yellow"
            bgColor="bg-yellow-100 text-yellow-600"
            active={
              activeSection ===
              'pending'
            }
            onClick={() => {

              setSelectedAssistant(
                null
              )

              setActiveSection(
                'pending'
              )

              scrollToTable()
            }}
          />

          <DashboardStatsCard
            title="Completed"
            value={
              bookings.filter(
                item =>
                  item.status ===
                  'Completed'
              ).length
            }
            icon={<FaCheckCircle />}
            color="green"
            bgColor="bg-green-100 text-green-600"
            active={
              activeSection ===
              'completed'
            }
            onClick={() => {

              setSelectedAssistant(
                null
              )

              setActiveSection(
                'completed'
              )

              scrollToTable()
            }}
          />

          <DashboardStatsCard
            title="Assistants"
            value={assistants.length}
            icon={<FaUsers />}
            color="purple"
            bgColor="bg-purple-100 text-purple-600"
            active={
              activeSection ===
              'assistants'
            }
            onClick={() => {

              setActiveSection(
                'assistants'
              )
            }}
          />

        </div>

        {/* ASSISTANTS */}

        {
          activeSection ===
            'assistants' && (

            <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
            <DashboardSectionHeader
                title="Lab Assistants"
                subtitle="Manage your assistants"
                button
                buttonText="Create Assistant"
                buttonIcon={<FaUserPlus />}
                onClick={() =>
                  setShowAssistantForm(
                    !showAssistantForm
                  )
                }
              />

 
              {/* ASSISTANT CARDS */}

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">



                {
                  assistants.map(
                    assistant => {

                      const totalBookings =
                        bookings.filter(
                          booking =>

                            booking
                              .assignedLabAssistant
                              ?._id ===
                            assistant._id
                        )

                      return (

                        <button
                          key={
                            assistant._id
                          }
                          onClick={() => {

                            setSelectedAssistant(
                              assistant._id
                            )

                            scrollToTable()
                          }}
                          className={`border rounded-3xl p-5 hover:shadow-xl transition text-left bg-white

                          ${
                            selectedAssistant ===
                            assistant._id

                              ? 'border-purple-500 ring-2 ring-purple-200'

                              : 'border-gray-100'
                          }
                          `}
                        >

                          <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">

                            <FaUsers />

                          </div>

                          <h3 className="text-xl font-bold text-blue-950 mt-5">

                            {
                              assistant.name
                            }

                          </h3>

                          <p className="text-gray-500 mt-2 break-all">

                            {
                              assistant.email
                            }

                          </p>

                          <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-blue-50 rounded-2xl p-4 text-center">

                              <p className="text-sm text-gray-500">

                                Total Tests

                              </p>

                              <h4 className="text-2xl font-bold text-blue-600 mt-2">

                                {
                                  totalBookings.length
                                }

                              </h4>

                            </div>

                            <div className="bg-green-50 rounded-2xl p-4 text-center">

                              <p className="text-sm text-gray-500">

                                Completed

                              </p>

                              <h4 className="text-2xl font-bold text-green-600 mt-2">

                                {
                                  totalBookings.filter(
                                    item =>
                                      item.status ===
                                      'Completed'
                                  ).length
                                }

                              </h4>

                            </div>

                          </div>

                        </button>
                      )
                    }
                  )
                }

              </div>

            </div>
          )
        }
        {
  showAssistantForm && (

    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">

      {/* PANEL */}

      <div className="bg-white w-full max-w-xl h-screen overflow-y-auto shadow-2xl">

       <div className="sticky top-0 bg-white border-b px-6 md:px-8 py-5 flex items-center justify-between z-10">

  <div className="flex items-center gap-4">

    {/* BACK BUTTON */}

    <button
      type="button"
      onClick={() =>
        setShowAssistantForm(false)
      }
      className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-blue-100 transition flex items-center justify-center text-xl font-bold"
    >

      ←

    </button>

    <div>

      <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

        Create Assistant

      </h2>

      <p className="text-gray-500 mt-1 text-sm">

        Add new laboratory assistant

      </p>

    </div>

  </div>

  {/* CLOSE */}

  <button
    type="button"
    onClick={() =>
      setShowAssistantForm(false)
    }
    className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center text-2xl"
  >

    ×

  </button>

</div>
        
        {/* BODY */}

        <div className="p-6 md:p-8">

          <form
            onSubmit={
              handleCreateAssistant
            }
            className="space-y-6"
          >

            {/* NAME */}

            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={
                  assistantData.name
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={
                  assistantData.email
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* MOBILE */}

            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">

                Mobile Number

              </label>

              <input
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                value={
                  assistantData.mobile
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* DOCUMENT */}

            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">

                Verification Document

              </label>

              <input
                type="text"
                name="document"
                placeholder="Document URL"
                value={
                  assistantData.document
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-sm font-semibold text-gray-700 block mb-2">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={
                  assistantData.password
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* BUTTON */}

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all active:scale-[0.98] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-200">

              Create Assistant

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

        {/* TABLE */}

        <div
          ref={tableRef}
          className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8"
        >
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
     <DashboardSectionHeader
            title="Bookings"
            subtitle="Manage assigned laboratory bookings"
          />
           <button
    onClick={() =>
      setShowAssistantForm(true)
    }
    className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold shadow-lg shadow-blue-200"
  >

    <FaUserPlus />

    Create Assistant

  </button>
</div>
         

          {
            loading ? (

              <LoadingSpinner />

            ) : filteredBookings.length === 0 ? (

              <EmptyState text="No Bookings Found" />

            ) : (

              <DashboardTable
                bookings={
                  filteredBookings
                }
                assistants={
                  assistants
                }
                handleAssignAssistant={
                  handleAssignAssistant
                }
              />
            )
          }

        </div>

      </div>

    </div>
  )
}

export default LabOwnerDashboard

