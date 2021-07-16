import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialSearchBar1 from "../components/MaterialSearchBar1";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";

function Contacts(props) {
  return (
    <View style={styles.container}>
      <MaterialSearchBar1
        style={styles.materialSearchBar1}
      ></MaterialSearchBar1>
      <View style={styles.myContactsStack}>
        <Text style={styles.myContacts}>My Contacts</Text>
        <Icon name="people" style={styles.icon}></Icon>
      </View>
      <MaterialCardWithImageAndTitle
        actionText1="ACTION 1"
        actionText2="ACTION 2"
        cardBody="rgba(254,254,254,1)"
        titleStyle="Name Here"
        subtitleStyle="mail address here"
        actionButton1="Go Back"
        actionText1="Call"
        actionText2="Message"
        actionBody="rgba(126,211,33,1)"
        style={styles.materialCardWithImageAndTitle}
      ></MaterialCardWithImageAndTitle>
    <EntypoIcon name="add-user" style={styles.icon2}></EntypoIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000"
  },
  materialSearchBar1: {
    height: 48,
    width: 375,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 11,
    borderStyle: "solid",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
icon2: {
    top: 0,
    position: "absolute",
    color: "rgba(244,9,9,1)",
    fontSize: 70,
    left: 14
  },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: 22
  },
  myContacts: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "aclonica-regular",
    color: "rgba(189,16,224,1)",
    fontSize: 35,
    textAlign: "center",
    width: 375,
    height: 43,
    textDecorationLine: "underline"
  },
  icon: {
    top: 3,
    left: 14,
    position: "absolute",
    color: "rgba(254,4,4,1)",
    fontSize: 40,
    opacity: 0.64
  },
  myContactsStack: {
    width: 375,
    height: 43,
    marginTop: 17
  },
  materialCardWithImageAndTitle: {
    height: 159,
    width: 359,
    backgroundColor: "rgba(189,16,224,0.3)",
    borderWidth: 3,
    borderColor: "rgba(22,6,255,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.37,
    shadowRadius: 0,
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 1
  }
});

export default Contacts;
