import { DashBoard } from "../../Pages/DashBoard/DashBoard";
import { createRoutes } from "../createRoutes"
import { publicRoutePath } from "./public-Route-path";
// import { createBrowserRouter } from "react-router-dom";

export const publicRoutes = [
    createRoutes({
        path: publicRoutePath.Home,
        element: DashBoard
    }),
];