import mongoose from "mongoose";

const paymentSettingSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      trim: true,
    },

    upiId: {
      type: String,
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