import { Route, Routes } from "react-router-dom";
import routes from "./routes";

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element}></Route>
      ))}
    </Routes>
  );
}
