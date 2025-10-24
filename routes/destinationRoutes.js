import express from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controllers/destinationController.js";
import {upload} from "../utils/cloudinary.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",upload.single("image"),protect,adminOnly,createDestination);
router.get("/",getAllDestinations);
router.get("/:id",getDestinationById);
router.put("/:id",protect,adminOnly,updateDestination);
router.delete("/:id",protect,adminOnly,deleteDestination);

export default router;