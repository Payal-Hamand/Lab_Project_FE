import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllTests } from '@/services/test.service'
import { getAllPackages } from '@/services/package.service'
import { createBooking } from '@/services/booking.service'
import { toast } from 'react-toastify'
import { ROUTES } from '@/constants/routes'

export default function useBookingForm() {
  const navigate = useNavigate()
  const pageLocation = useLocation()

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

  const [tests, setTests] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [mapLocation, setMapLocation] = useState(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (!selectedItem?._id) return
    setFormData((prev) => ({
      ...prev,
      test: bookingType === 'test' ? selectedItem._id : '',
      package: bookingType === 'package' ? selectedItem._id : '',
    }))
  }, [selectedItem, bookingType])

  const fetchTests = async () => {
    try {
      setFetchError(null)
      const [testsRes, packagesRes] = await Promise.all([getAllTests(), getAllPackages()])
      setTests(testsRes.data)
      setPackages(packagesRes.data)
    } catch {
      setFetchError('Failed to load tests and packages. Please try again.')
    }
  }

  useEffect(() => {
    fetchTests()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if ((name === 'phone' || name === 'pincode') && value && !/^\d*$/.test(value)) {
      return
    }
    setFormData({
      ...formData,
      [name]: value,
    })
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

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setMapLocation({ lat, lng })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    if (formData.patientName.length < 2) {
      toast.error('Patient Name Must Be At Least 2 Characters')
      return
    }
    if (formData.age < 1 || formData.age > 99) {
      toast.error('Age Must Be Between 1 and 99')
      return
    }
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Enter Valid 10 Digit Phone Number')
      return
    }
    if (!mapLocation) {
      toast.error('Please select location')
      return
    }
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
      await createBooking(payload)
      toast.success('Booking Created Successfully')
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking Failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    tests,
    packages,
    loading,
    fetchError,
    mapLocation,
    setMapLocation,
    showMap,
    setShowMap,
    fetchTests,
    handleChange,
    handleTestPackageChange,
    handleSubmit,
    getCurrentLocation,
    openMap,
    reverseGeocode,
  }
}
