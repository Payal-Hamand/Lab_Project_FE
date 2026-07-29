import { MapPin, Map } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import LocationPicker from '@/components/LocationPicker'
import { toast } from 'react-toastify'

export default function BookingAddressSection({
  formData,
  handleChange,
  mapLocation,
  setMapLocation,
  showMap,
  setShowMap,
  getCurrentLocation,
  openMap,
  reverseGeocode,
}) {
  return (
    <div className="space-y-5">
      <div>
        <Textarea
          label={
            <span className="flex items-center gap-2">
              <MapPin /> Full Address
            </span>
          }
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="House No, Street, Area"
        />
      </div>
      <div className="border border-primary rounded-xl p-6">
        <label className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <MapPin size={18} className="text-primary" />
          Location
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <Button type="button" onClick={getCurrentLocation}>
            <MapPin size={16} className="inline mr-2" />
            Use Current Location
          </Button>
          <Button type="button" onClick={openMap} variant="success">
            <Map size={16} className="inline mr-2" />
            Select On Map
          </Button>
        </div>
      </div>
      <Modal
        open={showMap}
        onClose={() => setShowMap(false)}
        title="Select Patient Location"
        size="full"
      >
        <LocationPicker
          location={mapLocation}
          setLocation={setMapLocation}
          onLocationSelect={reverseGeocode}
        />
        <Button
          onClick={() => {
            if (!mapLocation?.lat) {
              toast.error('Please select location')
              return
            }
            setShowMap(false)
          }}
          fullWidth
          variant="success"
          className="mt-5"
        >
          Confirm Location
        </Button>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <Input
            label="Flat / Apartment"
            type="text"
            name="flatNo"
            value={formData.flatNo}
            onChange={handleChange}
            required
            placeholder="Flat No / Building"
          />
        </div>
        <div>
          <Input
            label="Landmark"
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            required
            placeholder="Near Mall / Hospital"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <Input
            label="City/State"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter city/state"
          />
        </div>
        <div>
          <Input
            label="Pincode"
            type="text"
            name="pincode"
            maxLength={6}
            value={formData.pincode}
            onChange={handleChange}
            required
            placeholder="Enter pincode"
          />
        </div>
      </div>
    </div>
  )
}
