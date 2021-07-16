import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Ellipse } from "react-native-svg";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={require("../assets/images/signupPage.png")}
            resizeMode="contain"
            style={styles.imageBackgroundContainerStyle}
            imageStyle={styles.imageBackgoundStyle}
          >
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.emailIconContainer}>
              <View style={styles.emailIconInput}>
                <MaterialCommunityIconsIcon
                  name="email-outline"
                  style={styles.emailIcon}
                ></MaterialCommunityIconsIcon>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(84,80,80,1)"
                  selectionColor="rgba(61,58,58,1)"
                  keyboardType="email-address"
                  maxLength={60}
                  returnKeyLabel=""
                  style={styles.emailInputText}
                ></TextInput>
              </View>
            </View>
            <View style={styles.passwordViewContainer}>
              <View style={styles.keyIconTextContainer}>
                <MaterialCommunityIconsIcon
                  name="key-variant"
                  style={styles.keyIcon}
                  size={25}
                ></MaterialCommunityIconsIcon>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(77,72,72,1)"
                  selectionColor="rgba(85,83,83,1)"
                  secureTextEntry={true}
                  maxLength={60}
                  style={styles.passwordInput}
                ></TextInput>
              </View>
            </View>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            <View style={styles.continueButtonContainer}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </View>
            <View style={styles.iconsBottomStack}>
              <View style={styles.ellipseStackContainer}>
                <Svg viewBox="0 0 70.28 71.45" style={styles.facebookCircle}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={5}
                    cx={35}
                    cy={36}
                    rx={33}
                    ry={33}
                  ></Ellipse>
                </Svg>
                <MaterialCommunityIconsIcon
                  name="facebook"
                  style={styles.facebookIcon}
                ></MaterialCommunityIconsIcon>
              </View>
              <View style={styles.googleIconStack}>
                <FontAwesomeIcon
                  name="google"
                  style={styles.googleIcon}
                ></FontAwesomeIcon>
                <Svg viewBox="0 0 70.28 71.45" style={styles.googleCircle}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={5}
                    cx={35}
                    cy={36}
                    rx={33}
                    ry={33}
                  ></Ellipse>
                </Svg>
              </View>
            </View>
            <Text style={styles.noAccount}>Don't have an account?</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  imageBackgroundContainerStyle: {
    width: 402,
    height: 841,
    marginTop: 14,
  },
  imageBackgoundStyle: {},
  loginText: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 73,
    marginTop: 30,
    marginLeft: 113,
  },
  emailIconContainer: {
    width: 352,
    height: 70,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.18,
    shadowRadius: 0,
    flexDirection: "row",
    marginTop: 127,
    marginLeft: 24,
  },
  emailIcon: {
    color: "rgba(189,16,224,1)",
    fontSize: 30,
    height: 30,
    width: 30,
  },
  emailInputText: {
    fontFamily: "roboto-regular",
    color: "rgba(99,93,93,1)",
    fontSize: 18,
    width: 129,
    height: 22,
    inlineImageLeft: "",
    marginLeft: 15,
    marginTop: 11,
  },
  emailIconInput: {
    height: 43,
    flexDirection: "row",
    flex: 1,
    marginRight: 157,
    marginLeft: 11,
    marginTop: 13,
  },
  passwordViewContainer: {
    width: 352,
    height: 70,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.18,
    shadowRadius: 0,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 24,
  },
  keyIcon: {
    color: "rgba(189,16,224,1)",
    fontSize: 40,
    height: 43,
    width: 40,
  },
  passwordInput: {
    fontFamily: "roboto-regular",
    color: "rgba(99,93,93,1)",
    fontSize: 18,
    width: 164,
    height: 21,
    marginLeft: 15,
    marginTop: 8,
  },
  keyIconTextContainer: {
    height: 43,
    flexDirection: "row",
    flex: 1,
    marginRight: 122,
    marginLeft: 11,
    marginTop: 17,
  },
  forgotPassword: {
    fontFamily: "roboto-regular",
    color: "rgba(56,43,243,1)",
    width: 168,
    height: 27,
    fontSize: 20,
    textDecorationLine: "underline",
    marginTop: 33,
    marginLeft: 32,
  },
  continueButtonContainer: {
    width: 154,
    height: 62,
    backgroundColor: "rgba(255,4,237,1)",
    borderRadius: 100,
    marginTop: 34,
    marginLeft: 124,
  },
  continueButtonText: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    marginTop: 12,
    alignSelf: "center",
  },
  facebookCircle: {
    top: 0,
    left: 0,
    width: 70,
    height: 71,
    position: "absolute",
  },
  facebookIcon: {
    top: 6,
    left: 8,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 54,
    height: 59,
    width: 54,
  },
  ellipseStackContainer: {
    width: 70,
    height: 71,
  },
  googleIcon: {
    top: 15,
    left: 18,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 41,
    height: 41,
    width: 35,
  },
  googleCircle: {
    top: 0,
    left: 0,
    width: 70,
    height: 71,
    position: "absolute",
  },
  googleIconStack: {
    width: 70,
    height: 71,
    marginLeft: 53,
  },
  iconsBottomStack: {
    height: 71,
    flexDirection: "row",
    marginTop: 41,
    marginLeft: 113,
    marginRight: 96,
  },
  noAccount: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 25,
    width: 211,
    fontSize: 20,
    marginTop: 59,
    marginLeft: 105,
  },
  image1: {
    width: 402,
    height: 841,
    marginLeft: 28,
  },
  imageBackgroundContainer: {
    height: 855,
    flexDirection: "row",
    flex: 1,
    marginRight: -442,
    marginLeft: -11,
    marginTop: -14,
  },
});

export default Login;
