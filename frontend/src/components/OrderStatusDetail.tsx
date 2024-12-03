import { Order } from "@/type"
import { Separator } from "@radix-ui/react-separator";

type Props = {
    order: Order;
}

const OrderStatusDetail = ({order}: Props) => {
    return <div className="space-y-5">
        <div className="flex flex-col">
            <span className="font-bold">Delivering to: </span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold">Your order: </span>
            <ul>
                {order.cartItems.map((item, index)=>(
                    <li key={item.id || index}>
                        {item.name} x {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
        <Separator/>
        <div className="flex flex-col">
            <span className="font-bold">Total:</span>
            <span>VND{(order.totalAmount/100).toFixed(2)}</span>
        </div>
    </div>
}
export default OrderStatusDetail;