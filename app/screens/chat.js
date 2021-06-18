import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Abhineet",
          message: "Hello",
          time: "12:00 pm",
          id: "1",
          read: true,
        },
      ],
      loaded: false,
    };
  }

  // componentDidMount(){
  //   this.socket.on('connect', () => {
  //     console.log("I am connected")
  //   })
  // }

  render() {
    return (
      <View>
        <FlatList
          style={styles.FlatList}
          data={this.state.data}
          renderItem={(item) => this._renderPersonRow(item.item)}
          keyExtractor={(item) => item.id}
          extraData={this.state.data}
        />
      </View>
    );
  }

  _renderPersonRow(person) {
    const src = "../assets/logo.png";
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Chat Page", {
            name: person.name,
            image: person.image,
            message: person.message,
            time: person.time,
            read: person.read,
            id: person.id,
          });
        }}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require(src)}
              style={styles.initStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  {person.name}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{ fontSize: 11 }}>{person.time}</Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Icon
                name="done-all"
                color={person.read ? "#075e54" : "#777"}
                size={15}
                style={{ padding: 0 }}
              />
              <Text
                numberOfLines={1}
                style={{ flex: 1, fontSize: 12, color: "#777" }}
              >
                {person.message}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.user.friends,
});

export default connect(mapStateToProps)(Chats);

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25,
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  FlatList: {
    paddingTop: 5,
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1,
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});
module.exports = Chats;
