import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateAcessToken, generateRefreshToken } from "../middlewares/authMiddleware.js";

export const register = async (req,res) => {
    const {username,email,password,role} = req.body;

    try {
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({message:'Email already in use'});

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({username,email,password:hashed,role});

        const accessToken = generateAcessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'/api/auth/refresh',
            secure:false,
            sameSite:'strict'
        });

        res.status(201).json({
            success:true,
            accessToken,
            message:'New user created successfully',
            data:user
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email}).select('+password');
        if(!user) 
            res.status(400).json({ message:'Invalid credentials' });

        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch) res.status(400).json({ message:'Invalid credentials' });

        const accessToken = generateAcessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:'/api/auth/refresh',
            secure:false,
            sameSite:'strict'
        });

        res.json({
            success:true,
            message:'User logged in successfully',
            accessToken,
            data:user
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        });
    }   
}

export const refreshToken = (req,res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({message:'Refresh token not found'});

    try {
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateAcessToken(decoded.id);
        res.status(201).json({accessToken:newAccessToken});
    } catch (error) {
        res.status(403).json({ message:'Invalid refresh token' });
    }
}