import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test'
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    },
    patientName: {
  type: String,
  required: true,
  trim: true,
  minlength: 3,
  maxlength: 50
},
labOwner: {

  type:
    mongoose.Schema.Types.ObjectId,

  ref: 'User'

},

    age: {
  type: Number,
  required: true,
  min: 1,
  max: 99
},

    gender: {
      type: String,
      required: true
    },

    phone: {
  type: String,
  required: true,
  match: /^[6-9]\d{9}$/
},
    assignedLabAssistant: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null
},

    address: {
      type: String,
      required: true
    },
    flatNo: {
  type: String,
  required: true
},

landmark: {
  type: String,
  
},

city: {
  type: String,
  required: true
},


pincode: {
  type: String,
  required: true,
  match: /^[1-9][0-9]{5}$/
},
location: {
  latitude: Number,
  longitude: Number
},
patientLatitude: Number,
patientLongitude: Number,
assignedDistance: {
  type: Number,
  default: 0
},

    bookingDate: {
      type: String,
      required: true
    },

    bookingTime: {
      type: String,
      required: true
    },

  status: {

  type: String,

  enum: [

    'Pending',

    'Assigned',

    'Reached',

    'Sample Collected',

    'Processing',

    'Report Ready',

    'Completed',
    'Cancelled',
    'Rescheduled'

  ],

  default: 'Pending'
},

sampleImages: [
  {
    type: String
  }
],

sampleId: {
  type: String,
  default: ''
},

sampleCollectedAt: {
  type: Date
},

assistantNotes: {
  type: String,
  default: ''
},
rescheduleReason: {
  type: String,
  default: ''
},

rescheduledAt: {
  type: Date
},

oldBookingDate: {
  type: String,
  default: ''
},

oldBookingTime: {
  type: String,
  default: ''
},

paymentScreenshot: {
  type: String,
  default: ''
},

transactionId: {
  type: String,
  default: ''
},

paymentAmount: {
  type: Number,
  default: 0
},

reachedAt: {
  type: Date
},

paidAt: {
  type: Date
},
   paymentStatus: {

  type: String,

  enum: [

    'Pending',

    'Paid',

    'Failed',

    'Refunded'

  ],

  default: 'Pending'
},
cancelledBy: {
  type: String,
  enum: [
    'patient',
    'lab_owner',
    'admin'
  ],
  default: null
},

cancelReason: {
  type: String,
  default: ''
},

cancelledAt: {
  type: Date,
  default: null
},

    report: {
      type: String,
      default: ''
    },
   reportId: {
  type: String,
  unique: true,
  sparse: true
},

verified: {
  type: Boolean,
  default: true
}

  },
  {
    timestamps: true
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking

