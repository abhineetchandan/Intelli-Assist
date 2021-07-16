//Packages Import
import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";

//Native App Module Imports
import checkDirs from "./app/functions/checkDirs";
import Home from "./app/screens/Home";
import settings from "./app/screens/settings";
import help from "./app/screens/help";
import newTask from "./app/screens/newTask";
import TaskProp from "./app/screens/taskprop";
import store, { persistor } from "./app/store/store";
import MainHome from "./app/screens/MainHome";
import OpeningScreen from "./app/screens/authentication/OpeningScreen";
import loginPage from "./app/screens/authentication/loginPage";
import registerPage from "./app/screens/authentication/registerPage";
import userDetail from "./app/screens/getUserDetails";
import AppLoading from "expo-app-loading";
import Chats from "./app/screens/chat";
import chatPage from "./app/screens/chatPage";
import Contacts from "./app/screens/Contacts";

const Tab = createBottomTabNavigator();
const MyStack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isReady: false,
      hasUser: false,
      directoryExists: false,
    };
  }

  checkUser = async () => {
    const isDirCreated = await checkDirs();
    if (!isDirCreated)
      throw new Error("An Unexpected Error occured while initialising files.");
    const result = await SecureStore.getItemAsync("token");
    if (result) {
      this.setState({
        hasUser: true,
      });
    } else {
      this.setState({ hasUser: false });
    }
  };

  Tab() {
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
              iconName = focused
                ? "ios-chatbubbles"
                : "ios-chatbubbles-outline";
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

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.checkUser}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      );
    } else if (!this.state.hasUser && this.state.isReady) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <MyStack.Navigator screenOptions={{ headerShown: false }}>
                <MyStack.Screen
                  name="Opening Screen"
                  component={OpeningScreen}
                />
                <MyStack.Screen name="Tab" component={this.Tab} />
                <MyStack.Screen name="Add New Task" component={newTask} />
                <MyStack.Screen name="New Task" component={TaskProp} />
                <MyStack.Screen name="Main Home" component={MainHome} />
                <MyStack.Screen name="Login Page" component={loginPage} />
                <MyStack.Screen name="Register Page" component={registerPage} />
                <MyStack.Screen name="Detail Page" component={userDetail} />
                <MyStack.Screen name="Chat Page" component={chatPage} />
              </MyStack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      );
    } else if (this.state.hasUser && this.state.isReady) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <MyStack.Navigator screenOptions={{ headerShown: false }}>
                <MyStack.Screen name="Tab" component={this.Tab} />
                <MyStack.Screen
                  name="Opening Screen"
                  component={OpeningScreen}
                />
                <MyStack.Screen name="Add New Task" component={newTask} />
                <MyStack.Screen name="New Task" component={TaskProp} />
                <MyStack.Screen name="Main Home" component={MainHome} />
                <MyStack.Screen name="Login Page" component={loginPage} />
                <MyStack.Screen name="Register Page" component={registerPage} />
                <MyStack.Screen name="Chat Page" component={chatPage} />
                <MyStack.Screen name="Detail Page" component={userDetail} />
              </MyStack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      );
    }
  }
}
