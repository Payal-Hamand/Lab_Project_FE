import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { toast } from 'react-toastify'
import {
  getLabOwnerBookings,
  searchLabOwnerBookings,
  assignAssistant,
  uploadReport,
} from '@/services/booking.service'
import { getMyAssistants, createLabAssistant } from '@/services/user.service'
import { UserPlus } from 'lucide-react'
import { DashboardStatsCard, EmptyState } from '@/components/Dashboard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Loader'
import LabOwnerStatsGrid from '@/features/lab-owner/components/LabOwnerStatsGrid'
import LabOwnerAssistantsSection from '@/features/lab-owner/components/LabOwnerAssistantsSection'
import LabOwnerBookingsTable from '@/features/lab-owner/components/LabOwnerBookingsTable'
import LabOwnerBookingMobileCard from '@/features/lab-owner/components/LabOwnerBookingMobileCard'
import { Search } from 'lucide-react'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const LabOwnerDashboard = () => {
  const tableRef = useRef(null)
  const [bookings, setBookings] = useState([])
  const [creatingAssistant, setCreatingAssistant] = useState(false)
  const [assistants, setAssistants] = useState([])
  const [selectedReport, setSelectedReport] = useState({})
  const [uploadingReport, setUploadingReport] = useState({})
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [activeSection, setActiveSection] = useState('all')
  const [selectedAssistant, setSelectedAssistant] = useState(null)
  const [showAssistantForm, setShowAssistantForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [assistantData, setAssistantData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    document: '',
  })
  const fetchBookings = async () => {
    try {
      setFetchError(null)
      const { data } = await getLabOwnerBookings()
      setBookings(data)
    } catch {
      setFetchError('Failed to load bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  const fetchAssistants = async () => {
    try {
      const { data } = await getMyAssistants()
      setAssistants(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBookings()
    fetchAssistants()
  }, [])
  const handleChange = (e) => {
    setAssistantData({
      ...assistantData,
      [e.target.name]: e.target.value,
    })
  }
  const handleCreateAssistant = async (e) => {
    e.preventDefault()
    if (creatingAssistant) return
    const { name, email, mobile, password } = assistantData
    if (!name.trim()) {
      return toast.error('Full Name is required')
    }
    if (!email.trim()) {
      return toast.error('Email is required')
    }
    if (!mobile.trim()) {
      return toast.error('Mobile Number is required')
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return toast.error('Enter a valid 10-digit mobile number')
    }
    if (!password.trim()) {
      return toast.error('Password is required')
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }
    try {
      setCreatingAssistant(true)
      const { data } = await createLabAssistant(assistantData)
      toast.success(data?.message || 'Assistant created successfully')
      fetchAssistants()
      setAssistantData({
        name: '',
        email: '',
        password: '',
        mobile: '',
        document: '',
      })
      setShowAssistantForm(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create assistant')
    } finally {
      setCreatingAssistant(false)
    }
  }
  const handleAssignAssistant = async (bookingId, assistantId) => {
    if (!assistantId) {
      return toast.error('Please select an assistant')
    }
    try {
      const { data } = await assignAssistant(bookingId, assistantId)
      toast.success(data?.message || 'Assistant assigned successfully')
      fetchBookings()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to assign assistant')
    }
  }
  const searchBookings = async (value) => {
    setSearchTerm(value)
    try {
      const { data } = await searchLabOwnerBookings(value)
      setBookings(data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleUploadReport = async (bookingId) => {
    if (!selectedReport[bookingId]) {
      return toast.error('Please select report file')
    }
    try {
      setUploadingReport((prev) => ({
        ...prev,
        [bookingId]: true,
      }))
      const formData = new FormData()
      formData.append('report', selectedReport[bookingId])
      await uploadReport(bookingId, formData)
      toast.success('Report Uploaded Successfully')
      fetchBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload Failed')
    } finally {
      setUploadingReport((prev) => ({
        ...prev,
        [bookingId]: false,
      }))
    }
  }
  const scrollToTable = () => {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
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
  const filteredBookings = selectedAssistant
    ? bookings.filter((booking) => booking.assignedLabAssistant?._id === selectedAssistant)
    : activeSection === 'pending'
      ? bookings.filter((item) => item.status === BOOKING_STATUS.PENDING)
      : activeSection === 'completed'
        ? bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
        : bookings
  return (
    <DashboardLayout>
      <div className="bg-surface min-h-screen">
        <div className="bg-blue-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Laboratory Management Portal
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mt-5">Lab Owner Dashboard</h1>
            <p className="mt-4 text-blue-100 max-w-2xl">
              Manage bookings, assign assistants, and monitor laboratory operations.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <LabOwnerStatsGrid
            bookings={bookings}
            assistants={assistants}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setSelectedAssistant={setSelectedAssistant}
            scrollToTable={scrollToTable}
          />
          <LabOwnerAssistantsSection
            assistants={assistants}
            bookings={bookings}
            activeSection={activeSection}
            selectedAssistant={selectedAssistant}
            setSelectedAssistant={setSelectedAssistant}
            showAssistantForm={showAssistantForm}
            setShowAssistantForm={setShowAssistantForm}
            scrollToTable={scrollToTable}
          />
          <Modal
            open={showAssistantForm}
            onClose={() => setShowAssistantForm(false)}
            title="Create Assistant"
            subtitle="Add new laboratory assistant"
            size="lg"
          >
            <form onSubmit={handleCreateAssistant} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter full name"
                value={assistantData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter email"
                value={assistantData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Mobile Number"
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                value={assistantData.mobile}
                onChange={handleChange}
                required
              />
              <Input
                label="Verification Document"
                type="text"
                name="document"
                placeholder="Document URL"
                value={assistantData.document}
                onChange={handleChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={assistantData.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" loading={creatingAssistant} fullWidth size="lg">
                Create Assistant
              </Button>
            </form>
          </Modal>
          <div ref={tableRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Booking Management</h2>
                <p className="text-gray-500">Manage laboratory bookings</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-96">
                  <Input
                    type="text"
                    placeholder="Search patient, mobile, test, package..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12"
                    containerClassName="relative"
                  />
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="bg-blue-50 px-5 py-3 rounded-2xl font-semibold text-blue-700 whitespace-nowrap">
                  {filteredBookings.length} Bookings
                </div>
                <Button
                  onClick={() => setShowAssistantForm(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <UserPlus />
                  Create Assistant
                </Button>
              </div>
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
                <LabOwnerBookingsTable
                  filteredBookings={filteredBookings}
                  assistants={assistants}
                  handleAssignAssistant={handleAssignAssistant}
                  selectedReport={selectedReport}
                  setSelectedReport={setSelectedReport}
                  uploadingReport={uploadingReport}
                  handleUploadReport={handleUploadReport}
                />
                <LabOwnerBookingMobileCard
                  filteredBookings={filteredBookings}
                  assistants={assistants}
                  handleAssignAssistant={handleAssignAssistant}
                  selectedReport={selectedReport}
                  setSelectedReport={setSelectedReport}
                  uploadingReport={uploadingReport}
                  handleUploadReport={handleUploadReport}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default LabOwnerDashboard
