import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layout/DashboardLayout'
import useAuth from '@/hooks/useAuth'
import { getMyBookings, manageBooking } from '@/services/booking.service'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS } from '@/constants/status'
import Button from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Loader'
import PatientStatsGrid from '@/features/patient/components/PatientStatsGrid'
import BookingMobileCard from '@/features/patient/components/BookingMobileCard'
import ManageBookingModal from '@/features/patient/components/ManageBookingModal'
import BookingsTable from '@/components/Dashboard/BookingsTable'
import { motion } from 'framer-motion'
import EmptyState from '@/components/EmptyState'
import { db } from '@/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

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

    if (!user?._id) return

    // Listen for real-time status updates from Firestore
    const q = query(collection(db, 'bookings'), where('patient', '==', user._id))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const updatedDoc = change.doc.data()
          setBookings((prev) =>
            prev.map((b) =>
              b._id === updatedDoc._id
                ? { ...b, status: updatedDoc.status, report: updatedDoc.report || b.report }
                : b
            )
          )
        }
      })
    })

    return () => unsubscribe()
  }, [user])

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
      <div className="bg-background min-h-screen pb-10">
        {/* Greet Banner */}
        <div className="bg-card border-b border-border">
          <div className="enterprise-container py-10">
            <div className="inline-flex items-center gap-2 text-primary px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              Patient Dashboard
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Welcome back, <span className="text-primary">{user?.name}</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Manage your bookings and download reports
            </p>
          </div>
        </div>

        <div className="enterprise-container py-8">
          <PatientStatsGrid
            bookings={bookings}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollToTable={scrollToTable}
          />

          {/* Bookings section */}
          <div
            ref={tableRef}
            className="bg-card border border-border rounded-xl shadow-sm mt-8 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground">My Bookings</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  View all your booked tests &amp; reports
                </p>
              </div>
              <Button onClick={() => navigate(ROUTES.BOOKING)}>
                Book New Test
              </Button>
            </div>

            {loading ? (
              <Spinner />
            ) : fetchError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
                <p className="text-red-600 text-xs font-medium">{fetchError}</p>
                <Button onClick={fetchBookings} variant="outline" className="mt-3" size="sm">
                  Retry
                </Button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState text="No Bookings Found" />
            ) : (
              <>
                <motion.div 
                  className="hidden lg:block"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <BookingsTable bookings={filteredBookings} openManageModal={openManageModal} />
                </motion.div>
                <div className="lg:hidden grid gap-3">
                  {filteredBookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <BookingMobileCard
                        booking={booking}
                        openManageModal={openManageModal}
                      />
                    </motion.div>
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
