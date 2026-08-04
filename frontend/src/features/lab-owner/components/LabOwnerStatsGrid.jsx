import React from 'react'
import { ClipboardList, Clock, CircleCheckBig, Users } from 'lucide-react'
import { DashboardStatsCard } from '@/components/Dashboard'
import { BOOKING_STATUS } from '@/constants/status'

const LabOwnerStatsGrid = ({
  bookings,
  assistants,
  activeSection,
  setActiveSection,
  setSelectedAssistant,
  scrollToTable,
}) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      <DashboardStatsCard
        title="Total Bookings"
        value={bookings.length}
        icon={<ClipboardList />}
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
        icon={<Clock />}
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
        icon={<CircleCheckBig />}
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
        icon={<Users />}
        color="purple"
        bgColor="bg-purple-100 text-purple-600"
        active={activeSection === 'assistants'}
        onClick={() => {
          setActiveSection('assistants')
        }}
      />
    </div>
  )
}

export default LabOwnerStatsGrid
