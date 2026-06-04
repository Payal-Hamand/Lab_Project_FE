import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  useNavigate
} from 'react-router-dom'
import { toast }
from 'react-toastify'

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

    const [creatingAssistant, setCreatingAssistant] = useState(false);

    const [activePanel,
  setActivePanel
] = useState('')
const navigate = useNavigate()
const [activeSection,setActiveSection] = useState('all')
  const [tests, setTests] = useState([])
const [allTests,
  setAllTests
] = useState([])
const [packages,
setPackages] =
useState([])

const [labOwners,
setLabOwners] =
useState([])
  const [loading, setLoading] =
    useState(true)
    const tableRef = useRef(null)
    const labOwnersRef =
  useRef(null)
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
  if (creatingAssistant) return;

  if (

    !testData.title ||

    !testData.category ||

    !testData.price ||

    !testData.reportTime ||

    !testData.description ||

    !testData.image

  ) {

    return toast.error(
      'Please fill all required fields'
    )
  }

  try {
 setCreatingAssistant(true);
    await API.post(
      '/tests',
      testData
    )

    toast.success(
      'Test Created Successfully'
    )

    fetchDashboardData()

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

    toast.error(
      error.response?.data
        ?.message ||

      'Something went wrong'
    )
  }
  finally {
    setCreatingAssistant(false);
  }
}
  
const handleCreatePackage =
async (e) => {

  e.preventDefault()
  if (creatingAssistant) return;

  if (

    !packageData.title ||

    !packageData.category ||

    !packageData.price ||

    !packageData.description ||

    !packageData.image ||

    packageData.testsIncluded
      .length === 0

  ) {

    return toast.error(
      'Please fill all required fields'
    )
  }

  try {

     setCreatingAssistant(true);
    await API.post(

      '/packages',

      {

        ...packageData,

        testsIncluded:
          packageData.testsIncluded
      }
    )

    toast.success(
      'Package Created Successfully'
    )

    fetchDashboardData()

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

    toast.error(
      error.response?.data
        ?.message ||

      'Something went wrong'
    )
  }
  finally {
    setCreatingAssistant(false);
  }
}
 const handleCreateLabOwner =
