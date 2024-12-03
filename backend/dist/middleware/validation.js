"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMyRestaurantRequest = exports.validateMyUserRequest = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
});
exports.handleValidationErrors = handleValidationErrors;
exports.validateMyUserRequest = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Ten phai la chuoi ky tu"),
    (0, express_validator_1.body)("addressLine1").isString().notEmpty().withMessage("Dia chi phai la chuoi ky tu"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("Thanh pho phai la chuoi ky tu"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Dat nuoc phai la chuoi ky tu"),
    exports.handleValidationErrors,
];
exports.validateMyRestaurantRequest = [
    (0, express_validator_1.body)("restaurantName").notEmpty().withMessage("Ten nha hang is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("Thanh pho is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery price must be a positive number"),
    (0, express_validator_1.body)("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("Estimate delivery time must be a positve integer"),
    (0, express_validator_1.body)("cuisines").isArray().withMessage("Cuisine must be an array").not().isEmpty().withMessage("Cuisine can't be empty"),
    (0, express_validator_1.body)("menuItems").isArray().withMessage("Menu Item must be an arry"),
    (0, express_validator_1.body)("menuItems.*.name").notEmpty().withMessage("Menu items name is required"),
    (0, express_validator_1.body)("menu.*.price").isFloat().withMessage("Menu item price is required and must be a positive number"),
    exports.handleValidationErrors,
];
