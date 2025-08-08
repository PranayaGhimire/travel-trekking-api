import Booking from "../models/Booking.js"

export const createBooking = async (req,res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({
            success:true,
            message:'New booking created successfully',
            data:booking
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
};

export const getAllBookings = async (req,res) => {
    try {
        const bookings = await Booking.find().populate('user','name email').populate('package','title price');
        res.status(201).json({
            success:true,
            message:'All bookings fetched successfully',
            data:bookings
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })        
    }
};

export const getBookingById = async (req,res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user','name email').populate('package','title price');
        if(!booking) return res.status(404).json({message:'Booking not found'});
        res.status(201).json({
            success:true,
            message:'Booking fetched successfully',
            data:booking
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

export const updateBooking = async (req,res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!booking) return res.status(404).json({message:'Booking not found'});
        res.status(201).json({
            success:true,
            message:'Booking updated successfully',
            data:booking
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })        
    }
};

export const deleteBooking = async (req,res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if(!booking) return res.status(404).json({message:'Booking not found'});
        res.status(201).json({
            success:true,
            message:'Booking deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}