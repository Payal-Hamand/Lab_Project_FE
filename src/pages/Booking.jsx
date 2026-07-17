import PublicLayout from '@/components/layout/PublicLayout'
import BookingDateTime from '@/components/BookingDateTime'
import Button from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Loader'
import useBookingForm from '@/features/booking/hooks/useBookingForm'
import BookingFormHeader from '@/features/booking/components/BookingFormHeader'
import BookingTestSelect from '@/features/booking/components/BookingTestSelect'
import BookingPatientInfo from '@/features/booking/components/BookingPatientInfo'
import BookingAddressSection from '@/features/booking/components/BookingAddressSection'

const Booking = () => {
  const {
    formData,
    tests,
    packages,
    loading,
    fetchError,
    mapLocation,
    setMapLocation,
    showMap,
    setShowMap,
    fetchTests,
    handleChange,
    handleTestPackageChange,
    handleSubmit,
    getCurrentLocation,
    openMap,
    reverseGeocode,
  } = useBookingForm()

  return (
    <PublicLayout>
      <BookingFormHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 grid lg:grid-cols-3 gap-6 md:gap-10">
        {loading ? (
          <Spinner />
        ) : fetchError ? (
          <div className="lg:col-span-2 bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-medium">{fetchError}</p>
            <Button onClick={fetchTests} variant="outline" className="mt-4">
              Retry
            </Button>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[35px] shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950">Appointment Details</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Fill all details carefully</p>
            <form onSubmit={handleSubmit} className="mt-6 md:mt-10 space-y-5 md:space-y-7">
              <BookingTestSelect
                tests={tests}
                packages={packages}
                formData={formData}
                handleTestPackageChange={handleTestPackageChange}
              />
              <BookingPatientInfo formData={formData} handleChange={handleChange} />
              <BookingAddressSection
                formData={formData}
                handleChange={handleChange}
                mapLocation={mapLocation}
                setMapLocation={setMapLocation}
                showMap={showMap}
                setShowMap={setShowMap}
                getCurrentLocation={getCurrentLocation}
                openMap={openMap}
                reverseGeocode={reverseGeocode}
              />
              <BookingDateTime formData={formData} handleChange={handleChange} />
              <Button type="submit" loading={loading} fullWidth size="lg">
                Confirm Booking
              </Button>
            </form>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
export default Booking
