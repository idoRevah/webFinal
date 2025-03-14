import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function AuthPage(): JSX.Element {
  const { user, login, logout } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181A23] to-[#1F2230] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white opacity-5 blur-[160px] rounded-full top-[-200px] left-[-200px]"></div>
      </div>

      {/* Floating Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-[50px] p-14 rounded-3xl 
        shadow-lg border border-white/15 hover:scale-105 transition-all duration-500 w-[480px] text-center"
      >
        {!user ? (
          <>
            <h2 className="text-6xl font-extrabold text-white mb-8 tracking-wide">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-7">
              Sign in to unlock an exclusive experience.
            </p>

            {/* Google Sign-In Button */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex justify-center"
            >
              <GoogleLogin
                theme="filled_black"
                size="large"
                shape="pill"
                onSuccess={login}
                onError={() => console.error("Login failed")}
              />
            </motion.div>

            <p className="text-gray-400 text-sm mt-6">
              By signing in, you agree to our{" "}
              <a href="#" className="text-white underline">
                Terms & Privacy
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white">
              Hello, {user.username}!
            </h2>
            <img
              src={user.imageUrl || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto mt-6 shadow-lg border-4 border-white"
            />
            <Button
              variant="contained"
              className="bg-red-500 text-white w-full mt-6 py-3 text-lg rounded-xl hover:bg-red-600 transition-all"
              onClick={logout}
            >
              Sign Out
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}
