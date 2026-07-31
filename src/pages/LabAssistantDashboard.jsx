import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  getAssignedBookings,
  searchAssignedBookings,
  markReached,
  uploadSample,
  updatePaymentStatus,
} from '@/services/booking.service'
import { createPaymentOrder, verifyPayment } from '@/services/user.service'
import { BOOKING_STATUS } from '@/constants/status'
import { EmptyState } from '@/components/Dashboard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Loader'
import { Search } from 'lucide-react'
import LabAssistantStatsGrid from '@/features/lab-assistant/components/LabAssistantStatsGrid'
import LabAssistantBookingsTable from '@/features/lab-assistant/components/LabAssistantBookingsTable'
import LabAssistantBookingMobileCard from '@/features/lab-assistant/components/LabAssistantBookingMobileCard'
import LabAssistantSampleModal from '@/features/lab-assistant/components/LabAssistantSampleModal'
import ReportViewerModal from '@/components/Dashboard/ReportViewerModal'

const LabAssistantDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadingSample, setUploadingSample] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [activeSection, setActiveSection] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [sampleImages, setSampleImages] = useState([])
  const [assistantNotes, setAssistantNotes] = useState('')
  const [showSampleModal, setShowSampleModal] = useState(false)
  const [previewReport, setPreviewReport] = useState(null)

  const fetchBookings = async () => {
    try {
      setFetchError(null)
      const { data } = await getAssignedBookings()
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
      await markReached(bookingId)
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
      await uploadSample(selectedBooking._id, formData)
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
      const { data } = await createPaymentOrder({
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
            const verify = await verifyPayment({
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
            await updatePaymentStatus(booking._id, 'Failed')
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
        await updatePaymentStatus(booking._id, 'Failed')
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
      const { data } = await searchAssignedBookings(value)
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
    <DashboardLayout>
      <div className="bg-background min-h-screen">
        <div className="bg-tertiary">
          <div className="enterprise-container py-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              Lab Assistant Portal
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white">Lab Assistant Dashboard</h1>
          </div>
        </div>
        <div className="enterprise-container py-6">
          <LabAssistantStatsGrid
            bookings={bookings}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
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
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <div className="bg-primary/10 px-4 py-2.5 rounded-lg text-xs font-semibold text-primary">
                Total Bookings: {filteredBookings.length}
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : fetchError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center mt-6">
                <p className="text-red-600 text-xs font-medium">{fetchError}</p>
                <Button onClick={fetchBookings} variant="outline" className="mt-4">
                  Retry
                </Button>
              </div>
            ) : bookings.length === 0 ? (
              <EmptyState text="No Assigned Bookings" />
            ) : (
              <>
                <LabAssistantBookingsTable
                  filteredBookings={filteredBookings}
                  handleReached={handleReached}
                  openSampleModal={openSampleModal}
                  openNavigation={openNavigation}
                  handlePayment={handlePayment}
                  setPreviewReport={setPreviewReport}
                />
                <LabAssistantBookingMobileCard
                  filteredBookings={filteredBookings}
                  handleReached={handleReached}
                  openSampleModal={openSampleModal}
                  openNavigation={openNavigation}
                  handlePayment={handlePayment}
                  setPreviewReport={setPreviewReport}
                />
              </>
            )}
          </div>
        </div>
        <LabAssistantSampleModal
          showSampleModal={showSampleModal}
          setShowSampleModal={setShowSampleModal}
          sampleImages={sampleImages}
          setSampleImages={setSampleImages}
          assistantNotes={assistantNotes}
          setAssistantNotes={setAssistantNotes}
          handleSampleUpload={handleSampleUpload}
          uploadingSample={uploadingSample}
        />
        <ReportViewerModal
          isOpen={!!previewReport}
          onClose={() => setPreviewReport(null)}
          reportUrl={previewReport}
        />
      </div>
    </DashboardLayout>
  )
}

export default LabAssistantDashboard
