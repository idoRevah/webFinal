import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { API_BASE_URL } from "@/config/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentials.credential }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const data = await response.json();

      // Save user & token in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          imageUrl: data.imageUrl,
          id: data.id,
        })
      );
      localStorage.setItem("token", data.token);

      setUser({
        username: data.username,
        imageUrl: data.imageUrl,
        id: data.id,
      });
      setToken(data.token);

      navigate("/blog");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/SignIn");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
