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
import LocationPicker from '../components/LocationPicker'



const AdminDashboard = () => {

  const [bookings, setBookings] =
    useState([])
const [showLabMap, setShowLabMap] =
  useState(false)
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


const [labOwners, setLabOwners] =
  useState([])
  const [loading, setLoading] =
    useState(true)
    const [selectedBooking, setSelectedBooking] =
  useState(null)
  
const [selectedLab, setSelectedLab] =
  useState('')
const [showEditModal, setShowEditModal] =
  useState(false)
const openEditModal = booking => {

  setSelectedBooking(booking)

  setSelectedLab(
    booking.labOwner?._id || ''
  )

  setShowEditModal(true)
}
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

  const [payment, setPayment] =
useState(null);

const [form, setForm] =
useState({

  accountName: "",

  upiId: ""

});

const [qrImage, setQrImage] =
useState(null);

useEffect(() => {

  fetchPayment();

}, []);

const fetchPayment = async () => {

  try {

    const { data } =
      await API.get(
        "/payment-setting"
      );

    if (data.data) {

      setPayment(data.data);

      setForm({

        accountName:
          data.data.accountName,

        upiId:
          data.data.upiId

      });

    }

  } catch (err) {

    console.log(err);

  }

};
const handleSubmit = async () => {

  try {

    const formData =
      new FormData();

    formData.append(
      "accountName",
      form.accountName
    );

    formData.append(
      "upiId",
      form.upiId
    );

    if (qrImage) {

      formData.append(
        "qrImage",
        qrImage
      );

    }

    if (payment) {

      await API.put(

        "/payment-setting",

        formData

      );

    } else {

      await API.post(

        "/payment-setting",

        formData

      );

    }

    toast.success(
      "Saved Successfully"
    );

    fetchPayment();

  } catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Something went wrong"

    );

  }

};
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
servicePincodes :'',
  labAddress: '',

  latitude: '',

  longitude: ''

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
  useEffect(() => {
  fetchLabOwners()
}, [])

