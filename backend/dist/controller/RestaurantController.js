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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../model/restaurant"));
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = yield restaurant_1.default.findById(restaurantId);
        if (!restaurant) {
            res.status(400).json({ msg: "restaurant not found" });
            return;
        }
        res.json(restaurant);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
const searchRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.params.city;
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = req.query.selectedCuisines || "";
        const sortOption = req.query.sortOption || "lastUpdated";
        const page = parseInt(req.query.page) || 1;
        let query = {};
        query["city"] = new RegExp(city, "i");
        const cityCheck = yield restaurant_1.default.countDocuments(query);
        if (cityCheck === 0) {
            res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    pager: 1,
                    pages: 1,
                }
            });
        }
        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = { $all: cuisinesArray };
        }
        if (searchQuery) {
            const searchRegEx = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegEx },
                { cuisines: { $in: [searchRegEx] } }
            ];
        }
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const restaurants = yield restaurant_1.default.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean();
        const total = yield restaurant_1.default.countDocuments(query);
        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)
            }
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});
exports.default = {
    getRestaurant,
    searchRestaurant
};
