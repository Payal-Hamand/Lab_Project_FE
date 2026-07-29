import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, ShieldCheck, FlaskConical, X, Phone, Mail, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useClickOutside from '@/hooks/useClickOutside'
import { getAllTests } from '@/services/test.service'
import { getAllPackages } from '@/services/package.service'
import { ROUTES } from '@/constants/routes'
import { useQuery } from '@tanstack/react-query'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const Counter = ({ from, to, duration = 2, suffix = '' }) => {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix)
  
  useEffect(() => {
    const controls = animate(count, to, { duration })
    return controls.stop
  }, [count, to, duration])
  
  return <motion.span>{rounded}</motion.span>
}

const Hero = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const inputWrapperRef = useRef(null)
  const dropdownRef = useClickOutside(() => setShowDropdown(false))

  const { data: combinedData } = useQuery({
    queryKey: ['heroSearchData'],
    queryFn: async () => {
      const [testsRes, packagesRes] = await Promise.all([getAllTests(), getAllPackages()])
      return { tests: testsRes.data || [], packages: packagesRes.data || [] }
    },
  })

  const tests = combinedData?.tests || []
  const packages = combinedData?.packages || []

  // Position the portal dropdown under the input
  const openDropdown = () => {
    if (inputWrapperRef.current) {
      const rect = inputWrapperRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
      })
    }
    setShowDropdown(true)
  }

  // Close on scroll
  useEffect(() => {
    const handleScroll = (e) => {
      const dropdown = document.getElementById('hero-search-dropdown')
      if (dropdown && dropdown.contains(e.target)) return
      setShowDropdown(false)
    }
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [])

  const allItems = [
    ...tests.map((t) => ({ ...t, type: 'test' })),
    ...packages.map((p) => ({ ...p, type: 'package' })),
  ]

  const displayedItems =
    search.trim() === ''
      ? allItems
      : allItems.filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()))

  const goToBooking = (item, type) => {
    setShowDropdown(false)
    setSearch('')
    if (!user) {
      navigate(ROUTES.LOGIN, {
        state: {
          message: 'Please login to continue booking',
          redirectTo: ROUTES.BOOKING,
          selectedItem: item,
          bookingType: type,
        },
      })
      return
    }
    navigate(ROUTES.BOOKING, { state: { selectedItem: item, bookingType: type } })
  }

  // Popular search quick-fill
  const fillSearch = (term) => {
    setSearch(term)
    openDropdown()
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1a2332] text-white py-2">
        <div className="enterprise-container flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-wide">Trusted Diagnostic Lab Platform</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[11px]">
              <Phone size={12} />
              <span>913-050-1863</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <Mail size={12} />
              <span>support@medilab.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-hero-bg relative py-12 lg:py-20 border-b border-border">
        <div className="enterprise-container flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-[55%] xl:w-[60%]">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <CheckCircle size={14} className="text-primary" />
              <span className="text-primary text-[11px] font-semibold tracking-wide">India's Most Trusted Lab</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Trusted Lab Tests
              <br />
              for a <span className="text-primary">Healthier</span> You
            </h1>

            {/* Subtext */}
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mt-4">
              Book lab tests online with ease and get accurate reports from certified labs with home sample collection.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold">
                <CheckCircle size={14} />
                Accurate Reports
              </div>
              <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold">
                <CheckCircle size={14} />
                Home Collection
              </div>
              <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold">
                <CheckCircle size={14} />
                Fast Delivery
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => navigate(ROUTES.TESTS)}
                className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-lg transition shadow-sm"
              >
                Book a Test
              </button>
              <button
                onClick={() => navigate(ROUTES.PACKAGES)}
                className="border-[1.5px] border-border text-foreground bg-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-accent transition"
              >
                View Packages
              </button>
            </div>
          </div>

          {/* Right — Search Card */}
          <div className="w-full lg:w-[45%] xl:w-[40%] flex-shrink-0">
            <div className="bg-card border border-border p-8 rounded-[12px] shadow-sm search-card-float">
              <h3 className="font-heading font-bold text-foreground text-lg mb-6 tracking-wide">
                Book a Lab Test
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Find the right test for your health needs</p>
              {/* Search Input */}
              <div
                ref={inputWrapperRef}
                className="border border-border bg-white rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition"
              >
                <Search size={16} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    openDropdown()
                  }}
                  onFocus={openDropdown}
                  placeholder="Search for tests e.g. CBC, Thyroid"
                  className="w-full outline-none text-foreground text-sm bg-transparent placeholder:text-muted-foreground/60"
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch('')
                      setShowDropdown(false)
                    }}
                    aria-label="Clear search"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Popular Tags */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-foreground mb-3">Popular:</p>
                <div className="flex flex-wrap gap-2">
                  {['CBC', 'Thyroid', 'Vitamin D', 'Diabetes'].map((term) => (
                    <span
                      key={term}
                      onClick={() => fillSearch(term)}
                      className="text-xs font-semibold text-primary cursor-pointer hover:underline transition"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => navigate(ROUTES.TESTS)}
                className="w-full h-10 mt-6 bg-primary text-white rounded-lg font-semibold text-sm transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Portal Dropdown */}
      {showDropdown &&
        createPortal(
          <div
            id="hero-search-dropdown"
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-card rounded-xl shadow-lg border border-border max-h-80 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card px-4 pt-3 pb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border flex justify-between items-center">
              <span>
                {search.trim() === ''
                  ? `All Tests & Packages (${displayedItems.length})`
                  : `Results for "${search}" (${displayedItems.length})`}
              </span>
              <button
                onClick={() => setShowDropdown(false)}
                aria-label="Close dropdown"
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
            {displayedItems.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <FlaskConical className="mx-auto mb-3 text-border" size={28} />
                <p className="text-xs">No tests found for "{search}"</p>
              </div>
            ) : (
              displayedItems.map((item) => (
                <button
                  key={item._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToBooking(item, item.type)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition border-b border-border last:border-0 group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <FlaskConical size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">
                      {item.type} · {item.category}
                    </p>
                  </div>
                  <div className="font-mono font-bold text-xs text-primary flex-shrink-0">
                    ₹{item.price}
                  </div>
                </button>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  )
}

export default Hero
