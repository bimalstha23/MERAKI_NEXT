// export const publicRoutePath: IpublicRoutesPath = {
//   login: "/login",
//   register: "/register",
// };

import { IpublicRoutesPath } from "../routetypes";

export const publicRoutePath: IpublicRoutesPath = {
  Home: "/",
  Products: "/products",
  Order: "/order",
  Shipping: "shipping",
  Payments: "payments",
  Settings: "settings",
  orderDetails:"order/:id",
};
