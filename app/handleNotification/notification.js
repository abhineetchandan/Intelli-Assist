import React from "react";
import store from "../store/store";
import { deleteTask } from "../store/actions";
import { Alert } from "react-native";
import NotifService from "./notifservice";

export default appNotif = new NotifService(onRegister, onNotif);

function onRegister(token) {
  console.log(token);
}

function onNotif(notif) {
  if (notif.action === "OK GOT IT!") {
    Alert.alert(notif.title, notif.message);
  } else if (notif.action === "REMOVE THIS TASK NOW!") {
    const todeleteid = notif.data.id;
    store.dispatch(deleteTask({ id: todeleteid }));
  }
}

function handlePerm(perms) {
  Alert.alert("Permissions", JSON.stringify(perms));
}
