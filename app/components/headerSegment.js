import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as axios from "axios";
import * as SecureStore from "expo-secure-store";
import store from "../store/store";
import { updateUser } from "../store/actions";

function HeaderSegment(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          styles.textWrapper,
          {
            backgroundColor: props.textWrapper || undefined,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            props.onPressLeft();
            let friends = [];
            let user = store.getState().user;
            user.friends = friends;
            store.dispatch(updateUser(user));
          }}
          style={styles.segmentTextWrapperLeft}
        >
          <Text style={styles.titleLeft}>{props.titleLeft}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.segmentTextWrapperRight}
          onPress={async () => {
            props.onPressRight();
            try {
              const result = await axios.put(
                "http://192.168.43.20:3000/me/addFriend",
                {
                  name: "Abhineet",
                  email: "abhineetsharmathegreat@gmail.com",
                  description: "I am the only great",
                },
                {
                  headers: {
                    "x-auth-token": await SecureStore.getItemAsync("token"),
                  },
                }
              );
              let user = store.getState().user;
              user.friends = result.data;
              store.dispatch(updateUser(user));
              console.log("User is ", store.getState().user);
              props.onFinish();
            } catch (err) {
              console.log(err.response);
            }
          }}
        >
          <Text style={styles.titleRight}>{props.titleRight}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  textWrapper: {
    height: 29,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
  },
  segmentTextWrapperLeft: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  titleLeft: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  segmentTextWrapperRight: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  titleRight: {
    fontSize: 13,
    color: "#007AFF",
  },
});

export default HeaderSegment;
