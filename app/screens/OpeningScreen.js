import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import RNAndroidNotificationListener from "react-native-android-notification-listener";
import * as SecureStore from "expo-secure-store";

export default class OpeningScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUser: false,
      isReady: false,
    };
  }
  async componentDidMount() {
    const result = await SecureStore.getItemAsync("token");
    console.log(result);
    if (result) {
      this.setState({ isReady: true });

      this.props.navigation.navigate("Tab", {
        screen: "Home",
      });
    } else {
      this.setState({ isReady: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
          source={require("../assets/background.png")}
        >
          <Image
            source={require("../assets/icon.png")}
            resizeMode="contain"
            style={styles.image2}
          ></Image>
          <Text style={styles.intelliAssist}>Intelli Assist</Text>
          <Animatable.View animation={"lightSpeedIn"}>
            <TouchableOpacity
              style={styles.button}
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
              <Animatable.Text animation={"lightSpeedIn"} style={styles.login}>
                Login
              </Animatable.Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation={"lightSpeedIn"}>
            <TouchableOpacity
              style={styles.button1}
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
              <Animatable.Text animation={"lightSpeedIn"} style={styles.signup}>
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
    opacity: 0.91,
  },
  image: {
    width: 375,
    height: 812,
  },
  image_imageStyle: {},
  image2: {
    width: 125,
    height: 129,
    borderRadius: 200,
    marginTop: 139,
    marginLeft: 118,
  },
  intelliAssist: {
    fontFamily: "monospace",
    color: "rgba(179,5,249,1)",
    height: 71,
    width: 375,
    fontSize: 40,
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 41,
    marginBottom: 45,
  },
  button: {
    width: 303,
    alignSelf: "center",
    height: 60,
    backgroundColor: "rgba(1,255,73,1)",
    borderWidth: 1,
    borderColor: "rgba(40,247,202,1)",
    borderStyle: "solid",
    borderRadius: 100,
  },
  login: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 35,
  },
  button1: {
    width: 303,
    height: 60,
    backgroundColor: "rgba(15,255,199,1)",
    borderWidth: 1,
    alignContent: "center",
    borderColor: "rgba(40,247,202,1)",
    borderRadius: 100,
    marginTop: 34,
    alignSelf: "center",
  },
  signup: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 35,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  // loginButton: {
  //   backgroundColor: "yellowgreen",
  //   position: "absolute",
  //   width: "100%",
  //   height: 50,
  //   bottom: 150,
  //   alignItems: "center",
  //   borderRadius: 15,
  // },
  // logo: {
  //   width: 150,
  //   height: 150,
  //   position: "absolute",
  //   top: 30,
  //   alignContent: "center",
  //   alignItems: "center",
  // },
  // registerButton: {
  //   backgroundColor: "tomato",
  //   width: "100%",
  //   borderRadius: 15,
  //   position: "absolute",
  //   height: 50,
  //   bottom: 85,
  //   alignItems: "center",
  // },
});
