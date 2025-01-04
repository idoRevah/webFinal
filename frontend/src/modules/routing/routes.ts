import Blog from "../../pages/blog";
import signIn from "../../pages/signIn";
import Route from "./route.type";

const routes: Array<Route> = [
  {
    text: "Blog",
    path: "/",
    element: Blog(),
  },
  {
    text: "SignIn",
    path: "/SignIn",
    element: signIn(),
  },
  {
    text: "SignUp",
    path: "/SignIn",
    element: signIn(),
  },
  {
    text: "blogger",
    path: "/Blog",
    element: Blog(),
  },
];

export default routes;
