import React from "react";

export default interface Route {
  path: string;
  text: string;
  element: any;
  isVisible: boolean;
  isSignInDepand: boolean;
  isDisplayWhenUserLogged?: boolean;
}
