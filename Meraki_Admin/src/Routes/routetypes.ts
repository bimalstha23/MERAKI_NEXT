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
  Home: string;
  Order: string;
  Products: string;
  Shipping: string;
  Payments: string;
  Settings: string;
}

export interface IpublicRoutesPath {
  Home: string;
  // register: string;
}
