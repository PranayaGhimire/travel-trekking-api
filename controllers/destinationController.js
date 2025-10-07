import Destination from "../models/Destination.js"

// Create a new destination
export const createDestination = async (req,res) => {
    try {
        const {name,location,description,bestSeason} = req.body;

        // if (!req.file){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Image is required"
        //     });
        // }
        const destination = await Destination.create({
            name,
            location,
            description,
            bestSeason,
            imageUrl:req.file?.path
        });
        res.status(201).json({
            success:true,
            message:'New destination created successfully',
            data:destination
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
};

// Get All Destinations
export const getAllDestinations = async (req,res) => {
    try {
        const {page=1,limit=10,search=''} = req.query;
        const query = search ? { name:{$regex:search,$options:'i' }} : {};
        const destinations = await Destination.find(query).limit(parseInt(limit)).skip((page-1)*limit);
        const total = await Destination.countDocuments(query);
        res.status(201).json({
            success:true,
            message:'All destinations fetched successfully',
            data:destinations,
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

// Get a single destination
export const getDestinationById = async (req,res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if(!destination) return res.status(400).json({message:"Destination not found"});
        res.status(201).json({
            success:true,
            message:"Destination fetched successfully",
            data:destination
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

// Update destination
export const updateDestination = async (req,res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!destination) return res.status(404).json({message:"Destination not found"});
        res.status(201).json({
            success:true,
            message:"Destination updated successfully",
            data:destination
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })        
    }
};

// Delete destination
export const deleteDestination = async (req,res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) return res.status(400).json({message:'Destination not found'});
        res.status(201).json({
            success:true,
            message:"Destination deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
};

