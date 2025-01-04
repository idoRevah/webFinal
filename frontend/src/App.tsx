import { Button } from "@mui/material";
import ResponsiveAppBar from "./components/navbar/navbar.tsx";
import "./App.css";

function App() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div className="flex items-center p-3">
        <div>
          <h1 className="text-3xl font-bold underline">Hello worlde!</h1>
        </div>
        <div className="p-10">
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Tailwind + MUI
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
