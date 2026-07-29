import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FlaskConical, Menu, X, CircleUser, LogOut, ChevronDown, MapPin } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import Button from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [testsDropdownOpen, setTestsDropdownOpen] = useState(false)

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
        <div className="hidden lg:flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              {user.role === ROLES.ADMIN && (
                <Link to={ROUTES.ADMIN}><Button variant="primary" size="sm" className="h-10">Admin Panel</Button></Link>
              )}
              {user.role === ROLES.PATIENT && (
                <>
                  <Link to={ROUTES.DASHBOARD}><Button variant="outline" size="sm" className="h-10">Dashboard</Button></Link>
                  <Link to={ROUTES.TESTS}><Button variant="primary" size="sm" className="font-semibold h-10">Book a Test</Button></Link>
                </>
              )}
              {user.role === ROLES.LAB_OWNER && (
                <Link to={ROUTES.LAB_OWNER}><Button variant="primary" size="sm" className="h-10">Lab Owner</Button></Link>
              )}
              {user.role === ROLES.LAB_ASSISTANT && (
                <Link to={ROUTES.LAB_ASSISTANT}><Button variant="primary" size="sm" className="h-10">Lab Dashboard</Button></Link>
              )}
              {/* User badge */}
              <div className="border border-primary rounded-lg px-3 py-1.5 flex items-center gap-2">
                <CircleUser size={16} className="text-primary" />
                <div>
                  <h3 className="text-foreground text-xs font-semibold leading-none">{user.name}</h3>
                  <p className="text-muted-foreground text-[10px] capitalize mt-0.5">{user.role}</p>
                </div>
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
              >
                <LogOut size={16} />
              </button>
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

            {/* User */}
            {user && (
              <div className="border border-primary rounded-lg p-4 mt-10">
                <h3 className="font-semibold text-foreground text-sm">{user.name}</h3>
                <p className="text-muted-foreground text-xs capitalize mt-0.5">{user.role}</p>
              </div>
            )}

            {/* Dashboard Buttons */}
            <div className="mt-5 flex flex-col gap-3">
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
                <Button variant="outline-danger" fullWidth onClick={handleLogout}>
                  Logout
                </Button>
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
