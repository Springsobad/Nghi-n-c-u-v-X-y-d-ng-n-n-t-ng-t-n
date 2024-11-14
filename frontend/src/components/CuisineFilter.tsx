type Props = {
    onChange: (cuisines: string[])=>void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: ()=> void; 
};

const CuisineFilter = ({onChange,selectedCuisines,isExpanded,onExpandedClick}: Props)=> {
    return(
        <div className="flex justify-between items-center px-2">
            <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
            <div className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">Reset Filter</div>
        </div>
    )
};
export default CuisineFilter;
