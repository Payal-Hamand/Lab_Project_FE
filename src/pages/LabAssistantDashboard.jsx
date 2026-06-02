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

} from '../components/Dashboard'

const LabAssistantDashboard = () => {

  const [bookings, setBookings] =
    useState([])

  const [loading, setLoading] =
    useState(true)
    const [activeSection,
  setActiveSection
] = useState('all')
const [selectedBooking,
setSelectedBooking] =
useState(null)

const [sampleImages,
setSampleImages] =
useState([])



const [paymentBooking,
setPaymentBooking] =
useState(null)

const [assistantNotes,
setAssistantNotes] =
useState('')

const [showSampleModal,
setShowSampleModal] =
useState(false)

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


const handleReached =
async (bookingId) => {

  try {

    await API.put(
      `/bookings/reached/${bookingId}`
    )

    fetchBookings()

  } catch (error) {

    console.log(error)
  }
}
const openPaymentModal =
(booking) => {

  setPaymentBooking(
    booking
  )

  setShowPaymentModal(
    true
  )
}

const openSampleModal =
(booking) => {

  setSelectedBooking(
    booking
  )

  setShowSampleModal(
    true
  )
}
const handleSampleUpload =
async () => {

  try {

    const formData =
      new FormData()
sampleImages.forEach(
  image => {

    formData.append(
      'sampleImages',
      image
    )
  }
)

    formData.append(
      'assistantNotes',
      assistantNotes
    )

    await API.put(

      `/bookings/sample/${selectedBooking._id}`,

      formData,

      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    )

    setShowSampleModal(
      false
    )

    setSampleImages([])

    setAssistantNotes('')

    fetchBookings()
    setShowPaymentModal(true)

setPaymentBooking(
  selectedBooking
)

  } catch (error) {

    console.log(error)
  }
}
const handlePayment =
  async (booking) => {

    try {

      const { data } =
        await API.post(

          "/payment/create",

          {
            bookingId:
              booking._id,

            patientName:
              booking.patientName,

            amount:
              booking?.test?.price,

            mobileNumber:
              booking.mobileNumber ||
              "9999999999",
          }
        );

      if (data.success) {

        window.location.href =
          data.url;
      }

    } catch (error) {

      console.log(error);
    }
  };

  console.log(bookings)
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
                       <th className="px-6 py-4 text-left">

                        Payment Status

                      </th>
                      <th>Actions</th>

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

                              {item.paymentStatus}

                            </span>

                          </td>
                         <td className="px-6 py-5">

  <div className="flex gap-2 flex-wrap">

    {/* REACHED */}

    <button

      disabled={
        item.status !==
        'Assigned'
      }

      onClick={() =>
        handleReached(item._id)
      }

      className={`px-4 py-2 rounded-xl text-sm text-white

      ${
        item.status ===
        'Assigned'

          ? 'bg-blue-600 hover:bg-blue-700'

          : 'bg-gray-300 cursor-not-allowed'
      }`}
    >

      {
        item.status ===
        'Reached'

          ? 'Reached'

          : 'Mark Reached'
      }

    </button>

    {/* SAMPLE */}

    <button

      disabled={
        item.status !==
        'Reached'
      }

      onClick={() =>
        openSampleModal(item)
      }

      className={`px-4 py-2 rounded-xl text-sm text-white

      ${
        item.status ===
        'Reached'

          ? 'bg-pink-600 hover:bg-pink-700'

          : 'bg-gray-300 cursor-not-allowed'
      }`}
    >

      Upload Sample

    </button>

    {/* PAYMENT */}

    <button

      disabled={
        item.paymentStatus ===
        'Paid'
      }

     onClick={() => {
  setPaymentBooking(item)
  handlePayment(item)
}}
      className={`px-4 py-2 rounded-xl text-sm text-white

      ${
        item.paymentStatus ===
        'Paid'

          ? 'bg-gray-300 cursor-not-allowed'

          : 'bg-green-600 hover:bg-green-700'
      }`}
    >

      {
        item.paymentStatus ===
        'Paid'

          ? 'Payment Done'

          : 'Take Payment'
      }

    </button>

  </div>

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
      {
  showSampleModal && (

    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-[35px] w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold text-blue-950">

          Upload Sample

        </h2>

        <p className="text-gray-500 mt-2">

          Upload blood sample tube image

        </p>

        <div className="mt-6 space-y-5">

       <input
  type="file"
  multiple
  accept="image/*"
  capture="environment"
  onChange={(e) =>
    setSampleImages(
      [...e.target.files]
    )
  }
  className="w-full border rounded-2xl p-4"
/>
       {
  sampleImages.length > 0 && (

    <div className="grid grid-cols-3 gap-3">

      {
        sampleImages.map(
          (image, index) => (

            <div
              key={index}
              className="relative"
            >

              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-full h-24 object-cover rounded-2xl border"
              />

            </div>
          )
        )
      }

    </div>
  )
}

          <textarea
            rows="4"
            placeholder="Assistant Notes"
            value={assistantNotes}
            onChange={(e) =>
              setAssistantNotes(
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-4 outline-none"
          />

          <div className="flex gap-4">

            <button
              onClick={
                handleSampleUpload
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
            >

              Upload Sample

            </button>

            <button
              onClick={() =>
                setShowSampleModal(
                  false
                )
              }
              className="flex-1 bg-gray-100 hover:bg-gray-200 py-4 rounded-2xl font-semibold"
            >

              Cancel

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}


    </div>
  )
}

export default LabAssistantDashboard
