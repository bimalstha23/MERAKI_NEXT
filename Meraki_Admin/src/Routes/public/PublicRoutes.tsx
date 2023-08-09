import { DashBoard } from "../../Pages/DashBoard/DashBoard";
import { Order } from "../../Pages/Order/Order";
import { OrderDetail } from "../../Pages/OrderDetail/OrderDetail";
import { Payments } from "../../Pages/Payments/Payments";
import { Products } from "../../Pages/Products/Products";
import { Settings } from "../../Pages/Setings/Settings";
import { ProductProvider } from "../../Providers/ProductProvider";
import { createRoutes } from "../createRoutes"
import { publicRoutePath } from "./public-Route-path";
import { Category } from "../../Pages/Category/Category";
import { Stats } from "../../Pages/Stats/Stats";

const Product = () => {
    return (
        <ProductProvider>
            <Products />
        </ProductProvider>
    )
}

const OrderPage = () => {
    return (
        <Order />
    )
}

export const publicRoutes = [
    createRoutes({
        path: publicRoutePath.Home,
        element: DashBoard,
        children: [
            createRoutes({
                path: '/',
                element: Stats,
            }),
            createRoutes({
                path: publicRoutePath.Order,
                element: OrderPage,
            }),
            createRoutes({
                path: publicRoutePath.Payments,
                element: Payments,
            }),
            createRoutes({
                path: publicRoutePath.Products,
                element: Product,
            }),
            createRoutes({
                path: publicRoutePath.Category,
                element: Category,
            }),
            createRoutes({
                path: publicRoutePath.Settings,
                element: Settings,
            }),
            createRoutes({
                path: publicRoutePath.orderDetails,
                element: OrderDetail,
            })
        ]
    })
];