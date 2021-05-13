import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import App from "./App";
import { RNAndroidNotificationListenerHeadlessJsName } from "react-native-android-notification-listener";
import * as Speech from "expo-speech";
import store from "./app/store/store";

const headlessNotificationListener = async ({ notification }) => {
  const parsedNotification = JSON.parse(notification);
  if (notification) {
    if (
      parsedNotification.app === "com.Intelli.IntelliAssist" &&
      parsedNotification.title !== "Listening for your orders"
    ) {
      console.log("enteredloop");
      const name = store.getState().user.name;
      setTimeout(
        () =>
          Speech.speak(
            `Hello ${name}, It's your Assistant, you have a task called ${parsedNotification.title}`
          ),
        1000
      );
    }
  }
};

AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
