import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/config";

// Optional: define user type
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // ✅ Google login (already implemented)
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentials.credential }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const data = await response.json();

      saveUserToLocalStorage(data);
      navigate("/blog");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const loginWithUsername = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();

      saveUserToLocalStorage(data);
      navigate("/blog");
    } catch (error) {
      console.error("Username login error:", error);
    }
  };

  const signupWithEmail = async (username, email, password, profileImage) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
  
      if (profileImage) {
        formData.append("imageUrl", profileImage); // Append the image file
      }
  
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        body: formData, // Send FormData, no need for JSON headers
      });
  
      if (!response.ok) throw new Error("Signup failed");
  
      const data = await response.json();
      saveUserToLocalStorage(data);
      navigate("/blog");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  
  const saveUserToLocalStorage = (data) => {
    const savedUser = {
      username: data.username,
      imageUrl: data.imageUrl,
      id: data.id,
    };
    localStorage.setItem("user", JSON.stringify(savedUser));
    localStorage.setItem("token", data.token);
    setUser(savedUser);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/SignIn");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loginWithUsername
    ,
        signupWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
