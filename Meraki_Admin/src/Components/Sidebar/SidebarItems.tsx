import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { MdSpaceDashboard, MdOutlinePayment, MdLocalShipping } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5'

export const SideBarItems: Array<ISidebarItems> = [
    {
        title: "DashBoard",
        path: "/",
        icon: <MdSpaceDashboard size={30} />,
    }, {
        title: "Products",
        path: "/Products",
        icon: <FaShoppingBag size={30} />,
    }, {
        title: "Orders",
        path: "/Orders",
        icon: <FaShoppingCart size={30} />,
    }, {
        title: "Shiping",
        path: "/Shiping",
        icon: <MdLocalShipping size={30} />,
    }, {
        title: "Payments",
        path: "/Payments",
        icon: <MdOutlinePayment size={30} />,
    }, {
        title: "Settings",
        path: "/Settings",
        icon: <IoSettingsSharp size={30} />,
    }

]



