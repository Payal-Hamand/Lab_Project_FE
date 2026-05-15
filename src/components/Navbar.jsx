// import React, { useContext, useState } from 'react'
// import { useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import {
//   FaFlask,
//   FaBars,
//   FaTimes,
//   FaUserCircle,
//   FaSignOutAlt
// } from 'react-icons/fa'

// import { AuthContext } from '../context/AuthContext'
// useEffect(() => {

//   if (menuOpen) {

//     document.body.style.overflow = 'hidden'

//   } else {

//     document.body.style.overflow = 'auto'
//   }

// }, [menuOpen])

// const Navbar = () => {

//   const {
//     user,
//     logout
//   } = useContext(AuthContext)

//   const navigate = useNavigate()

//   const [menuOpen, setMenuOpen] = useState(false)

//   const handleLogout = () => {

//     logout()
//      localStorage.removeItem('user')

//     navigate('/login')
//   }

//   return (

//     <div className="w-full sticky top-0 z-50 bg-white shadow-sm">

//       {/* Top Bar */}

//       <div className="bg-blue-950 text-white text-sm">

//         <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

//           <p className="hidden md:block">
//             Trusted Diagnostic Lab Platform
//           </p>

//           <div className="flex items-center gap-6">

//             <p>
//               📞 1800-123-4567
//             </p>

//             <p className="hidden md:block">
//               ✉ support@medilab.com
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* Main Navbar */}

//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}

//         <Link
//           to="/"
//           className="flex items-center gap-3"
//         >

//           <div className="bg-blue-600 text-white p-3 rounded-2xl text-2xl">
//             <FaFlask />
//           </div>

//           <div>

//             <h1 className="text-3xl font-bold text-blue-950">
//               MediLab
//             </h1>

//             <p className="text-gray-500 text-sm">
//               Health First
//             </p>

//           </div>

//         </Link>

//         {/* Desktop Menu */}

//         <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

//           <Link
//             to="/"
//             className="hover:text-blue-600 transition"
//           >
//             Home
//           </Link>

//           <Link
//             to="/tests"
//             className="hover:text-blue-600 transition"
//           >
//             Tests
//           </Link>

//           <Link
//             to="/packages"
//             className="hover:text-blue-600 transition"
//           >
//             Packages
//           </Link>

//           <Link
//             to="/booking"
//             className="hover:text-blue-600 transition"
//           >
//             Book Test
//           </Link>

//           <Link
//             to="/verify-report"
//             className="hover:text-blue-600 transition"
//           >
//             Verify Report
//           </Link>

//         </div>

//         {/* Right Side */}

//         <div className="hidden lg:flex items-center gap-4">

//           {
//             !user ? (

//               <>
//                 <Link to="/login">

//                   <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-5 py-2 rounded-xl">
//                     Login
//                   </button>

//                 </Link>

//                 <Link to="/signup">

//                   <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-xl">
//                     Signup
//                   </button>

//                 </Link>
//               </>

//             ) : (

//               <div className="flex items-center gap-4">

//                 {/* Role Buttons */}

//                 {
//                   user.role === 'admin' && (

//                     <Link to="/admin">

//                       <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition">
//                         Admin Panel
//                       </button>

//                     </Link>
//                   )
//                 }

//                 {
//                   user.role === 'patient' && (

//                     <Link to="/dashboard">

//                       <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition">
//                         Dashboard
//                       </button>

//                     </Link>
//                   )
//                 }

//                 {
//                   user.role === 'lab_assistant' && (

//                     <Link to="/lab-assistant">

//                       <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition">
//                         Dashbord
//                       </button>

//                     </Link>
//                   )
//                 }

//                 {
//                   user.role === 'doctor' && (

//                     <Link to="/doctor">

//                       <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl transition">
//                         Doctor
//                       </button>

//                     </Link>
//                   )
//                 }

//                 {
//                   user.role === 'receptionist' && (

//                     <Link to="/receptionist">

//                       <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl transition">
//                         Reception
//                       </button>

//                     </Link>
//                   )
//                 }

//                 {/* User */}

//                 <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl">

//                   <FaUserCircle className="text-2xl text-blue-600" />

//                   <div>

//                     <h3 className="font-semibold text-sm">
//                       {user.name}
//                     </h3>

