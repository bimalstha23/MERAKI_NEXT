import { Login } from "../../Pages/Auth/Login";
import { Register } from "../../Pages/Auth/Register";
import { createRoutes } from "../createRoutes";
import { privateRoutePath } from "./private-Route-path";

export const privateRoutes = [
    createRoutes({
        path: privateRoutePath.Login,
        element: Login,
    }),
    createRoutes({
        path: privateRoutePath.Regsiter,
        element: Register
    })
];
