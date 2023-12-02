import React from "react";
import { AuthProvider } from "./Utils/AuthContext.js";
import { SheetProvider } from "react-native-actions-sheet";
import "./Utils/ActionSheets/sheets.tsx";
import AppEntry from "./AppEntry";

const App = () => {
  return (
    <AuthProvider>
      <SheetProvider>
        <AppEntry></AppEntry>
      </SheetProvider>
    </AuthProvider>
  );
};

export default App;
