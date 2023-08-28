import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screen components here
import LandingPage from "../Components/screens/LandingPage.js";
import CoursePage from "../Components/screens/CoursePage.js";
import ChatPage from "../Components/screens/ChatPage.js";
import Course21DC from "../Components/screens/Course-21DC.js";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SessionPage from "../Components/screens/CourseScreens/PR21DC/SessionPage.js";
import Profile from "../Components/screens/ProfilePage.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CoursesMain"
      screenOptions={{
        headerMode: "screen",
        headerTransparent: true, // Make the header transparent
        headerTitle: "",
        headerTintColor: "#D954E5", // Change this to your desired color
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="CoursesMain"
        component={CoursePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course21DC"
        component={Course21DC}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SessionPage"
        component={SessionPage}
        options={{ headerShown: true, animationEnabled: true }}
      />
    </Stack.Navigator>
  );
};

const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        cardStyleInterpolator:
          TransitionPresets.SlideFromRightIOS.cardStyleInterpolator,
        tabBarActiveTintColor: "#D954E5",
        tabBarInactiveTintColor: "#707070",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "News") {
            iconName = focused ? "newspaper-o" : "newspaper-o-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can customize the icons and add more routes as needed

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={CourseStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPage}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#D954E5"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarVisible: false, // Hide the bottom tab bar
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default NavigationBar;
