import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { Text } from "react-native";
import store from "../../store/store";
import { updateUser, hasUser } from "../../store/actions";
import onFacebookButtonPress from "../../functions/facebookLogin";
import onGoogleButtonPress from "../../functions/googleLogin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { LoginButton } from "react-native-fbsdk";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import appColors from "../../colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import AuthContext from "../../AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6)
    .label("Password"),
  name: Yup.string()
    .required()
    .label("Name")
    .min(3)
    .max(40),
});

export default class RegisterScreen extends React.Component {
  state = {
    error: "",
  };

  static contextType = AuthContext;

  async handleSubmit(values) {
    try {
      const siteUser = await axios.post(
        "http://192.168.43.20:3000/users/signup",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      const token = siteUser.headers["x-auth-token"];
      await SecureStore.setItemAsync("token", token);
      store.dispatch(updateUser(siteUser.data));
      let user = this.context;
      user.setUser(true);
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      "comic-sans-ms-regular": require("../../assets/fonts/comic-sans-ms-regular.ttf"),
    });
  }

  async handleGoogleResponse(data) {
    const token = data.headers["x-auth-token"];
    await SecureStore.setItemAsync("token", token);
    store.dispatch(updateUser(data.data));
    let user = this.context;
    user.setUser(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradientStyle}
          colors={[appColors.fadedPurple, appColors.fadedDarkGreen]}
        >
          <Animatable.Text animation={"bounce"} style={styles.signup}>
            Register
          </Animatable.Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "", name: "" }}
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
                <View style={styles.nameViewContainer}>
                  <View style={styles.nameContainer}>
                    <FontAwesomeIcon
                      name="male"
                      style={styles.manStyle}
                    ></FontAwesomeIcon>
                    <TextInput
                      placeholder="Enter your name"
                      maxLength={30}
                      placeholderTextColor="rgba(92,88,88,1)"
                      style={styles.nameInput}
                      onBlur={() => setFieldTouched("name")}
                      onChangeText={handleChange("name")}
                      autoCapitalize="none"
                      autoCorrect={false}
                    ></TextInput>
                  </View>
                </View>

                {touched.name && (
                  <Text
                    style={{
                      color: appColors.red,
                      paddingLeft: wp("5"),
                      marginBottom: hp("0.5"),
                      textDecorationLine: "underline",
                    }}
                  >
                    {errors.name}
                  </Text>
                )}

                <View style={styles.emailViewContainer}>
                  <View style={styles.emailContainer}>
                    <MaterialCommunityIconsIcon
                      name="email-outline"
                      style={styles.emailIcon}
                    ></MaterialCommunityIconsIcon>
                    <TextInput
                      placeholder="Enter your email"
                      maxLength={60}
                      placeholderTextColor="rgba(84,79,79,1)"
                      style={styles.textInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onBlur={() => setFieldTouched("email")}
                      onChangeText={handleChange("email")}
                    ></TextInput>
                  </View>
                </View>

                {touched.email && (
                  <Text
                    style={{
                      color: appColors.red,
                      paddingLeft: wp("5"),
                      marginBottom: hp("0.5"),
                      textDecorationLine: "underline",
                    }}
                  >
                    {errors.email}
                  </Text>
                )}

                <View style={styles.passwordViewContainer}>
                  <View style={styles.passwordContainer}>
                    <MaterialCommunityIconsIcon
                      name="key-variant"
                      style={styles.keyIcon}
                    ></MaterialCommunityIconsIcon>
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(102,90,90,1)"
                      maxLength={60}
                      secureTextEntry={true}
                      style={styles.passwordInput}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onBlur={() => setFieldTouched("password")}
                    ></TextInput>
                  </View>
                </View>
                {touched.password && (
                  <Text
                    visible={touched.password}
                    style={{
                      color: appColors.red,
                      paddingLeft: wp("5"),
                      marginBottom: hp("0.5"),
                      textDecorationLine: "underline",
                    }}
                  >
                    {errors.password}
                  </Text>
                )}

                <View style={styles.continueContainer}>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Animatable.Text
                      animation={"tada"}
                      style={styles.continueButton}
                    >
                      Continue
                    </Animatable.Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <Text style={{ color: "red", paddingLeft: wp("5") }}>
            {this.state.error}
          </Text>

          <Text style={styles.bottomSignin}>Register using</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: wp("15"),
              marginRight: wp("15"),
              justifyContent: "center",
            }}
          >
            <GoogleSigninButton
              style={{ height: hp("5.5"), width: wp("30") }}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={() =>
                onGoogleButtonPress().then((data) =>
                  this.handleGoogleResponse(data)
                )
              }
            />
            <TouchableOpacity
              style={{ paddingTop: 3 }}
              onPress={() =>
                onFacebookButtonPress().then(({ name }) => {
                  new GraphRequestManager()
                    .addRequest(this.infoRequest)
                    .start();
                  setTimeout(() => {
                    store.dispatch(hasUser(true));

                    this.props.navigation.navigate("Detail Page", {
                      name: name,
                    });
                  }, 2000);
                })
              }
            >
              <LoginButton
                style={{
                  width: wp("30"),
                  height: hp("4.7"),
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <Text
              onPress={() => this.props.navigation.navigate("Login Page")}
              style={styles.noAccount}
            >
              Already have an account?
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
  },
  signup: {
    fontFamily: "comic-sans-ms-regular",
    color: appColors.white,
    fontSize: hp("10"),
    marginTop: hp(4),
    marginBottom: hp("6"),
    alignSelf: "center",
  },
  gradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bottomSignin: {
    alignSelf: "center",
    fontSize: wp("4.5"),
    marginTop: hp("3"),
    color: appColors.white,
  },
  nameViewContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    marginRight: wp("5"),
    borderRadius: 50,
    marginLeft: wp("5"),
    borderColor: appColors.black,
    backgroundColor: appColors.dullWhite,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: hp("1"),
  },
  manStyle: {
    color: appColors.darkPink,
    fontSize: hp("3.5"),
    alignSelf: "center",
  },
  nameInput: {
    fontFamily: "roboto-regular",
    color: appColors.fadedBlack,
    fontSize: hp("3"),
    marginLeft: wp("3"),
    alignSelf: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: wp("2"),
  },
  emailViewContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    marginRight: wp("5"),
    borderRadius: 50,
    marginLeft: wp("5"),
    borderColor: appColors.black,
    backgroundColor: appColors.dullWhite,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: hp("1"),
  },
  emailIcon: {
    color: appColors.darkPink,
    fontSize: hp("3.5"),
    alignSelf: "center",
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: appColors.fadedBlack,
    fontSize: hp("3"),
    marginLeft: wp("3"),
    alignSelf: "center",
  },
  emailContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: wp("2"),
  },
  passwordViewContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    marginRight: wp("5"),
    borderRadius: 50,
    marginLeft: wp("5"),
    borderColor: appColors.black,
    backgroundColor: appColors.dullWhite,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: hp("1"),
  },
  keyIcon: {
    color: appColors.darkPink,
    fontSize: hp("3.5"),
    alignSelf: "center",
  },
  passwordInput: {
    fontSize: hp("3"),
    marginLeft: wp(3),
  },
  passwordContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: wp("2"),
  },
  continueContainer: {
    width: wp("30"),
    height: hp("7"),
    backgroundColor: appColors.pink,
    borderRadius: 100,
    marginTop: hp("2"),
    alignSelf: "center",
    justifyContent: "center",
  },
  continueButton: {
    fontFamily: "roboto-700",
    color: appColors.white,
    fontSize: 20,
    alignSelf: "center",
  },
  noAccount: {
    color: appColors.white,
    alignContent: "flex-end",
    fontSize: hp("2.3"),
    color: appColors.darkYellow,
    marginTop: hp("7.5"),
    alignSelf: "center",
  },
});