const fetchLabOwners = async () => {
  try {

    const { data } =
      await API.get(
        '/bookings/lab-owners'
      )

    setLabOwners(data)

  } catch (error) {

    console.log(error)

  }
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
  const handleUpdateLab = async () => {
  try {

    await API.put(
      `/bookings/update-booking-lab/${selectedBooking._id}`,
      {
        labOwnerId: selectedLab
      }
    );

    toast.success(
      "Lab Updated Successfully"
    );

    fetchBookings();

    setShowEditModal(false);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to Update Lab"
    );

  }
};

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

  !labOwnerData.servicePincodes ||

  !labOwnerData.labAddress ||

  !labOwnerData.latitude ||

  !labOwnerData.longitude

)
{
  return toast.error(
    'Please select lab location'
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

  servicePincodes: '',

  labAddress: '',

  latitude: '',

  longitude: ''

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
const getLabLocation = () => {

  navigator.geolocation.getCurrentPosition(

    async position => {

      const lat =
        position.coords.latitude

      const lng =
        position.coords.longitude

      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )

      const data =
        await response.json()

      setLabOwnerData(prev => ({

        ...prev,

        labAddress:
          data.display_name,

        latitude: lat,

        longitude: lng

      }))
    },

    () => {

      toast.error(
        'Location Permission Denied'
      )
    }
  )
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

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

  {/* Create Test */}

  <button
    onClick={() => setActivePanel("test")}
    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
  >
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
        <FaFlask className="text-2xl" />
      </div>

      <div className="text-left">
        <h3 className="font-bold text-lg">
          Create Test
        </h3>

        <p className="text-blue-100 text-sm">
          Add laboratory tests
        </p>
      </div>

    </div>
  </button>

  {/* Create Package */}

  <button
    onClick={() => setActivePanel("package")}
    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
  >
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
        <FaBoxOpen className="text-2xl" />
      </div>

      <div className="text-left">
        <h3 className="font-bold text-lg">
          Create Package
        </h3>

        <p className="text-purple-100 text-sm">
          Add health packages
        </p>
      </div>

    </div>
  </button>

  {/* Create Lab Owner */}

  <button
    onClick={() => setActivePanel("lab-owner")}
    className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
  >
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
        <FaUsers className="text-2xl" />
      </div>

      <div className="text-left">
        <h3 className="font-bold text-lg">
          Create Lab Owner
        </h3>

        <p className="text-green-100 text-sm">
          Add laboratory owner
        </p>
      </div>

    </div>
  </button>

  {/* Upload Payment Receipt */}

  <button
  onClick={() => setActivePanel("payment")}
  className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition"
>
  <div className="flex items-center gap-4">

    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
      💳
    </div>

    <div className="text-left">
      <h3 className="font-bold text-lg">
        Payment Settings
      </h3>

      <p className="text-green-100 text-sm">
        Upload QR & UPI Details
      </p>
    </div>

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
        className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"/>
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

      <div>
      {labOwnerData.labAddress && (

  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">

    <div className="font-semibold text-green-700">

      📍 Lab Location Selected

    </div>

    <div className="text-sm text-gray-600 mt-2">

      {labOwnerData.labAddress}

    </div>

  </div>

)}
    <button
  type="button"
  onClick={() =>
    setShowLabMap(true)
  }
  className="w-full bg-blue-100 text-blue-700 py-4 rounded-2xl font-semibold"
>
  🗺️ Select Lab Location On Map
</button>
{showLabMap && (

  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-4xl rounded-3xl p-5">

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-bold text-xl">

          Select Lab Location

        </h3>

        <button
          onClick={() =>
            setShowLabMap(false)
          }
        >
          ✕
        </button>

      </div>

     <LocationPicker
  location={{
    lat:
      Number(
        labOwnerData.latitude
      ) || 18.5204,

    lng:
      Number(
        labOwnerData.longitude
      ) || 73.8567
  }}
        setLocation={(loc) => {

          setLabOwnerData(prev => ({
            ...prev,
            latitude: loc.lat,
            longitude: loc.lng
          }))
        }}
        onLocationSelect={
          async (lat, lng) => {

            const response =
              await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
              )

            const data =
              await response.json()

            setLabOwnerData(prev => ({

              ...prev,

              labAddress:
                data.display_name,

              latitude: lat,

              longitude: lng

            }))
          }
        }
      />

      <button
        onClick={() =>
          setShowLabMap(false)
        }
        className="w-full mt-5 bg-green-600 text-white py-4 rounded-2xl"
      >

        Confirm Location

      </button>

    </div>

  </div>

)}

</div>
    <button className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-2xl font-semibold">

      Create Lab Owner

    </button>
    

  </form>

</DashboardSidePanel>

<DashboardSidePanel
  open={activePanel === "payment"}
  title="Payment Settings"
  subtitle="Upload QR Code and UPI Details"
  onClose={() => setActivePanel("")}
>

<form
  onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
  className="space-y-6"
>

  <div>

    <label className="block mb-2 font-semibold">
      Account Holder Name
    </label>

    <input
      type="text"
      value={form.accountName}
      onChange={(e)=>
        setForm({
          ...form,
          accountName:e.target.value
        })
      }
      className="w-full border rounded-2xl px-5 py-4"
      placeholder="Enter Account Name"
      required
    />

  </div>

  <div>

    <label className="block mb-2 font-semibold">
      UPI ID
    </label>

    <input
      type="text"
      value={form.upiId}
      onChange={(e)=>
        setForm({
          ...form,
          upiId:e.target.value
        })
      }
      className="w-full border rounded-2xl px-5 py-4"
      placeholder="abc@okaxis"
      required
    />

  </div>

  <div>

    <label className="block mb-2 font-semibold">
      QR Code
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>
        setQrImage(
          e.target.files[0]
        )
      }
    />

  </div>

  {qrImage && (

    <div className="bg-blue-50 rounded-2xl p-4">

      <p className="font-medium text-blue-700">

        Selected File

      </p>

      <p className="text-sm mt-2">

        {qrImage.name}

      </p>

    </div>

  )}

  {payment?.qrImage && (

    <div className="space-y-3">

      <p className="font-semibold">

        Current QR Code

      </p>

      <img
        src={payment.qrImage}
        alt=""
        className="w-64 rounded-2xl border"
      />

    </div>

  )}

  <button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
  >

    {payment
      ? "Update Payment Settings"
      : "Save Payment Settings"}

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
    <>
      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <BookingsTable
          
           bookings={filteredBookings}
  isAdmin={true}
  openEditModal={openEditModal}
        />

      </div>

      {/* Mobile Cards */}

