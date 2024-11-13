
// import { Request, Response } from "express";
// import Restaurant from "../model/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// const createMyRestaurant = async(req: Request, res: Response) => {
//     try {
//         const existingRestaurant = await Restaurant.findOne({user: req.userId})
//         if(existingRestaurant) {
//             res.status(409).json({msg: "User restaurant already exist"});
//             return;
//         }

//         const image = req.file as Express.Multer.File;
//         const base64Image =  Buffer.from(image.buffer).toString("base64");
//         const dataURI = `data:${image.mimetype}; base64, ${base64Image}`;

//         const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
//         const restaurant = new Restaurant(req.body);
//         restaurant.imageUrl = uploadResponse.url;
//         restaurant.user = new mongoose.Types.ObjectId(req.userId);
//         restaurant.lastUpdated = new Date();
//         await restaurant.save();

//         res.status(201).send(restaurant)
//     } catch (error) {
//         console.error("Error details:", error);
//         res.status(500).json({msg: "Co van de xay ra"})
//     }
// }

// export default {
//     createMyRestaurant
// }
import { Request, Response } from "express";
import Restaurant from "../model/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async(req:Request,res:Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if(!restaurant) {
            res.status(404).json({msg: "restaurant not found"})
            return;
        }
        res.json(restaurant);   
    } catch (error) {
        console.log("error",error)
        res.status(500).json({msg: "Error Fetching restaurant"})
    }
}
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId });
        if (existingRestaurant) {
            res.status(409).json({ msg: "User restaurant already exists" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ msg: "File is required" });
            return;
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        res.status(201).send(restaurant);
        return;
    } catch (error:any) {
            console.error("Error details:", error); // Chi tiết lỗi đầy đủ
            res.status(500).json({ msg: "Có vấn đề xảy ra", error: error.message }); // Trả lỗi cụ thể về client (tạm thời)
            return;
    }
};
const updateMyRestaurant = async(req: Request, res: Response)=> {
    try {
        const restaurant = await Restaurant.findOne({
            user: req.userId
        })
        if(!restaurant) {
            res.status(404).json({msg: "restaurant not found"})
            return;
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if(req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).send(restaurant);
        return;
    } catch (error:any) {
        console.log("error", error);
        res.status(500).json({ msg: "Có vấn đề xảy ra", error: error.message }); // Trả lỗi cụ thể về client (tạm thời)
        return;

    }
}
const uploadImage = async(file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
}
export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant
    
};
