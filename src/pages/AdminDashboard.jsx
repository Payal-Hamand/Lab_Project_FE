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
      {/* Header */}

<div className="bg-blue-950 pt-6 pb-10 md:pt-10 md:pb-14">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">

    {/* Badge */}

    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">

      <div className="w-2 h-2 rounded-full bg-green-400"></div>

      Admin Management Portal

    </div>

    {/* Heading */}

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5 leading-tight">

      Admin Dashboard

    </h1>

    {/* Subtitle */}

    <p className="text-sm sm:text-base lg:text-lg text-blue-100 mt-4 leading-7 max-w-2xl">

      Manage tests, packages, staff,
      bookings and laboratory operations.

    </p>

  </div>

</div>

{/* Main */}

<div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">

        {/* Stats */}

<div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

  {/* Total Bookings */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Bookings

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-blue-950">

          {bookings.length}

        </h2>

      </div>

      <div className="bg-blue-100 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaClipboardList />

      </div>

    </div>

  </div>

  {/* Tests */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Tests

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-green-600">

          {tests.length}

        </h2>

      </div>

      <div className="bg-green-100 text-green-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaFlask />

      </div>

    </div>

  </div>

  {/* Pending */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Pending

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-yellow-600">

          {
            bookings.filter(
              item =>
                item.status ===
                'Pending'
            ).length
          }

        </h2>

      </div>

      <div className="bg-yellow-100 text-yellow-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaVial />

      </div>

    </div>

  </div>

  {/* Completed */}

  <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-[11px] md:text-sm font-medium">

          Completed

        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-purple-600">

          {
            bookings.filter(
              item =>
                item.status ===
                'Completed'
            ).length
          }

        </h2>

      </div>

      <div className="bg-purple-100 text-purple-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl">

        <FaBoxOpen />

      </div>

    </div>

  </div>

</div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">

  {/* Create Test */}

  <button
    onClick={() =>
      setActivePanel('test')
    }
    className="bg-white hover:bg-blue-600 hover:text-white transition rounded-2xl md:rounded-[30px] p-4 md:p-7 shadow-sm text-left group border border-gray-100 hover:shadow-xl"
  >

    <div className="flex items-start justify-between">

      <div>

        <h2 className="text-lg md:text-2xl font-bold text-blue-950 group-hover:text-white transition">

          Create Test

        </h2>

        <p className="mt-2 text-xs md:text-sm opacity-80 leading-6">

          Add new laboratory tests

        </p>

      </div>

      <div className="bg-blue-100 group-hover:bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl text-blue-600 group-hover:text-white transition shrink-0">

        <FaFlask />

      </div>

    </div>

  </button>

  {/* Create Package */}

  <button
    onClick={() =>
      setActivePanel('package')
    }
    className="bg-white hover:bg-purple-600 hover:text-white transition rounded-2xl md:rounded-[30px] p-4 md:p-7 shadow-sm text-left group border border-gray-100 hover:shadow-xl"
  >

    <div className="flex items-start justify-between">

      <div>

        <h2 className="text-lg md:text-2xl font-bold text-blue-950 group-hover:text-white transition">

          Create Package

        </h2>

        <p className="mt-2 text-xs md:text-sm opacity-80 leading-6">

          Add health packages

        </p>

      </div>

      <div className="bg-purple-100 group-hover:bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl text-purple-600 group-hover:text-white transition shrink-0">

        <FaBoxOpen />

      </div>

    </div>

  </button>

  {/* Create Assistant */}

  <button
    onClick={() =>
      setActivePanel('assistant')
    }
    className="bg-white hover:bg-green-600 hover:text-white transition rounded-2xl md:rounded-[30px] p-4 md:p-7 shadow-sm text-left group border border-gray-100 hover:shadow-xl"
  >

    <div className="flex items-start justify-between">

      <div>

        <h2 className="text-lg md:text-2xl font-bold text-blue-950 group-hover:text-white transition">

          Create Assistant

        </h2>

        <p className="mt-2 text-xs md:text-sm opacity-80 leading-6">

          Add laboratory staff

        </p>

      </div>

      <div className="bg-green-100 group-hover:bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl text-green-600 group-hover:text-white transition shrink-0">

        <FaUserPlus />

      </div>

    </div>

  </button>

</div>


        {/* Bookings */}

<div className="bg-white rounded-2xl md:rounded-[35px] shadow-sm mt-8 md:mt-12 p-4 md:p-8">

  {/* Top */}

  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl md:text-3xl font-bold text-blue-950">

        Recent Bookings

      </h2>

      <p className="text-gray-500 text-sm mt-1">

        Latest patient booking activity

      </p>

    </div>

  </div>

  {/* Table */}

  <div className="overflow-x-auto rounded-2xl border border-gray-100">

    <table className="w-full min-w-[850px]">

      <thead className="bg-blue-50">

        <tr>

          <th className="text-left px-6 py-4 text-sm font-semibold text-blue-950">

            Patient

          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-blue-950">

            Test

          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-blue-950">

            Date

          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-blue-950">

            Status

          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-blue-950">

            Lab Assistant

          </th>

        </tr>

      </thead>

      <tbody>

        {
          bookings.map((item) => (

            <tr
              key={item._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >

              {/* Patient */}

              <td className="px-6 py-5">

                <div>

                  <h3 className="font-semibold text-blue-950">

                    {item.patientName}

                  </h3>

                  <p className="text-sm text-gray-500 mt-1">

                    {item.phone}

                  </p>

                </div>

              </td>

              {/* Test */}

              <td className="px-6 py-5">

                <div className="font-medium text-gray-700">

                  {item?.test?.title}

                </div>

              </td>

              {/* Date */}

              <td className="px-6 py-5">

                <div className="text-gray-600 text-sm">

                  {item.bookingDate}

                </div>

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                <span
                  className={`px-4 py-2 rounded-full text-xs font-semibold
                  
                  ${
                    item.status ===
                    'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }
                  
                  `}
                >

                  {item.status}

                </span>

              </td>

              {/* Assistant */}

              <td className="px-6 py-5">

                {
                  item.assignedLabAssistant
                    ? (

                      <div>

                        <p className="font-medium text-gray-800">

                          {
                            item
                              .assignedLabAssistant
                              .name
                          }

                        </p>

                        <p className="text-sm text-gray-500 mt-1">

                          {
                            item
                              .assignedLabAssistant
                              .email
                          }

                        </p>

                      </div>
                    )
                    : (

                      <span className="text-gray-400 text-sm">

                        Not Assigned

                      </span>
                    )
                }

              </td>

            </tr>
          ))
        }

      </tbody>

    </table>

  </div>

</div>

      </div>

      {/* Sliding Panel */}

{
 activePanel && (

  <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

    <div className="bg-white w-full sm:w-[90%] md:max-w-2xl h-screen overflow-y-auto p-4 sm:p-6 md:p-10">

      {/* Top */}

      <div className="flex items-start justify-between border-b pb-4 md:pb-5">

        <div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 leading-tight">

            {
              activePanel === 'test'
                ? 'Create Test'
                : activePanel === 'package'
                ? 'Create Package'
                : 'Create Lab Assistant'
            }

          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">

            Fill all required details

          </p>

        </div>

        <button
          onClick={() =>
            setActivePanel('')
          }
          className="text-3xl md:text-4xl leading-none text-gray-500 hover:text-red-500 transition shrink-0"
        >

          ×

        </button>

      </div>

      {/* TEST FORM */}

      {
        activePanel === 'test' && (

          <form
            onSubmit={handleCreateTest}
            className="mt-6 md:mt-10 space-y-5 md:space-y-6"
          >

            <div>

              <label className="font-semibold text-sm md:text-base">

                Test Title

              </label>

              <input
                type="text"
                name="title"
                value={testData.title}
                onChange={handleTestChange}
                placeholder="CBC Test"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Category

              </label>

              <input
                type="text"
                name="category"
                value={testData.category}
                onChange={handleTestChange}
                placeholder="Blood Test"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold text-sm md:text-base">

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={testData.price}
                  onChange={handleTestChange}
                  placeholder="499"
                  className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
                />

              </div>

              <div>

                <label className="font-semibold text-sm md:text-base">

                  Report Time

                </label>

                <input
                  type="text"
                  name="reportTime"
                  value={testData.reportTime}
                  onChange={handleTestChange}
                  placeholder="12 Hours"
                  className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Description

              </label>

              <textarea
                rows="4"
                name="description"
                value={testData.description}
                onChange={handleTestChange}
                placeholder="Complete Blood Count Test"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Image URL

              </label>

              <input
                type="text"
                name="image"
                value={testData.image}
                onChange={handleTestChange}
                placeholder="https://image-url.com"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg">

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
            className="mt-6 md:mt-10 space-y-5 md:space-y-6"
          >

            <div>

              <label className="font-semibold text-sm md:text-base">

                Package Title

              </label>

              <input
                type="text"
                name="title"
                value={packageData.title}
                onChange={handlePackageChange}
                placeholder="Full Body Checkup"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Category

              </label>

              <input
                type="text"
                name="category"
                value={packageData.category}
                onChange={handlePackageChange}
                placeholder="Health Package"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold text-sm md:text-base">

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={packageData.price}
                  onChange={handlePackageChange}
                  placeholder="1999"
                  className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
                />

              </div>

              <div>

                <label className="font-semibold text-sm md:text-base">

                  Tests Included

                </label>

                <input
                  type="text"
                  name="testsIncluded"
                  value={packageData.testsIncluded}
                  onChange={handlePackageChange}
                  placeholder="CBC, Thyroid"
                  className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Description

              </label>

              <textarea
                rows="4"
                name="description"
                value={packageData.description}
                onChange={handlePackageChange}
                placeholder="Complete health package"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Image URL

              </label>

              <input
                type="text"
                name="image"
                value={packageData.image}
                onChange={handlePackageChange}
                placeholder="https://image-url.com"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <button className="bg-purple-600 hover:bg-purple-700 transition text-white w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg">

              Create Package

            </button>

          </form>
        )
      }

      {/* ASSISTANT FORM */}

      {
        activePanel === 'assistant' && (

          <form
            onSubmit={handleCreateAssistant}
            className="mt-6 md:mt-10 space-y-5 md:space-y-6"
          >

            <div>

              <label className="font-semibold text-sm md:text-base">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={assistantData.name}
                onChange={handleAssistantChange}
                placeholder="John Doe"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={assistantData.email}
                onChange={handleAssistantChange}
                placeholder="assistant@gmail.com"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <div>

              <label className="font-semibold text-sm md:text-base">

                Password

              </label>

              <input
                type="password"
                name="password"
                value={assistantData.password}
                onChange={handleAssistantChange}
                placeholder="Enter Password"
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none text-sm md:text-base"
              />

            </div>

            <button className="bg-green-600 hover:bg-green-700 transition text-white w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg">

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