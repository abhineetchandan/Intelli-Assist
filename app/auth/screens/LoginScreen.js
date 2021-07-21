import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native";
import {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import * as Yup from "yup";
import { Text, TextInput } from "react-native";
import store from "../../store/store";
import { updateUser } from "../../store/actions";
import onFacebookButtonPress from "../../functions/facebookLogin";
import onGoogleButtonPress from "../../functions/googleLogin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import appColors from "../../colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";

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

export default class LoginScreen extends React.Component {
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

  async componentDidMount() {
    await Font.loadAsync({
      "comic-sans-ms-regular": require("../../assets/fonts/comic-sans-ms-regular.ttf"),
    });
  }

  async handleGoogleResponse(data) {
    const token = data.headers["x-auth-token"];
    await SecureStore.setItemAsync("token", token);
    store.dispatch(updateUser(data.data));
  }

  infoRequest = new GraphRequest("/me", null, this.responseInfoCallback);

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradientStyle}
          colors={[appColors.fadedPurple, appColors.fadedDarkGreen]}
        >
          <Animatable.Text animation={"bounce"} style={styles.loginText}>
            Login
          </Animatable.Text>
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
                <View style={styles.emailIconContainer}>
                  <View style={styles.emailIconInput}>
                    <MaterialCommunityIconsIcon
                      name="email-outline"
                      style={styles.emailIcon}
                    ></MaterialCommunityIconsIcon>
                    <TextInput
                      placeholder="Enter your email"
                      autoCapitalize="none"
                      onChangeText={handleChange("email")}
                      keyboardType="email-address"
                      onBlur={() => setFieldTouched("email")}
                      maxLength={60}
                      returnKeyLabel=""
                      style={styles.emailInputText}
                    ></TextInput>
                  </View>
                </View>

                {touched.email && (
                  <Text
                    style={{
                      color: appColors.red,
                      paddingLeft: wp("5"),
                      marginBottom: hp("1"),
                      textDecorationLine: "underline",
                    }}
                  >
                    {errors.email}
                  </Text>
                )}
                <View style={styles.passwordViewContainer}>
                  <View style={styles.keyIconTextContainer}>
                    <MaterialCommunityIconsIcon
                      name="key-variant"
                      style={styles.keyIcon}
                    ></MaterialCommunityIconsIcon>
                    <TextInput
                      autoCapitalize="none"
                      onBlur={() => setFieldTouched("password")}
                      autoCorrect={false}
                      onChangeText={handleChange("password")}
                      placeholder="Enter your password"
                      secureTextEntry={true}
                      maxLength={60}
                      style={styles.passwordInput}
                    ></TextInput>
                  </View>
                </View>
                {touched.password && (
                  <Text
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
                <Text style={{ color: "red", paddingLeft: wp("5") }}>
                  {this.state.error}
                </Text>

                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                <View style={styles.continueButtonContainer}>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Animatable.Text
                      animation={"rubberBand"}
                      style={styles.continueButtonText}
                    >
                      Continue
                    </Animatable.Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <Text style={{ color: "red" }}>{this.state.err}</Text>
          <Text style={styles.bottomSignin}>Login using</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: wp("15"),
              marginRight: wp("15"),
              justifyContent: "center",
            }}
          >
            <GoogleSigninButton
              style={{ height: hp("6"), width: wp("30") }}
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
                  height: hp("5.2"),
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <Text
              onPress={() => this.props.navigation.navigate("Register Page")}
              style={styles.noAccount}
            >
              Don't have an account?
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
  gradientStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loginText: {
    fontFamily: "comic-sans-ms-regular",
    color: appColors.white,
    fontSize: hp("10"),
    marginTop: hp(4),
    marginBottom: hp(10),
    alignSelf: "center",
  },
  bottomSignin: {
    alignSelf: "center",
    fontSize: wp("4.5"),
    marginTop: hp("3"),
    color: appColors.white,
  },
  emailIconContainer: {
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
  emailInputText: {
    fontFamily: "roboto-regular",
    color: appColors.fadedBlack,
    fontSize: hp("3"),
    marginLeft: wp("3"),
    width: wp("80"),
    alignSelf: "center",
  },
  emailIconInput: {
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
    alignSelf: "center",
    fontSize: hp("3.5"),
  },
  passwordInput: {
    fontSize: hp("3"),
    marginLeft: wp(3),
  },
  keyIconTextContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: wp("2"),
  },
  forgotPassword: {
    fontFamily: "roboto-regular",
    color: appColors.cyan,
    width: wp("33.5"),
    textDecorationLine: "underline",
    height: hp("2.8"),
    fontSize: wp("4"),
    marginLeft: wp("7"),
  },
  continueButtonContainer: {
    width: wp("30"),
    height: hp("7"),
    backgroundColor: appColors.pink,
    borderRadius: 100,
    marginTop: hp("2"),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: "roboto-700",
    color: appColors.white,
    fontSize: 20,
  },
  noAccount: {
    color: appColors.white,
    alignContent: "flex-end",
    fontSize: hp("2.3"),
    color: appColors.darkYellow,
    marginTop: hp("10"),
    alignSelf: "center",
  },
});
