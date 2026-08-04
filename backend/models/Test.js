import mongoose from 'mongoose'

const testSchema = mongoose.Schema(
  {
    title: {
  type: String,
  required: true,
  trim: true,
  minlength: 2
},

    category: {
      type: String,
      required: true
    },

    price: {
  type: Number,
  required: true,
  min: 1
},

    reportTime: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Test = mongoose.model('Test', testSchema)

export default Test