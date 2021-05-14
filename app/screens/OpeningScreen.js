import React from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import RNAndroidNotificationListener from "react-native-android-notification-listener";
import store from "../store/store";
import { removeUser } from "../store/actions";

export default class OpeningScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUser: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <View style={[styles.container, { justifyContent: "flex-end" }]}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          blurRadius={10}
          resizeMode="stretch"
          source={require("../assets/background.png")}
        >
          <View style={{ alignItems: "center", opacity: 1 }}>
            <Image
              style={[styles.logo, { justifyContent: "center" }]}
              source={require("../assets/logo.png")}
            />
          </View>
          <Animatable.View
            animation={"lightSpeedIn"}
            style={[styles.loginButton, { opacity: 1 }]}
          >
            <TouchableOpacity
              onPress={() => {
                RNAndroidNotificationListener.getPermissionStatus().then(
                  (status) => {
                    console.log(status);
                    if (status !== "authorized") {
                      Alert.alert(
                        "Permissions Alert",
                        "On the next page you will be asked to give permissions for notifications. Plese allow this app.",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              RNAndroidNotificationListener.requestPermission();
                              this.props.navigation.navigate("Login Page");
                            },
                          },
                        ],
                        {
                          cancelable: false,
                        }
                      );
                    } else if (status === "authorized") {
                      this.props.navigation.navigate("Login Page");
                    }
                  }
                );
              }}
            >
              <Animatable.Text
                animation={"lightSpeedIn"}
                style={{ fontSize: 30 }}
              >
                Login
              </Animatable.Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation={"lightSpeedIn"}
            style={[styles.registerButton, { opacity: 1 }]}
          >
            <TouchableOpacity
              onPress={() => {
                RNAndroidNotificationListener.getPermissionStatus().then(
                  (status) => {
                    console.log(status);
                    if (status !== "authorized") {
                      Alert.alert(
                        "Permissions Alert",
                        "On the next page you will be asked to give permissions for notifications. Plese allow this app.",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              RNAndroidNotificationListener.requestPermission();
                              this.props.navigation.navigate("Register Page");
                            },
                          },
                        ],
                        {
                          cancelable: false,
                        }
                      );
                    } else if (status === "authorized") {
                      this.props.navigation.navigate("Register Page");
                    }
                  }
                );
              }}
            >
              <Animatable.Text
                animation={"lightSpeedIn"}
                style={{ fontSize: 30 }}
              >
                Register
              </Animatable.Text>
            </TouchableOpacity>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "yellowgreen",
    position: "absolute",
    width: "100%",
    height: 50,
    bottom: 150,
    alignItems: "center",
    borderRadius: 15,
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 30,
    alignContent: "center",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "tomato",
    width: "100%",
    borderRadius: 15,
    position: "absolute",
    height: 50,
    bottom: 85,
    alignItems: "center",
  },
});
