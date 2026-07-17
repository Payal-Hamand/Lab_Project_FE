import { CalendarDays, CircleCheckBig, Clock, FileText } from 'lucide-react'
import { DashboardStatsCard } from '@/components/Dashboard'
import { BOOKING_STATUS } from '@/constants/status'

const PatientStatsGrid = ({ bookings, activeSection, setActiveSection, scrollToTable }) => {
  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: <CalendarDays />,
      color: 'blue',
      bgColor: 'bg-blue-100 text-blue-600',
      active: activeSection === 'all',
      onClick: () => {
        setActiveSection('all')
        scrollToTable()
      },
    },
    {
      title: 'Completed',
      value: bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length,
      icon: <CircleCheckBig />,
      color: 'green',
      bgColor: 'bg-green-100 text-green-600',
      active: activeSection === 'completed',
      onClick: () => {
        setActiveSection('completed')
        scrollToTable()
      },
    },
    {
      title: 'Pending',
      value: bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length,
      icon: <Clock />,
      color: 'yellow',
      bgColor: 'bg-yellow-100 text-yellow-600',
      active: activeSection === 'pending',
      onClick: () => {
        setActiveSection('pending')
        scrollToTable()
      },
    },
    {
      title: 'Reports',
      value: bookings.filter((item) => item.report).length,
      icon: <FileText />,
      color: 'purple',
      bgColor: 'bg-purple-100 text-purple-600',
      active: activeSection === 'reports',
      onClick: () => {
        setActiveSection('reports')
        scrollToTable()
      },
    },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <DashboardStatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

export default PatientStatsGrid
