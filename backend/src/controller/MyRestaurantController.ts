import { Request, Response } from "express";
import Restaurant from "../model/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../model/order";

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
const getMyRestaurantOrders = async(req:Request,res:Response)=> {
    try {
        const restaurant = await Restaurant.findOne({user:req.userId});
        if(!restaurant) {
            res.status(404).json({msg:"Restaurant not found"});
            return;
        }
        const orders = await Order.find({restaurant:restaurant._id}).populate("restaurant").populate("user");
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Co van de xay ra"});
        return;
    }
}
const updateOrderStatus = async(req:Request,res:Response)=> {
    try {
        const {orderId} = req.params;
        const {status} = req.body;

        const order = await Order.findById(orderId);
        if(!order) {
            res.status(404).json({msg: "Order not found"});
            return;
        }
        const restaurant = await Restaurant.findById(order.restaurant);
        if(restaurant?.user?._id.toString() !== req.userId) {
            res.status(401).send();
            return;
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Ko the cap nhat order status"});
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
    updateMyRestaurant,
    getMyRestaurantOrders,
    updateOrderStatus
    
};
