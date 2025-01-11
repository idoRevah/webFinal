import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import React from "react";

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          path={route.path}
          element={React.createElement(route.element)}
          key={route.text}
        ></Route>
      ))}
    </Routes>
  );
}
