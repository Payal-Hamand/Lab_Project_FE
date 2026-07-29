import { User, Phone } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

export default function BookingPatientInfo({ formData, handleChange }) {
  return (
    <>
      <div>
        <Input
          label={
            <span className="flex items-center gap-2">
              <User /> Patient Name
            </span>
          }
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          placeholder="Enter patient name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <Input
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="100"
            placeholder="Enter age"
          />
        </div>
        <div>
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>
      </div>
      <div>
        <Input
          label={
            <span className="flex items-center gap-2">
              <Phone /> Phone Number
            </span>
          }
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
        />
      </div>
    </>
  )
}
