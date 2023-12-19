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
import AsyncStorage from "@react-native-async-storage/async-storage";

const pb = new PocketBase("http://192.168.0.158:1450");

let customFonts = {
  "Nimbus-Sans-Regular": require("../assets/NimbusSanL-Reg.otf"),
  "Nimbus-Sans-BoldItalic": require("../assets/NimbusSanL-BolIta.otf"),
  "Nimbus-Sans-Bold": require("../assets/NimbusSanL-Bol.otf"),
  "Nimbus-Sans-RegularItalic": require("../assets/NimbusSanL-RegIta.otf"),
};

const AppEntry = () => {
  const { isLoggedIn, setDbUrl, dbUrl, setUser, setIsLoggedIn, setAuthJWT } =
    useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasDbBeenSet, setHasDbBeenSet] = useState(false);
  const [hasTokenLoginFinished, setHasTokenLoginFinished] = useState(false);

  async function setDatabaseAddress() {
    await setDbUrl("http://192.168.0.158:1450");
    setHasDbBeenSet(true);
  }

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  async function tryLoginFromAsyncStorage() {
    const authJWT = await AsyncStorage.getItem("authJWT");

    if (!authJWT) {
      console.log(authJWT);
      return;
    } else if (authJWT) {
      console.log(authJWT);
      try {
        console.log(pb.authStore);
        pb.authStore.save(authJWT, null);
        await pb.collection("users").authRefresh();
        if (pb.authStore.model !== null && pb.authStore.model !== undefined) {
          setUser(pb.authStore.model);
          setIsLoggedIn(true);
          setAuthJWT(authJWT);
          setHasTokenLoginFinished(true);
        } else {
          return;
        }
      } catch (error) {
        console.log("An error occured while logging in using past JWT", error);
        return;
      }
    }
  }

  function defineEventSourceGlobally() {
    global.EventSource = eventsource;
  }

  useEffect(() => {
    loadFontsAsync();
    setDatabaseAddress();
    defineEventSourceGlobally();
    tryLoginFromAsyncStorage();
  }, []);

  if (!fontsLoaded || !hasDbBeenSet || !hasTokenLoginFinished) {
    return <LoadingScreen />; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <NavigationBar /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppEntry;
