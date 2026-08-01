import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { getAllTests } from '@/services/test.service'
import { getAllPackages } from '@/services/package.service'
import { getAllLabOwners, getBookingLabOwners, getPaymentSetting, createPaymentSetting, updatePaymentSetting } from '@/services/user.service'
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

  const [payment, setPayment] = useState(null)
  const [form, setForm] = useState({
    accountName: '',
    upiId: '',
  })
  const [qrImage, setQrImage] = useState(null)

  const fetchPayment = async () => {
    try {
      const { data } = await getPaymentSetting()
      if (data.data) {
        setPayment(data.data)
        setForm({
          accountName: data.data.accountName,
          upiId: data.data.upiId,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('accountName', form.accountName)
      formData.append('upiId', form.upiId)
      if (qrImage) {
        formData.append('qrImage', qrImage)
      }
      if (payment) {
        await updatePaymentSetting(formData)
      } else {
        await createPaymentSetting(formData)
      }
      toast.success('Saved Successfully')
      fetchPayment()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchPayment()
  }, [])

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
      <div className="bg-background min-h-screen">
        <div className="bg-tertiary">
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
          <Modal
            open={activePanel === 'payment'}
            title="Payment Settings"
            subtitle="Upload QR Code and UPI Details"
            onClose={() => setActivePanel('')}
            size="lg"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              className="space-y-6"
            >
              <Input
                label="Account Holder Name"
                  type="text"
                  value={form.accountName}
                  onChange={(e) => setForm({ ...form, accountName: e.target.value })}
                  placeholder="Enter Account Name"
                  required
              />
              <Input
                label="UPI ID"
                  type="text"
                  value={form.upiId}
                  onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                  placeholder="abc@okaxis"
                  required
              />
              <div>
                <label className="block mb-2 font-semibold">QR Code</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setQrImage(e.target.files[0])}
                  className="w-full"
                />
              </div>
              {qrImage && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="font-medium text-blue-700 text-sm">Selected File</p>
                  <p className="text-xs mt-1">{qrImage.name}</p>
                </div>
              )}
              {payment?.qrImage && (
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Current QR Code</p>
                  <img src={payment.qrImage} alt="" className="w-64 rounded-xl border" />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition"
              >
                {payment ? 'Update Payment Settings' : 'Save Payment Settings'}
              </button>
            </form>
          </Modal>
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
