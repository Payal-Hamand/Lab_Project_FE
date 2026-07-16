import React, { useEffect, useState, useContext, useRef } from 'react'
import BookingDateTime from '@/components/BookingDateTime'
import { toast } from 'react-toastify'
import Navbar from '@/components/Navbar'
import API from '@/services/api'
import { AuthContext } from '@/context/AuthContext'
import { FaUser, FaCalendarAlt, FaFileMedical, FaCheckCircle, FaClock } from 'react-icons/fa'
import { DashboardStatsCard, BookingsTable, EmptyState } from '@/components/Dashboard'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'
import { API_ENDPOINTS } from '@/constants/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Loader'
const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showManageModal, setShowManageModal] = useState(false)
  const [action, setAction] = useState('')
  const [reason, setReason] = useState('')
  const [bookings, setBookings] = useState([])
  const [activeSection, setActiveSection] = useState('all')
  const [loading, setLoading] = useState(true)
  const tableRef = useRef(null)
  const navigate = useNavigate()
  const [customReason, setCustomReason] = useState('')
  const [rescheduleData, setRescheduleData] = useState({
    bookingDate: '',
    bookingTime: '',
  })
  const fetchBookings = async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS)
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
  const openManageModal = (booking) => {
    setSelectedBooking(booking)
    setAction('')
    setReason('')
    setRescheduleData({
      bookingDate: '',
      bookingTime: '',
    })
    setShowManageModal(true)
  }
  const handleCancel = async () => {
    if (!reason) {
      toast.error('Please select cancellation reason')
      return
    }
    if (reason === 'Other' && !customReason.trim()) {
      toast.error('Please enter custom reason')
      return
    }
    try {
      await API.put(API_ENDPOINTS.BOOKINGS.MANAGE(selectedBooking._id), {
        action: 'cancel',
        reason: reason === 'Other' ? customReason : reason,
      })
      toast.success('Booking Cancelled Successfully')
      fetchBookings()
      setShowManageModal(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed To Cancel Booking')
    }
  }
  const handleReschedule = async () => {
    if (!rescheduleData.bookingDate) {
      toast.error('Please select booking date')
      return
    }
    if (!rescheduleData.bookingTime) {
      toast.error('Please select booking time')
      return
    }
    try {
      await API.put(API_ENDPOINTS.BOOKINGS.MANAGE(selectedBooking._id), {
        action: 'reschedule',
        bookingDate: rescheduleData.bookingDate,
        bookingTime: rescheduleData.bookingTime,
        reason,
      })
      toast.success('Booking Rescheduled Successfully')
      fetchBookings()
      setShowManageModal(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed To Reschedule Booking')
    }
  }
  const handleRescheduleChange = (e) => {
    const { name, value } = e.target
    setRescheduleData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const scrollToTable = () => {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }
  const filteredBookings =
    activeSection === 'pending'
      ? bookings.filter((item) => item.status === BOOKING_STATUS.PENDING)
      : activeSection === 'completed'
        ? bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
        : activeSection === 'reports'
          ? bookings.filter((item) => item.report)
          : bookings
  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      {/* Hero */}
      <div className="bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            Patient Dashboard
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-5">Welcome Back</h1>
          <p className="mt-4 text-blue-100">{user?.name}</p>
        </div>
      </div>
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <DashboardStatsCard
            title="Total Bookings"
            value={bookings.length}
            icon={<FaCalendarAlt />}
            color="blue"
            bgColor="bg-blue-100 text-blue-600"
            active={activeSection === 'all'}
            onClick={() => {
              setActiveSection('all')
              scrollToTable()
            }}
          />
          <DashboardStatsCard
            title="Completed"
            value={bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length}
            icon={<FaCheckCircle />}
            color="green"
            bgColor="bg-green-100 text-green-600"
            active={activeSection === 'completed'}
            onClick={() => {
              setActiveSection('completed')
              scrollToTable()
            }}
          />
          <DashboardStatsCard
            title="Pending"
            value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
            icon={<FaClock />}
            color="yellow"
            bgColor="bg-yellow-100 text-yellow-600"
            active={activeSection === 'pending'}
            onClick={() => {
              setActiveSection('pending')
              scrollToTable()
            }}
          />
          <DashboardStatsCard
            title="Reports"
            value={bookings.filter((item) => item.report).length}
            icon={<FaFileMedical />}
            color="purple"
            bgColor="bg-purple-100 text-purple-600"
            active={activeSection === 'reports'}
            onClick={() => {
              setActiveSection('reports')
              scrollToTable()
            }}
          />
        </div>
        <div ref={tableRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950">My Bookings</h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                View all your booked tests & reports
              </p>
            </div>
            <Button
              onClick={() => {
                navigate(ROUTES.BOOKING)
              }}
            >
              Book New Test
            </Button>
          </div>
          {loading ? (
            <Spinner />
          ) : filteredBookings.length === 0 ? (
            <EmptyState text="No Bookings Found" />
          ) : (
            <>
              <div className="hidden lg:block">
                <BookingsTable bookings={filteredBookings} openManageModal={openManageModal} />
              </div>
              <div className="lg:hidden grid gap-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-[28px] shadow-lg border border-slate-100 overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
                    <div className="p-5">
                      {/* Patient */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="font-bold text-xl text-slate-900">
                            {booking.patientName}
                          </h2>
                          <p className="text-gray-500 mt-1">📞 {booking.phone}</p>
                        </div>
                        <Badge status={booking.status}>{booking.status}</Badge>
                      </div>
                      {/* Test */}
                      <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500 mb-2">Test / Package</p>
                        <div className="flex justify-between items-center gap-4">
                          <h3 className="font-bold text-slate-800 text-lg">
                            {booking?.test?.title || booking?.package?.title || 'N/A'}
                          </h3>
                          <p className="text-green-600 font-bold text-xl whitespace-nowrap">
                            ₹{booking?.test?.price || booking?.package?.price || 0}
                          </p>
                        </div>
                      </div>
                      {/* Schedule */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-purple-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500">Date</p>
                          <h3 className="font-semibold text-purple-700 mt-1">
                            {booking.bookingDate}
                          </h3>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500">Time</p>
                          <h3 className="font-semibold text-orange-700 mt-1">
                            {booking.bookingTime}
                          </h3>
                        </div>
                      </div>
                      {/* Payment */}
                      <div className="mt-4 bg-green-50 rounded-2xl p-4">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Payment Status</span>
                          <Badge
                            status={
                              booking.paymentStatus === PAYMENT_STATUS.PAID
                                ? PAYMENT_STATUS.PAID
                                : PAYMENT_STATUS.UNPAID
                            }
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                      {/* Address */}
                      <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500">Service Address</p>
                        <p className="text-slate-700 mt-2">
                          {booking.flatNo}, {booking.address}, {booking.city}
                          {' - '}
                          {booking.pincode}
                        </p>
                      </div>
                      {/* Report */}
                      {booking.report && (
                        <a
                          href={booking.report}
                          target="_blank"
                          rel="noreferrer"
                          className="
            mt-4
            w-full
            flex
            justify-center
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-2xl
            font-medium
            "
                        >
                          📄 Download Report
                        </a>
                      )}
                      {/* Manage */}
                      {booking.status !== BOOKING_STATUS.COMPLETED &&
                        booking.status !== BOOKING_STATUS.CANCELLED && (
                          <Button
                            onClick={() => openManageModal(booking)}
                            fullWidth
                            variant="warning"
                          >
                            ⚙️ Manage Booking
                          </Button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        open={showManageModal}
        onClose={() => setShowManageModal(false)}
        title="Manage Booking"
        subtitle="Cancel or reschedule your appointment"
      >
        <div className="space-y-4">
          {action === '' && (
            <>
              <Button onClick={() => setAction('reschedule')} fullWidth>
                📅 Reschedule Booking
              </Button>
              <Button onClick={() => setAction('cancel')} variant="danger" fullWidth>
                ❌ Cancel Booking
              </Button>
            </>
          )}
          {action === 'reschedule' && (
            <div className="space-y-4">
              <Button
                onClick={() => setAction('')}
                variant="ghost"
                size="sm"
                className="text-blue-600"
              >
                ← Back
              </Button>
              <BookingDateTime formData={rescheduleData} handleChange={handleRescheduleChange} />
              <Textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (Optional)"
              />
              <Button onClick={handleReschedule} variant="success" fullWidth>
                Save Changes
              </Button>
            </div>
          )}
          {action === 'cancel' && (
            <div className="space-y-4">
              <Button
                onClick={() => setAction('')}
                variant="ghost"
                size="sm"
                className="text-blue-600"
              >
                ← Back
              </Button>
              <Select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select Reason</option>
                <option value="Booked By Mistake">Booked By Mistake</option>
                <option value="Not Available">Not Available</option>
                <option value="Found Another Lab">Found Another Lab</option>
                <option value="Other">Other</option>
              </Select>
              {reason === 'Other' && (
                <Textarea
                  rows={4}
                  required
                  placeholder="Please enter cancellation reason *"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              )}
              <Button
                onClick={handleCancel}
                disabled={!reason || (reason === 'Other' && !customReason.trim())}
                variant="danger"
                fullWidth
              >
                Confirm Cancellation
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
export default Dashboard
