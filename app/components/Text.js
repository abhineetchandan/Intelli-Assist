import React from "react";
import { Text, StyleSheet } from "react-native";

export default function AppText({ text, style }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { style }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
  },
});
