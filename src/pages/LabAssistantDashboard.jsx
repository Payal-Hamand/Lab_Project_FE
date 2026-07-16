import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '@/components/Navbar'
import API from '@/services/api'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'
import { API_ENDPOINTS } from '@/constants/api'
import {
  FaMapMarkedAlt,
  FaMicroscope,
  FaMoneyCheckAlt,
  FaFileMedical,
  FaUserCircle,
  FaFlask,
  FaClipboardList,
  FaCheckCircle,
  FaVial,
  FaMoneyBillWave,
  FaFileUpload,
  FaMapMarkerAlt,
  FaRoute,
} from 'react-icons/fa'
import { DashboardStatsCard, EmptyState } from '@/components/Dashboard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Loader'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import Textarea from '@/components/ui/Textarea'
const LabAssistantDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadingSample, setUploadingSample] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [sampleImages, setSampleImages] = useState([])
  const [assistantNotes, setAssistantNotes] = useState('')
  const [showSampleModal, setShowSampleModal] = useState(false)
  const fetchBookings = async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.BOOKINGS.ASSIGNED)
      setBookings(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBookings()
  }, [])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const payment = params.get('payment')
    if (payment) {
      window.history.replaceState({}, '', '/lab-assistant')
    }
    if (payment === 'success') {
      toast.success('Payment Successful')
    }
    if (payment === 'failed') {
      toast.error('Payment Failed')
    }
  }, [])
  const handleReached = async (bookingId) => {
    try {
      await API.put(API_ENDPOINTS.BOOKINGS.REACHED(bookingId))
      fetchBookings()
    } catch (error) {
      console.log(error)
    }
  }
  const openSampleModal = (booking) => {
    setSelectedBooking(booking)
    setSampleImages([])
    setAssistantNotes('')
    setShowSampleModal(true)
  }
  const handleSampleUpload = async () => {
    if (sampleImages.length === 0) {
      toast.error('Please select at least one sample image')
      return
    }
    try {
      setUploadingSample(true)
      const formData = new FormData()
      sampleImages.forEach((image) => {
        formData.append('sampleImages', image)
      })
      formData.append('assistantNotes', assistantNotes)
      await API.put(API_ENDPOINTS.BOOKINGS.SAMPLE(selectedBooking._id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('Sample uploaded successfully')
      setShowSampleModal(false)
      setSampleImages([])
      setAssistantNotes('')
      fetchBookings()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Upload failed')
    } finally {
      setUploadingSample(false)
    }
  }
  const openNavigation = (booking) => {
    const lat = booking.patientLatitude
    const lng = booking.patientLongitude
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      '_blank'
    )
  }
  const handlePayment = async (booking) => {
    try {
      const { data } = await API.post(API_ENDPOINTS.PAYMENT.CREATE, {
        bookingId: booking._id,
        amount: booking?.test?.price || booking?.package?.price,
      })
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'MediLab Healthcare',
        description: 'Lab Test Payment',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verify = await API.post(API_ENDPOINTS.PAYMENT.VERIFY, {
              ...response,
              bookingId: booking._id,
            })
            if (verify.data.success) {
              toast.success('Payment Successful')
              fetchBookings()
            } else {
              toast.error('Payment Verification Failed')
            }
          } catch (error) {
            console.log(error)
            toast.error('Payment Verification Failed')
          }
        },
        modal: {
          ondismiss: async function () {
            toast.info('Payment Cancelled')
            await API.put(API_ENDPOINTS.BOOKINGS.PAYMENT_STATUS(booking._id), {
              paymentStatus: 'Failed',
            })
            fetchBookings()
          },
        },
        prefill: {
          name: booking.patientName,
          contact: booking.phone,
        },
        theme: {
          color: '#2563eb',
        },
      }
      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', async function (response) {
        toast.error(response.error.description || 'Payment Failed')
        await API.put(API_ENDPOINTS.BOOKINGS.PAYMENT_STATUS(booking._id), {
          paymentStatus: 'Failed',
        })
        fetchBookings()
      })
      razorpay.open()
    } catch (error) {
      console.log(error)
      toast.error('Payment Failed')
    }
  }
  const searchBookings = async (value) => {
    setSearchTerm(value)
    try {
      const { data } = await API.get(`${API_ENDPOINTS.BOOKINGS.ASSIGNED_SEARCH}?search=${value}`)
      setBookings(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchBookings(searchTerm)
      } else {
        fetchBookings()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])
  const filteredBookings =
    activeSection === 'pending'
      ? bookings.filter((item) => item.status === BOOKING_STATUS.PENDING)
      : activeSection === 'completed'
        ? bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
        : bookings
  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <div className="bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            Lab Assistant Portal
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-5">Lab Assistant Dashboard</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          <DashboardStatsCard
            title="Total Tests"
            value={bookings.length}
            icon={<FaFlask />}
            color="blue"
            bgColor="bg-blue-100 text-blue-600"
            active={activeSection === 'all'}
            onClick={() => setActiveSection('all')}
          />
          <DashboardStatsCard
            title="Pending Reports"
            value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
            icon={<FaClipboardList />}
            color="yellow"
            bgColor="bg-yellow-100 text-yellow-600"
            active={activeSection === 'pending'}
            onClick={() => setActiveSection('pending')}
          />
          <DashboardStatsCard
            title="Completed"
            value={bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length}
            icon={<FaCheckCircle />}
            color="green"
            bgColor="bg-green-100 text-green-600"
            active={activeSection === 'completed'}
            onClick={() => setActiveSection('completed')}
          />
        </div>
        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search patient, mobile, test or package..."
                value={searchTerm}
                onChange={(e) => searchBookings(e.target.value)}
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
            <div className="bg-blue-50 px-5 py-3 rounded-2xl font-semibold text-blue-700">
              {bookings.length} Bookings
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : bookings.length === 0 ? (
            <EmptyState text="No Assigned Bookings" />
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-[1400px]">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-4 text-left">Patient</th>
                      <th className="px-4 py-4 text-left">Test</th>
                      <th className="px-4 py-4 text-left">Date</th>
                      <th className="px-4 py-4 text-left">Address</th>
                      <th className="px-4 py-4 text-left">Status</th>
                      <th className="px-4 py-4 text-left">Payment</th>
                      <th className="px-4 py-4 text-center w-[240px]">Actions</th>
                      <th className="px-4 py-4 text-center">Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-5 truncate">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUserCircle className="text-blue-600 text-2xl" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.patientName}</h3>
                              <p className="text-sm text-gray-500">{item.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5 truncate">
                          <div>
                            <p className="font-semibold">
                              {item?.test?.title || item?.package?.title}
                            </p>
                            <p className="text-green-600 font-bold">
                              ₹{item?.test?.price || item?.package?.price}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-5 truncate">
                          <p className="font-medium">{item.bookingDate}</p>
                          <p className="text-sm text-gray-500">{item.bookingTime}</p>
                        </td>
                        <td className="px-4 py-5 max-w-xs truncate">
                          <div className="flex gap-2">
                            <FaMapMarkerAlt className="text-red-500 mt-1" />
                            <span className="text-sm text-gray-600">{item.address}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 truncate">
                          <Badge status={item.status}>{item.status}</Badge>
                        </td>
                        <td className="px-4 py-5 truncate">
                          <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex gap-2 flex-wrap">
                            <div className="relative group">
                              <Button
                                size="icon"
                                variant="danger"
                                onClick={() => openNavigation(item)}
                              >
                                <FaRoute />
                              </Button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                                Navigation
                              </span>
                            </div>
                            <div className="relative group">
                              <Button
                                size="icon"
                                variant={
                                  item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'
                                }
                                onClick={() => handleReached(item._id)}
                                disabled={item.status !== BOOKING_STATUS.ASSIGNED}
                              >
                                <FaMapMarkedAlt />
                              </Button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                                Mark Reached
                              </span>
                            </div>
                            <div className="relative group">
                              <Button
                                size="icon"
                                variant={
                                  item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'
                                }
                                onClick={() => openSampleModal(item)}
                                disabled={item.status !== BOOKING_STATUS.REACHED}
                              >
                                <FaMicroscope />
                              </Button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                                Collect Sample
                              </span>
                            </div>
                            <div className="relative group">
                              <Button
                                size="icon"
                                variant={
                                  item.status === BOOKING_STATUS.SAMPLE_COLLECTED &&
                                  item.paymentStatus !== PAYMENT_STATUS.PAID
                                    ? 'success'
                                    : 'ghost'
                                }
                                onClick={() => handlePayment(item)}
                                disabled={
                                  item.status !== BOOKING_STATUS.SAMPLE_COLLECTED ||
                                  item.paymentStatus === PAYMENT_STATUS.PAID
                                }
                              >
                                <FaMoneyCheckAlt />
                              </Button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                                Collect Payment
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5 truncate">
                          {item.report ? (
                            <a
                              href={item.report}
                              target="_blank"
                              rel="noreferrer"
                              className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded-xl
      "
                            >
                              View Report
                            </a>
                          ) : (
                            <span className="text-red-500">Payment Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:hidden space-y-5">
                {filteredBookings.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-[28px] bg-white shadow-lg border border-slate-100"
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
                    <div className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                          <FaUserCircle className="text-blue-600 text-3xl" />
                        </div>
                        <div className="flex-1">
                          <h2 className="font-bold text-slate-800 text-lg">{item.patientName}</h2>
                          <p className="text-sm text-gray-500">📞 {item.phone}</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500 mb-2">Test / Package</p>
                        <div className="flex justify-between items-center gap-4">
                          <h3 className="font-bold text-slate-800 text-lg">
                            {item?.test?.title || item?.package?.title || 'N/A'}
                          </h3>
                          <p className="text-green-600 font-bold text-xl whitespace-nowrap">
                            ₹{item?.test?.price || item?.package?.price || 0}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-blue-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="font-semibold text-blue-900">{item.bookingDate}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="font-semibold text-purple-900">{item.bookingTime}</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-slate-50 rounded-xl p-4">
                        <div className="flex gap-3">
                          <FaMapMarkerAlt className="text-red-500 mt-1" />
                          <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="text-sm text-slate-700 mt-1">{item.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        <Badge status={item.status}>{item.status}</Badge>
                        <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mt-5">
                        <Button
                          size="icon"
                          variant="danger"
                          className="h-12"
                          onClick={() => openNavigation(item)}
                        >
                          <FaRoute className="mx-auto" />
                        </Button>
                        <Button
                          size="icon"
                          variant={item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'}
                          className="h-12"
                          onClick={() => handleReached(item._id)}
                          disabled={item.status !== BOOKING_STATUS.ASSIGNED}
                        >
                          <FaMapMarkedAlt className="mx-auto" />
                        </Button>
                        <Button
                          size="icon"
                          variant={item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'}
                          className="h-12"
                          onClick={() => openSampleModal(item)}
                          disabled={item.status !== BOOKING_STATUS.REACHED}
                        >
                          <FaMicroscope className="mx-auto" />
                        </Button>
                        <Button
                          size="icon"
                          variant={
                            item.status === BOOKING_STATUS.SAMPLE_COLLECTED &&
                            item.paymentStatus !== PAYMENT_STATUS.PAID
                              ? 'success'
                              : 'ghost'
                          }
                          className="h-12"
                          onClick={() => handlePayment(item)}
                          disabled={
                            item.status !== BOOKING_STATUS.SAMPLE_COLLECTED ||
                            item.paymentStatus === PAYMENT_STATUS.PAID
                          }
                        >
                          <FaMoneyCheckAlt className="mx-auto" />
                        </Button>
                      </div>
                      <div className="mt-5">
                        {item.report ? (
                          <a
                            href={item.report}
                            target="_blank"
                            rel="noreferrer"
                            className="
      w-full
      flex
      items-center
      justify-center
      gap-2
      bg-green-600
      hover:bg-green-700
      text-white
      rounded-2xl
      py-3
      "
                          >
                            <FaFileMedical />
                            View Report
                          </a>
                        ) : item.paymentStatus !== PAYMENT_STATUS.PAID ? (
                          <div
                            className="
      bg-red-50
      text-red-600
      rounded-2xl
      py-3
      text-center
      font-medium
    "
                          >
                            Payment Pending
                          </div>
                        ) : (
                          <div className="space-y-3"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        open={showSampleModal}
        onClose={() => {
          setShowSampleModal(false)
          setSampleImages([])
        }}
        title="Upload Sample"
        subtitle="Upload blood sample tube image"
        size="lg"
      >
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <label
              className="
group
border-2
border-dashed
border-blue-200
hover:border-blue-500
rounded-3xl
p-5 md:p-8
bg-blue-50/40
hover:bg-blue-50
transition
"
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setSampleImages((prev) => [...prev, e.target.files[0]])
                  }
                }}
              />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-blue-100 group-hover:bg-blue-600 transition flex items-center justify-center text-4xl">
                📷
              </div>
              <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">Capture Sample</h2>
              <p className="text-gray-500 text-center mt-2 text-sm leading-6">
                Open mobile camera and capture blood tube image
              </p>
            </label>
            <label
              className="
group
border-2
border-dashed
border-pink-200
hover:border-pink-500
rounded-3xl
p-5 md:p-8
bg-pink-50/40
hover:bg-pink-50
transition
"
            >
              {' '}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                  setSampleImages((prev) => [...prev, ...Array.from(e.target.files)])
                }}
              />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-pink-100 group-hover:bg-pink-600 transition flex items-center justify-center text-4xl">
                🖼️
              </div>
              <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">Upload Images</h2>
              <p className="text-gray-500 text-center mt-2 text-sm leading-6">
                Select multiple sample images from gallery
              </p>
            </label>
          </div>
          {sampleImages.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-950">Selected Images</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {sampleImages.length} Images
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sampleImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="
  w-16
  h-16
  object-cover
  rounded-xl
  border
  border-gray-200
  "
                    />
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="danger"
                      onClick={() => {
                        setSampleImages(sampleImages.filter((_, i) => i !== index))
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 text-xs"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSampleImages([])}
                className="mt-3 text-red-600 text-sm font-medium"
              >
                Remove All Images
              </Button>
            </div>
          )}
          <div className="mt-8">
            <Textarea
              label="Assistant Notes"
              rows={2}
              placeholder="Assistant notes..."
              value={assistantNotes}
              onChange={(e) => setAssistantNotes(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button
              variant="primary"
              fullWidth
              loading={uploadingSample}
              disabled={uploadingSample || sampleImages.length === 0}
              onClick={handleSampleUpload}
            >
              {uploadingSample ? 'Uploading...' : 'Upload Sample'}
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setShowSampleModal(false)
                setSampleImages([])
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default LabAssistantDashboard
