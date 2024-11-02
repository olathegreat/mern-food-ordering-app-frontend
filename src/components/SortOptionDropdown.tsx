import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuTrigger , DropdownMenuItem, DropdownMenuContent} from "./ui/dropdown-menu"

type Props = {
  onChange: (value: string) => void;    
  sortOption: string;   
}

const SORT_OPTIONS = [
    {
        label: "Best Match",
        value: "bestMatch",
    },
    {
        label: "Delivery Price",
        value: "delieveryPrice",    
    },
    {
        label: "Estimated Delivery Price",
        value: "estimatedDeliveryPrice"
    }

]
const SortOptionDropdown = ({onChange, sortOption}: Props) =>{
         const selectedSortLabel = SORT_OPTIONS.find((option)=> option.value === sortOption)?.label || SORT_OPTIONS[0].label

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant = "outline" className="w-full">
                     Sorted by: {selectedSortLabel}
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem key={option.value} onClick={() => onChange(option.value)}>
                            {option.label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 

export default SortOptionDropdown