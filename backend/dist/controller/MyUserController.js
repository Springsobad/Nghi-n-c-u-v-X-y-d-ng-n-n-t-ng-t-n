"use strict";
// import { Request, Response } from "express";
// import User from "../model/user";
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
const user_1 = __importDefault(require("../model/user"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            res.status(404).json({ msg: "Khong tim thay user" });
            return;
        }
        res.json(currentUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Co loi xay ra" });
        return;
    }
});
// Thay đổi từ default export sang named export
const creatCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const existingUser = yield user_1.default.findOne({ auth0Id });
        if (existingUser) {
            res.status(200).send();
            return;
        }
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Lỗi khi tạo người dùng" });
    }
});
// export const updateCurrentUser =async (req:Request, res:Response): Promise<void> => {
//     try {
//         const {name, addressLine1, country, city} = req.body;
//         const user = await User.findById(req.userId)
//         if(!user) {
//             res. status(500).json({msg: "Khong tim thay nguoi dung"})
//         }
//         user.name = name;
//         user.addressLine1 = addressLine1;
//         user.city = city;
//         user.country = country;
//         await user.save();
//         // res.send(user)
//         res.json(user)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: "That bai khi cap nhat User"})
//     }
// };
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            res.status(404).json({ msg: "Không tìm thấy người dùng" });
            return; // Trả về khi ko tìm thấy người dùng
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        yield user.save();
        // res.json(user);
        res.send(user); // Gửi phản hồi, nhưng không cần return
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Thất bại khi cập nhật người dùng" });
    }
});
exports.default = {
    getCurrentUser,
    creatCurrentUser,
    updateCurrentUser
};
