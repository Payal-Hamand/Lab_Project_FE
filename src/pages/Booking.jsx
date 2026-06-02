// import React, {
//   useEffect,
//   useState
// } from 'react'

// import Navbar from '../components/Navbar'
// import {
//   toast
// } from 'react-toastify'
// import API from '../services/api'
// import {
//   useLocation
// } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import BookingDateTime from '../components/BookingDateTime'

// import {
//   FaCalendarAlt,
//   FaClock,
//   FaUser,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaFlask
// } from 'react-icons/fa'

// const Booking = () => {

//   const navigate = useNavigate()
//   const location =
//   useLocation()

//   // Dynamic Tests

//   const [tests, setTests] = useState([])
//   const [packages,
//   setPackages
// ] = useState([])

//   // Loading

//   const [loading, setLoading] = useState(false)

//   // Form
// const selectedItem =
//   location.state
//     ?.selectedItem

// const bookingType =
//   location.state
//     ?.bookingType
// useEffect(() => {

//   if (
//     selectedItem?._id
//   ) {

//     setFormData(prev => ({

//       ...prev,

//       test:
//         selectedItem._id
//     }))
//   }

// }, [
//   selectedItem,
//   tests,
//   packages
// ])
 
//  const [formData, setFormData] =
//   useState({
// test: '',

//     patientName: '',

//     age: '',

//     gender: '',

//     phone: '',

//     flatNo: '',

//     landmark: '',

//     city: '',

//     pincode: '',

//     address: '',

//     bookingDate: '',

//     bookingTime: ''

//   })
//  // Fetch Tests and Packages
//    const fetchTests = async () => {

//   try {

//     const [
//       testsRes,
//       packagesRes
//     ] = await Promise.all([

//       API.get('/tests'),

//       API.get('/packages')

//     ])

//     setTests(
//       testsRes.data
//     )

//     setPackages(
//       packagesRes.data
//     )

//   } catch (error) {

//     console.log(error)
//   }
// }
// useEffect(() => {

//   fetchTests()

// }, [])
//   // Handle Change

//   const handleChange = (e) => {

//   const { name, value } =
//     e.target

//   // Numbers Only

//   if (

//     (name === 'phone' ||

//       name === 'pincode') &&

//     value &&
//     !/^\d*$/.test(value)

//   ) {

//     return
//   }

//   setFormData({

//     ...formData,

//     [name]: value
//   })
// }

//   // Submit Booking
// const handleSubmit = async (e) => {

//   e.preventDefault()

//   // Empty Validation

//   if (

//     !formData.test ||

//     !formData.patientName ||

//     !formData.age ||

//     !formData.gender ||

//     !formData.phone ||

//     !formData.flatNo ||
//     !formData.city ||
//     !formData.pincode ||

//     !formData.address ||

//     !formData.bookingDate ||

//     !formData.bookingTime

//   ) {

//     toast.error(
//       'Please Fill All Fields'
//     )

//     return
//   }

//   // Name Validation

//   if (
//     formData.patientName.length < 3
//   ) {

//     toast.error(
//       'Patient Name Must Be At Least 3 Characters'
//     )

//     return
//   }

//   // Age Validation

//   if (

//     formData.age < 1 ||

//     formData.age > 99

//   ) {

//     toast.error(
//       'Age Must Be Between 1 and 99'
//     )

//     return
//   }

//   // Phone Validation

//   const phoneRegex =
//     /^[6-9]\d{9}$/

//   if (
//     !phoneRegex.test(
//       formData.phone
//     )
//   ) {

//     toast.error(
//       'Enter Valid 10 Digit Phone Number'
//     )

//     return
//   }

//   // Pincode Validation

//   const pincodeRegex =
//     /^[1-9][0-9]{5}$/

//   if (
//     !pincodeRegex.test(
//       formData.pincode
//     )
//   ) {

//     toast.error(
//       'Enter Valid 6 Digit Pincode'
//     )

