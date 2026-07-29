import React, { useEffect, useState, useRef } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getAllTests } from '@/services/test.service'
import { getAllPackages } from '@/services/package.service'
import { getAllLabOwners, getBookingLabOwners } from '@/services/user.service'
import { getAllBookings } from '@/services/booking.service'
import { BOOKING_STATUS } from '@/constants/status'
import AdminStatsGrid from '@/features/admin/components/AdminStatsGrid'
import AdminTestsSection from '@/features/admin/components/AdminTestsSection'
import AdminPackagesSection from '@/features/admin/components/AdminPackagesSection'
import AdminUsersSection from '@/features/admin/components/AdminUsersSection'
import AdminBookingsSection from '@/features/admin/components/AdminBookingsSection'

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [showLabMap, setShowLabMap] = useState(false)
  const [activePanel, setActivePanel] = useState('')
  const [activeSection, setActiveSection] = useState('all')
  const [tests, setTests] = useState([])
  const [allTests, setAllTests] = useState([])
  const [packages, setPackages] = useState([])
  const [labOwners, setLabOwners] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
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

  const fetchLabOwners = async () => {
    try {
      const { data } = await getBookingLabOwners()
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
      setFetchError(null)
      const [testsRes, packagesRes, labOwnersRes] = await Promise.all([
        getAllTests(),
        getAllPackages(),
        getAllLabOwners(),
      ])
      setTests(testsRes.data)
      setAllTests(testsRes.data)
      setPackages(packagesRes.data)
      setLabOwners(labOwnersRes.data)
    } catch {
      setFetchError('Failed to load dashboard data. Please try again.')
    }
  }

  const fetchBookings = async () => {
    try {
      const { data } = await getAllBookings()
      setBookings(data)
    } catch {
      setFetchError('Failed to load bookings. Please try again.')
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
      <div className="bg-[#E8F4FF] min-h-screen">
        <div className="bg-[#0A2240]">
          <div className="enterprise-container py-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              Admin Management Portal
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white">Admin Dashboard</h1>
            <p className="text-white/40 text-xs mt-1 max-w-lg">
              Manage tests, packages, bookings, lab owners and laboratory operations.
            </p>
          </div>
        </div>
        <div className="enterprise-container py-6">
          <AdminStatsGrid
            bookings={bookings}
            tests={tests}
            packages={packages}
            labOwners={labOwners}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollToTable={scrollToTable}
            scrollToLabOwners={scrollToLabOwners}
            setActivePanel={setActivePanel}
          />
          <AdminTestsSection
            open={activePanel === 'test'}
            onClose={() => setActivePanel('')}
            onCreated={fetchDashboardData}
          />
          <AdminPackagesSection
            open={activePanel === 'package'}
            onClose={() => setActivePanel('')}
            onCreated={fetchDashboardData}
            allTests={allTests}
          />
          <AdminUsersSection
            labOwners={labOwners}
            onRefresh={fetchDashboardData}
            showLabMap={showLabMap}
            setShowLabMap={setShowLabMap}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedBooking={selectedBooking}
            selectedLab={selectedLab}
            setSelectedLab={setSelectedLab}
            labOwnersRef={labOwnersRef}
            open={activePanel === 'lab-owner'}
            onClose={() => setActivePanel('')}
          />
          <AdminBookingsSection
            bookings={bookings}
            loading={loading}
            fetchError={fetchError}
            onRetry={() => {
              fetchBookings()
              fetchDashboardData()
            }}
            openEditModal={openEditModal}
            filteredBookings={filteredBookings}
            tableRef={tableRef}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
