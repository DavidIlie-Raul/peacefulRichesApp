import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Import your screen components here
import LandingPage from '../Components/screens/LandingPage.js';
import CoursePage from '../Components/screens/CoursePage.js';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Course') {
            iconName = focused ? 'book' : 'book-outline';
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
    name="Course"
    component={CoursePage}
    options={{ headerShown: false }}
  />
  {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default NavigationBar;