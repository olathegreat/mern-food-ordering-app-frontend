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

export type OrderStatus =  "placed" |"paid"| "inProgress" | "outForDelivery" | "delivered"
        


export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    restaurantId: string;
      
}