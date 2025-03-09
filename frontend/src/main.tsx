import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AppRouter } from "./modules/routing";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="798748039221-pbth8e08t87b04uupqpvbgb8rrt308le.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Floating Gradient Blob Effect */}
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-25"></div>
          <AppRouter></AppRouter>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
