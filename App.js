//Packages Import
import React, { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";

//Native App Module Imports
import store, { persistor } from "./app/store/store";
import AuthContext from "./app/AuthContext";
import checkDirs from "./app/functions/checkDirs";
import ReturnAuthNavigator from "./navigators/AuthNavigator";
import ReturnAppNavigator from "./navigators/AppNavigator";

export default function App() {
  [username, setUsername] = useState("");
  [isReady, setisReady] = useState(false);
  [user, setUser] = useState(false);
  [directoryExists, setDirectoryExists] = useState(false);

  const checkUser = async () => {
    const isDirCreated = await checkDirs();
    console.log("is dir created is ", isDirCreated);
    if (!isDirCreated) console.log("checkDIrs not working");
    const result = await SecureStore.getItemAsync("token");
    if (result) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={checkUser}
        onFinish={() => {
          setisReady(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContext.Provider value={{ user, setUser }}>
          {user ? <ReturnAppNavigator /> : <ReturnAuthNavigator />}
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
}
