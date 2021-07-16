import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

function Home(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectRow}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../assets/images/Gradient_PWJ4hVe.png")}
        >
          <View style={styles.iconRow}>
            <EntypoIcon name="menu" style={styles.icon}></EntypoIcon>
            <Text style={styles.text}>Home</Text>
            <EntypoIcon name="bell" style={styles.icon2}></EntypoIcon>
          </View>
        </ImageBackground>
        <View style={styles.rect3}>
          <View style={styles.myTasksRow}>
            <Text style={styles.myTasks}>My Tasks</Text>
            <FontAwesomeIcon
              name="close"
              style={styles.icon5}
            ></FontAwesomeIcon>
          </View>
        </View>
      </View>
      <View style={styles.rect2}>
        <View style={styles.textInputRow}>
          <TextInput
            placeholder="Type commands here or"
            style={styles.textInput}
          ></TextInput>
          <MaterialIconsIcon
            name="settings-voice"
            style={styles.icon3}
          ></MaterialIconsIcon>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  rect: {
    width: 375,
    height: 84,
    flexDirection: "row"
  },
  rect_imageStyle: {},
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 51,
    height: 56,
    width: 51,
    marginTop: 4
  },
  text: {
    fontFamily: "comic-sans-ms-regular",
    color: "#121212",
    fontSize: 45,
    textAlign: "center",
    marginLeft: 62
  },
  icon2: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginLeft: 68,
    marginTop: 10
  },
  iconRow: {
    height: 63,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 16,
    marginTop: 10
  },
  rect3: {
    width: 169,
    height: 47,
    backgroundColor: "#E6E6E6",
    borderRadius: 100,
    flexDirection: "row",
    marginLeft: 51,
    marginTop: 17
  },
  myTasks: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 21,
    marginTop: 11
  },
  icon5: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 40,
    width: 32,
    marginLeft: 7
  },
  myTasksRow: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 19,
    marginLeft: 22
  },
  rectRow: {
    height: 84,
    flexDirection: "row",
    marginRight: -220
  },
  rect2: {
    width: 375,
    height: 67,
    backgroundColor: "#E6E6E6",
    flexDirection: "row"
  },
  textInput: {
    fontFamily: "aladin-regular",
    color: "rgba(105,103,103,1)",
    fontSize: 36,
    width: 282,
    height: 44,
    marginTop: 3
  },
  icon3: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    width: 40,
    height: 40,
    marginLeft: 17
  },
  textInputRow: {
    height: 47,
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 16,
    marginTop: 9
  }
});

export default Home;
