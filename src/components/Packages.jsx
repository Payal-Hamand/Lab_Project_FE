import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPackages } from '@/services/package.service'
import { ROUTES } from '@/constants/routes'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { ArrowRight, ChevronRight, ChevronLeft, Check } from 'lucide-react'

const PackageItem = ({ item, handleBookNow }) => {
  const testsList = item.testsIncluded || []

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col min-w-[280px] max-w-[300px] w-[280px] flex-shrink-0">
      {/* Image */}
      {item.image && (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-40 object-cover"
        />
      )}

      {/* Dark Navy Header */}
      <div className="bg-tertiary px-5 py-4">
        <h3 className="font-heading font-bold text-lg text-tertiary-foreground leading-snug">{item.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-lg font-bold text-foreground">₹</span>
          <span className="text-2xl font-bold text-foreground">{item.price}</span>
        </div>

        {/* Tests count */}
        <p className="text-sm text-muted-foreground mb-4">
          {testsList.length} Tests Included
        </p>

        {/* Tests list - Fixed height with scroll */}
        {testsList.length > 0 ? (
          <div className="h-[140px] overflow-y-auto mb-4 pr-1 custom-scrollbar">
            <ul className="space-y-2">
              {testsList.map((test, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground flex items-start gap-2"
                >
                  <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{test?.title || 'Test'}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="h-[140px] flex items-center justify-center mb-4">
            <p className="text-sm text-muted-foreground">No Tests Available</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBookNow(item, 'package')
          }}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition mt-auto"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

const PackageSkeleton = () => (
  <div className="bg-card border border-border rounded-lg overflow-hidden min-w-[280px] max-w-[300px] w-[280px] flex-shrink-0 animate-pulse">
    <div className="h-40 bg-gray-200"></div>
    <div className="bg-tertiary/50 px-5 py-4">
      <div className="h-5 bg-white/20 rounded w-3/4"></div>
    </div>
    <div className="p-5">
      <div className="flex items-baseline gap-1 mb-3">
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-[140px] overflow-hidden">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
    </div>
  </div>
)

const Packages = ({ showAllPackages = false }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await getAllPackages()
        setPackages(data)
      } catch (error) {
        toast.error('Failed to load packages')
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      checkScroll()
      return () => scrollElement.removeEventListener('scroll', checkScroll)
    }
  }, [packages])

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const handleBookNow = (item, type = 'package') => {
    if (!user?.token) {
      navigate(ROUTES.LOGIN, {
        state: {
          message: 'Please login to continue booking',
          redirectTo: ROUTES.BOOKING,
          selectedItem: item,
          bookingType: type,
        },
      })
    } else {
      navigate(ROUTES.BOOKING, {
        state: {
          selectedItem: item,
          bookingType: type,
        },
      })
    }
  }

  const validPackages = packages.filter(p => p.testsIncluded?.length > 0)

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="enterprise-container">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs text-primary font-bold tracking-wider uppercase mb-2">
              {showAllPackages ? 'All Packages' : 'Popular Packages'}
            </p>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
              {showAllPackages ? 'All Health Packages' : 'Explore Health Packages'}
            </h2>
          </div>
          {!showAllPackages && (
            <button
              onClick={() => navigate(ROUTES.PACKAGES)}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition"
            >
              View all packages
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className={`${showAllPackages ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'relative group/scroll'}`}>
            {showAllPackages ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <PackageSkeleton key={i} />
              ))
            ) : (
              <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4">
                {[1, 2, 3, 4].map((i) => (
                  <PackageSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        ) : validPackages.length === 0 ? (
          <div className="bg-white/50 border border-border rounded-xl p-8 text-center text-muted-foreground">
            <p className="text-sm">No health packages are currently available.</p>
            <p className="text-xs mt-1 opacity-70">Check back later or contact support to configure packages.</p>
          </div>
        ) : showAllPackages ? (
          /* Grid layout for all packages page */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {validPackages.map((item) => (
              <div key={item._id} className="flex justify-center">
                <PackageItem item={item} handleBookNow={handleBookNow} />
              </div>
            ))}
          </div>
        ) : (
          /* Scroll layout for homepage */
          <div className="relative group/scroll">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4"
            >
              {validPackages.map((item) => (
                <PackageItem key={item._id} item={item} handleBookNow={handleBookNow} />
              ))}
            </div>

            {/* Scroll Left Button */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-md hover:bg-accent transition hidden md:flex opacity-0 group-hover/scroll:opacity-100"
              >
                <ChevronLeft size={20} className="text-foreground" />
              </button>
            )}

            {/* Scroll Right Button */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-md hover:bg-accent transition hidden md:flex"
              >
                <ChevronRight size={20} className="text-foreground" />
              </button>
            )}
          </div>
        )}

        {/* Mobile View All - only show on homepage */}
        {!showAllPackages && (
          <div className="mt-6 sm:hidden">
            <button
              onClick={() => navigate(ROUTES.PACKAGES)}
              className="flex items-center justify-center gap-1 w-full text-sm font-semibold text-primary border border-primary rounded-lg py-2 hover:bg-primary hover:text-white transition"
            >
              View all packages
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Packages
