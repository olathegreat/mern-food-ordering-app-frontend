import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      {fields.map((field, index) => (
        <MenuItemInput
          key={field.id}
          index={index}
          removeMenuItem={() => remove(index)}
        />
      ))}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
