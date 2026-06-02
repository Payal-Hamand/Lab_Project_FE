import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  useNavigate
} from 'react-router-dom'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaUsers,
  FaFlask,
  FaClipboardList,
  FaVial,
  FaBoxOpen
} from 'react-icons/fa'

import {

  DashboardStatsCard,

  DashboardSectionHeader,

  DashboardSidePanel,
  LoadingSpinner,
  BookingsTable,

  EmptyState

} from '../components/Dashboard'



const AdminDashboard = () => {

  const [bookings, setBookings] =
    useState([])
    const [activePanel,
  setActivePanel
] = useState('')
const navigate = useNavigate()
const [activeSection,setActiveSection] = useState('all')
  const [tests, setTests] = useState([])
const [allTests,
  setAllTests
] = useState([])
  const [loading, setLoading] =
    useState(true)
    const tableRef = useRef(null)
    const [testData, setTestData] =
  useState({

    title: '',

    category: '',

    price: '',

    reportTime: '',

    description: '',

    image: ''

  })
  const [packageData,
  setPackageData
] = useState({

  title: '',

  category: '',

  price: '',

  testsIncluded: [],

  description: '',

  image: ''

})
const selectedTestsPrice =

  allTests

    .filter(test =>

      packageData.testsIncluded.includes(
        test._id
      )
    )

    .reduce(

      (acc, item) =>

        acc + item.price,

      0
    )

const expectedPrice =

  selectedTestsPrice +

  Number(
    packageData.price || 0
  )



const [labOwnerData,
  setLabOwnerData
] = useState({

  name: '',

  email: '',

  password: '',

  servicePincodes: ''

})
const handleTestChange = (
  e
) => {

  setTestData({

    ...testData,

    [e.target.name]:
      e.target.value

  })
}
const handlePackageChange = (
  e
) => {

  setPackageData({

    ...packageData,

    [e.target.name]:
      e.target.value

  })
}
const handleLabOwnerChange =
  (e) => {

    setLabOwnerData({

      ...labOwnerData,

      [e.target.name]:
        e.target.value

    })
  }
  const handleCreateTest =
  async (e) => {

    e.preventDefault()

    try {

      await API.post(

        '/tests',

        testData
      )

      fetchTests()

      setActivePanel('')

      setTestData({

        title: '',

        category: '',

        price: '',

        reportTime: '',

        description: '',

        image: ''

      })

    } catch (error) {

      console.log(error)
    }
  }
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
              

              .map(item =>
                item.trim()
              )

        }
      )

      setActivePanel('')

      setPackageData({

        title: '',

        category: '',

        price: '',

        testsIncluded: [],

        description: '',

        image: ''

      })

    } catch (error) {

      console.log(error)
    }
  }
  const handleCreateLabOwner =
  async (e) => {

    e.preventDefault()

    try {

      await API.post(

        '/admin/create-lab-owner',

        {

          ...labOwnerData,

          servicePincodes:
            labOwnerData.servicePincodes

              .split(',')

              .map(item =>
                item.trim()
              )

        }
      )

      setActivePanel('')

      setLabOwnerData({

        name: '',

        email: '',

        password: '',

        servicePincodes: ''

      })

    } catch (error) {

      console.log(error)
    }
  }

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

    } finally {

      setLoading(false)
    }
  }

  const fetchTests = async () => {

    try {

      const { data } = await API.get(
        '/tests'
      )

      setTests(data)
      setAllTests(data)

    } catch (error) {

      console.log(error)
    }
  }
  const scrollToTable = () => {

  setTimeout(() => {

    tableRef.current
      ?.scrollIntoView({

        behavior: 'smooth'

      })

  }, 100)
}
  const filteredBookings =

  activeSection ===
  'pending'

    ? bookings.filter(
        item =>
          item.status ===
          'Pending'
      )

    : activeSection ===
      'completed'

    ? bookings.filter(
        item =>
          item.status ===
          'Completed'
      )

    : bookings

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Hero */}

      <div className="bg-blue-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            Admin Management Portal

          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5">

            Admin Dashboard

          </h1>

          <p className="text-blue-100 mt-4 max-w-2xl leading-7">

            Manage tests, packages, bookings,
            lab owners and laboratory operations.

          </p>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

  <DashboardStatsCard
    title="Bookings"
    value={bookings.length}
    icon={<FaClipboardList />}
    color="blue"
    bgColor="bg-blue-100 text-blue-600"
    active={
      activeSection === 'all'
    }
    onClick={() =>{
      setActiveSection('all')

  scrollToTable()
  }
    }
  />

  <DashboardStatsCard
    title="Tests"
    value={tests.length}
    icon={<FaFlask />}
    color="green"
    bgColor="bg-green-100 text-green-600"
    onClick={() =>
    navigate('/tests')
  }
  />

  <DashboardStatsCard
    title="Pending"
    value={
      bookings.filter(
        item =>
          item.status === 'Pending'
      ).length
    }
    icon={<FaVial />}
    color="yellow"
    bgColor="bg-yellow-100 text-yellow-600"
    active={
      activeSection ===
      'pending'
    }
    onClick={() =>{
      setActiveSection(
        'pending'
      )
      scrollToTable()
      }
    }
  />

  <DashboardStatsCard
    title="Completed"
    value={
      bookings.filter(
        item =>
          item.status === 'Completed'
      ).length
    }
    icon={<FaBoxOpen />}
    color="purple"
    bgColor="bg-purple-100 text-purple-600"
    active={
      activeSection ===
      'completed'
    }
    onClick={() =>{
      setActiveSection(
        'completed'
      )
      scrollToTable()
      }
    }
  />

