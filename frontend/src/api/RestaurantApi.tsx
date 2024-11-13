import { RestaurantSearchResponse } from "@/type";
import { useQuery } from "react-query";

const API_BASE_URL= import.meta.env.VITE_BASE_URL;
export const useSearchRestaurants = (city?: string) =>{
    const createSearchRequest = async(): Promise<RestaurantSearchResponse>=>{
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`)
        if(!response.ok) {
            throw new Error("Fail to get restaurant");
        }
        return response.json()
    };
    const{data: results, isLoading} = useQuery(["search Restaurants"],createSearchRequest, {enabled: !!city})
    return(
        {results,isLoading}
    )
}