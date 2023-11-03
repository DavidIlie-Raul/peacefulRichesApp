import { createContext, useContext, useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://192.168.0.158:1450");

// Create a new context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dbUrl, setDbUrl] = useState(null);
  const [currentAuthCredentials, setCurrentAuthCredentials] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        dbUrl,
        setDbUrl,
        currentAuthCredentials,
        setCurrentAuthCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the context
export function useAuth() {
  return useContext(AuthContext);
}
