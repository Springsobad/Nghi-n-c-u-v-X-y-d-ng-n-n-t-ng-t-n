
import { MenuItem } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props= {
    menuItem: MenuItem;
    addtoCart: ()=>void;
}
const MenuItemComponent = ({menuItem, addtoCart}: Props)=> {
    return(
        <Card className="cursor-pointer" onClick={addtoCart}>
            <CardHeader>
                <CardTitle>
                    {menuItem.name}
                </CardTitle>
            <CardContent className="font-bold">
                VND{(menuItem.price / 100).toFixed(2)}
            </CardContent>
            </CardHeader>
        </Card>
    )
}
export default MenuItemComponent;