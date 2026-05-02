import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user)
      return res.status(404).json({ message: "User profile not found" });
    res.status(201).json({
      success:true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};
