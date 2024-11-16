
import { Button } from "./ui/button";
import { DropdownMenuCheckboxItem,DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu";

type Props = {
    onChange: (value: string)=> void;
    sortOption: string;
}
const SORT_OPTIONS = [
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery Price",
        value: "DeliveryPrice"
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime"
    },

]
   
const SortOptionDropdown = ({onChange, sortOption}: Props) => {
    const selectedSortLabel = SORT_OPTIONS.find((option)=>option.value === sortOption)?.label || SORT_OPTIONS[0].label
    return(
        <DropdownMenu>
             <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                    <Button variant="outline" className="w-full">
                        Sort by: {selectedSortLabel}
                    </Button>
        </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent> 
            {/* <DropdownMenuCheckboxItem> */}
                {SORT_OPTIONS.map((option)=>(
                    <DropdownMenuItem  key={option.value} className="cursor-pointer" onClick={()=> onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            {/* </DropdownMenuCheckboxItem> */}
            </DropdownMenuContent> 
        </DropdownMenu>
    )
}

export default SortOptionDropdown