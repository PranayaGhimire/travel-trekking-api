import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking } from "../controllers/BookingController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/',protect,createBooking);
router.get('/',protect,getAllBookings);
router.get('/:id',protect,getBookingById);
router.put('/:id',protect,updateBooking);
router.delete('/:id',protect,deleteBooking);

export default router;