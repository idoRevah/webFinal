import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
      const response = await fetch("http://localhost:3000/auth/google", {
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
      console.log(data);
      setUser({
        username: data.username,
        imageUrl: data.imageUrl,
        id: data.id,
      });
      setToken(data.token);
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
