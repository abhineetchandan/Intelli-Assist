//Packages Import
import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";

//Native App Module Imports
import AuthNavigator from "./app/auth/authNavigator";
import MainNavigator from "./app/Main/MainNavigator";
import checkDirs from "./app/functions/checkDirs";
import store, { persistor } from "./app/store/store";

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
    console.log("is dir created is ", isDirCreated);
    if (!isDirCreated) console.log("checkDIrs not working");
    const result = await SecureStore.getItemAsync("token");
    if (result) {
      this.setState({
        hasUser: true,
      });
    } else {
      this.setState({ hasUser: false });
    }
  };

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
            <AuthNavigator />
          </PersistGate>
        </Provider>
      );
    } else if (this.state.hasUser && this.state.isReady) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainNavigator />
          </PersistGate>
        </Provider>
      );
    }
  }
}
