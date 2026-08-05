import React from 'react'
import { DollarSign, Calendar, TrendingUp, Clock } from 'lucide-react'
import { Spinner } from '@/components/ui/Loader'
import Modal from '@/components/ui/Modal'
import { useLabOwnerPaymentStats } from '@/hooks/usePaymentStats'
import { formatCurrency } from '@/utils/formatCurrency'

const LabOwnerPaymentSection = ({ open, onClose }) => {
  const { data: stats, isLoading, error } = useLabOwnerPaymentStats()

  return (
    <Modal open={open} title="Payment Overview" subtitle="Revenue and payment statistics for your lab" onClose={onClose} size="lg">
      {isLoading ? (
        <div className="py-10">
          <Spinner />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <p className="text-red-600 text-xs font-medium">Failed to load payment stats.</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
                  <h3 className="font-mono font-bold text-foreground text-xl mt-1.5">
                    {formatCurrency(stats?.totalRevenue)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-primary bg-primary/10">
                  <DollarSign size={16} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Today</p>
                  <h3 className="font-mono font-bold text-foreground text-xl mt-1.5">
                    {formatCurrency(stats?.todayRevenue)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-green-500 bg-green-500/10">
                  <Calendar size={16} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">This Month</p>
                  <h3 className="font-mono font-bold text-foreground text-xl mt-1.5">
                    {formatCurrency(stats?.monthRevenue)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-blue-500 bg-blue-500/10">
                  <TrendingUp size={16} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Pending</p>
                  <h3 className="font-mono font-bold text-foreground text-xl mt-1.5">
                    {stats?.pendingPayments ?? 0}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-yellow-500 bg-yellow-500/10">
                  <Clock size={16} className="text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Row */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <span className="font-medium">Paid Bookings:</span>{' '}
              <span className="font-bold text-foreground">{stats?.totalPaidBookings ?? 0}</span>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <span className="font-medium">Test Revenue:</span>{' '}
              <span className="font-bold text-foreground">{formatCurrency(stats?.testRevenue)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <span className="font-medium">Package Revenue:</span>{' '}
              <span className="font-bold text-foreground">{formatCurrency(stats?.packageRevenue)}</span>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

export default LabOwnerPaymentSection
