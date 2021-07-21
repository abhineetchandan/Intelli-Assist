import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native";
import { Button } from "react-native";
import * as Yup from "yup";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import store from "../../../store/store";
import { updateUser } from "../../../store/actions";
import * as ImagePicker from "expo-image-picker";
import { AccessToken, GraphRequest } from "react-native-fbsdk";

export default class userDetail extends React.Component {
  state = {
    err: "",
    name: this.props.route.params.name,
  };

  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.3,
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  async handleSubmit(values) {
    try {
    } catch (err) {
      console.log(this.state.err);
    }
  }

  //Create response callback.
  responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      const resultJson = result;
      this.setState({ name: resultJson.name });
      console.log("responseInfo ", result.name);
    }
  };

  infoRequest = new GraphRequest("/me", null, this.responseInfoCallback);

  componentDidMount() {}

  render() {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <View styles={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            style={{ paddingTop: 20 }}
            name="account"
            size={25}
          />
          <TextInput
            style={{ paddingLeft: 10 }}
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            placeholder={"Name"}
          />
        </View>
        <Button
          title="SAVE MY INFO"
          onPress={() => this.handleSubmit(this.state.name)}
          color="red"
        />
        <Text style={{ color: "red" }}>{this.state.err}</Text>
        <Button
          title="Choose Profile Picture from Device"
          onPress={() => this.pickImage()}
        />
        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  logo: {},
});
