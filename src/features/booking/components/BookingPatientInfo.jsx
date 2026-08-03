import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

export default function BookingPatientInfo({ formData, errors, handleChange }) {
  return (
    <>
      <div>
        <Input
          label="Patient Name"
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          error={errors.patientName}
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
            error={errors.age}
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
            error={errors.gender}
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
          label="Phone Number"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          error={errors.phone}
          placeholder="Enter phone number"
        />
      </div>
    </>
  )
}
