import React from "react";
import {
  View,
  LogBox,
  Text,
  StyleSheet,
  Button,
  Alert,
  Switch,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import store from "../store/store";
import { addTask, deleteTask } from "../store/actions";
import appNotif from "../handleNotification/notification";

Date.prototype.getCurrentTime = function() {
  return (
    (this.getHours() < 10 ? "0" : "") +
    (this.getHours() > 12 ? this.getHours() - 12 : this.getHours()) +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() +
    (this.getHours() > 12 ? " PM" : " AM")
  );
};

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

class newTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      date: new Date(Date.now() + 60 * 2000),
      mode: "date",
      show: false,
      name: "",
      tdate: null,
      tmonth: null,
      tyear: null,
      ttime: null,
      isDaily: false,
      language: `${this.props.language}`,
    };
  }

  componentDidMount() {
    const milldate = 60000;
    const roundedOffDate = new Date(
      Math.floor(this.state.date / milldate) * milldate
    );
    this.setState({ date: roundedOffDate });
    this.setState({
      tdate: this.state.date.getDate(),
      tmonth: this.state.date.getMonth() + 1,
      tyear: this.state.date.getFullYear(),
      ttime: this.state.date.getCurrentTime(),
    });
  }

  onChange = (event, selectedDate) => {
    const changedDate = selectedDate || this.state.date;
    this.setState({
      show: Platform.OS === "ios" ? true : false,
    });
    this.setState({ date: changedDate });
    this.setState({ tdate: changedDate.getDate() });
    this.setState({ tmonth: changedDate.getMonth() + 1 });
    this.setState({ tyear: changedDate.getFullYear() });
    this.setState({ ttime: changedDate.getCurrentTime() });
    this.setState({ show: false });
  };

  checkButton = () => {
    if (this.state.name === "") {
      return true;
    } else {
      return false;
    }
  };

  showMode = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  AddingTask = () => {
    appNotif.scheduleNotification(
      this.state.count,
      this.state.date,
      this.state.name,
      this.state.isDaily
    );
    store.dispatch(
      addTask({
        id: this.state.count,
        name: this.state.name,
        date:
          this.state.tdate + "/" + this.state.tmonth + "/" + this.state.tyear,
        time: this.state.ttime,
        defaultDate: this.state.date,
        isDaily: this.state.isDaily,
      })
    ),
      this.props.navigation.navigate("Tab", { screen: "Home" });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  showTimepicker = () => {
    this.showMode("time");
  };

  render() {
    const { show, date, mode } = this.state;
    return (
      <View style={styles.mainView}>
        <Text style={selfStyle.topHead}>Add a New Reminder</Text>
        <TextInput
          style={selfStyle.inputText}
          placeholder={"Write the name of the task. (maximum length = 50)"}
          maxLength={50}
          onChangeText={(text) => this.setState({ name: text })}
        />
        <View>
          <Text> </Text>
          <Text style={selfStyle.date_time}>
            {" "}
            Date:{" "}
            {this.state.tdate +
              "/" +
              this.state.tmonth +
              "/" +
              this.state.tyear}{" "}
          </Text>
          <Text> </Text>
          <Button onPress={this.showDatepicker} title="Choose Date!" />
          <Text> </Text>
        </View>
        <View>
          <Text style={selfStyle.date_time}> Time : {this.state.ttime} </Text>
          <Text> </Text>
          <Button onPress={this.showTimepicker} title="Choose Time!" />
          <Text> </Text>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
          <Text style={{ paddingRight: 20 }}>Is Daily</Text>
          <Switch
            value={this.state.isDaily}
            onValueChange={() =>
              this.setState({ isDaily: !this.state.is24Hour })
            }
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            minimumDate={Date.now()}
          />
        )}
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Button
          color="#841584"
          title={"Add Task"}
          disabled={this.checkButton()}
          onPress={() => this.AddingTask()}
        />
        <Text> </Text>
        <Text> </Text>
        <Button
          title={"GO BACK!"}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const mapStatetoProps = (state) => ({
  username: state.user.name,
  count: state.count,
  language: state.user.language,
});

export default connect(mapStatetoProps)(newTask);

const selfStyle = StyleSheet.create({
  topHead: {
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: "grey",
    borderColor: "black",
    backgroundColor: "black",
    color: "cyan",
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "grey",
    borderWidth: 3,
  },
  date_time: {
    fontSize: 12,
    fontWeight: "300",
    backgroundColor: "cyan",
    color: "black",
    paddingTop: 5,
    borderWidth: 3,
    borderColor: "black",
    paddingBottom: 10,
  },
  Addbutton: {
    paddingTop: 50,
  },
});
