import { Order } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = ()=> {
    const {getAccessTokenSilently} = useAuth0();
    const getMyOrdersRequest = async(): Promise<Order[]>=> {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/order`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,

            }
        })
        if(!response.ok) {
            throw new Error("Failed to get orders");
        }
        return response.json();
    };
    const {data: orders, isLoading} = useQuery("fetchMyOrders", getMyOrdersRequest,{
        refetchInterval: 5000
    });
    return {
        orders, isLoading
    }
}

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

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest),
        });

        // Log response status và nội dung response nếu có lỗi
        if (!response.ok) {
            const errorData = await response.json();  // Lấy thêm thông tin lỗi từ server
            console.error("Error creating checkout session:", errorData);  // Log chi tiết lỗi từ server
            throw new Error(errorData.message || "Unable to create checkout session");
        }

        return response.json();
    };

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest);

    // Xử lý lỗi với 'unknown' và kiểm tra kiểu
    if (error) {
        if (error instanceof Error) {
            toast.error(error.message || "An error occurred");
        } else {
            toast.error("An unexpected error occurred");
        }
        reset();
    }

    return {
        createCheckoutSession,
        isLoading,
    };
};
