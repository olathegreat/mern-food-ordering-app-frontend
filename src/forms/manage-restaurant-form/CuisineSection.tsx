import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cuisineList } from '@/config/restaurant-options'
import { useFormContext } from 'react-hook-form'
import CuisineCheckbox from './CuisineCheckbox'

function CuisineSection() {
    const {control} = useFormContext()

  return (
    <div className="space-y-2">
        <div>
            <h2 className='text-2xl font-bold'>Cuisines</h2>
            <FormDescription>
                Select the cuisines of your restaurant
            </FormDescription>
        </div>

        <FormField
         control={control} 
         name='cuisines'
         render={
            ({field})=>(
                <FormItem>
                      <div className='grid md:grid-cols-5 gap-1'>
                        {
                            cuisineList.map((cuisineItem)=>(
                                <CuisineCheckbox cuisine={cuisineItem} field={field} key={cuisineItem}/>
                            ))
                        }
                         
                      </div>
                      <FormMessage/>
                </FormItem>
            )
         }
        />
      
    </div>
  )
}

export default CuisineSection
