import { cuisineList } from "@/config/restaurant-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisineReset = () => onChange([]);

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
  
       onChange(newCuisinesList)
    };

  return (
    <>
      <div className="flex  justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex">
              <input
                id={`cuisine_${cuisine}`}
                type="checkbox"
                className="hidden"
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesChange}
              />

              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer
                     text-sm rounded-full px-4
                      font-semibold py-2 ${
                        isSelected
                          ? "border border-green-600 text-green-600"
                          : "border border-slate-300"
                      } `}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          );
        })}

        <Button variant="link" className="mt-4 flex-1" onClick={onExpandedClick}>
            {isExpanded ? (
                <span className="flex flex-row items-center">
                    view less <ChevronUp/>

                </span>
            ) : <span className="flex flex-row items-center">   
                view more <ChevronDown/>  
                </span>
                
        }

        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
