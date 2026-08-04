import mongoose from 'mongoose'

const packageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

   price: {
  type: Number,
  required: true,
  min: 1
},
    testsIncluded: [
  {
    type:
      mongoose.Schema.Types.ObjectId,

    ref: 'Test'
  }
],

    image: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: 'Health Package'
    }
  },
  {
    timestamps: true
  }
)

const Package = mongoose.model(
  'Package',
  packageSchema
)

export default Package