import React from 'react'

import {

  FaDownload

} from 'react-icons/fa'

const BookingsTable = ({

 bookings,
  showPatient = true,
  showPayment = true,
  showReport = true,
  showAssistant = false,
  openManageModal,
  isAdmin = false,
  openEditModal

}) => {

  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[1000px]">

        <thead className="bg-blue-50">

          <tr>

            <th className="text-left px-6 py-4">

              Test

            </th>

            {
              showPatient && (

                <th className="text-left px-6 py-4">

                  Patient

                </th>
              )
            }

            <th className="text-left px-6 py-4">

              Date

            </th>

            <th className="text-left px-6 py-4">

              Time

            </th>

            <th className="text-left px-6 py-4">

              Status

            </th>
            {isAdmin && (
  <th className="py-5 px-4 font-semibold">
    Assigned Lab
  </th>
)}



            {
              showPayment && (

                <th className="text-left px-6 py-4">

                  Payment

                </th>
              )
            }

            {
              showAssistant && (

                <th className="text-left px-6 py-4">

                  Assistant

                </th>
              )
            }
            

            {
              showReport && (

                <th className="text-left px-6 py-4">

                  Report

                </th>
              )
            }

           <th className="text-left px-6 py-4">
  {isAdmin ? "Edit" : "Actions"}
</th>

          </tr>

        </thead>

        <tbody>

          {
            bookings.map(
              item => (

                <tr
                  key={item._id}
                  className="border-b"
                >

                  {/* Test */}

                  <td className="px-6 py-5 font-semibold text-blue-950 truncate">

                    {
                      item?.test
                        ?.title || item?.package?.title
                    }

                  </td>

                  {/* Patient */}

                  {
                    showPatient && (

                      <td className="px-6 py-5">

                        <div>

                          <h3 className="font-semibold truncate text-gray-800">

                            {
                              item.patientName
                            }

                          </h3>

                          <p className="text-sm text-gray-500">

                            {
                              item.phone
                            }

                          </p>

                        </div>

                      </td>
                    )
                  }

                  {/* Date */}

                  <td className="px-6 py-5 truncate">

                    {
                      item.bookingDate
                    }

                  </td>

                  {/* Time */}

                  <td className="px-6 py-5 truncate">

                    {
                      item.bookingTime
                    }

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 truncate">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold
                      ${
  item.status === 'Completed'
    ? 'bg-green-100 text-green-700'

  : item.status === 'Assigned'
    ? 'bg-blue-100 text-blue-700'

  : item.status === 'Cancelled'
    ? 'bg-red-100 text-red-700'

  : item.status === 'Rescheduled'
    ? 'bg-purple-100 text-purple-700'

  : 'bg-yellow-100 text-yellow-700'
}
                      `}
                      
                    >

                      {item.status}

                    </span>

                  </td>

                  {/* Assign Lab */}
                {isAdmin && (
  <td className="py-5 px-4">

    <div>
      <h3 className="font-semibold text-blue-950">
        {item.labOwner?.name || "Not Assigned"}
      </h3>

      <div className="group relative w-[220px]">

        <p className="text-sm text-gray-600 mt-2 truncate cursor-pointer">
          📍 {item.labOwner?.labAddress || "No Address"}
        </p>

        <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-xl p-3 w-72 left-0 top-8 shadow-lg">
          {item.labOwner?.labAddress}
        </div>

      </div>
    </div>

  </td>
)}
                  {/* Payment */}

                  {
                    showPayment && (

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold

                          ${
                            item.paymentStatus ===
                            'Paid'

                              ? 'bg-blue-100 text-blue-700'

                              : 'bg-red-100 text-red-700'
                          }
                          `}
                        >

                          {
                            item.paymentStatus
                          }

                        </span>

                      </td>
                    )
                  }

                  {/* Assistant */}

                  {
                    showAssistant && (

                      <td className="px-6 py-5">

                        {
                          item
                            .assignedLabAssistant

                            ? (

                              <div>

                                <p className="font-semibold">

                                  {
                                    item
                                      .assignedLabAssistant
                                      .name
                                  }

                                </p>

                                <p className="text-sm text-gray-500">

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
                    )
                  }

                  {/* Report */}

                  {
                    showReport && (

                      <td className="px-6 py-5">

                        {
                          item.report

                            ? (

                              <a
                                href={
                                  item.report
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm inline-flex items-center gap-2"
                              >

                                <FaDownload />

                                Download

                              </a>

                            )

                            : (

                              <span className="text-gray-400 text-sm">

                                Not Available

                              </span>
                            )
                        }

                      </td>
                    )
                  }

<td className="px-6 py-5">

  {isAdmin ? (

   <button
  onClick={() =>
    openEditModal &&
    openEditModal(item)
  }
  disabled={item.status === "Completed"}
  className={`px-4 py-2 rounded-xl text-sm font-medium truncate text-white
    ${
      item.status === "Completed" ||  item.status === "Cancelled"
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  ✏️ Edit Lab
</button>

  ) : (

    <>
      {
        item.status !== 'Completed' &&
        item.status !== 'Cancelled' && (

          <button
            onClick={() =>
              openManageModal &&
              openManageModal(item)
            }
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            ⚙️ Manage
          </button>

        )
      }

      {
        item.status === 'Cancelled' && (

          <span className="bg-red-100 text-red-700 px-3 py-2 rounded-xl text-xs font-semibold">
            Cancelled
          </span>

        )
      }
    </>

  )}

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

export default BookingsTable