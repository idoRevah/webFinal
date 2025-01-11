import Blog from "../../pages/blog";
import signIn from "../../pages/signIn";
import Route from "./route.type";
import Post from "@/pages/post";
const routes: Array<Route> = [
  {
    text: "Blog",
    path: "/",
    element: Blog,
    isVisible: true,
  },
  {
    text: "SignIn",
    path: "/SignIn",
    element: signIn,
    isVisible: true,
  },
  {
    text: "SignUp",
    path: "/SignIn",
    element: signIn,
    isVisible: false,
  },
  {
    text: "Post",
    path: "/Post/:id",
    element: Post,
    isVisible: false,
  },
];

export default routes;
