import GoogleSignInButton from "@/components/googleSignIn/GoogleSignInButton";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export default function signIn(): JSX.Element {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const displayMessage = (message: string, isError: boolean) => {
    setSeverity(isError ? "error" : "success");
    setAlertMessage(message);
    setOpenSnackbar(true);
  };

  const successLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentials.credential }),
        credentials: "include", // Allows backend to set httpOnly cookie
      });

      if (!response.ok) throw new Error("Failed to authenticate");

      const data = await response.json();

      console.log("User authenticated:", data);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const error = () => {
    console.log("login failed");
  };

  return (
    <div>
      <GoogleSignInButton
        onError={error}
        onSuccess={successLogin}
      ></GoogleSignInButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
