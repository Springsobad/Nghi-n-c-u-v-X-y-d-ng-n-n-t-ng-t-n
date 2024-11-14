import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/type";
import { useQuery } from "react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurants = (searchState:SearchState,city?: string) =>{
    const createSearchRequest = async(): Promise<RestaurantSearchResponse>=>{
        const params= new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString())
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        if(!response.ok) {
            const text = await response.text(); // Get response text (might be HTML)
            console.error("Error response: ", text); // Log the HTML or error response
            throw new Error("Failed to get restaurant: " + text);
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse as JSON
        } else {
            console.error("Expected JSON response, but got:", contentType); // Log content type
            throw new Error(`Expected JSON response, but got ${contentType}`);
        }
        // return response.json()
    };
    const{data: results, isLoading, error} = useQuery(["search Restaurants", searchState,city],createSearchRequest, {enabled: !!city})
    return(
        {results,isLoading,error}
    )
}

// import { RestaurantSearchResponse } from "@/type";
// import { useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useSearchRestaurants = (city?: string) => {
//     const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
//         if (!city) {
//             throw new Error("City parameter is required");
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);

//             // Kiểm tra xem phản hồi có hợp lệ không
//             if (!response.ok) {
//                 const statusText = response.statusText;
//                 const statusCode = response.status;
//                 const text = await response.text();
//                 console.error(`Request failed with status ${statusCode} ${statusText}`);
//                 console.error("Response content: ", text);
//                 throw new Error(`Failed to get restaurant. Status: ${statusCode} - ${statusText}`);
//             }

//             // Kiểm tra Content-Type của phản hồi
//             const contentType = response.headers.get("Content-Type");
//             if (contentType && contentType.includes("application/json")) {
//                 return response.json(); // Phân tích nội dung JSON
//             } else {
//                 // In ra Content-Type nếu không phải JSON
//                 const text = await response.text(); // Nội dung không phải JSON
//                 console.error(`Expected JSON response, but got: ${contentType}`);
//                 console.error("Non-JSON response content:", text);
//                 throw new Error(`Expected JSON response, but got ${contentType}`);
//             }
//         } catch (error) {
//             console.error("Error fetching restaurant data:", error);
//             throw error; // Ném lại lỗi để React Query có thể xử lý
//         }
//     };

//     const { data: results, isLoading, error } = useQuery(
//         ["searchRestaurants", city],
//         createSearchRequest,
//         { enabled: !!city }
//     );

//     return { results, isLoading, error };
// };
