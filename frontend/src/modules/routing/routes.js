"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signIn_1 = require("../../pages/signIn");
var addPostModern_1 = require("@/pages/addPostModern");
var postMock_1 = require("@/pages/postMock");
var profile_1 = require("@/pages/profile");
var blogModern_1 = require("@/pages/blogModern");
var routes = [
    {
        text: "post",
        path: "post/:id",
        element: postMock_1.default,
        isVisible: false,
        isSignInDepand: false,
    },
    {
        text: "Sign In",
        path: "/SignIn",
        element: signIn_1.default,
        isVisible: false,
        isSignInDepand: true,
        isDisplayWhenUserLogged: false,
    },
    {
        text: "Profile",
        path: "/Profile",
        element: profile_1.default,
        isVisible: false,
        isSignInDepand: true,
        isDisplayWhenUserLogged: true,
    },
    {
        text: "Blog",
        path: "/Blog",
        element: blogModern_1.default,
        isVisible: true,
        isSignInDepand: false,
    },
    {
        text: "Add Post",
        path: "/AddPost",
        element: addPostModern_1.default,
        isVisible: true,
        isSignInDepand: false,
    },
];
exports.default = routes;
