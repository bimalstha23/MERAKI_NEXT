interface createRoute {
  path: string;
  element: React.FC;
}

interface PrivateRoutes {
  createRoutes: () => createRoute;
}
interface PublicRoutes {
  createRoutes: () => createRoute;
}

interface IprivateRoutesPath {
  home: string;
  profile: string;
}

interface IpublicRoutesPath {
  Home: string;
  // register: string;
}
