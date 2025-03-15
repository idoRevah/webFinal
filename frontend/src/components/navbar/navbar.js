"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppBar_1 = require("@mui/material/AppBar");
var Box_1 = require("@mui/material/Box");
var Toolbar_1 = require("@mui/material/Toolbar");
var Typography_1 = require("@mui/material/Typography");
var Container_1 = require("@mui/material/Container");
var Adb_1 = require("@mui/icons-material/Adb");
var react_router_dom_1 = require("react-router-dom");
var routing_1 = require("@/modules/routing");
var AuthContext_1 = require("@/context/AuthContext");
function ResponsiveAppBar() {
    var user = (0, AuthContext_1.useAuth)().user;
    var filteredRoutes = function () {
        return routing_1.routes.filter(function (r) {
            return r.isVisible == true ||
                (r.isSignInDepand &&
                    ((!user && !r.isDisplayWhenUserLogged) ||
                        (!!user && r.isDisplayWhenUserLogged)));
        });
    };
    return (<AppBar_1.default position="static">
      <Container_1.default maxWidth="xl">
        <Toolbar_1.default disableGutters>
          <Adb_1.default sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/>
          <Typography_1.default variant="h6" noWrap component="a" sx={{
            mr: 5,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
        }}>
            SamuRe's Blog
          </Typography_1.default>

          <Box_1.default sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredRoutes().map(function (route) { return (<react_router_dom_1.NavLink to={route.path} key={route.text}>
                <Typography_1.default sx={{ mr: 2, color: "white", display: "block" }}>
                  {route.text}
                </Typography_1.default>
              </react_router_dom_1.NavLink>); })}
          </Box_1.default>
        </Toolbar_1.default>
      </Container_1.default>
    </AppBar_1.default>);
}
exports.default = ResponsiveAppBar;
