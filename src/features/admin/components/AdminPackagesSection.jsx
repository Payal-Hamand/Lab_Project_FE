import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createPackage } from '@/services/package.service'
import { DashboardSidePanel } from '@/components/Dashboard'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

const AdminPackagesSection = ({ open, onClose, onCreated, allTests }) => {
  const [creating, setCreating] = useState(false)
  const [packageData, setPackageData] = useState({
    title: '',
    category: '',
    price: '',
    testsIncluded: [],
    description: '',
    image: '',
  })

  const handleChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (creating) return
    if (
      !packageData.title ||
      !packageData.category ||
      !packageData.price ||
      !packageData.description ||
      !packageData.image ||
      packageData.testsIncluded.length === 0
    ) {
      return toast.error('Please fill all required fields')
    }
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
    <DashboardSidePanel
      open={open}
      title="Create Package"
      subtitle="Add healthcare package"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-foreground font-medium block mb-1.5">Package Title</label>
            <Input required type="text" name="title" placeholder="Enter package title" value={packageData.title} onChange={handleChange} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground font-medium block mb-1.5">Category</label>
            <Input required type="text" name="category" placeholder="Enter category" value={packageData.category} onChange={handleChange} />
          </div>
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
                setPackageData({
                  ...packageData,
                  testsIncluded: [...packageData.testsIncluded, selectedId],
                })
              }
            }}
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

        <div>
          <label className="text-[10px] text-muted-foreground font-medium block mb-1.5">Package Price</label>
          <Input required type="number" name="price" placeholder="Enter package price" value={packageData.price} onChange={handleChange} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground font-medium block mb-1.5">Description</label>
          <Textarea rows="5" name="description" placeholder="Write package description" value={packageData.description} onChange={handleChange} />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground font-medium block mb-1.5">Image URL</label>
          <Input required type="text" name="image" placeholder="Enter image URL" value={packageData.image} onChange={handleChange} />
        </div>
        <Button type="submit" loading={creating} fullWidth>
          Create Package
        </Button>
      </form>
    </DashboardSidePanel>
  )
}

export default AdminPackagesSection
