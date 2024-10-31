import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useFormContext } from "react-hook-form";
  
  type Props = {
    index: number;
    removeMenuItem: () => void;
  };
  
  function MenuItemInput({ index, removeMenuItem }: Props) {
    const { control } = useFormContext();
  
    return (
      <div className="flex flex-row items-end gap-2">
        <FormField
          control={control}
          name={`menuItems.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Cheese Pizza"
                />
              </FormControl>
            </FormItem>
          )}
        />
  
        <FormField
          control={control}
          name={`menuItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price ($) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="8.00" />
              </FormControl>
            </FormItem>
          )}
        />
  
        <Button
          className="bg-red-500 max-h-fit"
          type="button"
          onClick={removeMenuItem}
        >
          Remove
        </Button>
      </div>
    );
  }
  
  export default MenuItemInput;
  