import express from "express";

import upload from '../middleware/uploadMiddleware.js'

import {

  createPaymentSetting,

  getPaymentSetting,

  updatePaymentSetting,

  deletePaymentSetting

} from "../controllers/paymentSettingController.js";

const router =
  express.Router();

router.post(
  "/",
  upload.single("qrImage"),
  createPaymentSetting
);

router.get(
  "/",
  getPaymentSetting
);

router.put(
  "/",
  upload.single("qrImage"),
  updatePaymentSetting
);

router.delete(
  "/",
  deletePaymentSetting
);

export default router;