import express from 'express'

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

import {
  createTest,
  getAllTests,
  getSingleTest
} from '../controllers/testController.js'

const router = express.Router()

router.get('/', getAllTests)

router.get('/:id', getSingleTest)

router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  createTest
)

export default router