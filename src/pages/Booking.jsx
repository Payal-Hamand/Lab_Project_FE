import React, { useEffect, useState } from 'react'
import LocationPicker from '@/components/LocationPicker'
import PublicLayout from '@/components/layout/PublicLayout'
import API from '@/services/api'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingDateTime from '@/components/BookingDateTime'
import { toast } from 'react-toastify'
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHome,
  FaCheckCircle,
  FaFlask,
} from 'react-icons/fa'
import { ROUTES } from '@/constants/routes'
import { API_ENDPOINTS } from '@/constants/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'

const Booking = () => {
  const navigate = useNavigate()
  const pageLocation = useLocation()
  const [mapLocation, setMapLocation] = useState(null)
  const [showMap, setShowMap] = useState(false)
  // Dynamic Tests
  const [tests, setTests] = useState([])
  const [packages, setPackages] = useState([])
  // Loading
  const [loading, setLoading] = useState(false)
  // Form
  const selectedItem = pageLocation.state?.selectedItem
  const bookingType = pageLocation.state?.bookingType
  const [formData, setFormData] = useState({
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
    bookingTime: '',
    latitude: '',
    longitude: '',
  })
  useEffect(() => {
    if (!selectedItem?._id) return
    setFormData((prev) => ({
      ...prev,
      test: bookingType === 'test' ? selectedItem._id : '',
      package: bookingType === 'package' ? selectedItem._id : '',
    }))
  }, [selectedItem, bookingType])
  // Fetch Tests and Packages
  const fetchTests = async () => {
    try {
      const [testsRes, packagesRes] = await Promise.all([
        API.get(API_ENDPOINTS.TESTS),
        API.get(API_ENDPOINTS.PACKAGES),
      ])
      setTests(testsRes.data)
      setPackages(packagesRes.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTests()
  }, [])
  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target
    // Numbers Only
    if ((name === 'phone' || name === 'pincode') && value && !/^\d*$/.test(value)) {
      return
    }
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  // Submit Booking
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Empty Validation
    if (
      (!formData.test && !formData.package) ||
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
      toast.error('Please Fill All Fields')
      return
    }
    // Name Validation
    if (formData.patientName.length < 2) {
      toast.error('Patient Name Must Be At Least 2 Characters')
      return
    }
    // Age Validation
    if (formData.age < 1 || formData.age > 99) {
      toast.error('Age Must Be Between 1 and 99')
      return
    }
    // Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Enter Valid 10 Digit Phone Number')
      return
    }
    //Location
    if (!mapLocation) {
      toast.error('Please select location')
      return
    }
    // Pincode Validation
    const pincodeRegex = /^[1-9][0-9]{5}$/
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error('Enter Valid 6 Digit Pincode')
      return
    }
    try {
      setLoading(true)
      const payload = {
        ...formData,
        latitude: mapLocation?.lat,
        longitude: mapLocation?.lng,
      }
      await API.post(API_ENDPOINTS.BOOKINGS.BASE, payload)
      toast.success('Booking Created Successfully')
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking Failed')
    } finally {
      setLoading(false)
    }
  }
  const handleTestPackageChange = (e) => {
    const selectedId = e.target.value
    const isTest = tests.some((item) => item._id === selectedId)
    const isPackage = packages.some((item) => item._id === selectedId)
    setFormData((prev) => ({
      ...prev,
      test: isTest ? selectedId : '',
      package: isPackage ? selectedId : '',
    }))
  }
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setMapLocation({
          lat,
          lng,
        })
        await reverseGeocode(lat, lng)
      },
      () => {
        toast.error('Location Permission Denied')
      }
    )
  }
  const openMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setShowMap(true)
        },
        () => {
          setShowMap(true)
        }
      )
    } else {
      setShowMap(true)
    }
  }
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&lon=${lng}`
      )
      const data = await response.json()
      const area =
        data.address?.suburb ||
        data.address?.neighbourhood ||
        data.address?.residential ||
        data.address?.quarter ||
        ''
      const society = data.address?.hamlet || data.address?.allotments || ''
      const road = data.address?.road || ''
      const city = data.address?.city || data.address?.town || data.address?.village || ''
      const state = data.address?.state || ''
      const pincode = data.address?.postcode || ''
      const fullAddress = [area, road, society, city, state, pincode].filter(Boolean).join(', ')
      setFormData((prev) => ({
        ...prev,
        address: fullAddress,
        landmark: road,
        city,
        pincode,
        latitude: lat,
        longitude: lng,
      }))
      toast.success(`Location Selected: ${area}`)
    } catch {
      toast.error('Unable to fetch address')
    }
  }
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-blue-950 pt-8 pb-10 md:pt-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Book Your Lab Test
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 leading-7 max-w-2xl mx-auto">
            Easy online booking with home sample collection and accurate laboratory reports.
          </p>
        </div>
      </div>
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 grid lg:grid-cols-3 gap-6 md:gap-10">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[35px] shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-950">Appointment Details</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Fill all details carefully</p>
          <form onSubmit={handleSubmit} className="mt-6 md:mt-10 space-y-5 md:space-y-7">
            {/* Test */}
            <div>
              <Select
                label={
                  <span className="flex items-center gap-2">
                    <FaFlask /> Select Test / Package
                  </span>
                }
                name="test"
                value={formData.test || formData.package}
                required
                onChange={handleTestPackageChange}
              >
                <option value="">Choose Test or Package</option>
                {/* TESTS */}
                <optgroup label="Tests">
                  {tests.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title} — ₹{item.price}
                    </option>
                  ))}
                </optgroup>
                {/* PACKAGES */}
                <optgroup label="Packages">
                  {packages.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title} — ₹{item.price}
                    </option>
                  ))}
                </optgroup>
              </Select>
            </div>
            {/* Patient Name */}
            <div>
              <Input
                label={
                  <span className="flex items-center gap-2">
                    <FaUser /> Patient Name
                  </span>
                }
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                placeholder="Enter patient name"
              />
            </div>
            {/* Age + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <Input
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
            </div>
            {/* Phone */}
            <div>
              <Input
                label={
                  <span className="flex items-center gap-2">
                    <FaPhoneAlt /> Phone Number
                  </span>
                }
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>
            {/* Address */}
            <div className="space-y-5">
              {/* Full Address */}
              <div>
                <Textarea
                  label={
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt /> Full Address
                    </span>
                  }
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="House No, Street, Area"
                />
              </div>
              <div className="bg-gray-50 border rounded-3xl p-5">
                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt />
                  Location
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  <Button type="button" onClick={getCurrentLocation}>
                    📍 Use Current Location
                  </Button>
                  <Button type="button" onClick={openMap} variant="success">
                    🗺️ Select On Map
                  </Button>
                </div>
              </div>
              <Modal
                open={showMap}
                onClose={() => setShowMap(false)}
                title="Select Patient Location"
                size="full"
              >
                <LocationPicker
                  location={mapLocation}
                  setLocation={setMapLocation}
                  onLocationSelect={reverseGeocode}
                />
                <Button
                  onClick={() => {
                    if (!mapLocation?.lat) {
                      toast.error('Please select location')
                      return
                    }
                    setShowMap(false)
                  }}
                  fullWidth
                  variant="success"
                  className="mt-5"
                >
                  Confirm Location
                </Button>
              </Modal>
              {/* Flat + Landmark */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <Input
                    label="Flat / Apartment"
                    type="text"
                    name="flatNo"
                    value={formData.flatNo}
                    onChange={handleChange}
                    required
                    placeholder="Flat No / Building"
                  />
                </div>
                <div>
                  <Input
                    label="Landmark"
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    required
                    placeholder="Near Mall / Hospital"
                  />
                </div>
              </div>
              {/* City + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <Input
                    label="City/State"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city/state"
                  />
                </div>
                {/* Pincode */}
                <div>
                  <Input
                    label="Pincode"
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>
            {/* Date + Time */}
            <BookingDateTime formData={formData} handleChange={handleChange} />
            {/* Submit */}
            <Button type="submit" loading={loading} fullWidth size="lg">
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </PublicLayout>
  )
}
export default Booking
