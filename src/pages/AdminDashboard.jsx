import React, {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaUsers,
  FaFlask,
  FaClipboardList,
  FaUserPlus,
  FaVial,
  FaBoxOpen
} from 'react-icons/fa'

const AdminDashboard = () => {

  // States

  const [bookings, setBookings] =
    useState([])

  const [tests, setTests] =
    useState([])

  const [activePanel, setActivePanel] =
    useState('')

  // Test Data

  const [testData, setTestData] =
    useState({

      title: '',
      category: '',
      price: '',
      reportTime: '',
      description: '',
      image: ''

    })

  // Package Data

  const [packageData, setPackageData] =
    useState({

      title: '',
      description: '',
      price: '',
      testsIncluded: '',
      image: '',
      category: ''

    })

  // Assistant Data

  const [assistantData, setAssistantData] =
    useState({

      name: '',
      email: '',
      password: ''

    })

  // Fetch Data

  useEffect(() => {

    fetchBookings()

    fetchTests()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } = await API.get(
        '/bookings/all'
      )

      setBookings(data)

    } catch (error) {

      console.log(error)
    }
  }

  const fetchTests = async () => {

    try {

      const { data } = await API.get(
        '/tests'
      )

      setTests(data)

    } catch (error) {

      console.log(error)
    }
  }

  // Handlers

  const handleTestChange = (e) => {

    setTestData({

      ...testData,

      [e.target.name]:
        e.target.value

    })
  }

  const handlePackageChange = (e) => {

    setPackageData({

      ...packageData,

      [e.target.name]:
        e.target.value

    })
  }

  const handleAssistantChange = (e) => {

    setAssistantData({

      ...assistantData,

      [e.target.name]:
        e.target.value

    })
  }

  // Create Test

  const handleCreateTest = async (
    e
  ) => {

    e.preventDefault()

    try {

      await API.post(
        '/tests',
        testData
      )

      alert('Test Created')

      setActivePanel('')

      fetchTests()

    } catch (error) {

      alert(
        error.response?.data?.message
      )
    }
  }

  // Create Package

  const handleCreatePackage =
    async (e) => {

      e.preventDefault()

      try {

        await API.post(
          '/packages',
          {

            ...packageData,

            testsIncluded:
              packageData.testsIncluded
                .split(',')

          }
        )

        alert('Package Created')

        setActivePanel('')

      } catch (error) {

        alert(
          error.response?.data?.message
        )
      }
    }

  // Create Assistant

  const handleCreateAssistant =
    async (e) => {

      e.preventDefault()

      try {

        await API.post(
          '/admin/create-lab-assistant',
          assistantData
        )

        alert(
          'Lab Assistant Created'
        )

        setActivePanel('')

      } catch (error) {

        alert(
          error.response?.data?.message
        )
      }
    }

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Header */}

      <div className="bg-blue-950 py-16">

        <div className="max-w-7xl mx-auto px-6 text-white">

          <h1 className="text-5xl font-bold">

            Admin Dashboard

          </h1>

          <p className="mt-4 text-blue-100 text-lg">

            Manage tests, packages &
            staff

          </p>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Bookings
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {bookings.length}

                </h2>

              </div>

              <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl text-3xl">

                <FaClipboardList />

              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Tests
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {tests.length}

                </h2>

              </div>

              <div className="bg-green-100 text-green-600 p-5 rounded-2xl text-3xl">

                <FaFlask />

              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Pending Reports
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    bookings.filter(
                      item =>
                        item.status ===
                        'Pending'
                    ).length
                  }

                </h2>

              </div>

              <div className="bg-yellow-100 text-yellow-600 p-5 rounded-2xl text-3xl">

                <FaVial />

              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    bookings.filter(
                      item =>
                        item.status ===
                        'Completed'
                    ).length
                  }

                </h2>

              </div>

              <div className="bg-purple-100 text-purple-600 p-5 rounded-2xl text-3xl">

                <FaBoxOpen />

              </div>

            </div>

          </div>

        </div>

        {/* Action Buttons */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {/* Create Test */}

          <button
            onClick={() =>
              setActivePanel('test')
            }
            className="bg-white hover:bg-blue-600 hover:text-white transition rounded-[30px] shadow-sm p-8 text-left group"
          >

            <div className="bg-blue-100 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-blue-600 group-hover:text-white">

              <FaFlask />

            </div>

            <h2 className="text-2xl font-bold mt-6">

              Create Test

            </h2>

            <p className="mt-3 opacity-80">

              Add new lab tests

            </p>

          </button>

          {/* Create Package */}

          <button
            onClick={() =>
              setActivePanel(
                'package'
              )
            }
            className="bg-white hover:bg-purple-600 hover:text-white transition rounded-[30px] shadow-sm p-8 text-left group"
          >

            <div className="bg-purple-100 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-purple-600 group-hover:text-white">

              <FaBoxOpen />

            </div>

            <h2 className="text-2xl font-bold mt-6">

              Create Package

            </h2>

            <p className="mt-3 opacity-80">

              Add health packages

            </p>

          </button>

          {/* Create Assistant */}

          <button
            onClick={() =>
              setActivePanel(
                'assistant'
              )
            }
            className="bg-white hover:bg-green-600 hover:text-white transition rounded-[30px] shadow-sm p-8 text-left group"
          >

            <div className="bg-green-100 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-green-600 group-hover:text-white">

              <FaUserPlus />

            </div>

            <h2 className="text-2xl font-bold mt-6">

              Create Assistant

            </h2>

            <p className="mt-3 opacity-80">

              Add lab staff

            </p>

          </button>

        </div>

        {/* Bookings */}

        <div className="bg-white rounded-[35px] shadow-sm mt-12 p-8 overflow-x-auto">

          <h2 className="text-3xl font-bold text-blue-950 mb-8">

            Recent Bookings

          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Patient
                </th>

                <th className="text-left py-4">
                  Test
                </th>

                <th className="text-left py-4">
                  Date
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Lab Assistant
                </th>

              </tr>

            </thead>

            <tbody>

              {
                bookings.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="py-5">

                      {
                        item.patientName
                      }

                    </td>

                    <td>

                      {
                        item?.test
                          ?.title
                      }

                    </td>

                    <td>

                      {
                        item.bookingDate
                      }

                    </td>

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm
                        
                        ${
                          item.status ===
                          'Completed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }
                        
                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {
                        item.assignedLabAssistant
                          ? item
                              .assignedLabAssistant
                              .name
                          : 'Not Assigned'
                      }

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* Sliding Panel */}

{
  activePanel && (

    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="bg-white w-full max-w-2xl h-screen overflow-y-auto p-10">

        {/* Top */}

        <div className="flex items-center justify-between border-b pb-5">

          <div>

            <h2 className="text-4xl font-bold text-blue-950">

              {
                activePanel === 'test'
                  ? 'Create Test'
                  : activePanel === 'package'
                  ? 'Create Package'
                  : 'Create Lab Assistant'
              }

            </h2>

            <p className="text-gray-500 mt-2">

              Fill all required details

            </p>

          </div>

          <button
            onClick={() =>
              setActivePanel('')
            }
            className="text-4xl text-gray-500 hover:text-red-500"
          >

            ×

          </button>

        </div>

        {/* TEST FORM */}

        {
          activePanel === 'test' && (

            <form
              onSubmit={handleCreateTest}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="font-semibold">
                  Test Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={testData.title}
                  onChange={handleTestChange}
                  placeholder="CBC Test"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={testData.category}
                  onChange={handleTestChange}
                  placeholder="Blood Test"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={testData.price}
                  onChange={handleTestChange}
                  placeholder="499"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Report Time
                </label>

                <input
                  type="text"
                  name="reportTime"
                  value={testData.reportTime}
                  onChange={handleTestChange}
                  placeholder="12 Hours"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={testData.description}
                  onChange={handleTestChange}
                  placeholder="Complete Blood Count Test"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={testData.image}
                  onChange={handleTestChange}
                  placeholder="https://image-url.com"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-4 rounded-2xl font-semibold text-lg">

                Create Test

              </button>

            </form>
          )
        }

        {/* PACKAGE FORM */}

        {
          activePanel === 'package' && (

            <form
              onSubmit={handleCreatePackage}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="font-semibold">
                  Package Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={packageData.title}
                  onChange={handlePackageChange}
                  placeholder="Full Body Checkup"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={packageData.category}
                  onChange={handlePackageChange}
                  placeholder="Health Package"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={packageData.price}
                  onChange={handlePackageChange}
                  placeholder="1999"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Tests Included
                </label>

                <input
                  type="text"
                  name="testsIncluded"
                  value={packageData.testsIncluded}
                  onChange={handlePackageChange}
                  placeholder="CBC, Thyroid, Sugar"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={packageData.description}
                  onChange={handlePackageChange}
                  placeholder="Complete health package"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={packageData.image}
                  onChange={handlePackageChange}
                  placeholder="https://image-url.com"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <button className="bg-purple-600 hover:bg-purple-700 transition text-white w-full py-4 rounded-2xl font-semibold text-lg">

                Create Package

              </button>

            </form>
          )
        }

        {/* LAB ASSISTANT FORM */}

        {
          activePanel === 'assistant' && (

            <form
              onSubmit={handleCreateAssistant}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={assistantData.name}
                  onChange={handleAssistantChange}
                  placeholder="John Doe"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={assistantData.email}
                  onChange={handleAssistantChange}
                  placeholder="assistant@gmail.com"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={assistantData.password}
                  onChange={handleAssistantChange}
                  placeholder="Enter Password"
                  className="w-full border mt-2 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <button className="bg-green-600 hover:bg-green-700 transition text-white w-full py-4 rounded-2xl font-semibold text-lg">

                Create Lab Assistant

              </button>

            </form>
          )
        }

      </div>

    </div>
  )
}

    </div>
  )
}

export default AdminDashboard