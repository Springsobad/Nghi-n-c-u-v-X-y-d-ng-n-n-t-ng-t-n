
import { Button } from "./ui/button";
import { DropdownMenuCheckboxItem,DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";

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
    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {sortOption}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuCheckboxItem>
                {SORT_OPTIONS.map((option)=>(
                    <DropdownMenuItem className="cursor-pointer" onClick={()=> onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuCheckboxItem>
        </DropdownMenu>
    )
}

export default SortOptionDropdown