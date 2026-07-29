import React, { useEffect, useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import { getAllTests } from '@/services/test.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Clock, FlaskConical } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import { InlineLoader } from '@/components/ui/Loader'
import useAuth from '@/hooks/useAuth'

const TestsPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [tests, setTests] = useState([])
  const [filteredTests, setFilteredTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const initialCategory = searchParams.get('category') || 'All'
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const categories = ['All', ...new Set(tests.map(t => t.category).filter(Boolean))]

  const fetchTests = async () => {
    try {
      const { data } = await getAllTests()
      setTests(data)
      setFilteredTests(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTests()
  }, [])

  useEffect(() => {
    if (tests.length > 0) {
      const category = searchParams.get('category') || 'All'
      setActiveCategory(category)
      applyFilters(search, category)
    }
  }, [tests, searchParams])

  const handleBookNow = (item, type = 'test') => {
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

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    applyFilters(value, activeCategory)
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    applyFilters(search, cat)
  }

  const applyFilters = (searchTerm, category) => {
    let filtered = tests
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category)
    }
    setFilteredTests(filtered)
  }

  return (
    <PublicLayout>
      <div className="bg-background min-h-screen pb-12 relative overflow-hidden">
        {/* Page Hero */}
        <div className="bg-card py-16 border-b border-border">
          <div className="enterprise-container relative z-10">
            <p className="text-sm text-primary font-bold tracking-wider uppercase mb-3">
              Diagnostic Tests
            </p>
            <h1 className="font-heading font-bold text-4xl text-foreground mb-2">Browse Lab Tests</h1>
            <p className="text-muted-foreground text-base max-w-xl">
              Explore 200+ certified diagnostic tests, with home sample collection
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="enterprise-container mt-10">
          <div className="bg-card border border-border rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition">
            <Search size={18} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search tests by name..."
              className="w-full outline-none text-sm text-foreground bg-transparent placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Categories */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tests Grid */}
        <div className="enterprise-container py-8">
          {loading ? (
            <InlineLoader />
          ) : filteredTests.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-20">No Tests Found</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((item) => (
                <div
                  key={item._id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition flex flex-col"
                >
                  {/* Image */}
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover border-b border-border" />
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Category */}
                    <span className="text-primary w-fit px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-primary">
                      {item.category}
                    </span>
                    {/* Title */}
                    <h2 className="font-heading font-bold text-lg text-foreground mt-3">{item.title}</h2>
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>
                    {/* Info */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Clock size={14} className="text-primary" />
                        {item.reportTime}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <FlaskConical size={14} className="text-primary" />
                        Lab Certified
                      </div>
                    </div>
                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Price</p>
                        <h2 className="font-mono font-bold text-primary text-xl">₹{item.price}</h2>
                      </div>
                      <Button onClick={() => handleBookNow(item, 'test')} size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}

export default TestsPage
