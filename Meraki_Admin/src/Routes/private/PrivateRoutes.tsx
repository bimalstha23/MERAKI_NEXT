import createRoutes from "../createRoutes"
import { privateRoutePath } from "./private-Route-path";

export const privateRoutes: PrivateRoutes[] = [
    createRoutes({
        path: privateRoutePath.home,
    }),
    createRoutes({
        path: privateRoutePath.profile,
    }),
];
