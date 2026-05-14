import React from 'react'
import {
  FaHome,
  FaCheckCircle,
  FaClock,
  FaHeadset
} from 'react-icons/fa'

const Features = () => {

  const data = [
    {
      icon: <FaHome />,
      title: 'Free Home Collection',
      desc: 'On orders above ₹999'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Accurate Reports',
      desc: 'NABL Certified Labs'
    },
    {
      icon: <FaClock />,
      title: 'Fast Reports',
      desc: 'Reports in 6-24 Hours'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      desc: 'We are always available'
    }
  ]

  return (
    <section className="bg-white py-12">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {data.map((item, index) => (
          <div
            key={index}
            className="bg-[#f8fbff] rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
          >

            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold mt-6 text-blue-950">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Features