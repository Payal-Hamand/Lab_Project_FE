import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes, FaFlask } from 'react-icons/fa'
import API from '../services/api'
import { createPortal } from 'react-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const [tests, setTests] = useState([])
  const [packages, setPackages] = useState([])
  const [search, setSearch] = useState('')
  const [showSearchPanel, setShowSearchPanel] = useState(false)
  const searchRef = useRef(null)
  const [dropdownStyle, setDropdownStyle] = useState({})

  const handleBookNow = (item, type = 'test') => {
    const userData = sessionStorage.getItem('user')
    const user = userData ? JSON.parse(userData) : null

    if (!user?.token) {
      navigate('/login', {
        state: {
          message: 'Please login to continue booking',
          redirectTo: '/booking',
          selectedItem: item,
          bookingType: type,
        },
      })
    } else {
      navigate('/booking', {
        state: {
          selectedItem: item,
          bookingType: type,
        },
      })
    }
  }

  const fetchData = async () => {
    try {
      const [testsRes, packagesRes] = await Promise.all([
        API.get('/tests'),
        API.get('/packages'),
      ])
      setTests(testsRes.data)
      setPackages(packagesRes.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchPanel(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  useEffect(() => {

  const handleScroll = () => {

    setShowSearchPanel(
      false
    )
  }


const openDropdown = () => {

  if (searchRef.current) {

    const rect =
      searchRef.current.getBoundingClientRect()

    setDropdownStyle({

      position: 'fixed',

      top: rect.bottom + 10,

      left: rect.left,

      width: rect.width,

      zIndex: 99999
    })
  }

  setShowSearchPanel(true)
}
  return () => {

    window.removeEventListener(
      'scroll',
      handleScroll
    )
  }

}, [])
useEffect(() => {
  const closeDropdown = (e) => {
    // Find the portal dropdown by querying the body-level div
    const dropdown = document.querySelector('[style*="z-index: 99999"]')
    if (dropdown && dropdown.contains(e.target)) return
    setShowSearchPanel(false)
  }
  window.addEventListener('scroll', closeDropdown, true)
  window.addEventListener('resize', closeDropdown)
  return () => {
    window.removeEventListener('scroll', closeDropdown, true)
    window.removeEventListener('resize', closeDropdown)
  }
}, [])

  const allItems = [
    ...tests.map((item) => ({ ...item, type: 'test' })),
    ...packages.map((item) => ({ ...item, type: 'package' })),
  ]

  const displayedItems =
    search.trim() === ''
      ? allItems
      : allItems.filter((item) =>
          item.title?.toLowerCase().includes(search.toLowerCase())
        )

  const handleSelectTest = (item) => {
    setShowSearchPanel(false)
    setSearch('')
    handleBookNow(item, item.type)
  }

  return (
    <div className="min-h-screen bg-gray-100">
    {
  showSearchPanel &&
  createPortal(

    <div
      style={dropdownStyle}
      className="bg-white rounded-[30px] shadow-2xl border border-blue-100 overflow-hidden"
    >

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">

        <div>

          <h3 className="text-sm font-bold tracking-widest uppercase text-blue-950">

            All Tests & Packages

          </h3>

          <p className="text-xs text-gray-500 mt-1">

            {displayedItems.length} Results Found

          </p>

        </div>

        <button
          onClick={() =>
            setShowSearchPanel(false)
          }
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-100"
        >

          <FaTimes />

        </button>

      </div>

      {/* LIST */}

      <div className="max-h-[420px] overflow-y-auto">

        {
          displayedItems.map(item => (

            <button
              key={item._id}
              onClick={() =>
                handleSelectTest(item)
              }
              className="w-full flex items-center gap-4 px-6 py-5 hover:bg-blue-50 transition border-b border-gray-100"
            >

              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                <FaFlask />

              </div>

              <div className="flex-1 text-left">

                <h2 className="font-bold text-lg text-blue-950">

                  {item.title}

                </h2>

                <p className="text-sm text-gray-500">

                  {item.category}

                </p>

              </div>

              <h3 className="text-2xl font-bold text-pink-600">

                ₹{item.price}

              </h3>

            </button>
          ))
        }

      </div>

    </div>,

    document.body
  )
}

      {/* Navbar */}
      <div className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Checked Up</h1>
        <div className="flex gap-4 items-center">
          {!JSON.parse(sessionStorage.getItem('user')) ? (
            <>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>

      {/* ── Search Bar (full width, below navbar) ── */}
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-2" ref={searchRef}>
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-3">
          Search &amp; Book a Test
        </p>

        {/* Wrapper: relative so the absolute dropdown anchors here */}
        <div className="relative">

          {/* Input */}
          <div className="flex items-center bg-white border-2 border-blue-200 focus-within:border-blue-500 rounded-2xl shadow-md transition px-4 py-3 gap-3">
            <FaSearch className="text-blue-400 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Search tests or packages..."
              value={search}
              onChange={(e) => {

  setSearch(e.target.value)

  openDropdown()
}}
              onFocus={openDropdown}
              className="flex-1 outline-none text-gray-700 text-lg bg-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* ── Dropdown (absolutely positioned) ── */}
          {/* ── SEARCH DROPDOWN ── */}


        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl">
          <div className="p-10">
            <h1 className="text-5xl font-bold text-blue-700 leading-tight mb-4">
              Full Body Checkup
            </h1>
            <h2 className="text-2xl text-pink-600 font-semibold mb-6">
              Starting at ₹9 Per Test
            </h2>
            <div className="bg-blue-700 text-white rounded-2xl w-fit px-8 py-5 mb-6">
              <h2 className="text-4xl font-bold">68 Tests</h2>
              <p className="text-xl">At Just ₹599/-</p>
            </div>
            <p className="text-gray-600 text-lg mb-8">
              Get accurate health reports with home sample collection.
            </p>
            <button
              onClick={() => handleBookNow(tests[0], 'test')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Book Test
            </button>
          </div>
        </div>
      </div>

      {/* Popular Tests */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">Popular Health Tests</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {tests.map((test) => (
            <div
              key={test._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3">
                {test.title}
              </h2>
              <p className="text-gray-600 mb-4">{test.category}</p>
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-pink-600">
                  {test.price}
                </h1>
                <button
                  onClick={() => handleBookNow(test, 'test')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Book Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage