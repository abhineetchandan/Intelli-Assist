import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";

function Untitled1(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <Image
          source={require("../assets/images/icon.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        <Text style={styles.intelliAssist}>Intelli Assist</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.signup}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.91
  },
  image: {
    width: 375,
    height: 812
  },
  image_imageStyle: {},
  image2: {
    width: 125,
    height: 129,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "rgba(250,5,5,1)",
    borderStyle: "dashed",
    marginTop: 139,
    marginLeft: 118
  },
  intelliAssist: {
    fontFamily: "trebuchet-ms-regular",
    color: "rgba(179,5,249,1)",
    height: 71,
    width: 375,
    fontSize: 50,
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 41
  },
  button: {
    width: 315,
    height: 70,
    backgroundColor: "rgba(1,255,73,1)",
    borderWidth: 1,
    borderColor: "rgba(40,247,202,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 26,
    marginLeft: 29
  },
  login: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    textAlign: "justify",
    width: 127,
    height: 67,
    marginLeft: 116
  },
  button1: {
    width: 303,
    height: 68,
    backgroundColor: "rgba(15,255,199,1)",
    borderWidth: 1,
    borderColor: "rgba(40,247,202,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginTop: 34,
    marginLeft: 29
  },
  signup: {
    fontFamily: "comic-sans-ms-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    textAlign: "justify",
    width: 145,
    height: 68,
    marginLeft: 98
  }
});

export default Untitled1;
