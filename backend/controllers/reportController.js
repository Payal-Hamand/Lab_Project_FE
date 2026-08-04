import Booking from '../models/Booking.js'

export const verifyReport = async (req, res) => {

  try {

    const booking = await Booking.findOne({
      reportId: req.params.id
    }).populate('test')

    if (!booking) {

      return res.status(404).json({
        verified: false,
        message: 'Invalid Report'
      })
    }

    res.status(200).json({
      verified: true,
      patientName: booking.patientName,
      testName: booking.test.title,
      bookingDate: booking.bookingDate,
      status: booking.status,
      report: booking.report
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}