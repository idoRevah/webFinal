import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn.tsx";
import Blog from "./pages/blog.tsx";
import "./index.css";
import App from "./App.tsx";
import { AppRouter } from "./modules/routing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <AppRouter></AppRouter>
    </BrowserRouter>
  </StrictMode>
);
