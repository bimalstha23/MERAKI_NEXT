import { DashBoard } from "../../Pages/DashBoard/DashBoard";
import { Order } from "../../Pages/Order/Order";
import { OrderDetail } from "../../Pages/OrderDetail/OrderDetail";
import { Payments } from "../../Pages/Payments/Payments";
import { Products } from "../../Pages/Products/Products";
import { Settings } from "../../Pages/Setings/Settings";
import { Shipping } from "../../Pages/Shipping/Shipping";
import { OrderProvider } from "../../Providers/OrderProvider";
import { ProductProvider } from "../../Providers/ProductProvider";
import { createRoutes } from "../createRoutes"
import { publicRoutePath } from "./public-Route-path";

const Product = () => {
    return (
        <ProductProvider>
            <Products />
        </ProductProvider>
    )
}

const OrderPage = () => {
    return (
        <OrderProvider>
            <Order />
        </OrderProvider>
    )
}

export const publicRoutes = [
    createRoutes({
        path: publicRoutePath.Home,
        element: DashBoard,
        children: [
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
                path: publicRoutePath.Shipping,
                element: Shipping,
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