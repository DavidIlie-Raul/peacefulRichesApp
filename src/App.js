import React from "react";
import { AuthProvider } from "./Utils/AuthContext.js";
import AppEntry from "./AppEntry";

const App = () => {
  return (
    <AuthProvider>
      <AppEntry></AppEntry>
    </AuthProvider>
  );
};

export default App;
