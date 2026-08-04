import express from 'express'

import bcrypt from 'bcryptjs'

import User from '../models/User.js'

const router = express.Router()

router.get('/create-admin', async (
  req,
  res
) => {

  try {

    const adminExists =
      await User.findOne({

        email: 'admin@gmail.com'

      })

    if (adminExists) {

      return res.json({
        message:
          'Admin already exists'
      })
    }

    const hashedPassword =
      await bcrypt.hash(
        'admin123',
        10
      )

    await User.create({

      name: 'Super Admin',

      email: 'admin@gmail.com',

      password: hashedPassword,

      role: 'admin'

    })

    res.json({
      message:
        'Admin Created'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
})

export default router