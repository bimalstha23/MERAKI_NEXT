import { DashBoard } from "../../Pages/DashBoard/DashBoard";
import { Order } from "../../Pages/Order/Order";
import { Payments } from "../../Pages/Payments/Payments";
import { Products } from "../../Pages/Products/Products";
import { Settings } from "../../Pages/Setings/Settings";
import { Shipping } from "../../Pages/Shipping/Shipping";
import { createRoutes } from "../createRoutes"
import { publicRoutePath } from "./public-Route-path";
// import { createBrowserRouter } from "react-router-dom";

export const publicRoutes = [
    createRoutes({
        path: publicRoutePath.Home,
        element: DashBoard,
        children: [
            createRoutes({
                path: publicRoutePath.Order,
                element: Order,
            }),
            createRoutes({
                path: publicRoutePath.Payments,
                element: Payments,
            }),
            createRoutes({
                path: publicRoutePath.Products,
                element: Products,
            }),
            createRoutes({
                path: publicRoutePath.Shipping,
                element: Shipping,
            }),
            createRoutes({
                path: publicRoutePath.Settings,
                element: Settings,
            })
        ]
    })
];