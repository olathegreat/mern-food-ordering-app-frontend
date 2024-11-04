import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { TabsContent } from "@radix-ui/react-tabs";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { restaurant: restaurantData } = useGetMyRestaurant();
  const restaurant = restaurantData?.restaurant; // access nested restaurant object

  const isEditing = !!restaurant;
  const { orders } = useGetMyRestaurantOrders();
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length}</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurantData}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ManageRestaurantPage;
