import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT Token
export const protect = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) 
        return res.status(401).json({message:'No token, access denied!'});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message:'Invalid token' });
    }
}

// Middleware for admin access
export const adminOnly = (req,res,next) => {
    if(req.user?.role !== 'admin')
        return res.status(403).json({message:'Access denied. Admins Only.'});
    next();
}; 

// Generate access token
export const generateAcessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn:'15m'});
};

// Generate refresh token
export const generateRefreshToken = (userId) => {
    return jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET, {expiresIn:'7d'});
};