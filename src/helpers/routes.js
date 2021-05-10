import { Home, Dashboard, Invalid } from "pages";

const routes = [
  {
    path: "/",
    name: "Index Page",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "User Dashboard",
    component: Dashboard,
  },
  {
    path: "/*",
    name: "Error Not Found",
    component: Invalid,
  },
];

export default routes;
