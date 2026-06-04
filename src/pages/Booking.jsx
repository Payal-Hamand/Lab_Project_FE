import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'
import {
  toast
} from 'react-toastify'
import API from '../services/api'
import {
  useLocation
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import BookingDateTime from '../components/BookingDateTime'

import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
   FaShieldAlt,
   FaHome,
   FaCheckCircle,
  FaFlask
} from 'react-icons/fa'

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

const Booking = () => {

  const navigate = useNavigate()
  const location =
  useLocation()

  // Dynamic Tests

  const [tests, setTests] = useState([])
  const [packages,
  setPackages
] = useState([])

  // Loading

  const [loading, setLoading] = useState(false)

  // Form
const selectedItem =
  location.state
    ?.selectedItem

const bookingType =
  location.state
    ?.bookingType
useEffect(() => {

  if (!selectedItem?._id) return

  setFormData(prev => ({

    ...prev,

    test:
      bookingType === 'test'
        ? selectedItem._id
        : '',

    package:
      bookingType === 'package'
        ? selectedItem._id
        : ''

  }))

}, [selectedItem, bookingType])

 const [formData, setFormData] =
  useState({
test: '',
package: '',

    patientName: '',

    age: '',

    gender: '',

    phone: '',

    flatNo: '',

    landmark: '',

    city: '',

    pincode: '',

    address: '',

    bookingDate: '',

    bookingTime: ''

  })
  console.log(formData);
 // Fetch Tests and Packages
   const fetchTests = async () => {

  try {

    const [
      testsRes,
      packagesRes
    ] = await Promise.all([

      API.get('/tests'),

      API.get('/packages')

    ])

    setTests(
      testsRes.data
    )

    setPackages(
      packagesRes.data
    )

  } catch (error) {

    console.log(error)
  }
}
useEffect(() => {

  fetchTests()

}, [])
 const allItems = [
    ...tests.map(t => ({ ...t, kind: 'test' })),
    ...packages.map(p => ({ ...p, kind: 'package' })),
  ]
  const selectedTestObj = allItems.find(i => i._id === formData.test)
  // Handle Change

  const handleChange = (e) => {

  const { name, value } =
    e.target

  // Numbers Only

  if (

    (name === 'phone' ||

      name === 'pincode') &&

    value &&
    !/^\d*$/.test(value)

  ) {

    return
  }

  setFormData({

    ...formData,

    [name]: value
  })
}

  // Submit Booking
const handleSubmit = async (e) => {

  e.preventDefault()

  // Empty Validation

  if (

     !formData.test &&
  !formData.package ||

    !formData.patientName ||

    !formData.age ||

    !formData.gender ||

    !formData.phone ||

    !formData.flatNo ||
    !formData.city ||
    !formData.pincode ||

    !formData.address ||

    !formData.bookingDate ||

    !formData.bookingTime

  ) {

    toast.error(
      'Please Fill All Fields'
    )

    return
  }

  // Name Validation

  if (
    formData.patientName.length < 3
  ) {

    toast.error(
      'Patient Name Must Be At Least 3 Characters'
    )

    return
  }

  // Age Validation

  if (

    formData.age < 1 ||

    formData.age > 99

  ) {

    toast.error(
      'Age Must Be Between 1 and 99'
    )

    return
  }

  // Phone Validation

  const phoneRegex =
    /^[6-9]\d{9}$/

  if (
    !phoneRegex.test(
      formData.phone
    )
  ) {

    toast.error(
      'Enter Valid 10 Digit Phone Number'
    )

    return
  }

  // Pincode Validation

  const pincodeRegex =
    /^[1-9][0-9]{5}$/

  if (
    !pincodeRegex.test(
      formData.pincode
    )
  ) {

    toast.error(
      'Enter Valid 6 Digit Pincode'
    )

    return
  }

  try {

    setLoading(true)

    await API.post(
      '/bookings',
      formData
    )

    toast.success(
      'Booking Created Successfully'
    )

    navigate('/dashboard')

  } catch (error) {

    toast.error(

      error.response?.data
        ?.message ||

        'Booking Failed'
    )

    console.log(
  "Payload",
  formData
);

  } finally {

    setLoading(false)
  }
}
const handleTestPackageChange = (e) => {
  const selectedId = e.target.value;

  const isTest = tests.some(
    item => item._id === selectedId
  );

  const isPackage = packages.some(
    item => item._id === selectedId
  );

  setFormData(prev => ({
    ...prev,
    test: isTest ? selectedId : "",
    package: isPackage ? selectedId : ""
  }));
}; 
console.log(
  "bookingType",
  bookingType
);

console.log(
  "selectedItem",
  selectedItem
);



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

              Select Test / Package

            </label>
          
<select
name="test"
  value={
    formData.test || formData.package
  }
  required
  onChange={handleTestPackageChange}
   className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
>

  <option value="">
    Choose Test or Package
  </option>

  {/* TESTS */}

  <optgroup label="Tests">

    {
      tests.map((item) => (

        <option
          key={item._id}
          value={item._id}
        >

          {item.title} — ₹{item.price}

        </option>
      ))
    }

  </optgroup>

  {/* PACKAGES */}

  <optgroup label="Packages">

    {
      packages.map((item) => (

        <option
          key={item._id}
          value={item._id}
        >

          {item.title} — ₹{item.price}

        </option>
      ))
    }

  </optgroup>

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

          {/* Address Details */}

<div className="space-y-5">

  {/* Full Address */}

  <div>

    <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

      <FaMapMarkerAlt />

      Full Address

    </label>

    <textarea
      rows="3"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
      placeholder="House No, Street, Area"
      className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
    />

  </div>

  {/* Flat + Landmark */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

    <div>

      <label className="font-semibold text-gray-700 text-sm md:text-base">

        Flat / Apartment

      </label>

      <input
        type="text"
        name="flatNo"
        value={formData.flatNo}
        onChange={handleChange}
        required
        placeholder="Flat No / Building"
        className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
      />

    </div>

    <div>

      <label className="font-semibold text-gray-700 text-sm md:text-base">

        Landmark

      </label>

      <input
        type="text"
        name="landmark"
        value={formData.landmark}
        onChange={handleChange}
        required
        placeholder="Near Mall / Hospital"
        className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
      />

    </div>

  </div>

  {/* City + State */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

    <div>

      <label className="font-semibold text-gray-700 text-sm md:text-base">

        City/State

      </label>

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        placeholder="Enter city/state"
        className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
      />

    </div>
     {/* Pincode */}

  <div>

    <label className="font-semibold text-gray-700 text-sm md:text-base">

      Pincode

    </label>

    <input
      type="text"
      name="pincode"
      maxLength={6}
      value={formData.pincode}
      onChange={handleChange}
      required
      placeholder="Enter pincode"
      className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
    />

  </div>
  </div>

 

</div>

          {/* Date + Time */}

          <BookingDateTime
  formData={formData}
  handleChange={handleChange}
/>

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
