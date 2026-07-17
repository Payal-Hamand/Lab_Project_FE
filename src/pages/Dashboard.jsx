import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layout/DashboardLayout'
import useAuth from '@/hooks/useAuth'
import { getMyBookings, manageBooking } from '@/services/booking.service'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS } from '@/constants/status'
import Button from '@/components/ui/Button'
import { BookingsTable, EmptyState } from '@/components/Dashboard'
import { Spinner } from '@/components/ui/Loader'
import PatientStatsGrid from '@/features/patient/components/PatientStatsGrid'
import BookingMobileCard from '@/features/patient/components/BookingMobileCard'
import ManageBookingModal from '@/features/patient/components/ManageBookingModal'

const Dashboard = () => {
  const { user } = useAuth()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showManageModal, setShowManageModal] = useState(false)
  const [action, setAction] = useState('')
  const [reason, setReason] = useState('')
  const [bookings, setBookings] = useState([])
  const [activeSection, setActiveSection] = useState('all')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const tableRef = useRef(null)
  const navigate = useNavigate()
  const [customReason, setCustomReason] = useState('')
  const [rescheduleData, setRescheduleData] = useState({
    bookingDate: '',
    bookingTime: '',
  })

  const fetchBookings = async () => {
    try {
      setFetchError(null)
      const { data } = await getMyBookings()
      setBookings(data)
    } catch {
      setFetchError('Failed to load bookings. Please try again.')
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
    setRescheduleData({ bookingDate: '', bookingTime: '' })
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
      await manageBooking(selectedBooking._id, {
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
      await manageBooking(selectedBooking._id, {
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
    setRescheduleData((prev) => ({ ...prev, [name]: value }))
  }

  const scrollToTable = () => {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    <DashboardLayout>
      <div className="bg-surface min-h-screen">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <PatientStatsGrid
            bookings={bookings}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollToTable={scrollToTable}
          />

          <div ref={tableRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-950">My Bookings</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  View all your booked tests & reports
                </p>
              </div>
              <Button onClick={() => navigate(ROUTES.BOOKING)}>Book New Test</Button>
            </div>

            {loading ? (
              <Spinner />
            ) : fetchError ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <p className="text-red-600 font-medium">{fetchError}</p>
                <Button onClick={fetchBookings} variant="outline" className="mt-4">
                  Retry
                </Button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState text="No Bookings Found" />
            ) : (
              <>
                <div className="hidden lg:block">
                  <BookingsTable bookings={filteredBookings} openManageModal={openManageModal} />
                </div>
                <div className="lg:hidden grid gap-4">
                  {filteredBookings.map((booking) => (
                    <BookingMobileCard
                      key={booking._id}
                      booking={booking}
                      openManageModal={openManageModal}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <ManageBookingModal
          showManageModal={showManageModal}
          setShowManageModal={setShowManageModal}
          action={action}
          setAction={setAction}
          reason={reason}
          setReason={setReason}
          customReason={customReason}
          setCustomReason={setCustomReason}
          rescheduleData={rescheduleData}
          handleRescheduleChange={handleRescheduleChange}
          handleCancel={handleCancel}
          handleReschedule={handleReschedule}
        />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
