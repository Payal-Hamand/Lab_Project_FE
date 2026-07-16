import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFlask, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { AuthContext } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import Button from '@/components/ui/Button'
const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  // Prevent body scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])
  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
    setMenuOpen(false)
  }
  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-950 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <p className="hidden md:block">Trusted Diagnostic Lab Platform</p>
          <div className="flex items-center gap-6">
            <p>📞 913-050-1863</p>
            <p className="hidden md:block">✉ support@medilab.com</p>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-[58px] h-[58px] bg-blue-700 rounded-2xl flex items-center justify-center">
              <div className="w-[48px] h-[48px] bg-blue-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Cross bg */}
                <div className="absolute w-[10px] h-full bg-white opacity-15 rounded" />
                <div className="absolute h-[10px] w-full bg-white opacity-15 rounded" />
                {/* Checkmark */}
                <svg viewBox="0 0 58 58" className="absolute w-full h-full">
                  <polyline
                    points="15,30 25,41 44,18"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Accent dot */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full" />
          </div>
          {/* Text */}
          <div>
            <h1 className="text-3xl font-bold text-blue-950 leading-none tracking-tight">
              Checked Up
            </h1>
            <p className="text-gray-500 text-sm mt-1">Health First</p>
          </div>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to={ROUTES.TESTS} className="hover:text-blue-600 transition">
            Tests
          </Link>
          <Link to={ROUTES.PACKAGES} className="hover:text-blue-600 transition">
            Packages
          </Link>
          <Link to={ROUTES.ABOUT} className="hover:text-blue-600 transition">
            About
          </Link>
        </div>
        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button>Signup</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user.role === ROLES.ADMIN && (
                <Link to={ROUTES.ADMIN}>
                  <Button>Admin Panel</Button>
                </Link>
              )}
              {user.role === ROLES.PATIENT && (
                <Link to={ROUTES.DASHBOARD}>
                  <Button>Dashboard</Button>
                </Link>
              )}
              {user.role === ROLES.LAB_OWNER && (
                <Link to={ROUTES.LAB_OWNER}>
                  <Button>Lab Owner Dashboard</Button>
                </Link>
              )}
              {user.role === ROLES.LAB_ASSISTANT && (
                <Link to={ROUTES.LAB_ASSISTANT}>
                  <Button>Lab Dashboard</Button>
                </Link>
              )}
              {/* User */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl">
                <FaUserCircle className="text-2xl text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              {/* Logout */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-red-500 hover:text-white transition"
              >
                <FaSignOutAlt />
              </Button>
            </div>
          )}
        </div>
        {/* Mobile Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl text-blue-950"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>
      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay */}
          <div onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/50" />
          {/* Sidebar */}
          <div className="relative bg-white w-[85%] max-w-[320px] h-screen shadow-2xl p-6 overflow-y-auto">
            {/* Top */}
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <h2 className="text-3xl font-bold text-blue-950">Checked Up</h2>
                <p className="text-gray-500 text-sm">Health First</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
                className="text-3xl text-blue-950"
              >
                <FaTimes />
              </Button>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-6 mt-8 text-lg font-medium text-gray-700">
              <Link to={ROUTES.HOME} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to={ROUTES.TESTS} onClick={() => setMenuOpen(false)}>
                Tests
              </Link>
              <Link to={ROUTES.PACKAGES} onClick={() => setMenuOpen(false)}>
                Packages
              </Link>
              <Link to={ROUTES.BOOKING} onClick={() => setMenuOpen(false)}>
                Book Test
              </Link>
            </div>
            {/* User */}
            {user && (
              <div className="bg-gray-100 rounded-2xl p-5 mt-10">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
            )}
            {/* Dashboard Buttons */}
            <div className="mt-6 flex flex-col gap-4">
              {user?.role === ROLES.PATIENT && (
                <Link to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)}>
                  <Button fullWidth>Dashboard</Button>
                </Link>
              )}
              {user?.role === ROLES.ADMIN && (
                <Link to={ROUTES.ADMIN} onClick={() => setMenuOpen(false)}>
                  <Button fullWidth>Admin Panel</Button>
                </Link>
              )}
              {user?.role === ROLES.LAB_ASSISTANT && (
                <Link to={ROUTES.LAB_ASSISTANT} onClick={() => setMenuOpen(false)}>
                  <Button fullWidth>Lab Dashboard</Button>
                </Link>
              )}
              {user?.role === ROLES.LAB_OWNER && (
                <Link to={ROUTES.LAB_OWNER} onClick={() => setMenuOpen(false)}>
                  <Button fullWidth>Lab Owner Dashboard</Button>
                </Link>
              )}
            </div>
            {/* Auth Buttons */}
            <div className="mt-8">
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.SIGNUP} onClick={() => setMenuOpen(false)}>
                    <Button fullWidth>Signup</Button>
                  </Link>
                </div>
              ) : (
                <Button fullWidth onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Navbar
