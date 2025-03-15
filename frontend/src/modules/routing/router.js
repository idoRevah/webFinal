"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRouter;
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("./routes");
var react_1 = require("react");
function AppRouter() {
    return (<react_router_dom_1.Routes>
      {routes_1.default.map(function (route) { return (<react_router_dom_1.Route path={route.path} element={react_1.default.createElement(route.element)} key={route.text}></react_router_dom_1.Route>); })}
    </react_router_dom_1.Routes>);
}
