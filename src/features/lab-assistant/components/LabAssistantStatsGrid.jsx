import React from 'react'
import { FlaskConical, ClipboardList, CircleCheckBig } from 'lucide-react'
import { DashboardStatsCard } from '@/components/Dashboard'
import { BOOKING_STATUS } from '@/constants/status'

const LabAssistantStatsGrid = ({ bookings, activeSection, setActiveSection }) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      <DashboardStatsCard
        title="Total Tests"
        value={bookings.length}
        icon={<FlaskConical />}
        color="blue"
        bgColor="bg-blue-100 text-blue-600"
        active={activeSection === 'all'}
        onClick={() => setActiveSection('all')}
      />
      <DashboardStatsCard
        title="Pending Reports"
        value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
        icon={<ClipboardList />}
        color="yellow"
        bgColor="bg-yellow-100 text-yellow-600"
        active={activeSection === 'pending'}
        onClick={() => setActiveSection('pending')}
      />
      <DashboardStatsCard
        title="Completed"
        value={bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length}
        icon={<CircleCheckBig />}
        color="green"
        bgColor="bg-green-100 text-green-600"
        active={activeSection === 'completed'}
        onClick={() => setActiveSection('completed')}
      />
    </div>
  )
}

export default LabAssistantStatsGrid
