export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;  
}

export type MenuItem = {
    _id: string;
    name: string;

    price: number;

}
export interface RestaurantData{
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: Date;
}
export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: Date;
    restaurant: RestaurantData

}


export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
       total: number,
       page:number,
       pages: number   
    }
}   