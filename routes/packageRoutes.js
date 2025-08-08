import express from "express";
import { createPackage, deletePackage, getAllPackages, getPackageById, updatePackage } from "../controllers/packageController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";
const router = express.Router();

router.post('/',protect,createPackage);
router.get('/',protect,getAllPackages);
router.get('/:id',protect,getPackageById);
router.put('/:id',protect,updatePackage);
router.delete('/:id',protect,adminOnly,deletePackage);
router.post('/upload',upload.single('image'), (req,res) => {
    res.json({imageUrl:req.file.path});
});

export default router;