<div className="lg:hidden grid gap-4">
  {filteredBookings.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-[28px] shadow-lg border border-slate-100 overflow-hidden"
    >
      <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />

      <div className="p-5">

        {/* Header */}
        <div className="flex justify-between items-start">

          <div>
            <h2 className="font-bold text-lg text-slate-900">
              {item.patientName}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              📞 {item.phone}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              item.status === "Completed"
                ? "bg-green-100 text-green-700"
                : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.status}
          </span>

        </div>

        {/* Assigned Lab */}

        <div className="mt-4 bg-purple-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            Assigned Lab
          </p>

          <h3 className="font-semibold text-purple-700 mt-1">
            {item.labOwner?.name || "Not Assigned"}
          </h3>

          <p
            title={item.labOwner?.labAddress}
            className="text-sm text-gray-600 mt-2 truncate"
          >
            📍 {item.labOwner?.labAddress || "No Address"}
          </p>
        </div>

        {/* Test / Package */}

        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500 mb-2">
            Test / Package
          </p>

          <div className="flex justify-between items-center gap-3">
            <h3 className="font-bold text-slate-800 flex-1">
              {item?.test?.title || item?.package?.title}
            </h3>

            <span className="text-green-600 font-bold text-lg">
              ₹
              {item?.test?.price || item?.package?.price}
            </span>
          </div>
        </div>

        {/* Date & Time */}

        <div className="grid grid-cols-2 gap-3 mt-4">

          <div className="bg-purple-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Date</p>

            <h3 className="font-semibold text-purple-700 mt-1">
              {item.bookingDate}
            </h3>
          </div>

          <div className="bg-orange-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Time</p>

            <h3 className="font-semibold text-orange-700 mt-1">
              {item.bookingTime}
            </h3>
          </div>

        </div>

        {/* Address */}

        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            Address
          </p>

          <p className="text-slate-700 mt-2 text-sm">
            {item.flatNo}, {item.address},{" "}
            {item.city} - {item.pincode}
          </p>
        </div>

        {/* Payment */}

        <div className="mt-4 bg-green-50 rounded-2xl p-4 flex justify-between items-center">

          <p className="text-xs text-gray-500">
            Payment Status
          </p>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              item.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.paymentStatus}
          </span>
          

        </div>

        {/* User */}
<div className="mt-4">
  {item.status === "Completed" ? (
    <div className="w-full bg-green-100 text-green-700 py-3 rounded-2xl text-center font-semibold">
      ✅ Booking Completed
    </div>
  ) : (
    <button
      onClick={() =>
        openEditModal(item)
      }
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"
    >
      ✏️ Edit Assigned Lab
    </button>
  )}
</div>
      </div>
    </div>
  ))}
</div>
   
    </>
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
{showEditModal && selectedBooking && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-6 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-5">
        Edit Assigned Lab
      </h2>

     <select
  value={selectedLab}
  onChange={(e) =>
    setSelectedLab(
      e.target.value
    )
  }
  className="w-full border rounded-xl p-3"
>
  <option value="">
    Select Lab Owner
  </option>

  {labOwners.map((lab) => (
    <option
      key={lab._id}
      value={lab._id}
    >
      {lab.name}
    </option>
  ))}
</select>

      <button
  onClick={handleUpdateLab}
  disabled={!selectedLab}
  className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl"
>
  Save Changes
</button>
    </div>

  </div>

)}
</div>

      </div>

    </div>
  )
}

export default AdminDashboard
