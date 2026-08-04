import express from 'express'

import {
  verifyReport
} from '../controllers/reportController.js'

const router = express.Router()

router.get('/verify/:id', verifyReport)

export default router