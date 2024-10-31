import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"


function ManageRestaurantPage() {
    const {createRestaurant, isLoading:isCreateLoading} = useCreateMyRestaurant();   
    const {updateRestaurant, isLoading :isUpdateLoading } = useUpdateMyRestaurant();

    const {restaurant} = useGetMyRestaurant();
    
    const isEditing = !!restaurant
  return (
    <ManageRestaurantForm restaurant = {restaurant?.restaurant}
    
    onSave={isEditing ? updateRestaurant : createRestaurant} 
    
    isLoading={isCreateLoading || isUpdateLoading} />
  )
}

export default ManageRestaurantPage
