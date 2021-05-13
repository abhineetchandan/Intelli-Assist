import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";

export default class voice extends Component {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    task: "",
    taskParam: "",
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    this.setState({
      started: "√",
    });
  };

  process = (e) => {
    console.log("process got the value of e as ", e.value);
    const result = e.value[0];
    const loweredResult = result.toLowerCase();
    const keyword = loweredResult.split(" ");
    if (keyword[0] === "open") {
      Speech.speak(`Opening ${keyword[1]}`);
      //AppLink.maybeOpenURL(url, {appName, appStoreId, appStoreLocale, playStoreId}).then(() => {

      //}).catch(err => console.log(err))
    }
    if (keyword[0] === "search") {
      Speech.speak(`Searching ${keyword[1]}`);
      console.log("asked to search something");
    } else if (keyword[0] === "mail") {
      Speech.speak(`mailing ${keyword[1]}`);
      console.log("asked to mail someone");
    } else if (keyword[0] === "hello") {
      Speech.speak(`Hi! there.`);
      console.log("Saying Hello");
    } else if (keyword[0] === "message") {
      Speech.speak(`Messaging ${keyword[1]}`);
      console.log("asked to message someone");
    } else if (keyword[0] === "call") {
      Speech.speak(`Calling ${keyword[1]}`);
      console.log("asked to call someone");
    } else if (keyword[0] === "install") {
      Speech.speak(`Installing ${keyword[1]}`);
      console.log("asked to install an app");
    } else {
      Speech.speak(
        `Sorry I didn't understand. Try saying again or read the commands`
      );
      console.log("nothing matched so search");
    }
  };

  onSpeechRecognized = (e) => {
    this.setState({
      recognized: "√",
    });
  };

  onSpeechEnd = (e) => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√",
    });
  };

  onSpeechError = (e) => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    this.process(e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    console.log("started Recognizing");
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });
  };
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 30,
    color: "cyan",
    fontFamily: "Roboto",
    backgroundColor: "black",
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});
