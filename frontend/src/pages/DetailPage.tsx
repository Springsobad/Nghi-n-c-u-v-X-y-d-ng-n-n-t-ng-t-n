import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MenuItem as MenuItemType } from "@/type"
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom"
import CheckOutButton from "@/components/CheckOutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number
}

const DetailPage = ()=> {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);
    const [cartItems, setCartItems] = useState<CartItem[]>(()=> {
        const storedCartItems = sessionStorage.getItem(`cartItems - ${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems): [];
    });
    const addtoCart = (menuItem:MenuItemType)=> {
        setCartItems((prevCartItems)=>{
            const existingCartItem = prevCartItems.find((cartItem)=>cartItem._id === menuItem._id);
            let updatedCartItems;
            if(existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem)=>cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
            } else{
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            sessionStorage.setItem(`cartItems- ${restaurantId}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        })
    }
    // const removeFromCart = (cartItem: CartItem) => {
    //     setCartItems((prevCartItems)=>{
    //         const updatedCartItems = prevCartItems.filter((item)=>cartItem._id !== item._id);
    //         return updatedCartItems;
    //     })
    // }
    const removeFromCart = (cartItem: CartItem, quantityToRemove: number = 1, removeAll: boolean = false) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((item) => item._id === cartItem._id);
    
            if (!existingCartItem) return prevCartItems;
    
            let updatedCartItems;
    
            if (removeAll || existingCartItem.quantity <= quantityToRemove) {
                // Xóa toàn bộ mục nếu removeAll = true hoặc số lượng <= quantityToRemove
                updatedCartItems = prevCartItems.filter((item) => item._id !== cartItem._id);
            } else {
                // Giảm số lượng nếu removeAll = false
                updatedCartItems = prevCartItems.map((item) =>
                    item._id === cartItem._id
                        ? { ...item, quantity: item.quantity - quantityToRemove }
                        : item
                );
            }
    
            // Lưu giỏ hàng cập nhật vào sessionStorage
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
    
            return updatedCartItems;
        });
    };
    
    
    

    const onCheckout = (userFormData:UserFormData)=>{
        console.log("userFormData", userFormData)
    }
    if(isLoading || !restaurant) {
        return "Loading...";
    }
    return (
        <div className="flex flex-col gap-10">
        <AspectRatio ratio = {16/5}>
            <img src ={restaurant.imageUrl}className="rounded-md object-cover h-full w-full"/>
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant= {restaurant}/>
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {restaurant.menuItems.map((menuItem)=>(
                    <MenuItem key={menuItem._id} menuItem = {menuItem} addtoCart={()=>addtoCart(menuItem)}/>
                ))}
            </div>
            <div>
                <Card>
                    <OrderSummary restaurant = {restaurant} cartItems = {cartItems} removeFromCart = {removeFromCart}/>
                    <CardFooter>
                        <CheckOutButton disabled = {cartItems.length === 0} onCheckout={onCheckout}/>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
    )
   
}
export default DetailPage