//     return
//   }

//   try {

//     setLoading(true)

//     await API.post(
//       '/bookings',
//       formData
//     )

//     toast.success(
//       'Booking Created Successfully'
//     )

//     navigate('/dashboard')

//   } catch (error) {

//     toast.error(

//       error.response?.data
//         ?.message ||

//         'Booking Failed'
//     )

//   } finally {

//     setLoading(false)
//   }
// }



//  return (

//   <div className="bg-[#f4f8ff] min-h-screen">

//     <Navbar />

//     {/* Header */}

//     <div className="bg-blue-950 pt-8 pb-10 md:pt-12 md:pb-16">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">

//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">

//           Book Your Lab Test

//         </h1>

//         <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 leading-7 max-w-2xl mx-auto">

//           Easy online booking with home sample collection
//           and accurate laboratory reports.

//         </p>

//       </div>

//     </div>

//     {/* Main */}

//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 grid lg:grid-cols-3 gap-6 md:gap-10">

//       {/* Form */}
     

//       <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[35px] shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10">

//         <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

//           Appointment Details

//         </h2>

//         <p className="text-gray-500 mt-2 text-sm md:text-base">

//           Fill all details carefully

//         </p>


//         <form
//           onSubmit={handleSubmit}
//           className="mt-6 md:mt-10 space-y-5 md:space-y-7"
//         >

//           {/* Test */}

//           <div>

//             <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

//               <FaFlask />

//               Select Test / Package

//             </label>
//           <select
//   name="test"
//   value={formData.test}
//   onChange={handleChange}
//   required
//   className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
// >

//   <option value="">
//     Choose Test or Package
//   </option>

//   {/* TESTS */}

//   <optgroup label="Tests">

//     {
//       tests.map((item) => (

//         <option
//           key={item._id}
//           value={item._id}
//         >

//           {item.title} — ₹{item.price}

//         </option>
//       ))
//     }

//   </optgroup>

//   {/* PACKAGES */}

//   <optgroup label="Packages">

//     {
//       packages.map((item) => (

//         <option
//           key={item._id}
//           value={item._id}
//         >

//           {item.title} — ₹{item.price}

//         </option>
//       ))
//     }

//   </optgroup>

// </select>

//           </div>

//           {/* Patient Name */}

//           <div>

//             <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

//               <FaUser />

//               Patient Name

//             </label>

//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               required
//               placeholder="Enter patient name"
//               className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//             />

//           </div>

//           {/* Age + Gender */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

//             <div>

//               <label className="font-semibold text-gray-700 text-sm md:text-base">

//                 Age

//               </label>

//               <input
//   type="number"
//   name="age"
//   value={formData.age}
//   onChange={handleChange}
//   required
//   min="1"
//   max="100"
//   placeholder="Enter age"
//   className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
// />

//             </div>

//             <div>

//               <label className="font-semibold text-gray-700 text-sm md:text-base">

//                 Gender

//               </label>

//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//                 className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//               >

//                 <option value="">
//                   Select Gender
//                 </option>

//                 <option value="Male">
//                   Male
//                 </option>

//                 <option value="Female">
//                   Female
//                 </option>

//                 <option value="Other">
//                   Other
//                 </option>

//               </select>

//             </div>

//           </div>

//           {/* Phone */}

//           <div>

//             <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

//               <FaPhoneAlt />

//               Phone Number

//             </label>

//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               placeholder="Enter phone number"
//               className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//             />

//           </div>

//           {/* Address */}

//           {/* Address Details */}

// <div className="space-y-5">

//   {/* Full Address */}

//   <div>

//     <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

//       <FaMapMarkerAlt />

//       Full Address

//     </label>

//     <textarea
//       rows="3"
//       name="address"
//       value={formData.address}
//       onChange={handleChange}
//       required
//       placeholder="House No, Street, Area"
//       className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//     />

//   </div>

