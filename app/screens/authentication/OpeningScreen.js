import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import RNAndroidNotificationListener from "react-native-android-notification-listener";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import appColors from "../../colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class OpeningScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUser: false,
      isReady: false,
      fontLoaded: false,
    };
  }

  async loadFonts() {
    this.setState({
      fontLoaded: useFonts({
        "comic-sans-ms-regular": require("../../assets/fonts/comic-sans-ms-regular.ttf"),
        "trebuchet-ms-regular": require("../../assets/fonts/trebuchet-ms-regular.ttf"),
      }),
    });
  }

  async componentDidMount() {
    console.log("mounted");
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => {
            this.setState({ fontLoaded: true });
          }}
          onError={(err) => console.log("error", err)}
        />
      );
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            appColors.fadedLightBlue,
            appColors.fadedLightBlue,
            appColors.blue,
          ]}
          style={styles.gradientStyle}
        >
          <Text style={styles.intelliAssist}>Intelli Assist</Text>
          <Animatable.Image
            animation={"zoomIn"}
            source={require("../../assets/icon.png")}
            resizeMode="contain"
            style={styles.icon}
          />
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
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
  },
  gradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    width: wp("35"),
    height: hp("20"),
    alignContent: "center",
    borderRadius: 200,
    marginTop: hp("5"),
    marginBottom: hp("10"),
    marginLeft: wp("30"),
  },
  intelliAssist: {
    fontFamily: "comic-sans-ms-regular",
    color: appColors.white,
    fontSize: wp("13"),
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: hp("5"),
    marginBottom: hp("7"),
  },
  button: {
    width: wp("55"),
    alignSelf: "center",
    height: hp("8"),
    backgroundColor: appColors.eco,
    borderWidth: 1.5,
    borderColor: appColors.cyan,
    borderStyle: "solid",
    borderRadius: 100,
    alignContent: "center",
    alignItems: "center",
  },
  login: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "comic-sans-ms-regular",
    color: appColors.black,
    fontSize: wp("10"),
  },
  button1: {
    width: wp("55"),
    alignSelf: "center",
    height: hp("8"),
    backgroundColor: appColors.peach,
    borderWidth: 1.5,
    borderColor: appColors.lightGreen,
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: hp("5"),
  },
  signup: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "comic-sans-ms-regular",
    color: appColors.black,
    fontSize: wp("10"),
  },
});
