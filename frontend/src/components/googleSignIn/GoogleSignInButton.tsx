import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      // @ts-ignore
      render={(renderProps) => (
        <Button
          variant="outlined"
          className="flex items-center justify-center gap-2 border-gray-300 shadow-sm hover:bg-gray-100 transition-all duration-300 py-2 px-4 rounded-lg"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </Button>
      )}
    />
  );
}
