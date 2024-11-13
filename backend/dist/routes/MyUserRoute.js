"use strict";
// import express from "express";
// import MyUserController  from "../controller/MyUserController";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post("/", MyUserController.creatCurrentUser);
// export default router;
const express_1 = __importDefault(require("express"));
const MyUserController_1 = __importDefault(require("../controller/MyUserController"));
// import { creatCurrentUser, updateCurrentUser} from "../controller/MyUserController"; // Named import
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
// Sử dụng hàm xử lý yêu cầu đúng cách
router.post("/", auth_1.jwtCheck, MyUserController_1.default.creatCurrentUser);
// router.put("/",  updateCurrentUser)
// router.put("/",jwtCheck ,jwtParse , validateMyUserRequest,handleValidationErrors,MyUserController.updateCurrentUser);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, MyUserController_1.default.updateCurrentUser);
exports.default = router;
