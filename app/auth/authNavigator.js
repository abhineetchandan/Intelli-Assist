import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OpeningScreen from "./screens/OpeningScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Authentication = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Authentication.Navigator screenOptions={{ headerShown: false }}>
        <Authentication.Screen
          name="Opening Screen"
          component={OpeningScreen}
        />
        <Authentication.Screen name="Login Page" component={LoginScreen} />
        <Authentication.Screen
          name="Register Page"
          component={RegisterScreen}
        />
      </Authentication.Navigator>
    </NavigationContainer>
  );
}
