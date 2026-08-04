import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )
}

export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body

    if (!name || !email || !password || !phone) {

      return res.status(400).json({
        message: 'Please fill all fields'
      })
    }

    const userExists = await User.findOne({ email })
    const phoneExists = await User.findOne({ phone })

    if (userExists || phoneExists) {

      return res.status(400).json({
        message: 'User or phone number already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    )

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id)
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    const user = await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      })
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}