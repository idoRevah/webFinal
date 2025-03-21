import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Button, TextField, Tabs, Tab, Avatar } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import FileUploader from "@/components/addPost/PostImageInput"; // ✅ Import FileUploader

export default function AuthPage(): JSX.Element {
  const { user, login, logout, loginWithEmail, signupWithEmail } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (file: File | null) => {
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null); // ✅ Show preview
  };

  const handleSubmit = () => {
    if (mode === "login") {
      loginWithEmail(form.email, form.password);
    } else {
      signupWithEmail(form.username, form.email, form.password, profileImage);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181A23] to-[#1F2230] overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white opacity-10 blur-[160px] rounded-full top-[-150px] left-[-150px]"></div>
      </div>

      {/* Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-[50px] p-10 rounded-2xl shadow-lg border border-white/15 hover:scale-105 transition-all duration-500 w-[450px] text-center"
      >
        {!user ? (
          <>
            {/* Sign In / Sign Up Tabs */}
            <Tabs
              value={mode}
              onChange={(_, newValue) => setMode(newValue)}
              textColor="inherit"
              centered
              sx={{
                "& .MuiTab-root": {
                  color: "rgba(255,255,255,0.6)",
                  transition: "color 0.3s",
                },
                "& .MuiTab-root:hover": { color: "white" },
                "& .Mui-selected": { color: "white", fontWeight: "bold" },
                "& .MuiTabs-indicator": { backgroundColor: "#4A90E2" },
              }}
            >
              <Tab label="Sign In" value="login" />
              <Tab label="Sign Up" value="signup" />
            </Tabs>

            {/* Form Fields */}
            <div className="mt-6 space-y-4">
              {mode === "signup" && (
                <>
                  {/* Profile Image Upload - Uses FileUploader */}
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={preview || "/placeholder-profile.png"}
                      sx={{ width: 90, height: 90, mb: 2, bgcolor: "#4A90E2" }}
                    />
                    <FileUploader onFileSelect={handleFileSelect} />{" "}
                    {/* ✅ New Drag & Drop Uploader */}
                  </div>

                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    value={form.username}
                    onChange={handleChange}
                  />
                </>
              )}
              <TextField
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={form.password}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(to right, #007BFF, #0056D2)",
                  color: "white",
                  textTransform: "none",
                  padding: "12px",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "#0056D2",
                  },
                }}
                onClick={handleSubmit}
              >
                {mode === "login" ? "Sign In" : "Sign Up"}
              </Button>
            </div>

            {/* OR Separator */}
            <div className="my-4 text-gray-400 text-sm">OR</div>

            {/* Google Login */}
            <motion.div
              className="google-login-container"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <GoogleLogin
                theme="filled_black"
                size="large"
                shape="pill"
                onSuccess={login}
                onError={() => console.error("Login failed")}
              />
            </motion.div>

            {/* Terms & Privacy */}
            <p className="text-gray-400 text-xs mt-6">
              By signing in, you agree to our{" "}
              <a
                href="https://www.colman.ac.il/privacy-policy/"
                className="text-white underline"
              >
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
              className="w-24 h-24 rounded-full mx-auto mt-6 shadow-lg border-4 border-white"
            />
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ padding: "12px", fontSize: "1rem" }}
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
