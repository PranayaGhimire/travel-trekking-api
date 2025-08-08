import Package from "../models/Package.js"

export const createPackage = async (req,res) => {
    try {
        const newPackage = await Package.create(req.body);
        res.status(201).json({
            success:true,
            message:'New package created successfully',
            data:newPackage
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

export const getAllPackages = async (req,res) => {
    try {
        const {page=1, limit=10, search=''} = req.query;

        const query = search ? {title:{$regex:search,$options:'i'}}:{};
        const packages = await Package.find(query).populate('destination').limit(parseInt(limit)).skip((page-1)*limit);
        const total = await Package.countDocuments(query);
        res.status(201).json({
            success:true,
            message:'Packages fetched successfully',
            data:packages,
            total,
            page:parseInt(page),
            limit:parseInt(limit),
            pages:Math.ceil(total/limit)
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

export const getPackageById = async (req,res) => {
    try {
        const pkg = await Package.findById(req.params.id).populate('destination');
        if(!pkg) return res.status(404).json({message:'Package not found'});
        res.status(201).json({
            success:true,
            message:'Package fetched successfully',
            data:pkg
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

export const updatePackage = async (req,res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new:true });
        if(pkg) return res.status(404).json({message:'Package not found'});
        res.status(201).json({
            success: true,
            message:'Package updated successfully',
            data:pkg
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

export const deletePackage = async (req,res) => {
    try {
        const pkg= await Package.findByIdAndDelete(req.params.id);
        if(!pkg) return res.status(404).json({ message:'Package not found' });
        res.status(201).json({
            success:true,
            message:'Package deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};