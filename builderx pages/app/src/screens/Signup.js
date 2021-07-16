import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Ellipse } from "react-native-svg";

export default class Signup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/signupPage.png")}
          resizeMode="contain"
          style={styles.imageBackground}
          imageStyle={styles.imageBackgroundStyle}
        >
          <Text style={styles.signup}>Signup</Text>
          <View style={styles.nameViewContainer}>
            <View style={styles.nameContainer}>
              <FontAwesomeIcon
                name="male"
                style={styles.manStyle}
              ></FontAwesomeIcon>
              <TextInput
                placeholder="Enter your name"
                maxLength={30}
                placeholderTextColor="rgba(92,88,88,1)"
                style={styles.nameInput}
              ></TextInput>
            </View>
          </View>
          <View style={styles.emailViewContainer}>
            <View style={styles.emailContainer}>
              <MaterialCommunityIconsIcon
                name="email-outline"
                style={styles.emailIcon}
              ></MaterialCommunityIconsIcon>
              <TextInput
                placeholder="Enter your email"
                maxLength={60}
                placeholderTextColor="rgba(84,79,79,1)"
                style={styles.textInput}
              ></TextInput>
            </View>
          </View>
          <View style={styles.passwordViewContainer}>
            <View style={styles.passwordContainer}>
              <MaterialCommunityIconsIcon
                name="key-variant"
                style={styles.keyIcon}
              ></MaterialCommunityIconsIcon>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="rgba(102,90,90,1)"
                maxLength={60}
                secureTextEntry={true}
                style={styles.passwordInput}
              ></TextInput>
            </View>
          </View>
          <View style={styles.continueContainer}>
            <Text style={styles.continueButton}>Continue</Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.facebookCircle}>
              <Svg
                viewBox="0 0 70.28 71.45"
                style={styles.facebookEllipseContainer}
              >
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
                style={styles.facebookLogo}
              ></MaterialCommunityIconsIcon>
            </View>
            <View style={styles.googleIconContainer}>
              <FontAwesomeIcon
                name="google"
                style={styles.googleLogo}
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
          <Text style={styles.hasAccount}>Already have an account?</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: 402,
    height: 841,
    marginLeft: -11,
  },
  imageBackgroundStyle: {},
  signup: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 73,
    marginTop: 30,
    marginLeft: 88,
  },
  nameViewContainer: {
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
    marginTop: 97,
    marginLeft: 24,
  },
  manStyle: {
    color: "rgba(189,16,224,1)",
    fontSize: 40,
    height: 40,
    width: 23,
  },
  nameInput: {
    fontFamily: "roboto-regular",
    color: "rgba(99,93,93,1)",
    fontSize: 18,
    width: 129,
    height: 22,
    marginLeft: 31,
    marginTop: 9,
  },
  nameContainer: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 152,
    marginLeft: 17,
    marginTop: 16,
  },
  emailViewContainer: {
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
    marginTop: 19,
    marginLeft: 24,
  },
  emailIcon: {
    color: "rgba(189,16,224,1)",
    fontSize: 40,
    height: 43,
    width: 40,
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "rgba(99,93,93,1)",
    fontSize: 18,
    width: 129,
    height: 22,
    marginLeft: 23,
    marginTop: 11,
  },
  emailContainer: {
    height: 43,
    flexDirection: "row",
    flex: 1,
    marginRight: 152,
    marginLeft: 8,
    marginTop: 17,
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
    marginTop: 18,
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
    marginLeft: 23,
    marginTop: 11,
  },
  passwordContainer: {
    height: 43,
    flexDirection: "row",
    flex: 1,
    marginRight: 117,
    marginLeft: 8,
    marginTop: 14,
  },
  continueContainer: {
    width: 154,
    height: 62,
    backgroundColor: "rgba(255,4,237,1)",
    borderRadius: 100,
    marginTop: 38,
    marginLeft: 124,
  },
  continueButton: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    marginTop: 12,
    alignSelf: "center",
  },
  facebookEllipseContainer: {
    top: 0,
    left: 0,
    width: 70,
    height: 71,
    position: "absolute",
  },
  facebookLogo: {
    top: 6,
    left: 8,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 54,
    height: 59,
    width: 54,
  },
  facebookCircle: {
    width: 70,
    height: 71,
  },
  googleLogo: {
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
  googleIconContainer: {
    width: 70,
    height: 71,
    marginLeft: 53,
  },
  iconsContainer: {
    height: 71,
    flexDirection: "row",
    marginTop: 41,
    marginLeft: 113,
    marginRight: 96,
  },
  hasAccount: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 25,
    width: 243,
    fontSize: 20,
    marginTop: 59,
    marginLeft: 72,
  },
});

export default Signup;
