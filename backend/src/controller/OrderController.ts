// import Stripe from "stripe";
// import { Request, Response } from "express";
// import Restaurant, { MenuItemType } from "../model/restaurant";
// const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
// const FRONTEND_URL = process.env.FRONTEND_URL as string;
// type CheckoutSessionRequest = {
//     cartItems: {
//         menuItemId: string;
//         name: string;
//         quantity: string;
//     }[];
//     deliveryDetails: {
//         email: string;
//         name: string;
//         city: string;
//         addressLine1: string;
//     };
//     restaurantId: string;
// }
// const createCheckoutSession = async(req: Request, res: Response) =>{
//     try {
//         const checkoutSessionRequest: CheckoutSessionRequest = req.body;
//         const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
//         if(!restaurant) {
//             throw new Error("Restaurant not found");
//         }
//         const menuItems = restaurant.menuItems;
//         if (!menuItems || !Array.isArray(menuItems)) {
//             throw new Error("Menu items are invalid or not found");
//         }
//         const lineItems = createLineItems(checkoutSessionRequest,menuItems);
//         const session = await createSession(lineItems, "TEST_ORDER_ID", restaurant.deliveryPrice, restaurant._id.toString());
//         if(!session.url) {
//             res.status(500).json({msg: "Error creating stripe session"});
//             return;
//         }
//         res.json({url: session.url})
//     } catch (error: any) {
//         console.log(error);
//         res.status(500).json({message: error.raw.message})
//     }
// }
// const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
//     const lineItems = checkoutSessionRequest.cartItems.map((cartItem)=>{
//         const menuItem = menuItems.find((item)=>item._id.toString() === cartItem.menuItemId.toString());
//         if(!menuItem) {
//             throw new Error(`Menu item not found:  ${cartItem.menuItemId}`)
//         }
//         return {
//             price_data: {
//                 currency: "gbp",
//                 unit_amount: menuItem.price,
//                 product_data: {
//                     name: menuItem.name,
//                 }
//             },
//             quantity: parseInt(cartItem.quantity)
//         };
//     });
//     return lineItems;
// };

// const createSession = async(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, restaurantId: string)=> {
//     const sessionData = await STRIPE.checkout.sessions.create({
//         line_items: lineItems,
//         shipping_options: [
//             {
//                 shipping_rate_data: {
//                     display_name: "Delivery",
//                     type: "fixed_amount",
//                     fixed_amount: {
//                         amount: deliveryPrice,
//                         currency:  "gbd"
//                     }
//                 }
//             }
//         ],
//         mode: "payment",
//         metadata: {
//             orderId,
//             restaurantId
//         },
//         success_url: `${FRONTEND_URL}/order-status?success=true`,
//         cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`
//     });
//     return sessionData;
// };



// export default {
//     createCheckoutSession
// }
import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../model/restaurant";
import dotenv from "dotenv";

dotenv.config();

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        city: string;
        addressLine1: string;
    };
    restaurantId: string;
};

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
        if (!restaurant) {
            console.error("Restaurant not found for ID:", checkoutSessionRequest.restaurantId);
            throw new Error("Restaurant not found");
        }

        const menuItems = restaurant.menuItems;
        if (!Array.isArray(menuItems) || menuItems.length === 0 || menuItems.length === 0) {
            console.error("Menu items invalid or empty:", menuItems);
            throw new Error("Menu items are invalid or not found");
        }

        console.log("Cart items from request:", checkoutSessionRequest.cartItems);
        console.log("Menu items from database:", menuItems);

        const lineItems = createLineItems(checkoutSessionRequest, menuItems);
        const session = await createSession(lineItems, "TEST_ORDER_ID", restaurant.deliveryPrice, restaurant._id.toString());

        if (!session.url) {
            res.status(500).json({ msg: "Error creating stripe session" });
            return;
        }

        res.json({ url: session.url });
    } catch (error: unknown) {
      
            console.error("Error caught:", error);
        
            if (error instanceof Error) {
                // Nếu error là kiểu Error chuẩn
                res.status(500).json({ message: error.message });
            } else {
                // Xử lý cho các loại error không xác định
                res.status(500).json({ message: "An unknown error occurred" });
            }
    }
};

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
        if (!menuItem) {
            console.error(`Menu item not found: ${cartItem.menuItemId}`);
            throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
        }
        return {
            price_data: {
                currency: "gbp",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity),
        };
    });
    return lineItems;
};

const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    restaurantId: string
) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "gbp", // Sửa từ "gbd" thành "gbp"
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId,
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });
    return sessionData;
};

export default {
    createCheckoutSession,
};