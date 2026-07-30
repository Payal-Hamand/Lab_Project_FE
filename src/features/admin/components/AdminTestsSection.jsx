import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createTest } from '@/services/test.service'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const AdminTestsSection = ({ open, onClose, onCreated }) => {
  const [creating, setCreating] = useState(false)
  const [testData, setTestData] = useState({
    title: '',
    category: '',
    price: '',
    reportTime: '',
    description: '',
    image: '',
  })

  const handleChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (creating) return
    if (
      !testData.title ||
      !testData.category ||
      !testData.price ||
      !testData.reportTime ||
      !testData.description ||
      !testData.image
    ) {
      return toast.error('Please fill all required fields')
    }
    try {
      setCreating(true)
      await createTest(testData)
      toast.success('Test Created Successfully')
      onCreated()
      onClose()
      setTestData({
        title: '',
        category: '',
        price: '',
        reportTime: '',
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
      title="Create Test"
      subtitle="Fill all required details"
      onClose={onClose}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          required
          type="text"
          name="title"
          placeholder="Test Title"
          value={testData.title}
          onChange={handleChange}
        />
        <Input
          required
          type="text"
          name="category"
          placeholder="Category"
          value={testData.category}
          onChange={handleChange}
        />
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            required
            type="number"
            name="price"
            placeholder="Price"
            value={testData.price}
            onChange={handleChange}
          />
          <Input
            required
            type="text"
            name="reportTime"
            placeholder="Report Time"
            value={testData.reportTime}
            onChange={handleChange}
          />
        </div>
        <Textarea
          rows="4"
          name="description"
          placeholder="Description"
          value={testData.description}
          onChange={handleChange}
        />
        <Input
          required
          type="text"
          name="image"
          placeholder="Image URL"
          value={testData.image}
          onChange={handleChange}
        />
        <Button type="submit" loading={creating} fullWidth>
          Create Test
        </Button>
      </form>
    </Modal>
  )
}

export default AdminTestsSection
