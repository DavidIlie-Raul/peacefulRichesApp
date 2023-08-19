import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screen components here
import LandingPage from "../Components/screens/LandingPage.js";
import CoursePage from "../Components/screens/CoursePage.js";
import NewsPage from "../Components/screens/NewsPage.js";
import Course21DC from "../Components/screens/Course-21DC.js";
import { createStackNavigator } from "@react-navigation/stack";
import SessionPage from "../Components/screens/CourseScreens/PR21DC/SessionPage.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator initialRouteName="CoursesMain">
      <Stack.Screen
        name="CoursesMain"
        component={CoursePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course21DC"
        component={Course21DC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionPage"
        component={SessionPage}
        options={{ headerShown: false, animationEnabled: true }}
      />
    </Stack.Navigator>
  );
};

const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Course") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "News") {
            iconName = focused ? "newspaper-o" : "newspaper-o-outline";
          }

          // You can customize the icons and add more routes as needed

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Course"
        component={CourseStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="News"
        component={NewsPage}
        options={{ headerShown: false }}
      />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default NavigationBar;
