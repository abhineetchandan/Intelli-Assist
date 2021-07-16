import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import CupertinoSegmentWithTwoTabs from "../components/CupertinoSegmentWithTwoTabs";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import MaterialButtonPink from "../components/MaterialButtonPink";

function Contacts(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.addContacts}>Add Contacts</Text>
      <CupertinoSegmentWithTwoTabs
        titleLeft="Puppies"
        titleRight="Cubs"
        titleLeft="My Contatcs"
        titleRight="Add Contacts"
        textWrapper="rgba(200,249,249,1)"
        style={styles.cupertinoSegmentWithTwoTabs}
      ></CupertinoSegmentWithTwoTabs>
      <MaterialIconTextbox
        iconStyleName="calendar"
        inputStyle="Label"
        iconStyle="account-plus-outline"
        inputStyle="Enter your friend's name"
        style={styles.materialIconTextbox}
      ></MaterialIconTextbox>
      <MaterialIconTextbox
        iconStyleName="calendar"
        inputStyle="Label"
        iconStyle="email"
        inputStyle="Enter your friend's email"
        style={styles.materialIconTextbox1}
      ></MaterialIconTextbox>
      <MaterialButtonPink
        caption="BUTTON"
        caption="Send Friend Request"
        style={styles.materialButtonPink}
      ></MaterialButtonPink>
      <MaterialIconTextbox
        iconStyleName="calendar"
        inputStyle="Label"
        iconStyle="account-details"
        inputStyle="Describe your relation with the person."
        style={styles.materialIconTextbox2}
      ></MaterialIconTextbox>
      <Text style={styles.text}>
        *Note: Your relation will be shown to your friend.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000"
  },
  addContacts: {
    fontFamily: "aclonica-regular",
    color: "rgba(189,16,224,1)",
    fontSize: 35,
    textAlign: "center",
    width: 375,
    height: 43,
    textDecorationLine: "underline",
    marginTop: 32,
    marginLeft: -8
  },
  cupertinoSegmentWithTwoTabs: {
    height: 49,
    width: 358,
    backgroundColor: "rgba(215,245,242,1)",
    overflow: "hidden",
    marginTop: 8,
    marginLeft: -8
  },
  materialIconTextbox: {
    height: 54,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: 78,
    marginLeft: -1
  },
  materialIconTextbox1: {
    height: 59,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: 20,
    marginLeft: -1
  },
  materialButtonPink: {
    height: 57,
    width: 168,
    marginTop: 183,
    marginLeft: 87
  },
  materialIconTextbox2: {
    height: 59,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: -214,
    marginLeft: -1
  },
  text: {
    fontFamily: "roboto-700",
    color: "rgba(244,17,17,1)",
    height: 71,
    width: 338,
    textAlign: "left",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 1
  }
});

export default Contacts;
