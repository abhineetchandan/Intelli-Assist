import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";

export default class chatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no: 5,
      token: null,
      name: this.props.route.params.name,
      time: this.props.route.params.time,
      message: [this.props.route.params.message],
      image: this.props.route.params.image,
      id: this.props.route.params.id,
      read: this.props.route.params.read,
      messages: [],
    };
    this.socket = io("http://192.168.43.20:3000", {
      auth: {
        token: this.state.token,
      },
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: [...previousState.messages, messages[0]],
    }));
    this.socket.emit("user.message", {
      ...messages,
      userId: this.state.id,
    });
  }

  componentDidUpdate() {}

  async componentDidMount() {
    const token = await SecureStore.getItemAsync("token");
    console.log(token);
    this.socket = io("http://192.168.43.20:3000/", {
      auth: {
        token: token,
      },
    });
    this.socket.on("connect_error", (err) => {
      console.log(err);
    });
    this.socket.on("user.reply", (message) => {
      this.state.messages.push({
        _id: "" + Math.random(),
        text: message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Aparna",
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      // this.state.messages.sort(function(a, b) {
      //   return a.createdAt.getTime() - b.createdAt.getTime();
      // });
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          this.onSend(message);
        }}
        user={{
          _id: 1,
          avatar: "https://placeimg.com/140/140/any",
          name: "Abhineet",
        }}
        inverted={false}
      />
    );
  }
}
