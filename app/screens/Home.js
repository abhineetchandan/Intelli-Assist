import React from "react";
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  TouchableOpacity,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { connect } from "react-redux";
import store from "../store/store";
import { FlatList } from "react-native-gesture-handler";
import { deleteTask, firstopened } from "../store/actions";
import PushNotification from "react-native-push-notification";
//import languageCode from "../utils/languageCode";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as SecureStore from "expo-secure-store";
import RNAndroidNotificationListener from "react-native-android-notification-listener";
import voice from "./voice";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Cannot update a component from inside the function body of a different component",
]);
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      tasks: this.props.tasks,
      rerender: this.props.rerender,
    };
    this.options = {
      taskName: "Assistant",
      taskTitle: "Listening for your orders",
      taskDesc: "Waiting for your order. Press here to learn more",
      taskIcon: {
        name: "ic_launcher",
        type: "mipmap",
      },
      color: "#ff00ff",
      linkingURI: "undefined",
      parameters: {
        delay: 1000,
      },
    };
    this.voice = new voice();
    this.voice._startRecognizing.bind(this);
  }

  NavigateToIndividualPage = (item) => {
    this.props.navigation.navigate(
      "New Task",
      {
        id: item.item.id,
        name: item.item.name,
        date: item.item.date,
        time: item.item.time,
        defaultDate: item.item.defaultDate,
        isDaily: item.item.isDaily,
      },
      this.setState({ selectedId: null })
    );
  };

  async componentDidMount() {
    console.log("My token is ", await SecureStore.getItemAsync("token"));
    console.log(store.getState().user);
    this.setState({ selectedId: null });
    // To check if the user has permission
    RNAndroidNotificationListener.getPermissionStatus().then((status) => {
      console.log(status);
      if (status !== "authorized") {
        RNAndroidNotificationListener.requestPermission();
      }
    });
  }

  listenHello = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      setInterval(() => {
        //this.voice._startRecognizing()
      }, 3000);
    });
  };

  componentDidUpdate() {}
  renderItem = (item) => {
    const backgroundColor =
      item.id === this.state.selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <Animatable.View animation={"slideInLeft"}>
        <Swipeable
          renderRightActions={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  store.dispatch(deleteTask({ id: item.item.id }));
                  PushNotification.cancelLocalNotifications({
                    id: item.item.id,
                  });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ff1010",
                    width: 75,
                    height: 75,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={35}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        >
          <View
            style={[
              homeStyles.item,
              { backgroundColor: backgroundColor },
              { paddingBottom: 10 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedId: null }),
                  this.NavigateToIndividualPage(item);
              }}
            >
              <Text style={homeStyles.title}>{item.item.name}</Text>
              <Text style={homeStyles.title}>{item.item.date}</Text>
              <Text style={homeStyles.title}>{item.item.time}</Text>
            </TouchableOpacity>
          </View>
        </Swipeable>
      </Animatable.View>
    );
  };

  render() {
    return (
      <View style={styles.mainView}>
        <Text
          style={styles.boldTexting}
        >{`${this.state.username}'s Personal Assistant`}</Text>
        <Text style={[styles.smalltexting, { paddingLeft: 3 }]}>
          {" "}
          My Work's To Do{" "}
        </Text>
        <Text>Total Work: {this.props.tasks.length}</Text>
        <FlatList
          data={this.props.tasks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.props.tasks}
          fadingEdgeLength={100}
        />
        <StatusBar style="dark" />
        <Button
          title={"Add A Reminder"}
          onPress={() => {
            this.setState({ selectedId: null }),
              this.props.navigation.navigate("Add New Task");
          }}
        />
        <Button
          title={"Go to Voice Command"}
          onPress={() => {
            this.setState({ selectedId: null }),
              this.props.navigation.navigate("Main Home");
          }}
        />
      </View>
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
});
