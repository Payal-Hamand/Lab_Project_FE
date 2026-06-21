import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  toast
} from 'react-toastify'

import Navbar from '../components/Navbar'

import API from '../services/api'

import {
  FaMapMarkedAlt,
  FaMicroscope,
  FaMoneyCheckAlt,
  FaFileMedical,
  FaUserCircle,
  FaFlask,
  FaClipboardList,
  FaCheckCircle,
  FaVial,
  FaMoneyBillWave,
  FaFileUpload,
  FaMapMarkerAlt,
  FaRoute
} from "react-icons/fa";
import {

  DashboardStatsCard,

  LoadingSpinner,

  EmptyState

} from '../components/Dashboard'

const LabAssistantDashboard = () => {

  const [bookings, setBookings] =
    useState([])
    const [selectedReport, setSelectedReport] =
  useState({})
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingReport, setUploadingReport] = useState({});

  const [uploadingSample, setUploadingSample] = useState(false);
const [creatingAssistant, setCreatingAssistant] = useState(false);
  const [loading, setLoading] =
    useState(true)
    const [activeSection,
  setActiveSection
] = useState('all')
const [selectedBooking,
setSelectedBooking] =
useState(null)

const [sampleImages,
setSampleImages] =
useState([])



const [paymentBooking,
setPaymentBooking] =
useState(null)

const [assistantNotes,
setAssistantNotes] =
useState('')

