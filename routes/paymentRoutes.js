import express from "express";
import { verifyKhaltiPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.post('/khalti/verify',verifyKhaltiPayment);

export default router;