import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  FlaskConical, Menu, X, LogOut, ChevronDown, Bell, LayoutDashboard, 
  Calendar, TestTube, Settings, User, FileText, ClipboardList, UserCog
} from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import Button from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import useClickOutside from '@/hooks/useClickOutside'

const roleConfig = {
  [ROLES.PATIENT]: {
    quickLink: { label: 'My Bookings', route: ROUTES.DASHBOARD, icon: Calendar },
    dashboardRoute: ROUTES.DASHBOARD,
    dashboardLabel: 'My Dashboard',
    menuItems: [
      { label: 'My Bookings', description: 'View and manage bookings', icon: Calendar, route: ROUTES.DASHBOARD },
      { label: 'Upload Prescription', description: 'Get tests recommended', icon: FileText, route: '/upload-prescription' },
      { label: 'Account Settings', description: 'Manage your preferences', icon: Settings, route: '/settings' },
    ],
  },
  [ROLES.LAB_OWNER]: {
    quickLink: { label: 'Lab Dashboard', route: ROUTES.LAB_OWNER, icon: LayoutDashboard },
    dashboardRoute: ROUTES.LAB_OWNER,
    dashboardLabel: 'Lab Dashboard',
    menuItems: [
      { label: 'Lab Dashboard', description: "Today's collections and queue", icon: LayoutDashboard, route: ROUTES.LAB_OWNER },
      { label: 'Sample Pickups', description: 'Assigned home collections', icon: ClipboardList, route: '/sample-pickups' },
      { label: 'Upload Reports', description: 'Attach results to bookings', icon: FileText, route: '/upload-reports' },
      { label: 'Lab Profile', description: 'Accreditation and center details', icon: UserCog, route: '/lab-profile' },
      { label: 'Account Settings', description: 'Login and notification preferences', icon: Settings, route: '/settings' },
    ],
  },
  [ROLES.LAB_ASSISTANT]: {
    quickLink: { label: 'Lab Dashboard', route: ROUTES.LAB_ASSISTANT, icon: LayoutDashboard },
    dashboardRoute: ROUTES.LAB_ASSISTANT,
    dashboardLabel: 'Lab Dashboard',
    menuItems: [
      { label: 'Lab Dashboard', description: "Today's collections and queue", icon: LayoutDashboard, route: ROUTES.LAB_ASSISTANT },
      { label: 'Sample Pickups', description: 'Assigned home collections', icon: ClipboardList, route: '/sample-pickups' },
      { label: 'Upload Reports', description: 'Attach results to bookings', icon: FileText, route: '/upload-reports' },
      { label: 'Account Settings', description: 'Login and notification preferences', icon: Settings, route: '/settings' },
    ],
  },
  [ROLES.ADMIN]: {
    quickLink: { label: 'Admin Panel', route: ROUTES.ADMIN, icon: LayoutDashboard },
    dashboardRoute: ROUTES.ADMIN,
    dashboardLabel: 'Admin Panel',
    menuItems: [
      { label: 'Admin Dashboard', description: 'Overview and analytics', icon: LayoutDashboard, route: ROUTES.ADMIN },
      { label: 'Manage Tests', description: 'Add, edit, remove tests', icon: TestTube, route: '/admin/tests' },
      { label: 'Manage Packages', description: 'Configure health packages', icon: ClipboardList, route: '/admin/packages' },
      { label: 'Account Settings', description: 'System preferences', icon: Settings, route: '/settings' },
    ],
  },
}

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [testsDropdownOpen, setTestsDropdownOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useClickOutside(() => setProfileDropdownOpen(false))

  const isActive = (path) => location.pathname === path

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white border-b border-border shadow-sm' 
          : 'bg-white border-b border-border'
      }`}
    >
      {/* Single combined nav row */}
      <div className="enterprise-container h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <FlaskConical size={18} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-foreground text-lg leading-tight">
              Checked <span className="text-primary">Up</span>
            </span>
            <span className="text-[9px] text-primary font-semibold tracking-wider uppercase">
              LAB TESTS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          <Link 
            to={ROUTES.HOME} 
            className={`text-sm font-semibold transition ${isActive(ROUTES.HOME) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Home
          </Link>
          
          {/* Tests Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setTestsDropdownOpen(true)}
            onMouseLeave={() => setTestsDropdownOpen(false)}
          >
            <Link 
              to={ROUTES.TESTS}
              className={`flex items-center gap-1 text-sm font-semibold transition ${isActive(ROUTES.TESTS) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Tests
              <ChevronDown size={14} className={`transition-transform ${testsDropdownOpen ? 'rotate-180' : ''}`} />
            </Link>
            {testsDropdownOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                  <Link to={ROUTES.TESTS} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition">All Tests</Link>
                  <Link to={`${ROUTES.TESTS}?category=Organ Function Test`} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition">Organ Function Test</Link>
                  <Link to={`${ROUTES.TESTS}?category=Diabetes Test`} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition">Diabetes Test</Link>
                  <Link to={`${ROUTES.TESTS}?category=Vitamin Test`} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition">Vitamin Test</Link>
                  <Link to={`${ROUTES.TESTS}?category=Hormone Test`} className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition">Hormone Test</Link>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            to={ROUTES.PACKAGES} 
            className={`text-sm font-semibold transition ${isActive(ROUTES.PACKAGES) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Packages
          </Link>
          <Link 
            to={ROUTES.ABOUT} 
            className={`text-sm font-semibold transition ${isActive(ROUTES.ABOUT) ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            About Us
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="sm" className="font-semibold h-10">
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.TESTS}>
                <Button variant="primary" size="sm" className="font-semibold h-10">
                  Book a Test
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Role-specific quick link - icon only with tooltip */}
              {roleConfig[user.role] && (
                <Link 
                  to={roleConfig[user.role].quickLink.route}
                  className="relative group/icon p-2 text-foreground hover:text-primary transition"
                >
                  {React.createElement(roleConfig[user.role].quickLink.icon, { size: 20 })}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-foreground text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition pointer-events-none z-50">
                    {roleConfig[user.role].quickLink.label}
                  </span>
                </Link>
              )}

              {/* Notification Bell */}
              {/* <button className="relative p-2 text-foreground hover:text-primary transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button> */}

              {/* Book a Test - icon only with tooltip */}
              <Link 
                to={ROUTES.TESTS} 
                className="relative group/icon p-2 text-foreground hover:text-primary transition"
              >
                <TestTube size={20} />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-foreground text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition pointer-events-none z-50">
                  Book a Test
                </span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{user.role?.replace('_', ' ')}</p>
                  </div>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-72 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      {/* Profile Header */}
                      <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                            {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded capitalize">
                              {user.role?.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {roleConfig[user.role]?.menuItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.route}
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                              <item.icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-border py-2">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false)
                            handleLogout()
                          }}
                          className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                            <LogOut size={16} />
                          </div>
                          <p className="text-sm font-medium text-red-500">Logout</p>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-foreground hover:text-primary transition p-1"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="relative bg-white w-[85%] max-w-[320px] h-screen shadow-2xl p-6 overflow-y-auto"
            >
            {/* Top */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FlaskConical size={16} className="text-white" />
                </div>
                <span className="font-heading font-bold text-foreground text-xl leading-none">
                  Checked <span className="text-primary">Up</span>
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6 mt-8 text-base font-medium">
              <Link 
                to={ROUTES.HOME} 
                onClick={() => setMenuOpen(false)} 
                className={`transition ${isActive(ROUTES.HOME) ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                to={ROUTES.TESTS} 
                onClick={() => setMenuOpen(false)} 
                className={`transition ${isActive(ROUTES.TESTS) ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
              >
                Tests
              </Link>
              <Link 
                to={ROUTES.PACKAGES} 
                onClick={() => setMenuOpen(false)} 
                className={`transition ${isActive(ROUTES.PACKAGES) ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
              >
                Packages
              </Link>
              <Link 
                to={ROUTES.ABOUT} 
                onClick={() => setMenuOpen(false)} 
                className={`transition ${isActive(ROUTES.ABOUT) ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
              >
                About Us
              </Link>
            </div>

            {/* User Profile Card */}
            {user && (
              <div className="mt-8 p-4 bg-accent rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded capitalize">
                      {user.role?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Role-specific Menu */}
            {user && roleConfig[user.role] && (
              <div className="mt-6">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Menu</p>
                <div className="flex flex-col gap-1">
                  {roleConfig[user.role].menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.route}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="mt-6">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" fullWidth>Login</Button>
                  </Link>
                  <Link to={ROUTES.TESTS} onClick={() => setMenuOpen(false)}>
                    <Button fullWidth>Book a Test</Button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition mt-4"
                >
                  <LogOut size={18} />
                  <span className="font-semibold text-sm">Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
