import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPackages } from '@/services/package.service'
import { InlineLoader } from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'

const PackageItem = ({ item, handleBookNow }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
      {/* Blue Ribbon Header */}
      <div className="bg-primary px-5 py-4">
        <h3 className="font-heading font-bold text-lg text-primary-foreground mb-1">{item.title}</h3>
        <div className="font-mono text-xl font-bold text-accent">
          ₹{item.price}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {item.description}
        </p>

            {/* Tests list */}
            {item.testsIncluded?.length > 0 ? (
              <ul className="mb-6 space-y-2">
                {item.testsIncluded.map((test, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground flex items-center gap-2"
                  >
                    <span className="text-success font-bold text-base">✓</span>
                    {test?.title || 'Test'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">No Tests Available</p>
            )}

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-border">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleBookNow(item, 'package')
            }}
            fullWidth
          >
            Book Package
          </Button>
        </div>
      </div>
    </div>
  )
}

const Packages = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="py-16 bg-background">
      <div className="enterprise-container">
        {/* Section label */}
        <p className="text-sm text-primary font-bold tracking-wider uppercase mb-3">
          Popular Packages
        </p>
        {/* Heading */}
        <h2 className="font-heading font-bold text-3xl text-foreground mb-10">Explore Health Packages</h2>

        {/* Loading */}
        {loading ? (
          <InlineLoader />
        ) : (
          (() => {
            const validPackages = packages.filter(p => p.testsIncluded?.length > 0)
            
            if (validPackages.length === 0) {
              return (
                <div className="bg-white/50 border border-[#C5DBF0] rounded-xl p-8 text-center text-[#4A6A8A]">
                  <p className="text-sm">No health packages are currently available.</p>
                  <p className="text-xs mt-1 opacity-70">Check back later or contact support to configure packages.</p>
                </div>
              )
            }

            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {validPackages.map((item) => (
                  <PackageItem key={item._id} item={item} handleBookNow={handleBookNow} />
                ))}
              </div>
            )
          })()
        )}
      </div>
    </section>
  )
}

export default Packages
