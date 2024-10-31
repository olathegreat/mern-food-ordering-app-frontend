import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/ui/loadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Estimated delivery time must be a number",
  }),
  cuisines: z.array(
      z.string({
        required_error: "Cuisines are required",
      })
    ).min(1, {
      message: "At least one cuisine is required",
    }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      }),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, {
    message: "Image is required",
  }).optional(),
}).refine((data)=> data.imageUrl || data.imageFile, {
  message: "Either image url or image file must be provided",
  path: [ "imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

function ManageRestaurantForm({ onSave, isLoading, restaurant }: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // restaurantName: "",
      // city: "",
      // country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      // imageFile: null,
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
  
    console.log("Populating form with:", restaurant); // Add this line
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems
      ? restaurant.menuItems.map((item) => ({
          ...item,
          price: parseInt((item.price / 100).toFixed(2)),
        }))
      : [];
      console.log(deliveryPriceFormatted, menuItemsFormatted)
  
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
    console.log("Updated restaurant:", updatedRestaurant); // Add this line
  
    form.reset(updatedRestaurant);
  }, [form, restaurant]);
  
  

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // todo-convert formDataJson to form formData object

    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    // formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
   formData.append('deliveryPrice', (formDataJson.deliveryPrice * 100).toString()) ;
   formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    }); 

    if(formDataJson.imageUrl) {
      formData.append("imageUrl", formDataJson.imageUrl);
    } 
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    
    // formData.append("imageFile", formDataJson.imageFile);
    

    onSave(formData);
}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {
            isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>  
        }
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;
