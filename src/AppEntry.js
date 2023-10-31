import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from "./Navigation/NavBar";
import * as Font from "expo-font";
import AuthNav from "./Navigation/AuthNav";
import PocketBase from "pocketbase";
import { AuthProvider } from "./Utils/AuthContext.js";
import { useAuth } from "./Utils/AuthContext.js";
import LoadingScreen from "./Utils/LoadingScreen.js";
import eventsource from "react-native-sse";

const pb = new PocketBase("http://192.168.0.158:1450");

let customFonts = {
  "Nimbus-Sans-Regular": require("../assets/NimbusSanL-Reg.otf"),
  "Nimbus-Sans-BoldItalic": require("../assets/NimbusSanL-BolIta.otf"),
  "Nimbus-Sans-Bold": require("../assets/NimbusSanL-Bol.otf"),
  "Nimbus-Sans-RegularItalic": require("../assets/NimbusSanL-RegIta.otf"),
};

const AppEntry = () => {
  const { isLoggedIn, setDbUrl, dbUrl } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasDbBeenSet, setHasDbBeenSet] = useState(false);

  async function setDatabaseAddress() {
    await setDbUrl("http://192.168.0.158:1450");
    setHasDbBeenSet(true);
  }

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  function defineEventSourceGlobally() {
    global.EventSource = eventsource;
  }

  useEffect(() => {
    loadFontsAsync();
    setDatabaseAddress();
    defineEventSourceGlobally();
  }, []);

  if (!fontsLoaded || !hasDbBeenSet) {
    return <LoadingScreen />; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <NavigationBar /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppEntry;
