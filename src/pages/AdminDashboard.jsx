import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layout/DashboardLayout'
import API from '@/services/api'
import { FaUsers, FaFlask, FaClipboardList, FaVial, FaBoxOpen } from 'react-icons/fa'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'
import { API_ENDPOINTS } from '@/constants/api'
import {
  DashboardStatsCard,
  DashboardSectionHeader,
  DashboardSidePanel,
  BookingsTable,
  EmptyState,
} from '@/components/Dashboard'
import { Spinner } from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import LocationPicker from '@/components/LocationPicker'
const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [showLabMap, setShowLabMap] = useState(false)
  const [creatingAssistant, setCreatingAssistant] = useState(false)
  const [activePanel, setActivePanel] = useState('')
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('all')
  const [tests, setTests] = useState([])
  const [allTests, setAllTests] = useState([])
  const [packages, setPackages] = useState([])
  const [labOwners, setLabOwners] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedLab, setSelectedLab] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const openEditModal = (booking) => {
    setSelectedBooking(booking)
    setSelectedLab(booking.labOwner?._id || '')
    setShowEditModal(true)
  }
  const tableRef = useRef(null)
  const labOwnersRef = useRef(null)
  const [testData, setTestData] = useState({
    title: '',
    category: '',
    price: '',
    reportTime: '',
    description: '',
    image: '',
  })
  const [packageData, setPackageData] = useState({
    title: '',
    category: '',
    price: '',
    testsIncluded: [],
    description: '',
    image: '',
  })
  const [labOwnerData, setLabOwnerData] = useState({
    name: '',
    email: '',
    password: '',
    servicePincodes: '',
    labAddress: '',
    latitude: '',
    longitude: '',
  })
  const handleTestChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    })
  }
  const handlePackageChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    })
  }
  const handleLabOwnerChange = (e) => {
    setLabOwnerData({
      ...labOwnerData,
      [e.target.name]: e.target.value,
    })
  }
  const fetchLabOwners = async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.BOOKINGS.LAB_OWNERS)
      setLabOwners(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchLabOwners()
  }, [])
  const fetchDashboardData = async () => {
    try {
      const [testsRes, packagesRes, labOwnersRes] = await Promise.all([
        API.get(API_ENDPOINTS.TESTS),
        API.get(API_ENDPOINTS.PACKAGES),
        API.get(API_ENDPOINTS.ADMIN.LAB_OWNERS),
      ])
      setTests(testsRes.data)
      setAllTests(testsRes.data)
      setPackages(packagesRes.data)
      setLabOwners(labOwnersRes.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCreateTest = async (e) => {
    e.preventDefault()
    if (creatingAssistant) return
    if (
      !testData.title ||
      !testData.category ||
      !testData.price ||
      !testData.reportTime ||
      !testData.description ||
      !testData.image
    ) {
      return toast.error('Please fill all required fields')
    }
    try {
      setCreatingAssistant(true)
      await API.post(API_ENDPOINTS.TESTS, testData)
      toast.success('Test Created Successfully')
      fetchDashboardData()
      setActivePanel('')
      setTestData({
        title: '',
        category: '',
        price: '',
        reportTime: '',
        description: '',
        image: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setCreatingAssistant(false)
    }
  }
  const handleUpdateLab = async () => {
    try {
      await API.put(API_ENDPOINTS.BOOKINGS.UPDATE_LAB(selectedBooking._id), {
        labOwnerId: selectedLab,
      })
      toast.success('Lab Updated Successfully')
      fetchBookings()
      setShowEditModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to Update Lab')
    }
  }
  const handleCreatePackage = async (e) => {
    e.preventDefault()
    if (creatingAssistant) return
    if (
      !packageData.title ||
      !packageData.category ||
      !packageData.price ||
      !packageData.description ||
      !packageData.image ||
      packageData.testsIncluded.length === 0
    ) {
      return toast.error('Please fill all required fields')
    }
    try {
      setCreatingAssistant(true)
      await API.post(API_ENDPOINTS.PACKAGES, {
        ...packageData,
        testsIncluded: packageData.testsIncluded,
      })
      toast.success('Package Created Successfully')
      fetchDashboardData()
      setActivePanel('')
      setPackageData({
        title: '',
        category: '',
        price: '',
        testsIncluded: [],
        description: '',
        image: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setCreatingAssistant(false)
    }
  }
  const handleCreateLabOwner = async (e) => {
    e.preventDefault()
    if (creatingAssistant) return
    if (
      !labOwnerData.name ||
      !labOwnerData.email ||
      !labOwnerData.password ||
      !labOwnerData.servicePincodes ||
      !labOwnerData.labAddress ||
      !labOwnerData.latitude ||
      !labOwnerData.longitude
    ) {
      return toast.error('Please select lab location')
    }
    try {
      setCreatingAssistant(true)
      await API.post(API_ENDPOINTS.ADMIN.CREATE_LAB_OWNER, {
        ...labOwnerData,
        servicePincodes: labOwnerData.servicePincodes.split(',').map((item) => item.trim()),
      })
      toast.success('Lab Owner Created Successfully')
      fetchDashboardData()
      setActivePanel('')
      setLabOwnerData({
        name: '',
        email: '',
        password: '',
        servicePincodes: '',
        labAddress: '',
        latitude: '',
        longitude: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setCreatingAssistant(false)
    }
  }
  const fetchBookings = async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.BOOKINGS.ALL)
      setBookings(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBookings()
    fetchDashboardData()
  }, [])
  const scrollToTable = () => {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }
  const scrollToLabOwners = () => {
    setTimeout(() => {
      labOwnersRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }
  const filteredBookings =
    activeSection === 'pending'
      ? bookings.filter((item) => item.status === BOOKING_STATUS.PENDING)
      : activeSection === 'completed'
        ? bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
        : bookings
  return (
    <DashboardLayout>
      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-blue-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Admin Management Portal
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5">Admin Dashboard</h1>
            <p className="text-blue-100 mt-4 max-w-2xl leading-7">
              Manage tests, packages, bookings, lab owners and laboratory operations.
            </p>
          </div>
        </div>
        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <DashboardStatsCard
              title="Bookings"
              value={bookings.length}
              icon={<FaClipboardList />}
              color="blue"
              bgColor="bg-blue-100 text-blue-600"
              active={activeSection === 'all'}
              onClick={() => {
                setActiveSection('all')
                scrollToTable()
              }}
            />
            <DashboardStatsCard
              title="Tests"
              value={tests.length}
              icon={<FaFlask />}
              color="green"
              bgColor="bg-green-100 text-green-600"
              onClick={() => navigate(ROUTES.TESTS)}
            />
            <DashboardStatsCard
              title="Pending"
              value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
              icon={<FaVial />}
              color="yellow"
              bgColor="bg-yellow-100 text-yellow-600"
              active={activeSection === 'pending'}
              onClick={() => {
                setActiveSection('pending')
                scrollToTable()
              }}
            />
            <DashboardStatsCard
              title="Completed"
              value={bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length}
              icon={<FaBoxOpen />}
              color="purple"
              bgColor="bg-purple-100 text-purple-600"
              active={activeSection === 'completed'}
              onClick={() => {
                setActiveSection('completed')
                scrollToTable()
              }}
            />
            <DashboardStatsCard
              title="Packages"
              value={packages.length}
              icon={<FaBoxOpen />}
              color="purple"
              bgColor="bg-purple-100 text-purple-600"
              onClick={() => navigate(ROUTES.PACKAGES)}
            />
            <DashboardStatsCard
              title="Lab Owners"
              value={labOwners.length}
              icon={<FaUsers />}
              color="green"
              bgColor="bg-green-100 text-green-600"
              onClick={scrollToLabOwners}
            />
          </div>
          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {/* Create Test */}
            <button
              onClick={() => setActivePanel('test')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaFlask className="text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Create Test</h3>
                  <p className="text-blue-100 text-sm">Add laboratory tests</p>
                </div>
              </div>
            </button>
            {/* Create Package */}
            <button
              onClick={() => setActivePanel('package')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaBoxOpen className="text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Create Package</h3>
                  <p className="text-purple-100 text-sm">Add health packages</p>
                </div>
              </div>
            </button>
            {/* Create Lab Owner */}
            <button
              onClick={() => setActivePanel('lab-owner')}
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaUsers className="text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Create Lab Owner</h3>
                  <p className="text-green-100 text-sm">Add laboratory owner</p>
                </div>
              </div>
            </button>
          </div>
          <DashboardSidePanel
            open={activePanel === 'test'}
            title="Create Test"
            subtitle="Fill all required details"
            onClose={() => setActivePanel('')}
          >
            <form onSubmit={handleCreateTest} className="space-y-5">
              <Input
                required
                type="text"
                name="title"
                placeholder="Test Title"
                value={testData.title}
                onChange={handleTestChange}
              />
              <Input
                required
                type="text"
                name="category"
                placeholder="Category"
                value={testData.category}
                onChange={handleTestChange}
              />
              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  required
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={testData.price}
                  onChange={handleTestChange}
                />
                <Input
                  required
                  type="text"
                  name="reportTime"
                  placeholder="Report Time"
                  value={testData.reportTime}
                  onChange={handleTestChange}
                />
              </div>
              <Textarea
                rows="4"
                name="description"
                placeholder="Description"
                value={testData.description}
                onChange={handleTestChange}
              />
              <Input
                required
                type="text"
                name="image"
                placeholder="Image URL"
                value={testData.image}
                onChange={handleTestChange}
              />
              <Button type="submit" loading={creatingAssistant} fullWidth>
                Create Test
              </Button>
            </form>
          </DashboardSidePanel>
          {/* PACKAGE PANEL */}
          <DashboardSidePanel
            open={activePanel === 'package'}
            title="Create Package"
            subtitle="Add healthcare package"
            onClose={() => setActivePanel('')}
          >
            <form onSubmit={handleCreatePackage} className="space-y-8">
              {/* TITLE + CATEGORY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Package Title
                  </label>
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="Enter package title"
                    value={packageData.title}
                    onChange={handlePackageChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
                  <Input
                    required
                    type="text"
                    name="category"
                    placeholder="Enter category"
                    value={packageData.category}
                    onChange={handlePackageChange}
                  />
                </div>
              </div>
              {/* TEST SELECTION */}
              <div className="bg-white border border-gray-100 rounded-[30px] p-5 md:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 ">Select Tests</h3>
                    <p className="text-xs text-gray-300 mt-1">Choose tests to include in package</p>
                  </div>
                  <div className="bg-purple-100 text-purple-700 px-5 py-2 rounded-2xl text-sm font-semibold w-fit">
                    {packageData.testsIncluded.length} Tests Selected
                  </div>
                </div>
                {/* DROPDOWN */}
                <Select
                  onChange={(e) => {
                    const selectedId = e.target.value
                    if (selectedId && !packageData.testsIncluded.includes(selectedId)) {
                      setPackageData({
                        ...packageData,
                        testsIncluded: [...packageData.testsIncluded, selectedId],
                      })
                    }
                  }}
                >
                  <option value="">Select Test</option>
                  {allTests.map((test) => (
                    <option key={test._id} value={test._id}>
                      {test.title} — ₹{test.price}
                    </option>
                  ))}
                </Select>
                {/* SELECTED TESTS */}
                <div className="flex flex-wrap gap-3 mt-6 pt-2">
                  {packageData.testsIncluded.map((id) => {
                    const test = allTests.find((item) => item._id === id)
                    if (!test) return null
                    return (
                      <div
                        key={id}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-4 min-w-[170px] shadow-sm"
                      >
                        <div>
                          <h4 className="font-semibold text-blue-950 text-sm">{test.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">₹{test.price}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPackageData({
                              ...packageData,
                              testsIncluded: packageData.testsIncluded.filter(
                                (item) => item !== id
                              ),
                            })
                          }}
                          className="text-red-500 hover:text-red-700 text-xl"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                {/* PRICE */}
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Package Price
                </label>
                <Input
                  required
                  type="number"
                  name="price"
                  placeholder="Enter package price"
                  value={packageData.price}
                  onChange={handlePackageChange}
                />
              </div>
              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Description
                </label>
                <Textarea
                  rows="5"
                  name="description"
                  placeholder="Write package description"
                  value={packageData.description}
                  onChange={handlePackageChange}
                />
              </div>
              {/* IMAGE */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Image URL</label>
                <Input
                  required
                  type="text"
                  name="image"
                  placeholder="Enter image URL"
                  value={packageData.image}
                  onChange={handlePackageChange}
                />
              </div>
              {/* BUTTON */}
              <Button type="submit" loading={creatingAssistant} fullWidth>
                Create Package
              </Button>
            </form>
          </DashboardSidePanel>
          {/* LAB OWNER PANEL */}
          <DashboardSidePanel
            open={activePanel === 'lab-owner'}
            title="Create Lab Owner"
            subtitle="Add new laboratory owner"
            onClose={() => setActivePanel('')}
          >
            <form onSubmit={handleCreateLabOwner} className="space-y-5">
              <Input
                required
                type="text"
                name="name"
                placeholder="Full Name"
                value={labOwnerData.name}
                onChange={handleLabOwnerChange}
              />
              <Input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={labOwnerData.email}
                onChange={handleLabOwnerChange}
              />
              <Input
                required
                type="password"
                name="password"
                placeholder="Password"
                value={labOwnerData.password}
                onChange={handleLabOwnerChange}
              />
              <Input
                required
                type="text"
                name="servicePincodes"
                placeholder="411033, 411044"
                value={labOwnerData.servicePincodes}
                onChange={handleLabOwnerChange}
              />
              <div>
                {labOwnerData.labAddress && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="font-semibold text-green-700">📍 Lab Location Selected</div>
                    <div className="text-sm text-gray-600 mt-2">{labOwnerData.labAddress}</div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowLabMap(true)}
                  className="w-full bg-blue-100 text-blue-700 py-4 rounded-2xl font-semibold"
                >
                  🗺️ Select Lab Location On Map
                </button>
                <Modal
                  open={showLabMap}
                  onClose={() => setShowLabMap(false)}
                  title="Select Lab Location"
                  size="lg"
                >
                  <LocationPicker
                    location={{
                      lat: Number(labOwnerData.latitude) || 18.5204,
                      lng: Number(labOwnerData.longitude) || 73.8567,
                    }}
                    setLocation={(loc) => {
                      setLabOwnerData((prev) => ({
                        ...prev,
                        latitude: loc.lat,
                        longitude: loc.lng,
                      }))
                    }}
                    onLocationSelect={async (lat, lng) => {
                      const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                      )
                      const data = await response.json()
                      setLabOwnerData((prev) => ({
                        ...prev,
                        labAddress: data.display_name,
                        latitude: lat,
                        longitude: lng,
                      }))
                    }}
                  />
                  <Button
                    onClick={() => setShowLabMap(false)}
                    fullWidth
                    variant="success"
                    className="mt-5"
                  >
                    Confirm Location
                  </Button>
                </Modal>
              </div>
              <Button type="submit" loading={creatingAssistant} fullWidth>
                Create Lab Owner
              </Button>
            </form>
          </DashboardSidePanel>
          {/* Recent Bookings */}
          <div ref={tableRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
            <DashboardSectionHeader
              title="Recent Bookings"
              subtitle="Latest patient booking activity"
            />
            {loading ? (
              <Spinner />
            ) : filteredBookings.length === 0 ? (
              <EmptyState text="No Bookings Found" />
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <BookingsTable
                    bookings={filteredBookings}
                    isAdmin={true}
                    openEditModal={openEditModal}
                  />
                </div>
                {/* Mobile Cards */}
                <div className="lg:hidden grid gap-4">
                  {filteredBookings.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-[28px] shadow-lg border border-slate-100 overflow-hidden"
                    >
                      <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="font-bold text-lg text-slate-900">{item.patientName}</h2>
                            <p className="text-gray-500 text-sm mt-1">📞 {item.phone}</p>
                          </div>
                          <Badge status={item.status}>{item.status}</Badge>
                        </div>
                        {/* Assigned Lab */}
                        <div className="mt-4 bg-purple-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500">Assigned Lab</p>
                          <h3 className="font-semibold text-purple-700 mt-1">
                            {item.labOwner?.name || 'Not Assigned'}
                          </h3>
                          <p
                            title={item.labOwner?.labAddress}
                            className="text-sm text-gray-600 mt-2 truncate"
                          >
                            📍 {item.labOwner?.labAddress || 'No Address'}
                          </p>
                        </div>
                        {/* Test / Package */}
                        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500 mb-2">Test / Package</p>
                          <div className="flex justify-between items-center gap-3">
                            <h3 className="font-bold text-slate-800 flex-1">
                              {item?.test?.title || item?.package?.title}
                            </h3>
                            <span className="text-green-600 font-bold text-lg">
                              ₹{item?.test?.price || item?.package?.price}
                            </span>
                          </div>
                        </div>
                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="bg-purple-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Date</p>
                            <h3 className="font-semibold text-purple-700 mt-1">
                              {item.bookingDate}
                            </h3>
                          </div>
                          <div className="bg-orange-50 rounded-2xl p-4">
                            <p className="text-xs text-gray-500">Time</p>
                            <h3 className="font-semibold text-orange-700 mt-1">
                              {item.bookingTime}
                            </h3>
                          </div>
                        </div>
                        {/* Address */}
                        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-slate-700 mt-2 text-sm">
                            {item.flatNo}, {item.address}, {item.city} - {item.pincode}
                          </p>
                        </div>
                        {/* Payment */}
                        <div className="mt-4 bg-green-50 rounded-2xl p-4 flex justify-between items-center">
                          <p className="text-xs text-gray-500">Payment Status</p>
                          <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                        </div>
                        {/* User */}
                        {/* <div className="mt-4 bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            User
          </p>
          <h3 className="font-semibold text-blue-700 mt-1">
            {item.user?.name || "N/A"}
          </h3>
        </div> */}
                        <div className="mt-4">
                          {item.status === BOOKING_STATUS.COMPLETED ? (
                            <div className="w-full bg-green-100 text-green-700 py-3 rounded-2xl text-center font-semibold">
                              ✅ Booking Completed
                            </div>
                          ) : (
                            <Button onClick={() => openEditModal(item)} fullWidth>
                              ✏️ Edit Assigned Lab
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* LAB OWNERS */}
          <div ref={labOwnersRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
            <DashboardSectionHeader title="Lab Owners" subtitle="Manage all laboratory owners" />
            {labOwners.length === 0 ? (
              <EmptyState text="No Lab Owners Found" />
            ) : (
              <div className="overflow-x-auto mt-8">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-blue-50 text-m text-black text-ce4">
                    <tr className="border-b text-left text-black">
                      <th className="py-5 px-4  font-semibold">Owner</th>
                      <th className="py-5 px-4  font-semibold">Email</th>
                      <th className="py-5 px-4  font-semibold">Role</th>
                      <th className="py-5 px-4  font-semibold">Service Areas</th>
                      <th className="py-5 px-4  font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labOwners.map((owner) => (
                      <tr key={owner._id} className="border-b hover:bg-gray-50 transition">
                        {/* NAME */}
                        <td className="py-5 px-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
                              {owner.name?.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-blue-950">{owner.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                ID: {owner._id.slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* EMAIL */}
                        <td className="py-5 px-4 text-gray-600">{owner.email}</td>
                        {/* ROLE */}
                        <td className="py-5 px-4">
                          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                            {owner.role}
                          </span>
                        </td>
                        {/* PINCODES */}
                        <td className="py-5 px-4">
                          <div className="flex flex-wrap gap-2">
                            {owner.servicePincodes?.map((pin, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                              >
                                {pin}
                              </span>
                            ))}
                          </div>
                        </td>
                        {/* STATUS */}
                        <td className="py-5 px-4">
                          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Active
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Modal
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              title="Edit Assigned Lab"
            >
              <div className="space-y-4">
                <Select
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                  label="Lab Owner"
                >
                  <option value="">Select Lab Owner</option>
                  {labOwners.map((lab) => (
                    <option key={lab._id} value={lab._id}>
                      {lab.name}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleUpdateLab} disabled={!selectedLab} fullWidth>
                  Save Changes
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default AdminDashboard
