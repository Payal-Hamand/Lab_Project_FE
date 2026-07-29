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
        <div className="bg-white rounded-xl shadow-card border border-[#C5DBF0] mt-6 p-5 md:p-6">
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
                  className={`border rounded-xl p-4 hover:shadow-card-hover transition text-left bg-white
                      ${
                        selectedAssistant === assistant._id
                          ? 'border-purple-500 ring-2 ring-purple-200'
                          : 'border-gray-100'
                      }
                      `}
                >
                  <div className="w-10 h-10 rounded-[10px] bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                    <Users size={18} />
                  </div>
                  <h3 className="font-serif text-lg text-[#0A2240] mt-3">{assistant.name}</h3>
                  <p className="text-[#4A6A8A] text-xs mt-0.5 break-all">{assistant.email}</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-[#EEF6FF] rounded-lg p-3 text-center">
                      <p className="text-[10px] text-[#4A6A8A]">Total Tests</p>
                      <h4 className="font-mono font-bold text-base text-[#1A6FD4] mt-0.5">
                        {totalBookings.length}
                      </h4>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-[#4A6A8A]">Completed</p>
                      <h4 className="font-mono font-bold text-base text-green-600 mt-0.5">
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
