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
  FaMapMarkerAlt
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

const openSampleModal =
(booking) => {

  setSelectedBooking(
    booking
  )

  setShowSampleModal(
    true
  )
}
const handleSampleUpload = async () => {
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

          {
            loading ? (

              <LoadingSpinner />

            ) : bookings.length === 0 ? (

              <EmptyState text="No Assigned Bookings" />

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="bg-slate-100">
  <tr>
    <th className="px-4 py-4">Patient</th>
    <th className="px-4 py-4">Test / Package</th>
    <th className="px-4 py-4">Date & Time</th>
    <th className="px-4 py-4">Status</th>
    <th className="px-4 py-4">Payment</th>
    <th className="px-4 py-4 text-center">Actions</th>
    <th className="px-4 py-4 text-center">Report</th>
  </tr>
</thead>

                  <tbody>

                    {
                      filteredBookings.map(item => (

                        <tr
                          key={item._id}
                          className="border-b"
                        >

                         <td className="px-4 py-5">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <FaUserCircle className="text-blue-600" />
    </div>

    <div>
      <h3 className="font-semibold">
        {item.patientName}
      </h3>

      <p className="text-xs text-gray-500">
        {item.phone}
      </p>
    </div>
  </div>
</td>

                          <td className="px-6 py-5">

                            {item?.test?.title || item?.package?.title}

                          </td>
<td className="px-4 py-5">

<div className="flex flex-col">

<span className="font-semibold text-slate-800">
{new Date(item.bookingDate)
.toLocaleDateString(
"en-IN",
{
weekday: "short",
day: "2-digit",
month: "short",
year: "numeric"
}
)}
</span>

<span className="text-xs text-blue-600 font-medium mt-1">
🕒 {item.bookingTime}
</span>

</div>

</td>
                         <td className="px-4 py-5">

<span
className={`px-3 py-1 rounded-full text-xs font-semibold

${item.status === "Completed"
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

</td>
                           <td className="px-4 py-5">

<span
className={`px-3 py-1 rounded-full text-xs font-semibold

${item.paymentStatus === "Paid"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{item.paymentStatus}
</span>

</td>
<td className="px-4 py-5">

<div className="flex items-center justify-center gap-3">

{/* Reached */}

<div className="relative group">

<button
onClick={() => handleReached(item._id)}
disabled={item.status !== "Assigned"}
className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"
>
<FaMapMarkedAlt />
</button>

<span className="tooltip">
Reached
</span>

</div>

{/* Sample */}

<div className="relative group">

<button
onClick={() => openSampleModal(item)}
disabled={item.status !== "Reached"}
className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:scale-110 transition"
>
<FaMicroscope />
</button>

<span className="tooltip">
Upload Sample
</span>

</div>

{/* Payment */}

<div className="relative group">

<button
onClick={() => handlePayment(item)}
disabled={item.paymentStatus === "Paid"}
className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center hover:scale-110 transition"
>
<FaMoneyCheckAlt />
</button>

<span className="tooltip">
Take Payment
</span>

</div>

</div>

</td>

<td className="px-4 py-5">

{item.report ? (

  <a
    href={item.report}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl"
  >
    <FaFileMedical />
    View Report
  </a>

) : (

  <div className="space-y-2">

    <input
      type="file"
      accept=".pdf"
      hidden
      id={`report-${item._id}`}
      onChange={(e) =>
        setSelectedReport(prev => ({
          ...prev,
          [item._id]: e.target.files[0]
        }))
      }
    />

    <label
      htmlFor={`report-${item._id}`}
      className="block cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-xl px-4 py-3 text-center"
    >
      📄 Choose Report
    </label>

    {selectedReport[item._id] && (
      <div className="text-xs text-green-600 text-center truncate">
        {selectedReport[item._id].name}
      </div>
    )}

    <button
      onClick={() =>
        handleUploadReport(item._id)
      }
      disabled={
        !selectedReport[item._id] ||
        uploadingReport[item._id]
      }
      className={`w-full rounded-xl px-4 py-3 text-white font-medium
      ${
        !selectedReport[item._id]
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {uploadingReport[item._id]
        ? "Uploading..."
        : "Upload Report"}
    </button>

  </div>

)}

</td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>
            )
          }

        </div>

      </div>
      {
  showSampleModal && (

    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-[40px] w-full max-w-3xl p-8 md:p-10 shadow-2xl max-h-[95vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-3xl font-bold text-blue-950">

          Upload Sample

        </h2>

        <p className="text-gray-500 mt-2">

          Upload blood sample tube image

        </p>

       <div className="mt-8">

  {/* UPLOAD CARDS */}

  <div className="grid md:grid-cols-2 gap-5">

    {/* CAMERA */}

    <label className="group border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-[30px] p-8 flex flex-col items-center justify-center cursor-pointer transition bg-blue-50/40 hover:bg-blue-50">

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

      <div className="w-20 h-20 rounded-[28px] bg-blue-100 group-hover:bg-blue-600 transition flex items-center justify-center text-4xl">

        📷

      </div>

      <h2 className="text-xl font-bold text-blue-950 mt-6">

        Capture Sample

      </h2>

      <p className="text-gray-500 text-center mt-2 text-sm leading-6">

        Open mobile camera and capture blood tube image

      </p>

    </label>

    {/* GALLERY */}

    <label className="group border-2 border-dashed border-pink-200 hover:border-pink-500 rounded-[30px] p-8 flex flex-col items-center justify-center cursor-pointer transition bg-pink-50/40 hover:bg-pink-50">

      <input
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

      <div className="w-20 h-20 rounded-[28px] bg-pink-100 group-hover:bg-pink-600 transition flex items-center justify-center text-4xl">

        🖼️

      </div>

      <h2 className="text-xl font-bold text-blue-950 mt-6">

        Upload Images

      </h2>

      <p className="text-gray-500 text-center mt-2 text-sm leading-6">

        Select multiple sample images from gallery

      </p>

    </label>

  </div>

  {/* IMAGE PREVIEW */}

  {
    sampleImages.length > 0 && (

      <div className="mt-8">

        <div className="flex items-center justify-between mb-5">

          <h3 className="text-xl font-bold text-blue-950">

            Selected Images

          </h3>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            {
              sampleImages.length
            } Images

          </span>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {
            sampleImages.map(
              (image, index) => (

                <div
                  key={index}
                  className="relative group"
                >

                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-full h-32 object-cover rounded-[24px] border-2 border-white shadow-md"
                  />

                  {/* REMOVE */}

                  <button
                    type="button"
                    onClick={() => {

                      setSampleImages(

                        sampleImages.filter(

                          (_, i) =>
                            i !== index
                        )
                      )
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                  >

                    ×

                  </button>

                </div>
              )
            )
          }

        </div>

      </div>
    )
  }

  {/* NOTES */}

  <div className="mt-8">

    <label className="block text-sm font-semibold text-blue-950 mb-3">

      Assistant Notes

    </label>

    <textarea
      rows="4"
      placeholder="Add sample notes..."
      value={assistantNotes}
      onChange={(e) =>
        setAssistantNotes(
          e.target.value
        )
      }
      className="w-full border border-gray-200 rounded-[24px] p-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
    />

  </div>

  {/* ACTIONS */}

  <div className="flex gap-4 mt-8">
<button
  disabled={uploadingSample}
  onClick={handleSampleUpload}
  className={`flex-1 py-4 rounded-[24px] font-semibold text-lg text-white
  ${
    uploadingSample
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
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

        setShowSampleModal(
          false
        )

        setSampleImages([])
      }}
      className="flex-1 bg-gray-100 hover:bg-gray-200 py-4 rounded-[24px] font-semibold text-lg transition"
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
