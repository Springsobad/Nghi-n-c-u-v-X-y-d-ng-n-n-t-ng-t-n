// import { Request, Response } from "express";
// import User from "../model/user";

// // const creatCurrentUser = async (req:Request,res:Response) =>{
// //     // 1. ktr su ton tai cua user
// //     // 2. tao user neu ko ton tai
// //     // 3. tra ve user object khi goi client
// //     try {
// //         const {auth0Id} = req.body;
// //         const existingUser = await User.findOne({auth0Id});
// //         if (existingUser) {
// //             return res.status(200).send();
// //         }
// //         const newUser = new User(req.body);
// //         await newUser.save();

// //         res.status(201).json(newUser.toObject());
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({msg: "Loi khi tao user"});
// //     }
// // }

// export default {
//     creatCurrentUser,
// };
import { Request, Response } from "express";
import User from "../model/user";
const getCurrentUser = async(req: Request, res: Response) => {
    try {
        const currentUser =  await User.findOne({_id: req.userId});
        if(!currentUser) {
          res.status(404).json({msg: "Khong tim thay user"});
          return;  
        }
        res.json(currentUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Co loi xay ra"});
        return;
    }
}
// Thay đổi từ default export sang named export
const creatCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            res.status(200).send();
            return;
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Lỗi khi tạo người dùng" });
    }
};

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
const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({ msg: "Không tìm thấy người dùng" });
            return;  // Trả về khi ko tìm thấy người dùng
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        // res.json(user);
        res.send(user);  // Gửi phản hồi, nhưng không cần return
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Thất bại khi cập nhật người dùng" });
        
    }
};
export default {
    getCurrentUser,
    creatCurrentUser,
    updateCurrentUser
};