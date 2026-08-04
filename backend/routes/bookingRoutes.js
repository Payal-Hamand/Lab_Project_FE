import express from 'express'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'

import {

  createBooking,

  getMyBookings,

  uploadReport,

  getAllBookings,

  getLabOwnerBookings,

  assignAssistant,

  getAssignedBookings,
  markReached,
  uploadSample,
  markPaymentDone,
   searchAssignedBookings,
   searchLabOwnerBookings,
   cancelBooking,
     updateBookingRequest,
       updateBookingLab,
       getAllLabOwners

} from '../controllers/bookingController.js'

/* -------- PATIENT -------- */

router.post(

  '/',

  protect,

  authorizeRoles('patient'),

  createBooking
)

router.get(

  '/my-bookings',

  protect,

  authorizeRoles('patient'),

  getMyBookings
)

/* -------- ADMIN -------- */

router.get(

  '/all',

  protect,

  authorizeRoles('admin', 'lab_assistant', 'lab_owner'),

  getAllBookings
)

/* -------- LAB OWNER -------- */

router.get(

  '/lab-owner',

  protect,

  authorizeRoles('lab_owner'),

  getLabOwnerBookings
)

router.put(
  "/update-booking-lab/:bookingId",
  protect,
  
  authorizeRoles('admin'),
  updateBookingLab
);

router.get(
  "/lab-owners",
  protect,
  authorizeRoles('admin'),
  getAllLabOwners
);

router.put(

  '/assign-assistant',

  protect,

  authorizeRoles('lab_owner'),

  assignAssistant
)

/* -------- LAB ASSISTANT -------- */

router.get(

  '/assigned',

  protect,

  authorizeRoles(
    'lab_assistant'
  ),

  getAssignedBookings
)

router.get(
  "/assigned/search",
  protect,
  authorizeRoles('lab_assistant'),
  searchAssignedBookings
);
router.get(
  "/lab-owner/search",
  protect,
  authorizeRoles('lab_owner'),
  searchLabOwnerBookings
);
router.put(

  '/upload-report/:id',

  protect,

  authorizeRoles(
    'lab_owner'
  ),

  upload.single('report'),

  uploadReport
)
router.put(
  '/reached/:id',
  protect,
  markReached
)

router.put(
  '/sample/:id',
  protect,
 upload.array(
  'sampleImages',
  10
),
  uploadSample
)


router.put(
  "/payment/:id",
  protect,
  upload.single("receipt"),
  markPaymentDone
);

router.put(
  '/cancel/:id',
  protect,
  authorizeRoles('patient'),
  cancelBooking
)

router.put(
  '/manage/:id',
  protect,
  authorizeRoles(
    'patient'
  ),
  updateBookingRequest
)
export default router