// import React, { useState } from 'react'
// import Navbar from '../components/Navbar'
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaUser,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaFlask
// } from 'react-icons/fa'

// const Booking = () => {

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     test: '',
//     date: '',
//     time: ''
//   })

//   const tests = [
//     'CBC Test',
//     'Thyroid Profile',
//     'Vitamin D Test',
//     'Diabetes Test',
//     'Lipid Profile',
//     'Full Body Checkup'
//   ]

//   const timeSlots = [
//     '08:00 AM',
//     '09:00 AM',
//     '10:00 AM',
//     '11:00 AM',
//     '12:00 PM',
//     '02:00 PM',
//     '03:00 PM',
//     '04:00 PM'
//   ]

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = (e) => {

//     e.preventDefault()

//     console.log(formData)

//     alert('Test Booked Successfully')
//   }

//   return (
//     <div className="bg-[#f4f8ff] min-h-screen">

//       <Navbar />

//       {/* Header */}

//       <div className="bg-blue-950 py-20">

//         <div className="max-w-7xl mx-auto px-6 text-center text-white">

//           <h1 className="text-5xl font-bold">
//             Book Your Lab Test
//           </h1>

//           <p className="mt-5 text-lg text-gray-300">
//             Easy online booking with home sample collection
//           </p>

//         </div>

//       </div>

//       {/* Main Section */}

//       <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">

//         {/* Left Form */}

//         <div className="lg:col-span-2 bg-white rounded-[35px] shadow-xl p-8 lg:p-12">

//           <h2 className="text-3xl font-bold text-blue-950">
//             Appointment Details
//           </h2>

//           <p className="text-gray-500 mt-3">
//             Fill all details carefully
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="mt-10 space-y-8"
//           >

//             {/* Name */}

//             <div>

//               <label className="font-semibold text-gray-700 flex items-center gap-2">
//                 <FaUser />
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 onChange={handleChange}
//                 className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               />

//             </div>

//             {/* Phone */}

//             <div>

//               <label className="font-semibold text-gray-700 flex items-center gap-2">
//                 <FaPhoneAlt />
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 onChange={handleChange}
//                 className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               />

//             </div>

//             {/* Address */}

//             <div>

//               <label className="font-semibold text-gray-700 flex items-center gap-2">
//                 <FaMapMarkerAlt />
//                 Address
//               </label>

//               <textarea
//                 name="address"
//                 rows="4"
//                 placeholder="Enter your address"
//                 onChange={handleChange}
//                 className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               ></textarea>

//             </div>

//             {/* Test Selection */}

//             <div>

//               <label className="font-semibold text-gray-700 flex items-center gap-2">
//                 <FaFlask />
//                 Select Test
//               </label>

//               <select
//                 name="test"
//                 onChange={handleChange}
//                 className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               >

//                 <option value="">
//                   Choose Lab Test
//                 </option>

//                 {
//                   tests.map((test, index) => (
//                     <option
//                       key={index}
//                       value={test}
//                     >
//                       {test}
//                     </option>
//                   ))
//                 }

//               </select>

//             </div>

//             {/* Date + Time */}

//             <div className="grid md:grid-cols-2 gap-6">

//               <div>

//                 <label className="font-semibold text-gray-700 flex items-center gap-2">
//                   <FaCalendarAlt />
//                   Select Date
//                 </label>

//                 <input
//                   type="date"
//                   name="date"
//                   onChange={handleChange}
//                   className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//                 />

//               </div>

//               <div>

//                 <label className="font-semibold text-gray-700 flex items-center gap-2">
//                   <FaClock />
//                   Select Time
//                 </label>

//                 <select
//                   name="time"
//                   onChange={handleChange}
//                   className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//                 >

//                   <option value="">
//                     Choose Time
//                   </option>

//                   {
//                     timeSlots.map((slot, index) => (
//                       <option
//                         key={index}
//                         value={slot}
//                       >
//                         {slot}
//                       </option>
//                     ))
//                   }

//                 </select>

//               </div>

//             </div>

//             {/* Submit */}

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg w-full"
//             >
//               Confirm Booking
//             </button>

//           </form>

//         </div>

//         {/* Right Side */}

//         <div className="space-y-8">

//           {/* Offer Card */}

//           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[35px] p-8 text-white shadow-2xl">

//             <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center text-4xl">
//               %
//             </div>

//             <h2 className="text-3xl font-bold mt-8">
//               Get 20% OFF
//             </h2>

//             <p className="mt-4 text-blue-100 leading-7">
//               Book your first test and get special
//               discount on all health packages.
//             </p>

//             <div className="bg-white text-blue-700 rounded-2xl p-4 mt-6 text-center font-bold text-xl">
//               MEDILAB20
//             </div>

//           </div>

//           {/* Info Card */}

//           <div className="bg-white rounded-[35px] p-8 shadow-xl">

//             <h3 className="text-2xl font-bold text-blue-950">
//               Why Choose Us?
//             </h3>

//             <div className="space-y-6 mt-8">

//               <div>
//                 <h4 className="font-bold text-lg">
//                   Home Sample Collection
//                 </h4>

//                 <p className="text-gray-500 mt-2">
//                   Our expert staff collects samples from your home safely.
//                 </p>
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg">
//                   NABL Certified Labs
//                 </h4>

//                 <p className="text-gray-500 mt-2">
//                   Accurate and trusted reports with modern equipment.
//                 </p>
//               </div>

//               <div>
//                 <h4 className="font-bold text-lg">
//                   Fast Reports
//                 </h4>

//                 <p className="text-gray-500 mt-2">
//                   Get reports online within 6-24 hours.
//                 </p>
//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default Booking




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

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Header */}

      <div className="bg-blue-950 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1 className="text-5xl font-bold">
            Book Your Lab Test
          </h1>

          <p className="mt-5 text-lg text-gray-300">
            Easy online booking with home sample collection
          </p>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">

        {/* Form */}

        <div className="lg:col-span-2 bg-white rounded-[35px] shadow-xl p-8 lg:p-12">

          <h2 className="text-3xl font-bold text-blue-950">
            Appointment Details
          </h2>

          <p className="text-gray-500 mt-3">
            Fill all details carefully
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-8"
          >

            {/* Test */}

            <div>

              <label className="font-semibold text-gray-700 flex items-center gap-2">

                <FaFlask />

                Select Test

              </label>

              <select
                name="test"
                value={formData.test}
                onChange={handleChange}
                required
                className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
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

              <label className="font-semibold text-gray-700 flex items-center gap-2">

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
                className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              />

            </div>

            {/* Age + Gender */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-semibold text-gray-700">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Enter age"
                  className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="font-semibold text-gray-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
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

              <label className="font-semibold text-gray-700 flex items-center gap-2">

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
                className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              />

            </div>

            {/* Address */}

            <div>

              <label className="font-semibold text-gray-700 flex items-center gap-2">

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
                className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              />

            </div>

            {/* Date + Time */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-semibold text-gray-700 flex items-center gap-2">

                  <FaCalendarAlt />

                  Booking Date

                </label>

                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="font-semibold text-gray-700 flex items-center gap-2">

                  <FaClock />

                  Booking Time

                </label>

                <select
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  required
                  className="w-full border mt-3 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
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
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg w-full"
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

        <div className="space-y-8">

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[35px] p-8 text-white shadow-2xl">

            <h2 className="text-3xl font-bold">
              Get 20% OFF
            </h2>

            <p className="mt-4 text-blue-100">
              Book your first test and get
              special discount.
            </p>

            <div className="bg-white text-blue-700 rounded-2xl p-4 mt-6 text-center font-bold text-xl">

              MEDILAB20

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Booking