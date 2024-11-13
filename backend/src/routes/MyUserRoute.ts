// import express from "express";
// import MyUserController  from "../controller/MyUserController";

// const router = express.Router();

// router.post("/", MyUserController.creatCurrentUser);

// export default router;
import express from "express";
import MyUserController  from "../controller/MyUserController";
// import { creatCurrentUser, updateCurrentUser} from "../controller/MyUserController"; // Named import
import { jwtCheck, jwtParse, } from "../middleware/auth";
import { handleValidationErrors, validateMyUserRequest } from "../middleware/validation";

const router = express.Router();
router.get("/", jwtCheck,jwtParse, MyUserController.getCurrentUser)
// Sử dụng hàm xử lý yêu cầu đúng cách
router.post("/", jwtCheck, MyUserController.creatCurrentUser);
// router.put("/",  updateCurrentUser)
// router.put("/",jwtCheck ,jwtParse , validateMyUserRequest,handleValidationErrors,MyUserController.updateCurrentUser);
router.put(
    "/",
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    MyUserController.updateCurrentUser
  );
export default router;
