import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OpeningScreen from "../app/screens/authentication/OpeningScreen";
import LoginScreen from "../app/screens/authentication/LoginScreen";
import RegisterScreen from "../app/screens/authentication/RegisterScreen";

const AuthNavigator = createStackNavigator();

function ReturnAuthNavigator() {
  return (
    <NavigationContainer>
      <AuthNavigator.Navigator screenOptions={{ headerShown: false }}>
        <AuthNavigator.Screen name="Opening Screen" component={OpeningScreen} />
        <AuthNavigator.Screen name="Login Page" component={LoginScreen} />
        <AuthNavigator.Screen name="Register Page" component={RegisterScreen} />
      </AuthNavigator.Navigator>
    </NavigationContainer>
  );
}

export default ReturnAuthNavigator