//                     <p className="text-xs text-gray-500 capitalize">
//                       {user.role}
//                     </p>

//                   </div>

//                 </div>

//                 {/* Logout */}

//                 <button
//                   onClick={handleLogout}
//                   className="bg-gray-200 hover:bg-red-500 hover:text-white transition p-3 rounded-xl"
//                 >
//                   <FaSignOutAlt />
//                 </button>

//               </div>
//             )
//           }

//         </div>

//         {/* Mobile Menu Button */}

//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="lg:hidden text-3xl text-blue-950"
//         >

//           {
//             menuOpen
//               ? <FaTimes />
//               : <FaBars />
//           }

//         </button>

//       </div>

//       {/* Mobile Menu */}

//       {
//         menuOpen && (

//           <div className="lg:hidden bg-white border-t">

//             <div className="flex flex-col p-6 gap-5 text-gray-700 font-medium">

//               <Link to="/">
//                 Home
//               </Link>

//               <Link to="/tests">
//                 Tests
//               </Link>

//               <Link to="/packages">
//                 Packages
//               </Link>

//               <Link to="/booking">
//                 Book Test
//               </Link>

//               <Link to="/verify-report">
//                 Verify Report
//               </Link>

//               {
//                 !user ? (

//                   <>
//                     <Link to="/login">

//                       <button className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl w-full">
//                         Login
//                       </button>

//                     </Link>

//                     <Link to="/signup">

//                       <button className="bg-blue-600 text-white px-5 py-3 rounded-xl w-full">
//                         Signup
//                       </button>

//                     </Link>
//                   </>

//                 ) : (

//                   <>
//                     <div className="bg-gray-100 rounded-2xl p-4">

//                       <h3 className="font-bold">
//                         {user.name}
//                       </h3>

//                       <p className="text-sm text-gray-500 capitalize">
//                         {user.role}
//                       </p>

//                     </div>

//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-500 text-white py-3 rounded-xl"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )
//               }

//             </div>

//           </div>
//         )
//       }

//     </div>
//   )
// }

// export default Navbar




