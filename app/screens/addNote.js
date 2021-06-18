import React, { Component } from "react";
import { View, Button, Text, Switch } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import { updateTask, addNote } from "../store/actions";
import { connect } from "react-redux";
import store from "../store/store";
import appNotif from "../handleNotification/notification";

class addMyNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: "",
      body: "",
    };
  }

  componentDidMount() {}

  checkButton = () => {
    if (this.state.name === "") {
      return true;
    } else {
      return false;
    }
  };

  AddingNote = () => {
    store.dispatch(
      addNote({
        id: this.state.id,
        name: this.state.name,
        body: this.state.body,
      })
    ),
      this.props.navigation.navigate("Tab", { screen: "My Notes" });
  };

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.boldTexting}>Add A Note</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.myText}>Name: </Text>
          <TextInput
            style={styles.inputting}
            maxLength={50}
            placeholder="Enter the name of your note"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Detail Information </Text>
          <TextInput
            value={this.state.body}
            multiline={true}
            placeholder={"Enter the message of the note."}
            onChangeText={(text) => this.setState({ body: text })}
          />
        </View>
        <Text> </Text>
        <Button
          color={"black"}
          title={"GO BACK"}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <Text> </Text>
        <Text> </Text>
        <Button
          title={"SAVE CHANGES"}
          disabled={this.checkButton()}
          onPress={() => {
            this.AddingNote();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.notesId,
});

export default connect(mapStateToProps)(addMyNote);
