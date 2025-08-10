import axios from "axios";
import Booking from "../models/Booking.js"
import { generateInvoice } from "../utils/invoiceGenerator.js";
import { sendEmail } from "../utils/emailSender.js";
export const verifyKhaltiPayment = async (req,res) => {
    try {
        const {token,amount,bookingId} = req.body;

        // Verify payment with khalti API
        const response = await axios.post(process.env.KHALTI_VERIFY_URL,{
            token,amount
        },{
            headers:{
                Authorization:`Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type':'application/json'
            }
        });

        if(response.data.state.name === 'Completed') {
            // Update booking status
            const booking=await Booking.findByIdAndUpdate(bookingId,{
                paymentStatus: 'Paid',
                khaltiIdx: response.data.idx
            },{new:true}).populate('user').populate('package');

            // Generate PDF invoice
            const invoicePath = await generateInvoice(booking,booking.user,booking.package);

            // Send email with invoice
            await sendEmail(
                booking.user.email,
                'Your Travel & Trekking Booking Invoice',
                `Hello ${booking.user.name},\n\nThank you for booking with us! Your payment has been successfully received.\nPlease find your invoice attached.\n\nSafe travels`,
                invoicePath
            );

            res.status(201).json({
                success:true,
                message:'Payment verified, invoice generated, and email sent.',
                transactionId: response.data.idx
            });
        } else {
            res.status(400).json({
                success:false,
                message:'Payment not completed'
            });
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.response?.data || error.message
        });       
    }
}