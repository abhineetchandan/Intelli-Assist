import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native";
import {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import * as Yup from "yup";
import { Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import store from "../store/store";
import { updateUser } from "../store/actions";
import onFacebookButtonPress from "../functions/facebookLogin";
import onGoogleButtonPress from "../functions/googleLogin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6)
    .label("Password"),
});

export default class loginPage extends React.Component {
  state = {
    error: "",
    name: "",
  };

  async handleSubmit(values) {
    try {
      const user = await axios.post("http://192.168.43.20:3000/users/login", {
        email: values.email,
        password: values.password,
      });
      const token = user.headers["x-auth-token"];
      await SecureStore.setItemAsync("token", token);
      store.dispatch(updateUser(user.data));
      this.props.navigation.navigate("Tab", {
        screen: "Home",
      });
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      const resultJson = result;
      this.setState({ name: resultJson.name });
      console.log("loginPage", result.name);
    }
  };

  infoRequest = new GraphRequest("/me", null, this.responseInfoCallback);

  render() {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => this.handleSubmit(values)}
        >
          {({
            handleChange,
            handleSubmit,
            touched,
            setFieldTouched,
            errors,
          }) => (
            <>
              <View styles={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  style={{ paddingTop: 20 }}
                  name="email"
                  size={25}
                />
                <TextInput
                  style={{ paddingLeft: 10 }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                  placeholder={"Email"}
                />
              </View>

              {touched.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  style={{ marginTop: 5 }}
                  name="lock"
                  size={25}
                />
                <TextInput
                  autoCapitalize="none"
                  onBlur={() => setFieldTouched("password")}
                  autoCorrect={false}
                  icon="lock"
                  onChangeText={handleChange("password")}
                  placeholder={"Password"}
                  secureTextEntry
                />
              </View>

              {touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <Text style={{ color: "red" }}>{this.state.error}</Text>
              <Button
                title="LOGIN"
                onPress={() => handleSubmit()}
                color="red"
              />
            </>
          )}
        </Formik>
        <Text style={{ color: "red" }}>{this.state.err}</Text>
        <Text
          style={{
            alignSelf: "center",
            paddingLeft: 30,
            paddingTop: 40,
            paddingRight: 20,
            color: "blue",
          }}
        >
          Sign-In using:
        </Text>
        <View style={{ flexDirection: "row" }}>
          <GoogleSigninButton
            style={{ width: 192, height: 35 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                this.props.navigation.navigate("Tab", { screen: "Home" })
              )
            }
          />
          <TouchableOpacity
            style={{ paddingTop: 3 }}
            onPress={() =>
              onFacebookButtonPress().then(({ name }) => {
                new GraphRequestManager().addRequest(this.infoRequest).start();
                setTimeout(() => {
                  this.props.navigation.navigate("Detail Page", {
                    name: name,
                  });
                }, 2000);
              })
            }
          >
            <LoginButton />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="microsoft"
              size={25}
              style={{ margin: 5, paddingRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  logo: {},
});