import React, {
  useContext,
  useState,
  useEffect
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  FaFlask,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa'

import { AuthContext }
from '../context/AuthContext'

const Navbar = () => {

  const {
    user,
    logout
  } = useContext(AuthContext)

  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] =
    useState(false)

  // Prevent body scroll

  useEffect(() => {

    if (menuOpen) {

      document.body.style.overflow =
        'hidden'

    } else {

      document.body.style.overflow =
        'auto'
    }

  }, [menuOpen])

  const handleLogout = () => {

    logout()

    localStorage.removeItem('user')

    navigate('/login')

    setMenuOpen(false)
  }

  return (

    <div className="w-full sticky top-0 z-50 bg-white shadow-sm">

      {/* Top Bar */}

      <div className="bg-blue-950 text-white text-sm">

        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <p className="hidden md:block">
            Trusted Diagnostic Lab Platform
          </p>

          <div className="flex items-center gap-6">

            <p>
              📞 1800-123-4567
            </p>

            <p className="hidden md:block">
              ✉ support@medilab.com
            </p>

          </div>

        </div>

      </div>

      {/* Main Navbar */}

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-blue-600 text-white p-3 rounded-2xl text-2xl">

            <FaFlask />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-blue-950">
              MediLab
            </h1>

            <p className="text-gray-500 text-sm">
              Health First
            </p>

          </div>

        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/tests"
            className="hover:text-blue-600 transition"
          >
            Tests
          </Link>

          <Link
            to="/packages"
            className="hover:text-blue-600 transition"
          >
            Packages
          </Link>

          <Link
            to="/booking"
            className="hover:text-blue-600 transition"
          >
            Book Test
          </Link>

          <Link
            to="/verify-report"
            className="hover:text-blue-600 transition"
          >
            Verify Report
          </Link>

        </div>

        {/* Desktop Right Side */}

        <div className="hidden lg:flex items-center gap-4">

          {
            !user ? (

              <>

                <Link to="/login">

                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-5 py-2 rounded-xl">

                    Login

                  </button>

                </Link>

                <Link to="/signup">

                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-xl">

                    Signup

                  </button>

                </Link>

              </>

            ) : (

              <div className="flex items-center gap-4">

                {
                  user.role === 'admin' && (

                    <Link to="/admin">

                      <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition">

                        Admin Panel

                      </button>

                    </Link>
                  )
                }

                {
                  user.role === 'patient' && (

                    <Link to="/dashboard">

                      <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition">

                        Dashboard

                      </button>

                    </Link>
                  )
                }

                {
                  user.role === 'lab_assistant' && (

                    <Link to="/lab-assistant">

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition">

                        Lab Dashboard

                      </button>

                    </Link>
                  )
                }

                {/* User */}

                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl">

                  <FaUserCircle className="text-2xl text-blue-600" />

                  <div>

                    <h3 className="font-semibold text-sm">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>

                  </div>

                </div>

                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-red-500 hover:text-white transition p-3 rounded-xl"
                >

                  <FaSignOutAlt />

                </button>

              </div>
            )
          }

        </div>

        {/* Mobile Button */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="lg:hidden text-3xl text-blue-950"
        >

          {
            menuOpen
              ? <FaTimes />
              : <FaBars />
          }

        </button>

      </div>

      {/* Mobile Sidebar */}

      {
        menuOpen && (

          <div className="fixed inset-0 z-[100] lg:hidden">

            {/* Overlay */}

            <div
              onClick={() =>
                setMenuOpen(false)
              }
              className="absolute inset-0 bg-black/50"
            />

            {/* Sidebar */}

            <div className="relative bg-white w-[85%] max-w-[320px] h-screen shadow-2xl p-6 overflow-y-auto">

              {/* Top */}

              <div className="flex items-center justify-between border-b pb-5">

                <div>

                  <h2 className="text-3xl font-bold text-blue-950">

                    MediLab

                  </h2>

                  <p className="text-gray-500 text-sm">

                    Health First

                  </p>

                </div>

                <button
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="text-3xl text-blue-950"
                >

                  <FaTimes />

                </button>

              </div>

              {/* Links */}

              <div className="flex flex-col gap-6 mt-8 text-lg font-medium text-gray-700">

                <Link
                  to="/"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Home
                </Link>

                <Link
                  to="/tests"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Tests
                </Link>

                <Link
                  to="/packages"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Packages
                </Link>

                <Link
                  to="/booking"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Book Test
                </Link>

                <Link
                  to="/verify-report"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Verify Report
                </Link>

              </div>

              {/* User */}

              {
                user && (

                  <div className="bg-gray-100 rounded-2xl p-5 mt-10">

                    <h3 className="font-bold text-lg">
                      {user.name}
                    </h3>

                    <p className="text-gray-500 capitalize">
                      {user.role}
                    </p>

                  </div>
                )
              }

              {/* Dashboard Buttons */}

              <div className="mt-6 flex flex-col gap-4">

                {
                  user?.role === 'patient' && (

                    <Link
                      to="/dashboard"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >

                      <button className="w-full bg-green-500 text-white py-3 rounded-xl">

                        Dashboard

                      </button>

                    </Link>
                  )
                }

                {
                  user?.role === 'admin' && (

                    <Link
                      to="/admin"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >

                      <button className="w-full bg-red-500 text-white py-3 rounded-xl">

                        Admin Panel

                      </button>

                    </Link>
                  )
                }

                {
                  user?.role === 'lab_assistant' && (

                    <Link
                      to="/lab-assistant"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >

                      <button className="w-full bg-yellow-500 text-white py-3 rounded-xl">

                        Lab Dashboard

                      </button>

                    </Link>
                  )
                }

              </div>

              {/* Auth Buttons */}

              <div className="mt-8">

                {
                  !user ? (

                    <div className="flex flex-col gap-4">

                      <Link
                        to="/login"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                      >

                        <button className="border border-blue-600 text-blue-600 py-3 rounded-xl w-full">

                          Login

                        </button>

                      </Link>

                      <Link
                        to="/signup"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                      >

                        <button className="bg-blue-600 text-white py-3 rounded-xl w-full">

                          Signup

                        </button>

                      </Link>

                    </div>

                  ) : (

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white py-3 rounded-xl w-full"
                    >

                      Logout

                    </button>

                  )
                }

              </div>

            </div>

          </div>
        )
      }

    </div>
  )
}

export default Navbar