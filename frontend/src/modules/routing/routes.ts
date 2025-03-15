import signIn from "../../pages/signIn";
import Route from "./route.type";
import AddPost from "@/pages/addPostModern";
import Post from "@/pages/postMock";
import Profile from "@/pages/profile";
import blogModern from "@/pages/blogModern";
const routes: Array<Route> = [
  {
    text: "post",
    path: "post/:id",
    element: Post,
    isVisible: false,
    isSignInDepand: false,
  },
  {
    text: "Sign In",
    path: "/SignIn",
    element: signIn,
    isVisible: false,
    isSignInDepand: true,
    isDisplayWhenUserLogged: false,
  },
  {
    text: "Profile",
    path: "/Profile",
    element: Profile,
    isVisible: false,
    isSignInDepand: true,
    isDisplayWhenUserLogged: true,
  },
  {
    text: "Blog",
    path: "/Blog",
    element: blogModern,
    isVisible: true,
    isSignInDepand: false,
  },
  {
    text: "Add Post",
    path: "/AddPost",
    element: AddPost,
    isVisible: true,
    isSignInDepand: false,
  },
];

export default routes;
