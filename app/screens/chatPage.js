import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";

export default class chatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no: 5,
      name: this.props.route.params.name,
      time: this.props.route.params.time,
      message: [this.props.route.params.message],
      image: this.props.route.params.image,
      id: this.props.route.params.id,
      read: this.props.route.params.read,
      messages: [
        {
          _id: 1,
          text: "Hello",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    };
    this.socket = io("http://192.168.43.20:3000");
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(messages);
    this.socket.emit("user.message", {
      ...messages,
      userId: this.state.id,
    });
  }

  componentDidUpdate() {
    console.log(this.state.messages);
  }

  componentDidMount() {
    this.socket.connect();
    this.socket.on("message", (message) => {
      console.log(message);
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
      // const newArr = this.state.messages.sort(function(a, b) {
      //   return a.createdAt - b.createdAt;
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
        }}
        inverted
      />
    );
  }
}