async (e) => {

  e.preventDefault()
  if (creatingAssistant) return;

  if (

    !labOwnerData.name ||

    !labOwnerData.email ||

    !labOwnerData.password ||

    !labOwnerData.servicePincodes

  ) {

    return toast.error(
      'Please fill all required fields'
    )
  }

  try {
     setCreatingAssistant(true);

    await API.post(

      '/admin/create-lab-owner',

      {

        ...labOwnerData,

        servicePincodes:

          labOwnerData
            .servicePincodes

            .split(',')

            .map(item =>
              item.trim()
            )
      }
    )

    toast.success(
      'Lab Owner Created Successfully'
    )

    fetchDashboardData()

    setActivePanel('')

    setLabOwnerData({

      name: '',

      email: '',

      password: '',

      servicePincodes: ''

    })

  } catch (error) {

    toast.error(
      error.response?.data
        ?.message ||

      'Something went wrong'
    )
  }
  finally {
    setCreatingAssistant(false);
  }
}

  useEffect(() => {

    fetchBookings()

    fetchDashboardData()

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


const fetchDashboardData =
async () => {

  try {

    const [

      testsRes,

      packagesRes,

      labOwnersRes

    ] = await Promise.all([

      API.get('/tests'),

      API.get('/packages'),

      API.get('/admin/lab-owners')

    ])

    setTests(
      testsRes.data
    )

    setAllTests(
      testsRes.data
    )

    setPackages(
      packagesRes.data
    )

    setLabOwners(
      labOwnersRes.data
    )

  } catch (error) {

    console.log(error)
  }
}

const scrollToLabOwners =
() => {

  setTimeout(() => {

    labOwnersRef.current
      ?.scrollIntoView({

        behavior: 'smooth',

        block: 'start'
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

        {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"> */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">

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
  <DashboardStatsCard
  title="Packages"
  value={packages.length}
  icon={<FaBoxOpen />}
  color="purple"
  bgColor="bg-purple-100 text-purple-600"
  onClick={() =>
    navigate('/packages')
  }
/>

<DashboardStatsCard
  title="Lab Owners"
  value={labOwners.length}
  icon={<FaUsers />}
  color="green"
  bgColor="bg-green-100 text-green-600"
  onClick={
    scrollToLabOwners
  }
/>

</div>

{/* ACTION CARDS */}

{/* QUICK ACTIONS */}

<div className="flex flex-wrap gap-4 mt-8">

  {/* CREATE TEST */}

  <button
    onClick={() =>
      setActivePanel('test')
    }
    className="group flex items-center gap-3 bg-white hover:bg-blue-600 border border-blue-100 hover:border-blue-600 px-5 py-4 rounded-2xl shadow-sm transition-all"
  >

    <div className="w-11 h-11 rounded-xl bg-blue-100 group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white transition">

      <FaFlask className="text-lg" />

    </div>

    <div className="text-left">

      <h3 className="font-bold text-blue-950 group-hover:text-white text-sm">

        Create Test

      </h3>

      <p className="text-xs text-gray-500 group-hover:text-blue-100 mt-1">

        Add lab tests

      </p>

    </div>

  </button>

  {/* CREATE PACKAGE */}

  <button
    onClick={() =>
      setActivePanel('package')
    }
    className="group flex items-center gap-3 bg-white hover:bg-purple-600 border border-purple-100 hover:border-purple-600 px-5 py-4 rounded-2xl shadow-sm transition-all"
  >

    <div className="w-11 h-11 rounded-xl bg-purple-100 group-hover:bg-white/20 flex items-center justify-center text-purple-600 group-hover:text-white transition">

      <FaBoxOpen className="text-lg" />

    </div>

    <div className="text-left">

      <h3 className="font-bold text-blue-950 group-hover:text-white text-sm">

        Create Package

      </h3>

      <p className="text-xs text-gray-500 group-hover:text-purple-100 mt-1">

        Add health package

      </p>

    </div>

  </button>

  {/* CREATE LAB OWNER */}

  <button
    onClick={() =>
      setActivePanel('lab-owner')
    }
    className="group flex items-center gap-3 bg-white hover:bg-green-600 border border-green-100 hover:border-green-600 px-5 py-4 rounded-2xl shadow-sm transition-all"
  >

    <div className="w-11 h-11 rounded-xl bg-green-100 group-hover:bg-white/20 flex items-center justify-center text-green-600 group-hover:text-white transition">

      <FaUsers className="text-lg" />

    </div>

    <div className="text-left">

      <h3 className="font-bold text-blue-950 group-hover:text-white text-sm">

        Create Lab Owner

      </h3>

      <p className="text-xs text-gray-500 group-hover:text-green-100 mt-1">

        Add laboratory owner

      </p>

    </div>

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
  
    required
      type="text"
      name="title"
      placeholder="Test Title"
      value={testData.title}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
    required
      type="text"
      name="category"
      placeholder="Category"
      value={testData.category}
      onChange={handleTestChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <div className="grid md:grid-cols-2 gap-5">

      <input
     
      required
        type="number"
        name="price"
        placeholder="Price"
        value={testData.price}
        onChange={handleTestChange}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

      <input
      required
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
    required
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
      required
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
      required
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
      required
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
    required
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
    required
      type="text"
      name="name"
      placeholder="Full Name"
      value={labOwnerData.name}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
    required
      type="email"
      name="email"
      placeholder="Email"
      value={labOwnerData.email}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
    required
      type="password"
      name="password"
      placeholder="Password"
      value={labOwnerData.password}
      onChange={handleLabOwnerChange}
      className="w-full border rounded-2xl px-5 py-4 outline-none"
    />

    <input
    required
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
{/* LAB OWNERS */}
<div ref={labOwnersRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
  <DashboardSectionHeader
    title="Lab Owners"
    subtitle="Manage all laboratory owners"
  />
  {
    labOwners.length === 0 ? (
      <EmptyState text="No Lab Owners Found" />
    ) : (
      <div className="overflow-x-auto mt-8">
        <table className="w-full min-w-[900px]">
          <thead className="bg-blue-50 text-m text-black text-ce4">
            <tr className="border-b text-left text-black">
              <th className="py-5 px-4  font-semibold">
                Owner
              </th>
              <th className="py-5 px-4  font-semibold">
                Email
              </th>
              <th className="py-5 px-4  font-semibold">
                Role
              </th>
              <th className="py-5 px-4  font-semibold">
                Service Areas
              </th>
              <th className="py-5 px-4  font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {
              labOwners.map(
                owner => (
                  <tr
                    key={owner._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* NAME */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">

                          {
                            owner.name?.charAt(0)
                          }

                        </div>

                        <div>

                          <h3 className="font-bold text-blue-950">

                            {owner.name}

                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            ID: {
                              owner._id.slice(-6)
                            }

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td className="py-5 px-4 text-gray-600">

                      {owner.email}

                    </td>

                    {/* ROLE */}

                    <td className="py-5 px-4">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">

                        {owner.role}

                      </span>

                    </td>

                    {/* PINCODES */}

                    <td className="py-5 px-4">

                      <div className="flex flex-wrap gap-2">

                        {
                          owner.servicePincodes?.map(

                            (pin, index) => (

                              <span
                                key={index}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                              >

                                {pin}

                              </span>
                            )
                          )
                        }

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="py-5 px-4">

                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                        <span className="w-2 h-2 rounded-full bg-green-500"></span>

                        Active

                      </div>

                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>
    )
  }

</div>

      </div>

    </div>
  )
}

export default AdminDashboard
