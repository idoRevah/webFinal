import Blog from "../../pages/blog";
import signIn from "../../pages/signIn";
import Route from "./route.type";
import Post from "@/pages/post";
import AddPost from "@/pages/addPostModern";
import postMock from "@/pages/postMock";
const routes: Array<Route> = [
  {
    text: "mock",
    path: "mock/:id",
    element: postMock,
    isVisible: true,
  },
  {
    text: "SignIn",
    path: "/SignIn",
    element: signIn,
    isVisible: true,
  },
  {
    text: "Blog",
    path: "/",
    element: Blog,
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
