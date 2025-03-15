import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import { routes } from "@/modules/routing";
import { useAuth } from "@/context/AuthContext";

function ResponsiveAppBar() {
  const { user } = useAuth();

  const filteredRoutes = () => {
    return routes.filter(
      (r) =>
        r.isVisible == true ||
        (r.isSignInDepand &&
          ((!user && !r.isDisplayWhenUserLogged) ||
            (!!user && r.isDisplayWhenUserLogged)))
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SamuRe's Blog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredRoutes().map((route) => (
              <NavLink to={route.path} key={route.text}>
                <Typography sx={{ mr: 2, color: "white", display: "block" }}>
                  {route.text}
                </Typography>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
