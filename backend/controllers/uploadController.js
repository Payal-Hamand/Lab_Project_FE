import { v4 as uuidv4 } from 'uuid'

export const uploadReport = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

    booking.report = req.file.path

    booking.status = 'Completed'

    // Save assistant info

    booking.assignedLabAssistant =
      req.user._id

    await booking.save()

    res.status(200).json({
      message: 'Report Uploaded Successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}