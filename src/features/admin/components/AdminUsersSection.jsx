import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createLabOwner } from '@/services/user.service'
import { updateBookingLab } from '@/services/booking.service'
import { DashboardSidePanel, DashboardSectionHeader, EmptyState } from '@/components/Dashboard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import LocationPicker from '@/components/LocationPicker'
import { MapPin, Map } from 'lucide-react'

const AdminUsersSection = ({
  labOwners,
  onRefresh,
  showLabMap,
  setShowLabMap,
  showEditModal,
  setShowEditModal,
  selectedBooking,
  selectedLab,
  setSelectedLab,
  labOwnersRef,
  open,
  onClose,
}) => {
  const [creating, setCreating] = useState(false)
  const [labOwnerData, setLabOwnerData] = useState({
    name: '',
    email: '',
    password: '',
    servicePincodes: '',
    labAddress: '',
    latitude: '',
    longitude: '',
  })

  const handleChange = (e) => {
    setLabOwnerData({
      ...labOwnerData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateLabOwner = async (e) => {
    e.preventDefault()
    if (creating) return
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
      setCreating(true)
      await createLabOwner({
        ...labOwnerData,
        servicePincodes: labOwnerData.servicePincodes.split(',').map((item) => item.trim()),
      })
      toast.success('Lab Owner Created Successfully')
      onRefresh()
      onClose()
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
      setCreating(false)
    }
  }

  const handleUpdateLab = async () => {
    try {
      await updateBookingLab(selectedBooking._id, selectedLab)
      toast.success('Lab Updated Successfully')
      setShowEditModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to Update Lab')
    }
  }

  return (
    <>
      <DashboardSidePanel
        open={open}
        title="Create Lab Owner"
        subtitle="Add new laboratory owner"
        onClose={onClose}
      >
        <form onSubmit={handleCreateLabOwner} className="space-y-5">
          <Input
            required
            type="text"
            name="name"
            placeholder="Full Name"
            value={labOwnerData.name}
            onChange={handleChange}
          />
          <Input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={labOwnerData.email}
            onChange={handleChange}
          />
          <Input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={labOwnerData.password}
            onChange={handleChange}
          />
          <Input
            required
            type="text"
            name="servicePincodes"
            placeholder="411033, 411044"
            value={labOwnerData.servicePincodes}
            onChange={handleChange}
          />
          <div>
            {labOwnerData.labAddress && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="font-semibold text-green-700 flex items-center gap-2">
                  <MapPin size={16} /> Lab Location Selected
                </div>
                <div className="text-sm text-gray-600 mt-2">{labOwnerData.labAddress}</div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowLabMap(true)}
              className="w-full bg-blue-100 text-blue-700 py-4 rounded-2xl font-semibold"
            >
              <Map size={18} className="inline mr-2" />
              Select Lab Location On Map
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
          <Button type="submit" loading={creating} fullWidth>
            Create Lab Owner
          </Button>
        </form>
      </DashboardSidePanel>

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
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
                          {owner.name?.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-950">{owner.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">ID: {owner._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-gray-600">{owner.email}</td>
                    <td className="py-5 px-4">
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                        {owner.role}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex flex-wrap gap-2">
                        {owner.servicePincodes?.map((pin, index) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {pin}
                          </span>
                        ))}
                      </div>
                    </td>
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
    </>
  )
}

export default AdminUsersSection
