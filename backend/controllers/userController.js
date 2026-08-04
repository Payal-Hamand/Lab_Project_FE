import User from '../models/User.js'

export const getMyAssistants =
  async (req, res) => {

    try {

      const assistants =
        await User.find({

          role:
            'lab_assistant',

          labOwner:
            req.user._id

        }).select('-password')

      res.status(200)
        .json(assistants)

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      })
    }
  }