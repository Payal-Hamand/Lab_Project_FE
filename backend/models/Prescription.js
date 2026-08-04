import mongoose from 'mongoose'

const prescriptionSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Prescription', prescriptionSchema)