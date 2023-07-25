import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { MdSpaceDashboard, MdOutlinePayment, MdLocalShipping } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5'
import { publicRoutePath } from '../../Routes/public/public-Route-path';

export const SideBarItems: Array<ISidebarItems> = [
    {
        title: "DashBoard",
        path: publicRoutePath.Home,
        icon: <MdSpaceDashboard size={30} />,
    }, {
        title: "Products",
        path: publicRoutePath.Products,
        icon: <FaShoppingBag size={30} />,
    }, {
        title: "Orders",
        path: publicRoutePath.Order,
        icon: <FaShoppingCart size={30} />,
    }, {
        title: "Categories",
        path: publicRoutePath.Category,
        icon: <MdLocalShipping size={30} />,
    }, {
        title: "Payments",
        path: publicRoutePath.Payments,
        icon: <MdOutlinePayment size={30} />,
    }, {
        title: "Settings",
        path: publicRoutePath.Settings,
        icon: <IoSettingsSharp size={30} />,
    }

]



