import express from 'express'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'

import {
  getLabOwnerPaymentStats,
  getAdminPaymentStats
} from '../controllers/PaymentStatistic.js'

router.get(
  '/lab-owner',
  protect,
  authorizeRoles('lab_owner'),
  getLabOwnerPaymentStats
)

router.get(
  '/admin',
  protect,
  authorizeRoles('admin'),
  getAdminPaymentStats
)

export default router
