// import { validateMyUserRequest } from './validation';
import {Request,Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const handleValidationErrors = async(req:Request,res:Response,next:NextFunction)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    next();
}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Ten phai la chuoi ky tu"),
    body("addressLine1").isString().notEmpty().withMessage("Dia chi phai la chuoi ky tu"),
    body("city").isString().notEmpty().withMessage("Thanh pho phai la chuoi ky tu"),
    body("country").isString().notEmpty().withMessage("Dat nuoc phai la chuoi ky tu"),
    handleValidationErrors,
];
export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Ten nha hang is required"),
    body("city").notEmpty().withMessage("Thanh pho is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").isFloat({min: 0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("Estimate delivery time must be a positve integer"),
    body("cuisines").isArray().withMessage("Cuisine must be an array").not().isEmpty().withMessage("Cuisine can't be empty"),
    body("menuItems").isArray().withMessage("Menu Item must be an arry"),
    body("menuItems.*.name").notEmpty().withMessage("Menu items name is required"),
    body("menu.*.price").isFloat().withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors,

]