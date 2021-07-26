import React, { useContext } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import styles from "./styles";
import store from "../store/store";
import * as SecureStore from "expo-secure-store";
import { CHANGE_SHOW, removeUser, hasUser } from "../store/actions";
import AuthContext from "../AuthContext";

export default function settings() {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.mainView}>
      <Text style={styles.boldTexting}>Settings</Text>
      <Text style={{ paddingBottom: 50 }}> </Text>
      <Button
        title={"Edit preferences"}
        onPress={() => {
          store.dispatch({ type: CHANGE_SHOW, payload: "" });
          this.props.navigation.navigate("FirstOpened");
        }}
      />
      <Button
        title={"Log Out!"}
        onPress={async () => {
          await SecureStore.deleteItemAsync("token");
          store.dispatch(removeUser({ remove: true }));
          auth.setUser(false);
        }}
      />
    </View>
  );
}