const [showSampleModal,
setShowSampleModal] =
useState(false)

    const tableRef = useRef(null)

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } = await API.get(
        '/bookings/assigned'
      )

      setBookings(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
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


const handleReached =
async (bookingId) => {

  try {

    await API.put(
      `/bookings/reached/${bookingId}`
    )

    fetchBookings()

  } catch (error) {

    console.log(error)
  }
}
const openPaymentModal =
(booking) => {

  setPaymentBooking(
    booking
  )

  setShowPaymentModal(
    true
  )
}

const openSampleModal = (booking) => {

  setSelectedBooking(booking);

  setSampleImages([]);
  setAssistantNotes("");

  setShowSampleModal(true);
};
const handleSampleUpload = async () => {

  if (sampleImages.length === 0) {
    toast.error(
      "Please select at least one sample image"
    );
    return;
  }

  try {

    setUploadingSample(true);

    const formData = new FormData();

    sampleImages.forEach((image) => {
      formData.append(
        "sampleImages",
        image
      );
    });

    formData.append(
      "assistantNotes",
      assistantNotes
    );

    await API.put(
      `/bookings/sample/${selectedBooking._id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    toast.success(
      "Sample uploaded successfully"
    );

    setShowSampleModal(false);
    setSampleImages([]);
    setAssistantNotes("");

    fetchBookings();

  } catch (error) {

    toast.error(
      error?.response?.data?.message ||
      "Upload failed"
    );

  } finally {

    setUploadingSample(false);

  }
};

const openNavigation = (booking) => {

  const lat = booking.patientLatitude;
  const lng = booking.patientLongitude;

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
    "_blank"
  );
};

const handlePayment =
  async (booking) => {
try {

      const { data } =
  await API.post(

    "/payment/create",

    {
      bookingId:
        booking._id,

      patientName:
        booking.patientName,

      amount:
  booking?.test?.price ||
  booking?.package?.price,

      mobileNumber:
        booking.phone,
    }
  );

      if (data.success) {

        window.location.href =
          data.url;
      }

    } catch (error) {

      console.log(error);
    }
  };

const handleUploadReport = async (bookingId) => {
  if (!selectedReport[bookingId]) {
    return toast.error("Please select report file");
  }

  try {
    setUploadingReport((prev) => ({
      ...prev,
      [bookingId]: true,
    }));

    const formData = new FormData();

    formData.append(
      "report",
      selectedReport[bookingId]
    );

    await API.put(
      `/bookings/upload-report/${bookingId}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    toast.success("Report Uploaded");
    fetchBookings();

  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Upload failed"
    );
  } finally {
    setUploadingReport((prev) => ({
      ...prev,
      [bookingId]: false,
    }));
  }
};
useEffect(() => {

  const timer = setTimeout(() => {

    if (searchTerm.trim()) {
      searchBookings(searchTerm);
    } else {
      fetchBookings();
    }

  }, 500);

  return () => clearTimeout(timer);

}, [searchTerm]);
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


    
    const searchBookings = async (value) => {

  setSearchTerm(value);

  try {

    const { data } = await API.get(
      `/bookings/assigned/search?search=${value}`
    );

    setBookings(data);

  } catch (error) {

    console.log(error);

  }
};

  return (

    <div className="bg-[#f4f8ff] min-h-screen">

      <Navbar />

      {/* Hero */}

      <div className="bg-blue-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-white">

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            Lab Assistant Portal

          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-5">

            Lab Assistant Dashboard

          </h1>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

  <DashboardStatsCard
    title="Total Tests"
    value={bookings.length}
    icon={<FaFlask />}
    color="blue"
    bgColor="bg-blue-100 text-blue-600"
    active={
      activeSection === 'all'
    }
    onClick={() =>
      setActiveSection('all')
    }
  />

  <DashboardStatsCard
    title="Pending Reports"
    value={
      bookings.filter(
        item =>
          item.status === 'Pending'
      ).length
    }
    icon={<FaClipboardList />}
    color="yellow"
    bgColor="bg-yellow-100 text-yellow-600"
    active={
      activeSection ===
      'pending'
    }
    onClick={() =>
      setActiveSection(
        'pending'
      )
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
    icon={<FaCheckCircle />}
    color="green"
    bgColor="bg-green-100 text-green-600"
    active={
      activeSection ===
      'completed'
    }
    onClick={() =>
      setActiveSection(
        'completed'
      )
    }
  />

</div>


        {/* Table */}

        <div className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4">

  <div className="relative flex-1">

    <input
      type="text"
      placeholder="Search patient, mobile, test or package..."
      value={searchTerm}
      onChange={(e) =>
        searchBookings(e.target.value)
      }
      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
    />

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      🔍
    </span>

  </div>

  <div className="bg-blue-50 px-5 py-3 rounded-2xl font-semibold text-blue-700">
    {bookings.length} Bookings
  </div>

</div>

        {
  loading ? (
    <LoadingSpinner />
  ) : bookings.length === 0 ? (
    <EmptyState text="No Assigned Bookings" />
  ) : (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">
          <thead>
            {/* Your current table header */}
          </thead>

          <tbody>
            {filteredBookings.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-slate-50"
              >
                {/* Your current table row code */}
              </tr>

            ))}
          </tbody>
        </table>

      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-5">

        {filteredBookings.map((item) => (

          <div
            key={item._id}
            className="overflow-hidden rounded-[28px] bg-white shadow-lg border border-slate-100"
          >

            {/* Top Color Bar */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />

            <div className="p-5">

              {/* Patient Header */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <FaUserCircle className="text-blue-600 text-3xl" />

                </div>

                <div className="flex-1">

                  <h2 className="font-bold text-slate-800 text-lg">
                    {item.patientName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    📞 {item.phone}
                  </p>

                </div>

              </div>
              {/* Test */}
             <div className="mt-4 bg-slate-50 rounded-2xl p-4">

  <p className="text-xs text-gray-500 mb-2">
    Test / Package
  </p>

  <div className="flex justify-between items-center gap-4">

    <h3 className="font-bold text-slate-800 text-lg">
      {item?.test?.title ||
        item?.package?.title ||
        "N/A"}
    </h3>

    <p className="text-green-600 font-bold text-xl whitespace-nowrap">
      ₹{
        item?.test?.price ||
        item?.package?.price ||
        0
      }
    </p>

  </div>

</div>

              {/* Date Time */}
              <div className="grid grid-cols-2 gap-3 mt-4">

                <div className="bg-blue-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="font-semibold text-blue-900">
                    {item.bookingDate}
                  </p>

                </div>

                <div className="bg-purple-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="font-semibold text-purple-900">
                    {item.bookingTime}
                  </p>

                </div>

              </div>

              {/* Address */}
              <div className="mt-4 bg-slate-50 rounded-xl p-4">

                <div className="flex gap-3">

                  <FaMapMarkerAlt className="text-red-500 mt-1" />

                  <div>

                    <p className="text-xs text-gray-500">
                      Address
                    </p>

                    <p className="text-sm text-slate-700 mt-1">
                      {item.address}
                    </p>

                  </div>

                </div>

              </div>

              {/* Status */}
              <div className="flex gap-2 mt-4 flex-wrap">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Reached"
                      ? "bg-blue-100 text-blue-700"
                      : item.status === "Assigned"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>

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

              {/* Actions */}
              <div className="grid grid-cols-4 gap-3 mt-5">

                <button
                  onClick={() => openNavigation(item)}
                  className="h-12 rounded-2xl bg-red-500 text-white"
                >
                  <FaRoute className="mx-auto" />
                </button>

                <button
                  onClick={() => handleReached(item._id)}
                  disabled={item.status !== "Assigned"}
                  className={`h-12 rounded-2xl text-white
                  ${
                    item.status === "Assigned"
                      ? "bg-blue-600"
                      : "bg-gray-400"
                  }`}
                >
                  <FaMapMarkedAlt className="mx-auto" />
                </button>

                <button
                  onClick={() => openSampleModal(item)}
                  disabled={item.status !== "Reached"}
                  className={`h-12 rounded-2xl text-white
                  ${
                    item.status === "Reached"
                      ? "bg-purple-600"
                      : "bg-gray-400"
                  }`}
                >
                  <FaMicroscope className="mx-auto" />
                </button>

                <button
                  onClick={() => handlePayment(item)}
                  disabled={
                    item.status !== "Sample Collected" ||
                    item.paymentStatus === "Paid"
                  }
                  className={`h-12 rounded-2xl text-white
                  ${
                    item.status === "Sample Collected" &&
                    item.paymentStatus !== "Paid"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  }`}
                >
                  <FaMoneyCheckAlt className="mx-auto" />
                </button>

              </div>

              {/* Report */}
              <div className="mt-5">

                {item.report ? (

                  <a
                    href={item.report}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-2xl py-3"
                  >
                    <FaFileMedical />
                    View Report
                  </a>

                ) : item.paymentStatus !== "Paid" ? (

                  <div className="text-center text-red-500 text-sm">
                    Payment Pending
                  </div>

                ) : (

                  <div className="text-center text-blue-600 text-sm">
                    Upload Report Available
                  </div>

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


      </div>
      {
  showSampleModal && (

    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

      <div
  className="
  bg-white
  w-full
  max-w-2xl
  rounded-t-[32px]
  md:rounded-[32px]
  p-4 md:p-6
  shadow-2xl
  "
>
      <h2 className="text-xl md:text-3xl font-bold text-blue-950">
          Upload Sample

        </h2>

     <p className="text-sm md:text-base text-gray-500 mt-2">

          Upload blood sample tube image

        </p>

       <div className="mt-8">

  {/* UPLOAD CARDS */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

    {/* CAMERA */}

    <label className="
group
border-2
border-dashed
border-blue-200
hover:border-blue-500
rounded-3xl
p-5 md:p-8
bg-blue-50/40
hover:bg-blue-50
transition
">

      <input
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {

          if (e.target.files[0]) {

            setSampleImages(prev => [

              ...prev,

              e.target.files[0]
            ])
          }
        }}
      />

      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-blue-100 group-hover:bg-blue-600 transition flex items-center justify-center text-4xl">

        📷

      </div>

      <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">

        Capture Sample

      </h2>

      <p className="text-gray-500 text-center mt-2 text-sm leading-6">

        Open mobile camera and capture blood tube image

      </p>

    </label>

    {/* GALLERY */}

    <label className="
group
border-2
border-dashed
border-pink-200
hover:border-pink-500
rounded-3xl
p-5 md:p-8
bg-pink-50/40
hover:bg-pink-50
transition
">      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {

          setSampleImages(prev => [

            ...prev,

            ...Array.from(
              e.target.files
            )
          ])
        }}
      />

      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-pink-100 group-hover:bg-pink-600 transition flex items-center justify-center text-4xl">

        🖼️

      </div>

      <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">

        Upload Images

      </h2>

      <p className="text-gray-500 text-center mt-2 text-sm leading-6">

        Select multiple sample images from gallery

      </p>

    </label>

  </div>

  {/* IMAGE PREVIEW */}

 {sampleImages.length > 0 && (

  <div className="mt-5">

    <div className="flex items-center justify-between mb-3">

      <h3 className="font-semibold text-blue-950">
        Selected Images
      </h3>

      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {sampleImages.length} Images
      </span>

    </div>

   <div className="flex gap-2 overflow-x-auto pb-2">

      {sampleImages.map((image, index) => (

        <div
          key={index}
          className="relative"
        >

          <img
  src={URL.createObjectURL(image)}
  alt=""
  className="
  w-16
  h-16
  object-cover
  rounded-xl
  border
  border-gray-200
  "
/>

          {/* Remove Image */}

          <button
            type="button"
            onClick={() => {

              setSampleImages(
                sampleImages.filter(
                  (_, i) => i !== index
                )
              );

            }}
            className="
            absolute
            -top-2
            -right-2
            w-6
            h-6
            rounded-full
            bg-red-500
            text-white
            text-xs
            font-bold
            shadow
            "
          >
            ✕
          </button>

        </div>

      ))}

    </div>

    {/* Remove All */}

    <button
      type="button"
      onClick={() =>
        setSampleImages([])
      }
      className="
      mt-3
      text-red-600
      text-sm
      font-medium
      "
    >
      Remove All Images
    </button>

  </div>

)}

  {/* NOTES */}

  <div className="mt-8">

    <label className="block text-sm font-semibold text-blue-950 mb-3">

      Assistant Notes

    </label>

   <textarea
  rows="2"
  placeholder="Assistant notes..."
  value={assistantNotes}
  onChange={(e) =>
    setAssistantNotes(e.target.value)
  }
  className="
  w-full
  border
  border-gray-200
  rounded-2xl
  p-3
  text-sm
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
  resize-none
  "
/>

  </div>

  {/* ACTIONS */}

 <div className="grid grid-cols-2 gap-3 mt-6">
<button
  disabled={
    uploadingSample ||
    sampleImages.length === 0
  }
  onClick={handleSampleUpload}
  className={`
  h-12
  rounded-2xl
  font-semibold
  text-white
  transition

  ${
    uploadingSample ||
    sampleImages.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }
  `}
>
  {uploadingSample ? (
    <>
      <svg
        className="animate-spin h-5 w-5 inline mr-2"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.25"
          fill="none"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      Uploading...
    </>
  ) : (
    "Upload Sample"
  )}
</button>
    <button
  onClick={() => {
    setShowSampleModal(false);
    setSampleImages([]);
  }}
  className="
  h-12
  rounded-2xl
  bg-gray-100
  hover:bg-gray-200
  font-semibold
  transition
  "
>
  Cancel
  </button>

  </div>

</div>

      </div>

    </div>
  )
}
    </div>
  )
}

export default LabAssistantDashboard
