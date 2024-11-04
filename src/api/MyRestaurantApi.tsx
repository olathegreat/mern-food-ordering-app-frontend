import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const useCreateMyRestaurant = () =>{
    const {getAccessTokenSilently} = useAuth0();
    
    
    const createMyRestaurant = async(restaurantFormData: FormData):Promise<Restaurant> =>{
        const accessToken = await getAccessTokenSilently();
        
        console.log(restaurantFormData);
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData,
        })


        if(!response.ok){
            throw new Error("Failed to create restaurant")  
        }

        return response.json();
    }



    const {mutateAsync: createRestaurant, isLoading, error, isSuccess} = useMutation(createMyRestaurant);

    if(isSuccess){
        toast.success("Restaurant created successfully")
    }   
    if(error){
        toast.error("unable to create restaurant");
    }   

    return {createRestaurant, isLoading}
}


export const useGetMyRestaurant = () =>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantRequest = async () : Promise<Restaurant> =>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
        })

        if(!response.ok){
            throw new Error("Failed to get restaurant");
        }

        return response.json();
    }


    const {data: restaurant, isLoading} = useQuery("fetch-my-restaurant", getMyRestaurantRequest);


    return{
        restaurant, isLoading
    }

}

export const useUpdateMyRestaurant =  () =>{
    const {getAccessTokenSilently} = useAuth0();    

     const updateRestaurantRequest = async(restaurantFormData: FormData):Promise<Restaurant>=>{ 
        const accessToken = await getAccessTokenSilently();


        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData,
        })

        if(!response.ok){
            throw new Error("Failed to update restaurant");
        }

        return response.json();




     }
  

     const {mutate: updateRestaurant, isLoading, error, isSuccess} = useMutation(updateRestaurantRequest);  


     if(isSuccess){
        toast.success("Restaurant updated successfully")
     }
     if(error){
        toast.error("Unable to update restaurant");
     }

     return {updateRestaurant, isLoading}
}

export const useGetMyRestaurantOrders = () =>{
    const {getAccessTokenSilently} = useAuth0();    

    const getMyRestaurantOrders = async ():Promise<Order[]> =>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"  
            },
        })

        if(!response.ok){
            throw new Error("Failed to get restaurant orders");
        }
        return response.json();
    }


    const {data: orders, isLoading} = useQuery("fetch-my-restaurant-orders", getMyRestaurantOrders);    

    return {
        orders, isLoading
    }   
}
type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}

export const useUpdateMyRestaurantOrder = () => {
    const {getAccessTokenSilently} = useAuth0();


    const updateMyRestaurantOrder = async(updateStatusOrderRequest : UpdateOrderStatusRequest) =>{
        const accessToken = await getAccessTokenSilently(); 


        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders/${updateStatusOrderRequest.orderId}/status`, {  
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateStatusOrderRequest)
        })

        if(!response.ok){
            throw new Error("Failed to update order status");
        }
        return response.json();

    }

    const {mutateAsync: updateOrderStatus, isLoading, isError, isSuccess, reset} = useMutation(updateMyRestaurantOrder);
    if(isSuccess){
        toast.success("Order status updated successfully")
    }   

    if(isError){
        toast.error("Unable to update order status");
        reset()



    }

    return {updateOrderStatus, isLoading}   


}