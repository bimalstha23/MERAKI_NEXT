interface createRoute {
  path: string;
  element: React.FC;
}

interface PrivateRoutes {
  createRoutes: () => createRoute;
}

interface IprivateRoutesPath {
  home: string;
  profile: string;
}

interface IpublicRoutesPath {
  login: string;
  register: string;
}
