import { FlaskConical } from 'lucide-react'
import Select from '@/components/ui/Select'

export default function BookingTestSelect({ tests, packages, formData, handleTestPackageChange }) {
  return (
    <div>
      <Select
        label={
          <span className="flex items-center gap-2">
            <FlaskConical /> Select Test / Package
          </span>
        }
        name="test"
        value={formData.test || formData.package}
        required
        onChange={handleTestPackageChange}
      >
        <option value="">Choose Test or Package</option>
        <optgroup label="Tests">
          {tests.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title} — ₹{item.price}
            </option>
          ))}
        </optgroup>
        <optgroup label="Packages">
          {packages.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title} — ₹{item.price}
            </option>
          ))}
        </optgroup>
      </Select>
    </div>
  )
}
