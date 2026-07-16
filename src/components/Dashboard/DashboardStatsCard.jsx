import React from 'react'

const DashboardStatsCard = ({
  title,

  value,

  icon,

  color,

  bgColor,

  active,

  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm text-left transition border-2 hover:shadow-lg w-full

        ${active ? `border-${color}-500` : 'border-transparent'}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs md:text-sm font-medium">{title}</p>

          <h2 className={`text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-${color}-600`}>
            {value}
          </h2>
        </div>

        <div
          className={`${bgColor} w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl`}
        >
          {icon}
        </div>
      </div>
    </button>
  )
}

export default DashboardStatsCard
