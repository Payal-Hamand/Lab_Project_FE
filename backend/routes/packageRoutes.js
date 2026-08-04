import express from 'express'

import {
  createPackage,
  getAllPackages
} from '../controllers/packageController.js'

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('/', getAllPackages)

router.post(
  '/',

  createPackage
)

export default router