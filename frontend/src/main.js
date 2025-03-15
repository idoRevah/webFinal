"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
require("./index.css");
var App_tsx_1 = require("./App.tsx");
var routing_1 = require("./modules/routing");
var google_1 = require("@react-oauth/google");
var AuthContext_tsx_1 = require("./context/AuthContext.tsx");
(0, client_1.createRoot)(document.getElementById("root")).render(<react_1.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <google_1.GoogleOAuthProvider clientId="798748039221-pbth8e08t87b04uupqpvbgb8rrt308le.apps.googleusercontent.com">
        <AuthContext_tsx_1.AuthProvider>
          <App_tsx_1.default />
          <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Floating Gradient Blob Effect */}
            <div className="absolute top-10 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-25"></div>
            <routing_1.AppRouter></routing_1.AppRouter>
          </div>
        </AuthContext_tsx_1.AuthProvider>
      </google_1.GoogleOAuthProvider>
    </react_router_dom_1.BrowserRouter>
  </react_1.StrictMode>);
