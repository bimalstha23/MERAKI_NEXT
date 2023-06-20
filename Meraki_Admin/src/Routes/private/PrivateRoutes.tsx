import { Login } from "../../Pages/Auth/Login";
import { createRoutes } from "../createRoutes";
import { privateRoutePath } from "./private-Route-path";

export const privateRoutes = [
    createRoutes({
        path: privateRoutePath.Login,
        element: Login,
    })
];
