import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, FlaskConical, TestTubeDiagonal, PackageOpen, Users } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS } from '@/constants/status'
import { DashboardStatsCard } from '@/components/Dashboard'

const AdminStatsGrid = ({
  bookings,
  tests,
  packages,
  labOwners,
  activeSection,
  setActiveSection,
  scrollToTable,
  scrollToLabOwners,
  setActivePanel,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <DashboardStatsCard
          title="Bookings"
          value={bookings.length}
          icon={<ClipboardList />}
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
          icon={<FlaskConical />}
          color="green"
          bgColor="bg-green-100 text-green-600"
          onClick={() => navigate(ROUTES.TESTS)}
        />
        <DashboardStatsCard
          title="Pending"
          value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
          icon={<TestTubeDiagonal />}
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
          icon={<PackageOpen />}
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
          icon={<PackageOpen />}
          color="purple"
          bgColor="bg-purple-100 text-purple-600"
          onClick={() => navigate(ROUTES.PACKAGES)}
        />
        <DashboardStatsCard
          title="Lab Owners"
          value={labOwners.length}
          icon={<Users />}
          color="green"
          bgColor="bg-green-100 text-green-600"
          onClick={scrollToLabOwners}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <button
          onClick={() => setActivePanel('test')}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FlaskConical className="text-2xl" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Create Test</h3>
              <p className="text-blue-100 text-sm">Add laboratory tests</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setActivePanel('package')}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <PackageOpen className="text-2xl" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Create Package</h3>
              <p className="text-purple-100 text-sm">Add health packages</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setActivePanel('lab-owner')}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Users className="text-2xl" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Create Lab Owner</h3>
              <p className="text-green-100 text-sm">Add laboratory owner</p>
            </div>
          </div>
        </button>
      </div>
    </>
  )
}

export default AdminStatsGrid
