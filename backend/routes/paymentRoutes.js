import express from "express";

const router = express.Router();
import{createPayment,checkPaymentStatus} from "../controllers/paymentController.js"

router.post(
  "/create",
  createPayment
);

router.get(
  "/status/:txnId",
  checkPaymentStatus
);

export default router;