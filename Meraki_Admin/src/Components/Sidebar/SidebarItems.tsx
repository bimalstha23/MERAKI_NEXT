import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { MdSpaceDashboard, MdOutlinePayment, MdLocalShipping } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5'
import { privateRoutePath } from '../../Routes/private/private-Route-path';

export const SideBarItems: Array<ISidebarItems> = [
    {
        title: "DashBoard",
        path: privateRoutePath.Home,
        icon: <MdSpaceDashboard size={30} />,
    }, {
        title: "Products",
        path: privateRoutePath.Products,
        icon: <FaShoppingBag size={30} />,
    }, {
        title: "Orders",
        path: privateRoutePath.Order,
        icon: <FaShoppingCart size={30} />,
    }, {
        title: "Shiping",
        path: privateRoutePath.Shipping,
        icon: <MdLocalShipping size={30} />,
    }, {
        title: "Payments",
        path: privateRoutePath.Payments,
        icon: <MdOutlinePayment size={30} />,
    }, {
        title: "Settings",
        path: privateRoutePath.Settings,
        icon: <IoSettingsSharp size={30} />,
    }

]



