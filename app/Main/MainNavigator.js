import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./screens/tabs/Home";
import settings from "./screens/tabs/settings";
import help from "./screens/tabs/help";
import newTask from "./screens/stacks/newTask";
import TaskProp from "./screens/stacks/taskprop";
import MainHome from "./screens/stacks/MainHome";
import userDetail from "./screens/stacks/getUserDetails";
import Chats from "./screens/tabs/chat";
import chatPage from "./screens/stacks/chatPage";
import Contacts from "./screens/tabs/Contacts";

const Tab = createBottomTabNavigator();
const AppNavigator = createStackNavigator();

function ReturnTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Help and Features") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "md-settings" : "md-settings-outline";
          } else if (route.name === "My Notes") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles-outline";
          } else if (route.name === "Contacts") {
            iconName = focused ? "people" : "people-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Help and Features" component={help} />
      <Tab.Screen name="Settings" component={settings} />
      <Tab.Screen name="Chat" component={Chats} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{ headerShown: false }}>
        <AppNavigator.Screen name="Tab" component={ReturnTab} />
        <AppNavigator.Screen name="Add New Task" component={newTask} />
        <AppNavigator.Screen name="New Task" component={TaskProp} />
        <AppNavigator.Screen name="Main Home" component={MainHome} />
        <AppNavigator.Screen name="Chat Page" component={chatPage} />
        <AppNavigator.Screen name="Detail Page" component={userDetail} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}
