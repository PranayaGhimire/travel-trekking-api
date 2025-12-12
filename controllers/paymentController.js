import axios from "axios";
import Booking from "../models/Booking.js"
import { generateInvoice } from "../utils/invoiceGenerator.js";
import { sendEmail } from "../utils/emailSender.js";
const KHALTI_URL=process.env.KHALTI_URL
// 1️⃣ INITIATE PAYMENT
export const initiateKhaltiPayment = async (req, res) => {
  try {
    const { amount, bookingId,packageName } = req.body;

    const payload = {
      return_url: process.env.RETURN_URL,
      website_url: process.env.WEBSITE_URL,
      amount: amount * 100,                 // Khalti works in paisa
      purchase_order_id: bookingId,
      purchase_order_name:packageName
    };

    const response = await axios.post(
      `${KHALTI_URL}/initiate/`,
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    res.json({
      success: true,
      payment_url: response.data.payment_url,
      pidx: response.data.pidx,
    });

  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
};

export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx, bookingId } = req.body;

    const response = await axios.post(
      `${KHALTI_URL}/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    if (response.data.status === "Completed") {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: "Paid",
          status:"completed",
          khaltiIdx: pidx,
        },
        { new: true }
      )
        .populate("user")
        .populate("package");

      // Generate invoice PDF
      const invoicePath = await generateInvoice(
        booking,
        booking.user,
        booking.package
      );

      // Send email with invoice
      await sendEmail(
        booking.user.email,
        "Your Booking Invoice",
        `Hello ${booking.user.name}, your payment has been received. Please find your invoice attached.`,
        invoicePath
      );

      return res.json({
        success: true,
        message: "Payment verified successfully.",
        transactionId: pidx,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment not completed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
};