import { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "./auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  // keep in sync if token changes elsewhere (like logout)
  useEffect(() => {
    const handleStorage = () => setLoggedIn(!!getToken());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
