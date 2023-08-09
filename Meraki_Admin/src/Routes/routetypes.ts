export interface createRoute {
  path: string;
  element: React.FC;
}

export interface PrivateRoutes {
  createRoutes: () => createRoute;
}
export interface PublicRoutes {
  createRoutes: () => createRoute;
}

export interface IprivateRoutesPath {
  Login: string;
  Regsiter: string;
}

export interface IpublicRoutesPath {
  Home: string;
  Order: string;
  Products: string;
  Category: string;
  Payments: string;
  Settings: string;
  orderDetails: string;
}
