import { createContext, useContext, useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://192.168.0.158:90");

// Create a new context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the context
export function useAuth() {
  return useContext(AuthContext);
}
