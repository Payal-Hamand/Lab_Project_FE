import User from '../models/User.js'
import sendMail from "../Utils/sendMail.js"
import bcrypt from 'bcryptjs'

export const forgotPassword =
async (req,res) => {

  try {

    const { email } =
      req.body

    const user =
      await User.findOne({
        email
      })

    if (!user) {

      return res.status(404).json({
        message:
          'User Not Found'
      })
    }

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString()

    user.resetOtp = otp

    user.resetOtpExpire =
      Date.now() +
      10 * 60 * 1000

    await user.save()

    await sendMail(

      email,

      'Password Reset OTP',

      `Your OTP is ${otp}`

    )

    res.status(200).json({

      message:
        'OTP Sent Successfully'

    })

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}

export const verifyOtp =
async (req,res) => {

  try {

    const {
      email,
      otp
    } = req.body

    const user =
      await User.findOne({
        email
      })

    if (
      !user ||
      user.resetOtp !== otp
    ) {

      return res.status(400).json({

        message:
          'Invalid OTP'

      })
    }

    if (
      user.resetOtpExpire <
      Date.now()
    ) {

      return res.status(400).json({

        message:
          'OTP Expired'

      })
    }

    res.status(200).json({

      message:
        'OTP Verified'

    })

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}


export const resetPassword =
async (req,res) => {

  try {

    const {
      email,
      otp,
      password
    } = req.body

    const user =
      await User.findOne({
        email
      })

    if (
      !user ||
      user.resetOtp !== otp
    ) {

      return res.status(400).json({

        message:
          'Invalid OTP'

      })
    }

    const salt =
      await bcrypt.genSalt(10)

    user.password =
      await bcrypt.hash(
        password,
        salt
      )

    user.resetOtp = ''

    user.resetOtpExpire =
      null

    await user.save()

    res.status(200).json({

      message:
        'Password Updated'

    })

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}