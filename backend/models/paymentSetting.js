import mongoose from "mongoose";

const paymentSettingSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    upiId: {
      type: String,
      required: true,
      trim: true,
    },

    qrImage: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PaymentSetting",
  paymentSettingSchema
);