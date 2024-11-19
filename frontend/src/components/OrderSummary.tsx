// import { CartItem } from "@/pages/DetailPage";
// import { Restaurant } from "@/type"
// import { CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Separator } from "@radix-ui/react-separator";
// import { Trash } from "lucide-react";

// type Props = {
//     restaurant: Restaurant;
//     cartItems: CartItem[];
//     removeFromCart: (cartItem: CartItem, quantityToRemove: number, removeAll?: boolean) => void;
// };

// const OrderSummary = ({restaurant,cartItems, removeFromCart}: Props) => {
//     const getTotalCost = ()=>{
//         const totalInPence = (cartItems??[]).reduce((total, cartItem)=>total + cartItem.price * cartItem.quantity, 0);
//         const totalWithDelivery = totalInPence + restaurant.deliveryPrice
//         return (totalWithDelivery / 100).toFixed(2);
//     }
//     return(
//         <>
//         <CardHeader>
//             <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
//                 <span>Your Order</span>
//                 <span>VND{getTotalCost()}</span>
//             </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-5">
//             {cartItems.map((item, index)=>(
//                 <div className="flex justify-between" key={item._id || index}>
//                     <span>
//                         <Badge variant="outline" className="mr-2">
//                             {item.quantity}
//                         </Badge>
//                         {item.name}
//                     </span>
//                     <span className="flex items-center gap-1">
//                         <Trash className="cursor-pointer" color="red" size = {20} onClick={()=>removeFromCart(item, item.quantity, true)}/>
//                         VND{((item.price * item.quantity) / 100).toFixed(2)}
//                     </span>
//                 </div>
//             ))}
//             <Separator/>
//             <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span>VND{(restaurant.deliveryPrice/100).toFixed(2)}</span>
//             </div>
//             <Separator/>
//         </CardContent>
//         </>
//     )
// }
// export default OrderSummary;

import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/type";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { Trash } from "lucide-react";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem, quantityToRemove: number, removeAll?: boolean) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
    const getTotalCost = () => {
        const totalInPence = (cartItems ?? []).reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
        return (totalWithDelivery / 100).toFixed(2);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>VND{getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div className="flex justify-between items-center" key={item._id || index}>
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-2">
                            {/* Nút giảm số lượng */}
                            <button
                                className="text-sm text-gray-600 border rounded px-2 py-1 hover:bg-gray-200"
                                onClick={() => removeFromCart(item, 1)}
                            >
                                -
                            </button>

                            {/* Nút xóa toàn bộ */}
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item, item.quantity, true)}
                            />

                            <span>
                                VND{((item.price * item.quantity) / 100).toFixed(2)}
                            </span>
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>VND{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    );
};

export default OrderSummary;
