import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import appColors from "../app/colors";
import Home from "../app/screens/Home";
import settings from "../app/screens/settings";
import help from "../app/screens/help";
import newTask from "../app/screens/newTask";
import TaskProp from "../app/screens/taskprop";
import MainHome from "../app/screens/MainHome";
import userDetail from "../app/screens/getUserDetails";
import Chats from "../app/screens/chat";
import chatPage from "../app/screens/chatPage";
import Contacts from "../app/screens/Contacts";
import AppNavigatorStyle from "./AppNavigatorStyle";
import Reminders from "../app/screens/Reminders";

const Tab = createBottomTabNavigator();
const AppNavigator = createStackNavigator();
const NavNavigator = createDrawerNavigator();

function ReturnAppNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{ headerShown: false }}>
        <AppNavigator.Screen name="Tab" component={ReturnNavNavigator} />
        <AppNavigator.Screen name="Add New Task" component={newTask} />
        <AppNavigator.Screen name="New Task" component={TaskProp} />
        <AppNavigator.Screen name="Main Home" component={MainHome} />
        <AppNavigator.Screen name="Chat Page" component={chatPage} />
        <AppNavigator.Screen name="Detail Page" component={userDetail} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

function ReturnNavNavigator() {
  return (
    <NavNavigator.Navigator
      drawerType="front"
      drawerStyle={{}}
      overlayColor="rgba(0,0,0,0.8)"
      initialRouteName="Home"
      hideStatusBar
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Help and Features") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "md-settings" : "md-settings-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles-outline";
          } else if (route.name === "Contacts") {
            iconName = focused ? "people" : "people-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      drawerStyle={{ backgroundColor: appColors.peach }}
      drawerContent={(props) => <AppNavigatorStyle {...props} />}
    >
      <NavNavigator.Screen name="Home" component={ReturnHomeTab} />
      <NavNavigator.Screen name="Chat" component={Chats} />
      <NavNavigator.Screen name="Contacts" component={Contacts} />
      <NavNavigator.Screen name="Settings" component={settings} />
      <NavNavigator.Screen name="Help and Features" component={help} />
    </NavNavigator.Navigator>
  );
}

function ReturnHomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Reminders") {
            iconName = focused ? "reminder" : "reminder";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        activeBackgroundColor: appColors.eco,
        inactiveBackgroundColor: appColors.peach,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reminders" component={Reminders} />
    </Tab.Navigator>
  );
}

export default ReturnAppNavigator;
