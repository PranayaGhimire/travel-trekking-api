import express from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controllers/destinationController.js";
import {upload} from "../utils/cloudinary.js";
import { adminOnly } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",upload.single("image"),adminOnly,createDestination);
router.get("/",getAllDestinations);
router.get("/:id",getDestinationById);
router.put("/:id",updateDestination);
router.delete("/:id",deleteDestination);

export default router;