import React, { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Inbox } from 'lucide-react'

const SkeletonRow = ({ columns }) => (
  <tr className="border-b border-gray-100 animate-pulse">
    {columns.map((col, i) => (
      <td key={i} className="px-6 py-5">
        <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
      </td>
    ))}
  </tr>
)

const DataTable = ({
  data = [],
  columns = [],
  searchable = false,
  searchKeys = [],
  filters = [],
  pageSize = 10,
  actions,
  loading = false,
  emptyText = 'No data found',
  onRowClick,
}) => {
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [activeFilter, setActiveFilter] = useState(filters[0]?.key || 'all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    let result = [...data]

    // Apply filter
    if (filters.length > 0) {
      const active = filters.find((f) => f.key === activeFilter)
      if (active?.filter) {
        result = result.filter(active.filter)
      }
    }

    // Apply search
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((row) =>
        searchKeys.length > 0
          ? searchKeys.some((key) =>
              String(row[key] ?? '')
                .toLowerCase()
                .includes(term)
            )
          : columns.some((col) =>
              String(row[col.key] ?? '')
                .toLowerCase()
                .includes(term)
            )
      )
    }

    return result
  }, [data, search, searchKeys, columns, filters, activeFilter])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? ''
      const bVal = b[sortConfig.key] ?? ''
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIdx = (safePage - 1) * pageSize
  const pagedData = sortedData.slice(startIdx, startIdx + pageSize)

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleFilterChange = (key) => {
    setActiveFilter(key)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === f.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        {searchable && (
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[35px] border border-gray-100">
        <table className="w-full min-w-[800px]">
          <thead className="bg-blue-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`text-left px-6 py-4 text-sm font-semibold text-gray-700 ${
                    col.sortable ? 'cursor-pointer select-none hover:bg-blue-100 transition' : ''
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable &&
                      sortConfig.key === col.key &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp size={14} className="text-blue-600" />
                      ) : (
                        <ArrowDown size={14} className="text-blue-600" />
                      ))}
                  </span>
                </th>
              ))}
              {actions && (
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow
                  key={i}
                  columns={actions ? [...columns, { key: 'action' }] : columns}
                />
              ))
            ) : pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={actions ? columns.length + 1 : columns.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Inbox size={48} strokeWidth={1.5} />
                    <p className="text-sm font-medium">{emptyText}</p>
                  </div>
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIdx) => (
                <tr
                  key={row._id || row.id || rowIdx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-5 text-sm text-gray-700 truncate">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {actions(row).map((action, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick()
                            }}
                            disabled={action.disabled}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                              action.variant === 'danger'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : action.variant === 'success'
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : action.variant === 'outline'
                                    ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedData.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-gray-500">
            Showing {startIdx + 1}–{Math.min(startIdx + pageSize, sortedData.length)} of{' '}
            {sortedData.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-gray-600 px-2">
              {safePage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
