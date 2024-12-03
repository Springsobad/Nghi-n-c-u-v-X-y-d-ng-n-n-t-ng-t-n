"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../model/restaurant"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const getMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            res.status(404).json({ msg: "restaurant not found" });
            return;
        }
        res.json(restaurant);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Error Fetching restaurant" });
    }
});
const createMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRestaurant = yield restaurant_1.default.findOne({ user: req.userId });
        if (existingRestaurant) {
            res.status(409).json({ msg: "User restaurant already exists" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ msg: "File is required" });
            return;
        }
        const imageUrl = yield uploadImage(req.file);
        const restaurant = new restaurant_1.default(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose_1.default.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        yield restaurant.save();
        res.status(201).send(restaurant);
        return;
    }
    catch (error) {
        console.error("Error details:", error); // Chi tiết lỗi đầy đủ
        res.status(500).json({ msg: "Có vấn đề xảy ra", error: error.message }); // Trả lỗi cụ thể về client (tạm thời)
        return;
    }
});
const updateMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findOne({
            user: req.userId
        });
        if (!restaurant) {
            res.status(404).json({ msg: "restaurant not found" });
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
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            restaurant.imageUrl = imageUrl;
        }
        yield restaurant.save();
        res.status(200).send(restaurant);
        return;
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Có vấn đề xảy ra", error: error.message }); // Trả lỗi cụ thể về client (tạm thời)
        return;
    }
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI);
    return uploadResponse.url;
});
exports.default = {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant
};