//   {/* Flat + Landmark */}

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

//     <div>

//       <label className="font-semibold text-gray-700 text-sm md:text-base">

//         Flat / Apartment

//       </label>

//       <input
//         type="text"
//         name="flatNo"
//         value={formData.flatNo}
//         onChange={handleChange}
//         required
//         placeholder="Flat No / Building"
//         className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//       />

//     </div>

//     <div>

//       <label className="font-semibold text-gray-700 text-sm md:text-base">

//         Landmark

//       </label>

//       <input
//         type="text"
//         name="landmark"
//         value={formData.landmark}
//         onChange={handleChange}
//         required
//         placeholder="Near Mall / Hospital"
//         className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//       />

//     </div>

//   </div>

//   {/* City + State */}

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

//     <div>

//       <label className="font-semibold text-gray-700 text-sm md:text-base">

//         City/State

//       </label>

//       <input
//         type="text"
//         name="city"
//         value={formData.city}
//         onChange={handleChange}
//         required
//         placeholder="Enter city/state"
//         className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//       />

//     </div>
//      {/* Pincode */}

//   <div>

//     <label className="font-semibold text-gray-700 text-sm md:text-base">

//       Pincode

//     </label>

//     <input
//       type="text"
//       name="pincode"
//       maxLength={6}
//       value={formData.pincode}
//       onChange={handleChange}
//       required
//       placeholder="Enter pincode"
//       className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
//     />

//   </div>
//   </div>

 

// </div>

//           {/* Date + Time */}

//           <BookingDateTime
//   formData={formData}
//   handleChange={handleChange}
// />

//           {/* Submit */}

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg w-full"
//           >

//             {
//               loading
//                 ? 'Booking...'
//                 : 'Confirm Booking'
//             }

//           </button>

//         </form>



//       </div>


      

//     </div>

//   </div>
// )
// }

// export default Booking

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import API from '../services/api'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FaFlask, FaUser, FaPhoneAlt, FaMapMarkerAlt,
  FaCalendarAlt, FaClock, FaShieldAlt, FaHome, FaCheckCircle
} from 'react-icons/fa'

const TIME_SLOTS = [
  '6:00 – 8:00 AM',
  '8:00 – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 – 2:00 PM',
  '4:00 – 6:00 PM',
  '6:00 – 8:00 PM',
]

