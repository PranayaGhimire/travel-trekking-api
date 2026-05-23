import Destination from "../models/Destination.js"

export const createDestination = async (req, res) => {
  try {
    const { name, location, description, bestSeason } = req.body;
    const destination = await Destination.create({
      name,
      location,
      description,
      bestSeason,
      imageUrl: req.file?.path,
    });
    res.status(201).json({
      success: true,
      message: "New destination created successfully",
      data: destination,
    });
  } catch (error) {
    console.error("createDestination error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const search = req.query.search || "";
    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const destinations = await Destination.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Destination.countDocuments(query);
    res.status(200).json({
      success: true,
      message: "All destinations fetched successfully",
      data: destinations,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("getAllDestinations error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({
      success: true,
      message: "Destination fetched successfully",
      data: destination,
    });
  } catch (error) {
    console.error("getDestinationById error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: destination,
    });
  } catch (error) {
    console.error("updateDestination error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
    });
  } catch (error) {
    console.error("deleteDestination error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

