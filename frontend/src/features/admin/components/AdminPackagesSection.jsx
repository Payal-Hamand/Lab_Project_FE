import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createPackage } from '@/services/package.service'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import useFormErrors from '@/hooks/useFormErrors'

const AdminPackagesSection = ({ open, onClose, onCreated, allTests }) => {
  const [creating, setCreating] = useState(false)
  const { errors, validate, onFieldChange } = useFormErrors()
  const [packageData, setPackageData] = useState({
    title: '',
    category: '',
    price: '',
    testsIncluded: [],
    description: '',
    image: '',
  })

  const buildErrors = (p) => ({
    title: !p.title ? 'Package title is required' : '',
    category: !p.category ? 'Category is required' : '',
    price: !p.price ? 'Package price is required' : '',
    testsIncluded: p.testsIncluded.length === 0 ? 'Select at least one test' : '',
    description: !p.description ? 'Description is required' : '',
    image: !p.image ? 'Image URL is required' : '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...packageData, [name]: value }
    setPackageData(next)
    onFieldChange(name, buildErrors(next))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (creating) return
    if (!validate(buildErrors(packageData))) return
    try {
      setCreating(true)
      await createPackage({
        ...packageData,
        testsIncluded: packageData.testsIncluded,
      })
      toast.success('Package Created Successfully')
      onCreated()
      onClose()
      setPackageData({
        title: '',
        category: '',
        price: '',
        testsIncluded: [],
        description: '',
        image: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setCreating(false)
    }
  }

  return (
    <Modal
      open={open}
      title="Create Package"
      subtitle="Add healthcare package"
      onClose={onClose}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input required type="text" name="title" label="Package Title" placeholder="Enter package title" value={packageData.title} onChange={handleChange} error={errors.title} />
          <Input required type="text" name="category" label="Category" placeholder="Enter category" value={packageData.category} onChange={handleChange} error={errors.category} />
        </div>

        {/* Test selection box */}
        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xs font-medium text-foreground">Select Tests</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Choose tests to include in package</p>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-semibold w-fit">
              {packageData.testsIncluded.length} Tests Selected
            </div>
          </div>
          <Select
            onChange={(e) => {
              const selectedId = e.target.value
              if (selectedId && !packageData.testsIncluded.includes(selectedId)) {
                const next = {
                  ...packageData,
                  testsIncluded: [...packageData.testsIncluded, selectedId],
                }
                setPackageData(next)
                onFieldChange('testsIncluded', buildErrors(next))
              }
            }}
            error={errors.testsIncluded}
          >
            <option value="">Select Test</option>
            {allTests.map((test) => (
              <option key={test._id} value={test._id}>
                {test.title} — ₹{test.price}
              </option>
            ))}
          </Select>
          <div className="flex flex-wrap gap-2 mt-4">
            {packageData.testsIncluded.map((id) => {
              const test = allTests.find((item) => item._id === id)
              if (!test) return null
              return (
                <div
                  key={id}
                  className="bg-primary/10 border border-border rounded-lg px-3 py-2 flex items-center justify-between gap-3 min-w-[150px]"
                >
                  <div>
                    <h4 className="text-xs font-medium text-foreground">{test.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">₹{test.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPackageData({
                        ...packageData,
                        testsIncluded: packageData.testsIncluded.filter((item) => item !== id),
                      })
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <Input required type="number" name="price" label="Package Price" placeholder="Enter package price" value={packageData.price} onChange={handleChange} error={errors.price} />
        <Textarea rows="5" name="description" label="Description" placeholder="Write package description" value={packageData.description} onChange={handleChange} error={errors.description} />
        <Input type="text" name="image" label="Image URL" placeholder="Enter image URL" value={packageData.image} onChange={handleChange} error={errors.image} />
        <Button type="submit" loading={creating} fullWidth>
          Create Package
        </Button>
      </form>
    </Modal>
  )
}

export default AdminPackagesSection
