import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, ShieldCheck, Truck, Clock, FlaskConical, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useClickOutside from '@/hooks/useClickOutside'
import { getAllTests } from '@/services/test.service'
import { getAllPackages } from '@/services/package.service'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
const Hero = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [tests, setTests] = useState([])
  const [packages, setPackages] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const inputWrapperRef = useRef(null)
  const dropdownRef = useClickOutside(() => setShowDropdown(false))
  // Fetch tests & packages once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testsRes, packagesRes] = await Promise.all([getAllTests(), getAllPackages()])
        setTests(testsRes.data)
        setPackages(packagesRes.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
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
      // If the scroll happened inside the dropdown, don't close it
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
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldCheck />
            India's Most Trusted Lab
          </div>
          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-blue-950">
            Trusted Lab Tests <br />
            for a <span className="text-blue-600">Healthier You</span>
          </h1>
          {/* Paragraph */}
          <p className="text-gray-600 text-lg mt-6 leading-8">
            Book lab tests online with ease and get accurate reports from certified labs with home
            sample collection.
          </p>
          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-8 text-blue-700 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck /> Accurate Reports
            </div>
            <div className="flex items-center gap-2">
              <Truck /> Home Collection
            </div>
            <div className="flex items-center gap-2">
              <Clock /> Fast Delivery
            </div>
          </div>
          {/* ── Search Box ── */}
          <div
            ref={inputWrapperRef}
            className="bg-white rounded-2xl shadow-lg mt-10 flex items-center border-2 border-transparent focus-within:border-blue-400 transition"
          >
            <div className="flex items-center flex-1 px-4 gap-2">
              <Search className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  openDropdown()
                }}
                onFocus={openDropdown}
                placeholder="Search tests like CBC, Thyroid, Vitamin D..."
                className="w-full px-2 py-4 outline-none text-gray-700 bg-transparent"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setSearch('')
                    setShowDropdown(false)
                  }}
                  aria-label="Clear search"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X />
                </Button>
              )}
            </div>
            <Button onClick={openDropdown}>Search</Button>
          </div>
          {/* Popular Searches */}
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <p className="text-gray-500 font-medium">Popular:</p>
            {['CBC', 'Thyroid', 'Vitamin D', 'Diabetes'].map((term) => (
              <span
                key={term}
                onClick={() => fillSearch(term)}
                className="text-blue-600 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full text-sm font-medium transition"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="rounded-[40px] shadow-2xl"
          />
        </div>
      </div>
      {/* ── Portal Dropdown (renders at document.body level) ── */}
      {showDropdown &&
        createPortal(
          <div
            id="hero-search-dropdown"
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white rounded-2xl shadow-2xl border border-blue-100 max-h-80 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white px-5 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 flex justify-between items-center">
              <span>
                {search.trim() === ''
                  ? `All Tests & Packages (${displayedItems.length})`
                  : `Results for "${search}" (${displayedItems.length})`}
              </span>
              <button
                onClick={() => setShowDropdown(false)}
                aria-label="Close dropdown"
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={12} />
              </button>
            </div>
            {displayedItems.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <FlaskConical className="mx-auto text-3xl mb-3 text-gray-200" />
                No tests found for "{search}"
              </div>
            ) : (
              displayedItems.map((item) => (
                <button
                  key={item._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToBooking(item, item.type)}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-blue-50 transition border-b border-gray-50 last:border-0 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                    <FlaskConical />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {item.type} · {item.category}
                    </p>
                  </div>
                  <div className="text-pink-600 font-bold text-base flex-shrink-0">
                    ₹{item.price}
                  </div>
                </button>
              ))
            )}
          </div>,
          document.body
        )}
    </section>
  )
}
export default Hero
