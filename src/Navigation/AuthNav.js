import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your screen components here
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Signup from "../Components/screens/Auth/Signup.js";
import Login from "../Components/screens/Auth/login.js";
import PassReset from "../Components/screens/Auth/PassReset.js";

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: "screen",
        headerTransparent: true,
        headerTitle: "",
        headerTintColor: "#D954E5",
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PassReset"
        component={PassReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNav;
