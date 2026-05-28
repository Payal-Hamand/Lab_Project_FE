import React from 'react'

const DashboardSidePanel = ({

  open,

  title,

  subtitle,

  children,

  onClose

}) => {

  if (!open) return null

  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

      <div className="bg-white w-full sm:w-[90%] md:max-w-2xl h-screen overflow-y-auto p-5 md:p-8">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b pb-5">

          <div>

            <h2 className="text-2xl md:text-4xl font-bold text-blue-950">

              {title}

            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">

              {subtitle}

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl md:text-4xl leading-none text-gray-500 hover:text-red-500 transition"
          >

            ×

          </button>

        </div>

        {/* BODY */}

        <div className="mt-6 md:mt-8">

          {children}

        </div>

      </div>

    </div>
  )
}

export default DashboardSidePanel