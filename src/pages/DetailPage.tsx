import { useGetRestaurant } from "@/api/RestaurantApi";
import { MenuItem as MenuItemType } from "@/types";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "@/components/MenuItem";
import CheckoutButton from "@/components/CheckoutButton";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCardItems = sessionStorage.getItem(
        `cartItems-${restaurantId}` 
    )
    return storedCardItems ? JSON.parse(storedCardItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // Check if the item is in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
  
      // If the item is in the cart, update the quantity
      let updatedCartItems;
  
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If it's not in the cart, add it to the cart with quantity 1
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1, // Initialize quantity to 1 for new items
          },
        ];
      }
  
      // Save updated cart to session storage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
  
      return updatedCartItems;
    });
  };
  

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      
      sessionStorage.set(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr]  gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />

          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((item) => (
            <MenuItem menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          </Card>

          <CardFooter>
            <CheckoutButton />
          </CardFooter>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