</div>

{/* ACTION CARDS */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-10">

  {/* CREATE TEST */}

  <button  onClick={() =>
    setActivePanel('test')
  }
    className="bg-white hover:bg-blue-600 hover:text-white transition rounded-3xl p-5 md:p-7 shadow-sm text-left group"
  >

    <div className="bg-blue-100 group-hover:bg-white/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-blue-600 group-hover:text-white transition">

      <FaFlask />

    </div>

    <h2 className="text-xl md:text-2xl font-bold mt-5 md:mt-6">

      Create Test

    </h2>

    <p className="mt-2 md:mt-3 opacity-80 text-sm md:text-base">

      Add new laboratory tests

    </p>

  </button>

  {/* CREATE PACKAGE */}

  <button  onClick={() =>
    setActivePanel('package')
  }
    className="bg-white hover:bg-purple-600 hover:text-white transition rounded-3xl p-5 md:p-7 shadow-sm text-left group"
  >

    <div className="bg-purple-100 group-hover:bg-white/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-purple-600 group-hover:text-white transition">

      <FaBoxOpen />

    </div>

    <h2 className="text-xl md:text-2xl font-bold mt-5 md:mt-6">

      Create Package

    </h2>

    <p className="mt-2 md:mt-3 opacity-80 text-sm md:text-base">

      Add healthcare packages

    </p>

  </button>

  {/* CREATE LAB OWNER */}

  <button  onClick={() =>
    setActivePanel('lab-owner')
  }
    className="bg-white hover:bg-green-600 hover:text-white transition rounded-3xl p-5 md:p-7 shadow-sm text-left group"
  >

    <div className="bg-green-100 group-hover:bg-white/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-green-600 group-hover:text-white transition">

      <FaUsers />

    </div>

    <h2 className="text-xl md:text-2xl font-bold mt-5 md:mt-6">

      Create Lab Owner

    </h2>

    <p className="mt-2 md:mt-3 opacity-80 text-sm md:text-base">

      Add and manage lab owners

    </p>

  </button>
</div>
<DashboardSidePanel
  open={activePanel === 'test'}
  title="Create Test"
  subtitle="Fill all required details"
  onClose={() =>
    setActivePanel('')
  }
>

  <form
    onSubmit={handleCreateTest}
    className="space-y-5"
  >

    <input
      type="text"
      name="title"
      placeholder="Test Title"
      value={testData.title}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={testData.category}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <div className="grid md:grid-cols-2 gap-5">

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={testData.price}
        onChange={handleTestChange}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

      <input
        type="text"
        name="reportTime"
        placeholder="Report Time"
        value={testData.reportTime}
        onChange={handleTestChange}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

    </div>

    <textarea
      rows="4"
      name="description"
      placeholder="Description"
      value={testData.description}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={testData.image}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-2xl font-semibold">

      Create Test

    </button>

  </form>

</DashboardSidePanel>

{/* PACKAGE PANEL */}

<DashboardSidePanel
  open={activePanel === 'package'}
  title="Create Package"
  subtitle="Add healthcare package"
  onClose={() =>
    setActivePanel('')
  }
>

 <form
  onSubmit={handleCreatePackage}
  className="space-y-8"
>

  {/* TITLE + CATEGORY */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

    <div>

      <label className="text-sm font-semibold text-gray-700 block mb-2">

        Package Title

      </label>

      <input
        type="text"
        name="title"
        placeholder="Enter package title"
        value={packageData.title}
        onChange={handlePackageChange}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm md:text-base outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
      />

    </div>

    <div>

      <label className="text-sm font-semibold text-gray-700 block mb-2">

        Category

      </label>

      <input
        type="text"
        name="category"
        placeholder="Enter category"
        value={packageData.category}
        onChange={handlePackageChange}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm md:text-base outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
      />

    </div>

  </div>

  {/* TEST SELECTION */}

  <div className="bg-white border border-gray-100 rounded-[30px] p-5 md:p-7 shadow-sm">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <div>

        <h3 className="text-sm font-semibold text-gray-700 ">

          Select Tests

        </h3>

        <p className="text-xs text-gray-300 mt-1">

          Choose tests to include in package

        </p>

      </div>

      <div className="bg-purple-100 text-purple-700 px-5 py-2 rounded-2xl text-sm font-semibold w-fit">

        {
          packageData.testsIncluded.length
        } Tests Selected

      </div>

    </div>

    {/* DROPDOWN */}

    <select
      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm md:text-base outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition"
      onChange={(e) => {

        const selectedId =
          e.target.value

        if (
          selectedId &&
          !packageData.testsIncluded.includes(
            selectedId
          )
        ) {

          setPackageData({

            ...packageData,

            testsIncluded: [

              ...packageData.testsIncluded,

              selectedId

            ]
          })
        }
      }}
    >

      <option value="">

        Select Test

      </option>

      {
        allTests.map(test => (

          <option
            key={test._id}
            value={test._id}
          >

            {test.title} — ₹{test.price}

          </option>
        ))
      }

    </select>

    {/* SELECTED TESTS */}

    <div className="flex flex-wrap gap-3 mt-6 pt-2">

      {
        packageData.testsIncluded.map(
          id => {

            const test =
              allTests.find(
                item =>
                  item._id === id
              )

            if (!test) return null

            return (

              <div
                key={id}
               className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-4 min-w-[170px] shadow-sm"
              >

                <div>

                  <h4 className="font-semibold text-blue-950 text-sm">

                    {test.title}

                  </h4>

                  <p className="text-xs text-gray-500 mt-1">

                    ₹{test.price}

                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {

                    setPackageData({

                      ...packageData,

                      testsIncluded:

                        packageData.testsIncluded.filter(

                          item =>
                            item !== id
                        )
                    })
                  }}
                  className="text-red-500 hover:text-red-700 text-xl"
                >

                  ×

                </button>

              </div>
            )
          }
        )
      }

    </div>

  </div>

  <div >

    {/* PRICE */}

    

       <label className="text-sm font-semibold text-gray-700 block mb-2">

        Package Price

      </label>

      <input
        type="number"
        name="price"
        placeholder="Enter package price"
        value={packageData.price}
        onChange={handlePackageChange}
        className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
      />

    </div>

 

  {/* DESCRIPTION */}

  <div>

    <label className="text-sm font-semibold text-gray-700 block mb-2">

      Description

    </label>

    <textarea
      rows="5"
      name="description"
      placeholder="Write package description"
      value={packageData.description}
      onChange={handlePackageChange}
      className="w-full border border-gray-200 rounded-[30px] px-5 py-4 text-sm md:text-base outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition resize-none"
    />

  </div>

  {/* IMAGE */}

  <div>

    <label className="text-sm font-semibold text-gray-700 block mb-2">

      Image URL

    </label>

    <input
      type="text"
      name="image"
      placeholder="Enter image URL"
      value={packageData.image}
      onChange={handlePackageChange}
      className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
    />

  </div>

  {/* BUTTON */}

  <button className="bg-purple-600 hover:bg-purple-700 active:scale-[0.99] transition-all text-white w-full py-4 rounded-2xl font-semibold text-base md:text-lg shadow-lg shadow-purple-200">

    Create Package

  </button>

</form>

</DashboardSidePanel>

{/* LAB OWNER PANEL */}

<DashboardSidePanel
  open={activePanel === 'lab-owner'}
  title="Create Lab Owner"
  subtitle="Add new laboratory owner"
  onClose={() =>
    setActivePanel('')
  }
>

  <form
    onSubmit={handleCreateLabOwner}
    className="space-y-5"
  >

    <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={labOwnerData.name}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={labOwnerData.email}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={labOwnerData.password}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
      type="text"
      name="servicePincodes"
      placeholder="411033, 411044"
      value={
        labOwnerData.servicePincodes
      }
      onChange={
        handleLabOwnerChange
      }
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <button className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-2xl font-semibold">

      Create Lab Owner

    </button>

  </form>

</DashboardSidePanel>

        {/* Recent Bookings */}

       <div
  ref={tableRef}
  className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8"
>

  <DashboardSectionHeader
    title="Recent Bookings"
    subtitle="Latest patient booking activity"
  />

  {
    loading ? (

      <LoadingSpinner />

    ) : filteredBookings.length === 0 ? (

      <EmptyState text="No Bookings Found" />

    ) : (

      <BookingsTable
        bookings={filteredBookings}
      />
    )
  }

</div>

      </div>

    </div>
  )
}

export default AdminDashboard