/* ─────────────────────────────────────────
   Shared style tokens  (Plus Jakarta Sans + Inter)
───────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
`

const tok = {
  // typography
  fontDisplay: "'Plus Jakarta Sans', sans-serif",
  fontBody:    "'Inter', sans-serif",

  // colours
  bg:          '#f0f4fa',
  card:        '#ffffff',
  navy:        '#0b1120',
  navyLight:   '#111827',
  accent:      '#1d4ed8',
  accentHover: '#1e40af',
  accentMid:   '#dbeafe',
  accentText:  '#1d4ed8',
  border:      '#e2e8f0',
  borderFocus: '#1d4ed8',
  textPrimary: '#0f172a',
  textSec:     '#475569',
  textMuted:   '#94a3b8',
  inputBg:     '#f8fafc',
  summaryBg:   '#0b1120',
  summaryBdr:  '#1e293b',
  summaryRow:  '#0f172a',
  summaryAcc:  '#3b82f6',
  summaryDim:  '#334155',
  summaryVal:  '#cbd5e1',
}

const inputBase = {
  width: '100%',
  background: tok.inputBg,
  border: `1.5px solid ${tok.border}`,
  borderRadius: 10,
  padding: '12px 14px',
  fontFamily: tok.fontBody,
  fontSize: 14,
  color: tok.textPrimary,
  outline: 'none',
  transition: 'border-color .18s, background .18s, box-shadow .18s',
  boxSizing: 'border-box',
  lineHeight: 1.5,
}

const selectBase = {
  ...inputBase,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  paddingRight: 40,
  cursor: 'pointer',
}

const labelBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: tok.textSec,
  marginBottom: 7,
  fontFamily: tok.fontBody,
  letterSpacing: '.01em',
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
const StepHeader = ({ step, title, first }) => (
  <div style={{ padding: first ? '32px 32px 0' : '8px 32px 0' }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 6,
        background: tok.accentMid, color: tok.accentText,
        fontFamily: tok.fontDisplay, fontSize: 12, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{step}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '.09em',
        textTransform: 'uppercase', color: tok.accentText,
        fontFamily: tok.fontBody,
      }}>Step {step}</span>
    </div>
    <h2 style={{
      fontFamily: tok.fontDisplay, fontSize: 20, fontWeight: 700,
      color: tok.textPrimary, margin: 0, letterSpacing: '-.02em',
    }}>{title}</h2>
    <div style={{ height: 1, background: tok.border, margin: '18px 0 0' }} />
  </div>
)

const Field = ({ label, icon, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={labelBase}>
      {icon && <span style={{ color: tok.textMuted, fontSize: 12 }}>{icon}</span>}
      {label}
    </label>
    {children}
  </div>
)

const SummaryRow = ({ icon, label, children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 18 }}>
    <div style={{
      width: 34, height: 34,
      background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.18)',
      borderRadius: 9, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <span style={{ color: tok.summaryAcc, fontSize: 13 }}>{icon}</span>
    </div>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
        textTransform: 'uppercase', color: tok.summaryDim,
        fontFamily: tok.fontBody, marginBottom: 3,
      }}>{label}</div>
      <div style={{ fontSize: 14, color: tok.summaryVal, fontFamily: tok.fontBody, lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  </div>
)

const Muted = ({ children }) => (
  <span style={{ color: '#1e3a5f', fontStyle: 'normal', fontWeight: 400 }}>{children}</span>
)

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
const Booking = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [tests, setTests]       = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading]   = useState(false)

  const selectedItem = location.state?.selectedItem

  const [formData, setFormData] = useState({
    test: '', patientName: '', age: '', gender: '',
    phone: '', flatNo: '', landmark: '', city: '',
    pincode: '', address: '', bookingDate: '', bookingTime: '',
  })

  /* fetch */
  useEffect(() => {
    ;(async () => {
      try {
        const [tRes, pRes] = await Promise.all([API.get('/tests'), API.get('/packages')])
        setTests(tRes.data)
        setPackages(pRes.data)
      } catch (e) { console.log(e) }
    })()
  }, [])

  /* pre-select from nav state */
  useEffect(() => {
    if (selectedItem?._id) setFormData(p => ({ ...p, test: selectedItem._id }))
  }, [selectedItem, tests, packages])

  const handleChange = (e) => {
    const { name, value } = e.target
    if ((name === 'phone' || name === 'pincode') && value && !/^\d*$/.test(value)) return
    setFormData({ ...formData, [name]: value })
  }

  const handleTimeSlot = (slot) => setFormData({ ...formData, bookingTime: slot })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const required = ['test','patientName','age','gender','phone',
                      'flatNo','city','pincode','address','bookingDate','bookingTime']
    if (required.some(k => !formData[k])) { toast.error('Please fill all fields'); return }
    if (formData.patientName.length < 3)  { toast.error('Patient name must be at least 3 characters'); return }
    if (formData.age < 1 || formData.age > 99) { toast.error('Age must be between 1 and 99'); return }
    if (!/^[6-9]\d{9}$/.test(formData.phone))  { toast.error('Enter a valid 10-digit phone number'); return }
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) { toast.error('Enter a valid 6-digit pincode'); return }
    try {
      setLoading(true)
      await API.post('/bookings', formData)
      toast.success('Booking created successfully')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally { setLoading(false) }
  }

  const allItems = [
    ...tests.map(t => ({ ...t, kind: 'test' })),
    ...packages.map(p => ({ ...p, kind: 'package' })),
  ]
  const selectedTestObj = allItems.find(i => i._id === formData.test)

  /* ── render ── */
  return (
    <div style={{ fontFamily: tok.fontBody, background: tok.bg, minHeight: '100vh' }}>
      <style>{FONTS}{`
        .bk-grid { display:grid; grid-template-columns:1fr 340px; gap:24px; align-items:start; }
        @media(max-width:880px){ .bk-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:560px){ .bk-row2{ grid-template-columns:1fr !important; } }
        input:focus,select:focus,textarea:focus{
          border-color:${tok.borderFocus} !important;
          background:#fff !important;
          box-shadow:0 0 0 3px rgba(29,78,216,.1) !important;
          outline:none;
        }
        input::placeholder,textarea::placeholder{ color:${tok.textMuted}; }
        input[type=date]::-webkit-calendar-picker-indicator{ opacity:.4; cursor:pointer; }
        optgroup{ font-weight:600; color:${tok.textSec}; }
      `}</style>

      <Navbar />

      {/* ── Hero header ── */}
      <div style={{
        background: tok.navy, padding: '44px 0 64px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* glow */}
        <div style={{
          position: 'absolute', top: -80, right: '15%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(29,78,216,.18) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 32px',
          position: 'relative', display: 'flex', alignItems: 'center', gap: 24,
        }}>
          <div style={{ flex: 1 }}>
            {/* pill badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.25)',
              borderRadius: 100, padding: '5px 14px', marginBottom: 18,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22d3ee', boxShadow: '0 0 6px #22d3ee',
                display: 'inline-block',
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '.09em',
                textTransform: 'uppercase', color: '#93c5fd',
                fontFamily: tok.fontBody,
              }}>Home Sample Collection</span>
            </div>

            <h1 style={{
              fontFamily: tok.fontDisplay, fontSize: 'clamp(26px,3.8vw,42px)',
              fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.15,
              letterSpacing: '-.03em',
            }}>
              Book Your Lab Test
              <br />
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>Online in Minutes</span>
            </h1>

            <p style={{
              color: '#64748b', fontSize: 15, marginTop: 14,
              lineHeight: 1.7, maxWidth: 440, fontFamily: tok.fontBody,
            }}>
              Certified labs · Home sample pickup · Fast digital reports
            </p>

            {/* stats row */}
            <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
              {[['500K+','Tests Done'],['200+','Certified Labs'],['4.9★','Patient Rating']].map(([val,lbl]) => (
                <div key={lbl}>
                  <div style={{
                    fontFamily: tok.fontDisplay, fontSize: 22, fontWeight: 800,
                    color: '#fff', letterSpacing: '-.02em',
                  }}>{val}</div>
                  <div style={{ fontSize: 12, color: '#475569', fontFamily: tok.fontBody, marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* icon block */}
          <div style={{
            flexShrink: 0, width: 88, height: 88,
            background: 'rgba(29,78,216,.15)', border: '1px solid rgba(29,78,216,.3)',
            borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FaFlask style={{ color: '#60a5fa', fontSize: 32 }} />
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div
        className="bk-grid"
        style={{ maxWidth: 1100, margin: '-28px auto 64px', padding: '0 32px' }}
      >

        {/* ── Form card ── */}
        <div style={{
          background: tok.card, borderRadius: 20,
          border: `1px solid ${tok.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 32px rgba(15,23,42,.06)',
          overflow: 'hidden',
        }}>

          {/* STEP 1 — Test */}
          <StepHeader step="1" title="Select Test or Package" first />
          <div style={{ padding: '20px 32px 28px' }}>
            <Field label="Test / Package" icon={<FaFlask />}>
              <select name="test" value={formData.test} onChange={handleChange} style={selectBase}>
                <option value="">Choose a test or package…</option>
                <optgroup label="── Tests ──">
                  {tests.map(i => (
                    <option key={i._id} value={i._id}>{i.title} — ₹{i.price}</option>
                  ))}
                </optgroup>
                <optgroup label="── Packages ──">
                  {packages.map(i => (
                    <option key={i._id} value={i._id}>{i.title} — ₹{i.price}</option>
                  ))}
                </optgroup>
              </select>
            </Field>
          </div>

          {/* STEP 2 — Patient */}
          <StepHeader step="2" title="Patient Information" />
          <div style={{ padding: '20px 32px 28px' }}>
            <Field label="Patient Name" icon={<FaUser />}>
              <input type="text" name="patientName" value={formData.patientName}
                onChange={handleChange} placeholder="Full name of patient" style={inputBase} />
            </Field>

            <div className="bk-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Age">
                <input type="number" name="age" value={formData.age} onChange={handleChange}
                  placeholder="e.g. 32" min="1" max="99" style={inputBase} />
              </Field>
              <Field label="Gender">
                <select name="gender" value={formData.gender} onChange={handleChange} style={selectBase}>
                  <option value="">Select gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </Field>
            </div>

            <Field label="Phone Number" icon={<FaPhoneAlt />}>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                placeholder="10-digit mobile number" maxLength={10} style={inputBase} />
            </Field>
          </div>

          {/* STEP 3 — Address */}
          <StepHeader step="3" title="Sample Collection Address" />
          <div style={{ padding: '20px 32px 28px' }}>
            <Field label="Full Address" icon={<FaMapMarkerAlt />}>
              <textarea name="address" value={formData.address} onChange={handleChange}
                placeholder="House No, Street, Area…" rows={3}
                style={{ ...inputBase, resize: 'vertical', minHeight: 86 }} />
            </Field>

            <div className="bk-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Flat / Apartment">
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange}
                  placeholder="Flat No / Building" style={inputBase} />
              </Field>
              <Field label="Landmark">
                <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
                  placeholder="Near Mall / Hospital" style={inputBase} />
              </Field>
            </div>

            <div className="bk-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="City / State">
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  placeholder="Mumbai, Maharashtra" style={inputBase} />
              </Field>
              <Field label="Pincode">
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                  placeholder="6-digit pincode" maxLength={6} style={inputBase} />
              </Field>
            </div>
          </div>

          {/* STEP 4 — Schedule */}
          <StepHeader step="4" title="Appointment Schedule" />
          <div style={{ padding: '20px 32px 32px' }}>
            <Field label="Preferred Date" icon={<FaCalendarAlt />}>
              <input type="date" name="bookingDate" value={formData.bookingDate}
                onChange={handleChange}
                style={{ ...inputBase, color: formData.bookingDate ? tok.textPrimary : tok.textMuted }} />
            </Field>

            <div style={{ marginBottom: 20 }}>
              <label style={labelBase}>
                <FaClock style={{ color: tok.textMuted, fontSize: 12 }} />
                Preferred Time Slot
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {TIME_SLOTS.map(slot => {
                  const active = formData.bookingTime === slot
                  return (
                    <button key={slot} type="button" onClick={() => handleTimeSlot(slot)} style={{
                      padding: '8px 15px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: active ? 600 : 500,
                      cursor: 'pointer',
                      fontFamily: tok.fontBody,
                      transition: 'all .15s',
                      border: active ? `1.5px solid ${tok.accent}` : `1.5px solid ${tok.border}`,
                      background: active ? tok.accent : tok.inputBg,
                      color: active ? '#fff' : tok.textSec,
                      letterSpacing: '.01em',
                    }}>
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <button type="button" onClick={handleSubmit} disabled={loading} style={{
              width: '100%', padding: '15px 24px',
              background: loading ? '#93c5fd' : tok.accent,
              color: '#fff', border: 'none', borderRadius: 11,
              fontFamily: tok.fontDisplay, fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              transition: 'background .18s, transform .1s',
              letterSpacing: '-.01em',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(29,78,216,.28)',
            }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = tok.accentHover }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = tok.accent }}
            >
              <FaCheckCircle style={{ fontSize: 16 }} />
              {loading ? 'Confirming…' : 'Confirm Booking'}
            </button>
          </div>
        </div>

        {/* ── Summary card ── */}
        <div style={{
          background: tok.summaryBg, borderRadius: 20,
          border: `1px solid ${tok.summaryBdr}`, overflow: 'hidden',
          position: 'sticky', top: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,.3)',
        }}>
          {/* header */}
          <div style={{ padding: '26px 26px 18px' }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
              textTransform: 'uppercase', color: tok.summaryAcc,
              fontFamily: tok.fontBody, marginBottom: 10,
            }}>Booking Summary</div>
            <div style={{
              fontFamily: tok.fontDisplay, fontSize: 19, fontWeight: 700,
              color: '#f1f5f9', letterSpacing: '-.02em',
            }}>Your appointment<br />at a glance</div>
          </div>

          <div style={{ height: 1, background: tok.summaryBdr }} />

          {/* rows */}
          <div style={{ padding: '20px 26px 4px' }}>
            <SummaryRow icon={<FaFlask />} label="Test">
              {selectedTestObj ? selectedTestObj.title : <Muted>Not selected</Muted>}
            </SummaryRow>
            <SummaryRow icon={<FaUser />} label="Patient">
              {formData.patientName ? (
                <span>
                  {formData.patientName}
                  {(formData.age || formData.gender) && (
                    <span style={{ display: 'block', fontSize: 12, color: tok.summaryDim, marginTop: 2 }}>
                      {[formData.age && `${formData.age} yrs`, formData.gender].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </span>
              ) : <Muted>Not entered</Muted>}
            </SummaryRow>
            <SummaryRow icon={<FaCalendarAlt />} label="Schedule">
              {(formData.bookingDate || formData.bookingTime) ? (
                <span>
                  {formData.bookingDate && new Date(formData.bookingDate)
                    .toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {formData.bookingTime && (
                    <span style={{ display: 'block', fontSize: 12, color: tok.summaryDim, marginTop: 2 }}>
                      {formData.bookingTime}
                    </span>
                  )}
                </span>
              ) : <Muted>Not set</Muted>}
            </SummaryRow>
            <SummaryRow icon={<FaMapMarkerAlt />} label="Location">
              {formData.city || <Muted>Not entered</Muted>}
            </SummaryRow>
          </div>

          <div style={{ height: 1, background: tok.summaryBdr, margin: '0 0 0' }} />

          {/* price */}
          <div style={{ padding: '18px 26px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '.09em',
              textTransform: 'uppercase', color: tok.summaryDim, fontFamily: tok.fontBody,
            }}>Total Amount</span>
            <span style={{
              fontFamily: tok.fontDisplay, fontSize: 26, fontWeight: 800,
              color: '#f1f5f9', letterSpacing: '-.02em',
            }}>
              <span style={{ fontSize: 15, fontFamily: tok.fontBody, fontWeight: 600, color: tok.summaryAcc, verticalAlign: 'super' }}>₹</span>
              {selectedTestObj ? selectedTestObj.price : '—'}
            </span>
          </div>

          {/* trust badges */}
          <div style={{ padding: '10px 26px 26px' }}>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {[
                { icon: <FaShieldAlt />, label: 'NABL Certified' },
                { icon: <FaHome />,      label: 'Home Visit' },
                { icon: <FaCheckCircle />, label: 'Verified Reports' },
              ].map(b => (
                <div key={b.label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,.03)',
                  border: `1px solid ${tok.summaryBdr}`,
                  borderRadius: 7, padding: '5px 10px',
                  fontSize: 11, fontWeight: 600,
                  color: tok.summaryDim, fontFamily: tok.fontBody,
                }}>
                  <span style={{ color: tok.summaryAcc, fontSize: 10 }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Booking