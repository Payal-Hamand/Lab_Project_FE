import express from 'express'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'

import authorizeRoles from '../middleware/roleMiddleware.js'

import {

  getMyAssistants

} from '../controllers/userController.js'

router.get(

  '/my-assistants',

  protect,

  authorizeRoles(
    'lab_owner'
  ),

  getMyAssistants
)

export default router