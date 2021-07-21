import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialSearchBar1 from "../../../components/MaterialSearchBar1";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCardWithImageAndTitle from "../../../components/MaterialCardWithImageAndTitle";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as axios from "axios";
import store from "../../../store/store";
import { updateUser } from "../../../store/actions";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: this.props.friends,
      rerender: false,
      isAddContact: false,
      friendName: "",
      friendEmail: "",
      description: "",
      err: "",
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "aclonica-regular": require("../../../assets/fonts/aclonica-regular.ttf"),
    });
  }

  renderItem = (props) => {
    return (
      <MaterialCardWithImageAndTitle
        cardBody="rgba(254,254,254,1)"
        titleStyle={props.name}
        subtitleStyle={props.email}
        actionText1="Call"
        actionText2="Message"
        actionBody="rgba(126,211,33,1)"
        style={styles.materialCardWithImageAndTitle}
      ></MaterialCardWithImageAndTitle>
    );
  };

  render() {
    if (this.state.isAddContact) {
      return (
        <View style={styles.AddHeaderContainer}>
          <Text style={styles.addContacts}>Add Contacts</Text>
          <View
            style={[styles.headerContainer, styles.cupertinoSegmentWithTwoTabs]}
          >
            <View
              style={[
                styles.textWrapper,
                {
                  backgroundColor: "rgba(200,249,249,1)",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isAddContact: false });
                }}
                style={styles.segmentTextWrapperRight}
              >
                <Text style={styles.titleRight}>My Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isAddContact: true });
                }}
                style={styles.segmentTextWrapperLeft}
              >
                <Text style={styles.titleLeft}>Add Contacts</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[styles.textInputContainer, styles.materialIconTextbox1]}
          >
            <MaterialCommunityIcons
              name={"account-plus-outline"}
              style={styles.iconStyle}
            ></MaterialCommunityIcons>
            <TextInput
              onChangeText={(text) => {
                this.setState({ friendName: text });
              }}
              placeholder={"Enter your friend's name"}
              style={styles.inputStyle}
            ></TextInput>
          </View>
          <View
            style={[styles.textInputContainer, styles.materialIconTextbox1]}
          >
            <MaterialCommunityIcons
              name={"email"}
              style={styles.iconStyle}
            ></MaterialCommunityIcons>
            <TextInput
              placeholder={"Enter your friend's email"}
              style={styles.inputStyle}
              onChangeText={(text) => {
                this.setState({ friendEmail: text });
              }}
            ></TextInput>
          </View>
          <View
            style={[styles.textInputContainer, styles.materialIconTextbox1]}
          >
            <MaterialCommunityIcons
              name={"account-details"}
              style={styles.iconStyle}
            ></MaterialCommunityIcons>
            <TextInput
              onChangeText={(text) => {
                this.setState({ description: text });
              }}
              multiline
              placeholder={"Describe your relation with the person."}
              style={styles.inputStyle}
            ></TextInput>
          </View>
          <Text style={styles.text}>
            *Note: Your relation will be shown to your friend.
          </Text>
          <Text style={{ color: "red", marginLeft: 4 }}>{this.state.err}</Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                const result = await axios.put(
                  "http://192.168.43.20:3000/me/addFriend",
                  {
                    name: this.state.friendName,
                    email: this.state.friendEmail,
                    description: this.state.description,
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
                console.log("user is ", store.getState().user);
                this.setState((prevState) => ({
                  isAddContact: false,
                  rerender: !prevState.rerender,
                }));
              } catch (err) {
                this.setState({ err: err.response.data });
              }
            }}
            style={[styles.buttonContainer, styles.materialButtonPink]}
          >
            <Text style={styles.caption}>Send Friend Request</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MaterialSearchBar1
          style={styles.materialSearchBar1}
        ></MaterialSearchBar1>
        <View style={styles.myContactsStack}>
          <Text style={styles.myContacts}>My Contacts</Text>
          <Icon name="people" style={styles.icon}></Icon>
        </View>
        <View style={[styles.headerContainer, styles.headerSegment]}>
          <View
            style={[
              styles.textWrapper,
              {
                backgroundColor: "rgba(200,249,249,1)",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ isAddContact: false });
              }}
              style={styles.segmentTextWrapperLeft}
            >
              <Text style={styles.titleLeft}>My Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.segmentTextWrapperRight}
              onPress={async () => {
                this.setState({ isAddContact: true });
              }}
            >
              <Text style={styles.titleRight}>Add Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.state.friends}
          extraData={this.state.rerender}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.user.friends,
});

export default connect(mapStateToProps)(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
  },
  headerSegment: {
    height: 49,
    width: 358,
    backgroundColor: "rgba(215,245,242,1)",
    overflow: "hidden",
  },
  materialSearchBar1: {
    height: 48,
    width: 375,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 11,
    borderStyle: "solid",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: 22,
  },
  icon2: {
    top: 0,
    position: "absolute",
    color: "rgba(244,9,9,1)",
    fontSize: 70,
    left: 14,
  },
  myContacts: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "aclonica-regular",
    color: "rgba(189,16,224,1)",
    fontSize: 35,
    textAlign: "center",
    width: 375,
    height: 43,
    textDecorationLine: "underline",
  },
  icon: {
    top: 3,
    left: 14,
    position: "absolute",
    color: "rgba(254,4,4,1)",
    fontSize: 40,
    opacity: 0.64,
  },
  myContactsStack: {
    width: 375,
    height: 43,
    marginTop: 17,
  },
  materialCardWithImageAndTitle: {
    height: 159,
    width: 359,
    backgroundColor: "rgba(189,16,224,0.3)",
    borderWidth: 3,
    borderColor: "rgba(22,6,255,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.37,
    shadowRadius: 0,
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 1,
  },
  headerContainer: {
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
  buttonContainer: {
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
  },
  textInputContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8,
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8,
  },
  AddHeaderContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
  },
  addContacts: {
    fontFamily: "aclonica-regular",
    color: "rgba(189,16,224,1)",
    fontSize: 35,
    textAlign: "center",
    width: 375,
    height: 43,
    textDecorationLine: "underline",
    marginTop: 32,
    marginLeft: -8,
  },
  cupertinoSegmentWithTwoTabs: {
    height: 49,
    width: 358,
    backgroundColor: "rgba(215,245,242,1)",
    overflow: "hidden",
    marginTop: 8,
    marginLeft: -8,
  },
  materialIconTextbox: {
    height: 54,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: 78,
    marginLeft: -1,
  },
  materialIconTextbox1: {
    height: 59,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: 20,
    marginLeft: -1,
  },
  materialButtonPink: {
    height: 57,
    width: 168,
    marginTop: 13,
    marginLeft: 87,
  },
  materialIconTextbox2: {
    height: 59,
    width: 360,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 11,
    backgroundColor: "rgba(230, 230, 230,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.24,
    shadowRadius: 0,
    marginTop: -214,
    marginLeft: -1,
  },
  text: {
    fontFamily: "roboto-700",
    color: "rgba(244,17,17,1)",
    height: 71,
    width: 338,
    textAlign: "left",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 1,
  },
});
