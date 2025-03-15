import signIn from "../../pages/signIn";
import Route from "./route.type";
import AddPost from "@/pages/addPostModern";
import Post from "@/pages/postMock";
import blogModern from "@/pages/blogModern";
const routes: Array<Route> = [
  {
    text: "post",
    path: "post/:id",
    element: Post,
    isVisible: false,
  },
  {
    text: "SignIn",
    path: "/SignIn",
    element: signIn,
    isVisible: true,
  },
  {
    text: "Blog",
    path: "/Blog",
    element: blogModern,
    isVisible: true,
  },
  {
    text: "Add Post",
    path: "/AddPost",
    element: AddPost,
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
