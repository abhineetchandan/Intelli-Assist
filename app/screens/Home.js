import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  LogBox,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { connect } from "react-redux";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import appColors from "../colors";
import { TextInput } from "react-native";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Cannot update a component from inside the function body of a different component",
]);
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoiceModal: false,
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
      showVoiceModal: false,
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
      this.setState({
        showVoiceModal: false,
      });
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      this.setState({
        showVoiceModal: false,
      });
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

  render() {
    const { pitch } = this.state;
    const height = pitch * 8;
    return (
      <SafeAreaView style={styles.mainView}>
        <StatusBar style="dark" />
        <View
          style={{
            backgroundColor: appColors.peach,
            height: 50,
            marginLeft: 5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => this.props.navigation.toggleDrawer()}
          >
            <AntDesign name="menu-fold" color="#000000" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              color: appColors.black,
              fontSize: 30,
              position: "absolute",
              alignSelf: "center",
              fontFamily: "comic-sans-ms-regular",
            }}
          >
            Home
          </Text>
          <TouchableOpacity
            style={{
              color: appColors.black,
              fontSize: 30,
              position: "absolute",
              alignSelf: "flex-end",
              paddingRight: 10,
            }}
          >
            <Ionicons name="notifications" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Type your command here or ..."
            placeholderTextColor={appColors.fadedBlack}
            style={{
              marginTop: 10,
              color: appColors.black,
              fontSize: 20,
              marginLeft: 5,
              width: 314,
              borderWidth: 1,
              borderColor: appColors.black,
              borderRightWidth: 0,
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 10, borderWidth: 1, borderLeftWidth: 0 }}
            onPress={() => {
              this.setState({ showVoiceModal: true });
              this._startRecognizing();
            }}
          >
            <MaterialIcons
              name="keyboard-voice"
              size={38}
              style={{ paddingTop: 5 }}
              color={appColors.black}
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          style={{}}
          visible={this.state.showVoiceModal}
          onRequestClose={() => {
            this.setState((prevState) => {
              this.setState({ showVoiceModal: !prevState.showVoiceModal });
            });
          }}
        >
          <View
            style={{
              backgroundColor: appColors.peach,
              width: 300,
              height: 300,
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              marginTop: "50%",
            }}
          >
            <Text
              style={{
                marginTop: 5,
                fontSize: 30,
                fontFamily: "comic-sans-ms-regular",
              }}
            >
              Speak Now...
            </Text>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                flexDirection: "row",
                height: 100,
                marginTop: 100,
              }}
            >
              <View
                style={{
                  width: 10,
                  borderRadius: 30,
                  height: height,
                  marginLeft: 5,
                  marginTop: 10,
                  backgroundColor: appColors.orange,
                }}
              ></View>
              <View
                style={{
                  width: 10,
                  borderRadius: 30,
                  height: height,
                  marginLeft: 10,
                  marginTop: 10,
                  backgroundColor: appColors.lightGreen,
                }}
              ></View>
              <View
                style={{
                  width: 10,
                  borderRadius: 30,
                  height: height,
                  marginLeft: 10,
                  marginTop: 10,
                  backgroundColor: appColors.yellow,
                }}
              ></View>
              <View
                style={{
                  width: 10,
                  borderRadius: 30,
                  height: height,
                  backgroundColor: appColors.pink,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
            </View>
            <Text
              onPress={() => this._stopRecognizing()}
              style={styles.cancelButton}
            >
              Cancel
            </Text>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStatetoProps = (state) => ({
  username: state.user.name,
  tasks: state.tasks,
  count: state.count,
  language: state.user.language,
});

export default connect(mapStatetoProps)(Home);

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    paddingLeft: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  signup: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "comic-sans-ms-regular",
    color: appColors.fadedLightBlue,
    fontSize: wp("10"),
  },
});
