import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import { useNavigate } from 'react-router-dom'

import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFlask
} from 'react-icons/fa'

const Booking = () => {

  const navigate = useNavigate()

  // Dynamic Tests

  const [tests, setTests] = useState([])

  // Loading

  const [loading, setLoading] = useState(false)

  // Form

  const [formData, setFormData] = useState({

    test: '',

    patientName: '',

    age: '',

    gender: '',

    phone: '',

    address: '',

    bookingDate: '',

    bookingTime: ''

  })

  // Time Slots

  const timeSlots = [

    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'

  ]

  // Fetch Tests

  useEffect(() => {

    fetchTests()

  }, [])

  const fetchTests = async () => {

    try {

      const { data } = await API.get('/tests')

      setTests(data)

    } catch (error) {

      console.log(error)
    }
  }

  // Handle Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }

  // Submit Booking

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      await API.post(
        '/bookings',
        formData
      )

      alert('Booking Created Successfully')

      navigate('/dashboard')

    } catch (error) {

      alert(
        error.response?.data?.message ||
        'Booking Failed'
      )

    } finally {

      setLoading(false)
    }
  }

  const today = new Date()
  .toISOString()
  .split('T')[0]


 return (

  <div className="bg-[#f4f8ff] min-h-screen">

    <Navbar />

    {/* Header */}

    <div className="bg-blue-950 pt-8 pb-10 md:pt-12 md:pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">

          Book Your Lab Test

        </h1>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 leading-7 max-w-2xl mx-auto">

          Easy online booking with home sample collection
          and accurate laboratory reports.

        </p>

      </div>

    </div>

    {/* Main */}

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 grid lg:grid-cols-3 gap-6 md:gap-10">

      {/* Form */}

      <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[35px] shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10">

        <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

          Appointment Details

        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">

          Fill all details carefully

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 md:mt-10 space-y-5 md:space-y-7"
        >

          {/* Test */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

              <FaFlask />

              Select Test

            </label>

            <select
              name="test"
              value={formData.test}
              onChange={handleChange}
              required
              className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
            >

              <option value="">
                Choose Lab Test
              </option>

              {
                tests.map((item) => (

                  <option
                    key={item._id}
                    value={item._id}
                  >

                    {item.title} - ₹{item.price}

                  </option>
                ))
              }

            </select>

          </div>

          {/* Patient Name */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

              <FaUser />

              Patient Name

            </label>

            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient name"
              className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
            />

          </div>

          {/* Age + Gender */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

            <div>

              <label className="font-semibold text-gray-700 text-sm md:text-base">

                Age

              </label>

              <input
  type="number"
  name="age"
  value={formData.age}
  onChange={handleChange}
  required
  min="1"
  max="100"
  placeholder="Enter age"
  className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
/>

            </div>

            <div>

              <label className="font-semibold text-gray-700 text-sm md:text-base">

                Gender

              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

              <FaPhoneAlt />

              Phone Number

            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
            />

          </div>

          {/* Address */}

          <div>

            <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

              <FaMapMarkerAlt />

              Address

            </label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
              className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
            />

          </div>

          {/* Date + Time */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

            <div>

              <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

                <FaCalendarAlt />

                Booking Date

              </label>

              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={today}
                required
                className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

                <FaClock />

                Booking Time

              </label>

              <select
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                required
                className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              >

                <option value="">
                  Choose Time
                </option>

                {
                  timeSlots.map((slot, index) => (

                    <option
                      key={index}
                      value={slot}
                    >

                      {slot}

                    </option>
                  ))
                }

              </select>

            </div>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg w-full"
          >

            {
              loading
                ? 'Booking...'
                : 'Confirm Booking'
            }

          </button>

        </form>

      </div>

      {/* Sidebar */}

      <div className="space-y-5 md:space-y-8">

        {/* Offer Card */}

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl md:rounded-[35px] p-5 md:p-8 text-white shadow-xl">

          <div className="bg-white/20 w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-4xl">

            %

          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-6">

            Get 20% OFF

          </h2>

          <p className="mt-3 md:mt-4 text-sm md:text-base text-blue-100 leading-7">

            Book your first test and get special
            discount on health packages.

          </p>

          <div className="bg-white text-blue-700 rounded-xl md:rounded-2xl p-3 md:p-4 mt-5 md:mt-6 text-center font-bold text-lg md:text-xl">

            MEDILAB20

          </div>

        </div>

        {/* Info Card */}

        <div className="bg-white rounded-2xl md:rounded-[35px] p-5 md:p-8 shadow-sm border border-gray-100">

          <h3 className="text-2xl font-bold text-blue-950">

            Why Choose Us?

          </h3>

          <div className="space-y-5 mt-6">

            <div>

              <h4 className="font-bold text-base md:text-lg">

                Home Sample Collection

              </h4>

              <p className="text-gray-500 mt-2 text-sm md:text-base leading-7">

                Safe and secure sample collection
                from your home.

              </p>

            </div>

            <div>

              <h4 className="font-bold text-base md:text-lg">

                NABL Certified Labs

              </h4>

              <p className="text-gray-500 mt-2 text-sm md:text-base leading-7">

                Accurate reports with modern equipment.

              </p>

            </div>

            <div>

              <h4 className="font-bold text-base md:text-lg">

                Fast Reports

              </h4>

              <p className="text-gray-500 mt-2 text-sm md:text-base leading-7">

                Get reports online within 6-24 hours.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}

export default Booking