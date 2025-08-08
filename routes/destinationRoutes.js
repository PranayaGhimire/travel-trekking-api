import express from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controllers/destinationController.js";
const router = express.Router();

router.post("/",createDestination);
router.get("/",getAllDestinations);
router.get("/:id",getDestinationById);
router.put("/:id",updateDestination);
router.delete("/:id",deleteDestination);

export default router;