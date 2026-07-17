import React from 'react'
import { Users, UserPlus } from 'lucide-react'
import { DashboardSectionHeader } from '@/components/Dashboard'
import { BOOKING_STATUS } from '@/constants/status'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'

const LabOwnerAssistantsSection = ({
  assistants,
  bookings,
  activeSection,
  selectedAssistant,
  setSelectedAssistant,
  setShowAssistantForm,
  scrollToTable,
}) => {
  return (
    <>
      {activeSection === 'assistants' && (
        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
          <DashboardSectionHeader
            title="Lab Assistants"
            subtitle="Manage your assistants"
            button
            buttonText="Create Assistant"
            buttonIcon={<UserPlus />}
            onClick={() => setShowAssistantForm(true)}
          />
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
                    <Users />
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
                          totalBookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
                            .length
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
    </>
  )
}

export default LabOwnerAssistantsSection
