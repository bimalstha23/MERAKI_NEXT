import { DashBoard } from "../../Pages/DashBoard/DashBoard";
import { Order } from "../../Pages/Order/Order";
import { Payments } from "../../Pages/Payments/Payments";
import { Products } from "../../Pages/Products/Products";
import { Settings } from "../../Pages/Setings/Settings";
import { Shipping } from "../../Pages/Shipping/Shipping";
import { createRoutes } from "../createRoutes";
import { privateRoutePath } from "./private-Route-path";


export const privateRoutes = [
    createRoutes({
        path: privateRoutePath.Home,
        element: DashBoard,
        children: [
            createRoutes({
                path: privateRoutePath.Order,
                element: Order,
            }),
            createRoutes({
                path: privateRoutePath.Payments,
                element: Payments,
            }),
            createRoutes({
                path: privateRoutePath.Products,
                element: Products,
            }),
            createRoutes({
                path: privateRoutePath.Shipping,
                element: Shipping,
            }),
            createRoutes({
                path: privateRoutePath.Settings,
                element: Settings,
            })
        ]
    })
];
