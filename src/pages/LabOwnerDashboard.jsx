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
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaUserPlus,
  FaDownload,
} from 'react-icons/fa'
import {
  DashboardStatsCard,
  DashboardSectionHeader,
  DashboardTable,
  EmptyState,
} from '@/components/Dashboard'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Loader'
const LabOwnerDashboard = () => {
  const tableRef = useRef(null)
  const [bookings, setBookings] = useState([])
  const [creatingAssistant, setCreatingAssistant] = useState(false)
  const [assistants, setAssistants] = useState([])
  const [selectedReport, setSelectedReport] = useState({})
  const [uploadingReport, setUploadingReport] = useState({})
  const [loading, setLoading] = useState(true)
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
      const { data } = await getLabOwnerBookings()
      setBookings(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch bookings')
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
        {/* HERO */}
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
        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* STATS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <DashboardStatsCard
              title="Total Bookings"
              value={bookings.length}
              icon={<FaClipboardList />}
              color="blue"
              bgColor="bg-blue-100 text-blue-600"
              active={activeSection === 'all'}
              onClick={() => {
                setSelectedAssistant(null)
                setActiveSection('all')
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
                setSelectedAssistant(null)
                setActiveSection('pending')
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
                setSelectedAssistant(null)
                setActiveSection('completed')
                scrollToTable()
              }}
            />
            <DashboardStatsCard
              title="Assistants"
              value={assistants.length}
              icon={<FaUsers />}
              color="purple"
              bgColor="bg-purple-100 text-purple-600"
              active={activeSection === 'assistants'}
              onClick={() => {
                setActiveSection('assistants')
              }}
            />
          </div>
          {/* ASSISTANTS */}
          {activeSection === 'assistants' && (
            <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
              <DashboardSectionHeader
                title="Lab Assistants"
                subtitle="Manage your assistants"
                button
                buttonText="Create Assistant"
                buttonIcon={<FaUserPlus />}
                onClick={() => setShowAssistantForm(true)}
              />
              {/* ASSISTANT CARDS */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
                {assistants.map((assistant) => {
                  const totalBookings = bookings.filter(
                    (booking) => booking.assignedLabAssistant?._id === assistant._id
                  )
                  return (
                    <Button
                      key={assistant._id}
                      onClick={() => {
                        setSelectedAssistant(assistant._id)
                        scrollToTable()
                      }}
                      variant="ghost"
                      className={`border rounded-3xl p-5 hover:shadow-xl transition text-left bg-white
                          ${
                            selectedAssistant === assistant._id
                              ? 'border-purple-500 ring-2 ring-purple-200'
                              : 'border-gray-100'
                          }
                          `}
                    >
                      <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                        <FaUsers />
                      </div>
                      <h3 className="text-xl font-bold text-blue-950 mt-5">{assistant.name}</h3>
                      <p className="text-gray-500 mt-2 break-all">{assistant.email}</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 rounded-2xl p-4 text-center">
                          <p className="text-sm text-gray-500">Total Tests</p>
                          <h4 className="text-2xl font-bold text-blue-600 mt-2">
                            {totalBookings.length}
                          </h4>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-4 text-center">
                          <p className="text-sm text-gray-500">Completed</p>
                          <h4 className="text-2xl font-bold text-green-600 mt-2">
                            {
                              totalBookings.filter(
                                (item) => item.status === BOOKING_STATUS.COMPLETED
                              ).length
                            }
                          </h4>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
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
          {/* TABLE */}
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
                </div>
                <div className="bg-blue-50 px-5 py-3 rounded-2xl font-semibold text-blue-700 whitespace-nowrap">
                  {filteredBookings.length} Bookings
                </div>
                <Button
                  onClick={() => setShowAssistantForm(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <FaUserPlus />
                  Create Assistant
                </Button>
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : filteredBookings.length === 0 ? (
              <EmptyState text="No Bookings Found" />
            ) : (
              <>
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b">
                        <th className="px-4 py-4 text-left ">Patient</th>
                        <th className="px-4 py-4 text-left truncate">Test / Package</th>
                        <th className="px-4 py-4 text-left">Amount</th>
                        <th className="px-4 py-4 text-left truncate">Date</th>
                        <th className="px-4 py-4 text-left truncate">Assistant</th>
                        <th className="px-4 py-4 text-left truncate">Status</th>
                        <th className="px-4 py-4 text-left truncate">Payment</th>
                        <th className="px-4 py-4 text-left">Samples</th>
                        <th className="px-4 py-4 text-left ">Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="
          border-b
          hover:bg-slate-50
          transition
          "
                        >
                          <td className="px-4 py-4 truncate">
                            <div>
                              <h4 className="font-semibold">{booking.patientName}</h4>
                              <p className="text-sm text-gray-500">{booking.phone}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 truncate">
                            <div>
                              <p className="font-medium">
                                {booking?.test?.title || booking?.package?.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{booking.city}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-green-600">
                            ₹{booking?.test?.price || booking?.package?.price}
                          </td>
                          <td className="px-4 py-4 truncate">
                            <div>{booking.bookingDate}</div>
                            <div className="text-sm text-gray-500">{booking.bookingTime}</div>
                          </td>
                          <td className="px-4 py-4">
                            {booking.assignedLabAssistant ? (
                              <div>
                                <p className="font-medium">{booking.assignedLabAssistant.name}</p>
                                <p className="text-xs text-gray-500">
                                  {booking.assignedLabAssistant.email}
                                </p>
                              </div>
                            ) : (
                              <Select
                                onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}
                                containerClassName="max-w-[180px]"
                              >
                                <option value="">Assign</option>
                                {assistants.map((assistant) => (
                                  <option key={assistant._id} value={assistant._id}>
                                    {assistant.name}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </td>
                          <td className="px-4 py-4 truncate">
                            <Badge status={booking.status}>{booking.status}</Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                          </td>
                          <td className="px-4 py-4">
                            {booking.sampleImages?.length > 0 ? (
                              <div className="flex items-center gap-2">
                                {booking.sampleImages.slice(0, 3).map((image, index) => (
                                  <a
                                    key={index}
                                    href={image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative"
                                  >
                                    <img
                                      src={image}
                                      alt={`Sample ${index + 1}`}
                                      className="
              w-14 h-14
              rounded-xl
              object-cover
              border-2 border-white
              shadow
              hover:scale-110
              transition
              "
                                    />
                                    <span
                                      className="
              absolute -bottom-7 left-1/2
              -translate-x-1/2
              bg-black text-white
              text-xs px-2 py-1
              rounded opacity-0
              group-hover:opacity-100
              transition whitespace-nowrap
              "
                                    >
                                      View Image
                                    </span>
                                  </a>
                                ))}
                                {booking.sampleImages.length > 3 && (
                                  <Button
                                    size="icon-sm"
                                    variant="primary"
                                    className="w-14 h-14 text-sm"
                                    title={`${booking.sampleImages.length - 3} more images`}
                                  >
                                    +{booking.sampleImages.length - 3}
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">No Samples</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {booking.report ? (
                              <Button variant="success" size="sm">
                                <a
                                  href={booking.report}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-white"
                                >
                                  View Report
                                </a>
                              </Button>
                            ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
                              <div className="space-y-2">
                                <Input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) =>
                                    setSelectedReport({
                                      ...selectedReport,
                                      [booking._id]: e.target.files[0],
                                    })
                                  }
                                />
                                <Button
                                  onClick={() => handleUploadReport(booking._id)}
                                  loading={uploadingReport[booking._id]}
                                  size="sm"
                                >
                                  Upload
                                </Button>
                              </div>
                            ) : (
                              <span className="text-red-500">Payment Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lg:hidden grid gap-4">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white rounded-[28px] shadow-lg border border-slate-100"
                    >
                      {/* Top Status Bar */}
                      <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
                      <div className="p-5">
                        {/* Patient */}
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h2 className="font-bold text-xl text-slate-900">
                              {booking.patientName}
                            </h2>
                            <p className="text-gray-500 mt-1">📞 {booking.phone}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                            <Badge status={booking.status}>{booking.status}</Badge>
                          </div>
                        </div>
                        {/* Test Information */}
                        <div className="grid grid-cols-2 gap-3 mt-5">
                          <div className="bg-blue-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Test / Package</p>
                            <h3 className="font-bold text-slate-800 mt-1">
                              {booking?.test?.title || booking?.package?.title}
                            </h3>
                          </div>
                          <div className="bg-green-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Amount</p>
                            <h3 className="font-bold text-green-700 mt-1">
                              ₹{booking?.test?.price || booking?.package?.price}
                            </h3>
                          </div>
                        </div>
                        {/* Schedule */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="bg-purple-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Booking Date</p>
                            <h3 className="font-semibold text-purple-700 mt-1">
                              {booking.bookingDate}
                            </h3>
                          </div>
                          <div className="bg-orange-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Booking Time</p>
                            <h3 className="font-semibold text-orange-700 mt-1">
                              {booking.bookingTime}
                            </h3>
                          </div>
                        </div>
                        {/* Address */}
                        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500">Patient Address</p>
                          <p className="mt-2 text-slate-700">
                            {booking.flatNo}, {booking.address}, {booking.city}
                            {' - '}
                            {booking.pincode}
                          </p>
                        </div>
                        {/* Assistant */}
                        <div className="mt-4 bg-purple-50 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-gray-500">Assigned Assistant</p>
                            {booking.assignedLabAssistant && (
                              <Badge variant="success">Assigned</Badge>
                            )}
                          </div>
                          {booking.assignedLabAssistant ? (
                            <div className="bg-white rounded-xl p-3 border border-purple-100">
                              <h3 className="font-semibold text-slate-800">
                                {booking.assignedLabAssistant.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {booking.assignedLabAssistant.email}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-red-500 mb-3">No Assistant Assigned</p>
                              <Select
                                onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}
                              >
                                <option value="">Select Assistant</option>
                                {assistants.map((assistant) => (
                                  <option key={assistant._id} value={assistant._id}>
                                    {assistant.name}
                                  </option>
                                ))}
                              </Select>
                            </div>
                          )}
                        </div>
                        {/* Sample Images */}
                        <div className="mt-4 bg-pink-50 rounded-2xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-xs font-medium text-gray-500">Sample Images</p>
                            <Badge variant="info">{booking.sampleImages?.length || 0} Images</Badge>
                          </div>
                          {booking.sampleImages?.length > 0 ? (
                            <div className="grid grid-cols-5 gap-3">
                              {booking.sampleImages.map((image, index) => (
                                <a key={index} href={image} target="_blank" rel="noreferrer">
                                  <img
                                    src={image}
                                    alt={`Sample ${index + 1}`}
                                    className="
              w-full
              h-20
              object-cover
              rounded-xl
              border
              hover:scale-105
              transition
              "
                                  />
                                </a>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-white rounded-xl p-4 text-center">
                              <p className="text-gray-500">No sample images uploaded yet</p>
                            </div>
                          )}
                        </div>
                        {/* Report */}
                        {booking.report ? (
                          <div className="bg-white rounded-xl p-4 border border-green-100">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-green-700">✅ Report Uploaded</p>
                              <Badge variant="success">Ready</Badge>
                            </div>
                            <Button variant="success" fullWidth className="mt-4">
                              <a
                                href={booking.report}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white flex items-center justify-center gap-2"
                              >
                                <FaDownload />
                                View Report
                              </a>
                            </Button>
                          </div>
                        ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
                          <div className="space-y-3">
                            <label
                              className="
      flex items-center justify-center
      gap-2 border-2 border-dashed
      border-blue-300 rounded-2xl
      py-4 cursor-pointer
      hover:bg-blue-50
      "
                            >
                              📄 Select Report
                              <Input
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={(e) =>
                                  setSelectedReport({
                                    ...selectedReport,
                                    [booking._id]: e.target.files[0],
                                  })
                                }
                                containerClassName="hidden"
                              />
                            </label>
                            {selectedReport[booking._id] && (
                              <div className="bg-blue-50 rounded-xl p-3">
                                <p className="text-sm text-blue-700 font-medium break-all">
                                  Selected: {selectedReport[booking._id].name}
                                </p>
                              </div>
                            )}
                            <Button
                              onClick={() => handleUploadReport(booking._id)}
                              loading={uploadingReport[booking._id]}
                              fullWidth
                            >
                              Upload Report
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 rounded-xl p-4 text-center">
                            <p className="text-yellow-700 font-medium">Payment Pending</p>
                            <p className="text-gray-500 text-sm mt-1">
                              Report can be uploaded only after payment.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default LabOwnerDashboard
