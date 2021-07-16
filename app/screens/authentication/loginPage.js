import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import * as Yup from "yup";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import store from "../../store/store";
import { updateUser } from "../../store/actions";
import onFacebookButtonPress from "../../functions/facebookLogin";
import onGoogleButtonPress from "../../functions/googleLogin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ImageBackground, TextInput } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Ellipse } from "react-native-svg";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";

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

  async componentDidMount() {
    await Font.loadAsync({
      "comic-sans-ms-regular": require("../../assets/fonts/comic-sans-ms-regular.ttf"),
    });
  }

  infoRequest = new GraphRequest("/me", null, this.responseInfoCallback);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={require("../../assets/signupPage.png")}
            resizeMode="contain"
            style={styles.imageBackgroundContainerStyle}
            imageStyle={styles.imageBackgoundStyle}
          >
            <Text style={styles.loginText}>Login</Text>
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
                    <Text style={{ color: "red", paddingLeft: 20 }}>
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
                    <Text style={{ color: "red", paddingLeft: 20 }}>
                      {errors.password}
                    </Text>
                  )}
                  <Text style={{ color: "red", paddingLeft: 20 }}>
                    {this.state.error}
                  </Text>

                  <Text style={styles.forgotPassword}>Forgot Password?</Text>

                  <View style={styles.continueButtonContainer}>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            <Text style={{ color: "red" }}>{this.state.err}</Text>
            <View style={styles.iconsBottomStack}>
              <View style={styles.ellipseStackContainer}>
                <TouchableOpacity
                  style={styles.facebookCircle}
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
                  <Svg viewBox="0 0 70.28 71.45" style={styles.facebookCircle}>
                    <Ellipse
                      stroke="rgba(230, 230, 230,1)"
                      strokeWidth={5}
                      cx={35}
                      cy={36}
                      rx={33}
                      ry={33}
                    ></Ellipse>
                  </Svg>
                  <MaterialCommunityIconsIcon
                    name="facebook"
                    style={styles.facebookIcon}
                  ></MaterialCommunityIconsIcon>
                </TouchableOpacity>
              </View>
              <View style={styles.googleIconStack}>
                <TouchableOpacity
                  onPress={() =>
                    onGoogleButtonPress().then(() =>
                      this.props.navigation.navigate("Tab", { screen: "Home" })
                    )
                  }
                  style={styles.googleCircle}
                >
                  <FontAwesomeIcon
                    name="google"
                    style={styles.googleIcon}
                  ></FontAwesomeIcon>
                  <Svg viewBox="0 0 70.28 71.45" style={styles.googleCircle}>
                    <Ellipse
                      stroke="rgba(230, 230, 230,1)"
                      strokeWidth={5}
                      cx={35}
                      cy={36}
                      rx={33}
                      ry={33}
                    ></Ellipse>
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                console.log("Pressed");
                this.props.navigation.navigate("Register Page");
              }}
            >
            </TouchableOpacity> */}
            <Text style={styles.noAccount}>Don't have an account?</Text>
            {/* 
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
                <LoginButton />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="microsoft"
                  size={25}
                  style={{ margin: 5, paddingRight: 10 }}
                />
              </TouchableOpacity>
            </View> */}
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  imageBackgroundContainerStyle: {
    alignContent: "center",
    alignItems: "center",
  },
  imageBackgoundStyle: {},
  loginText: {
    fontFamily: "comic-sans-ms-regular",
    color: "#121212",
    fontSize: 60,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  emailIconContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    marginRight: 30,
    borderRadius: 50,
    marginLeft: 15,
    borderColor: "#000000",
    backgroundColor: "rgba(230, 230, 230,1)",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  emailIcon: {
    color: "rgba(189,16,224,1)",
    fontSize: 25,
    alignSelf: "center",
  },
  emailInputText: {
    fontFamily: "roboto-regular",
    color: "rgba(99,93,93,1)",
    fontSize: 18,
    marginLeft: 15,
    alignSelf: "center",
  },
  emailIconInput: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 5,
  },
  passwordViewContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    borderRadius: 50,
    marginLeft: 15,
    marginRight: 30,
    borderColor: "#000000",
    backgroundColor: "rgba(230, 230, 230,1)",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  keyIcon: {
    color: "rgba(189,16,224,1)",
    alignSelf: "center",
    fontSize: 25,
  },
  passwordInput: {
    fontSize: 18,
    marginLeft: 15,
  },
  keyIconTextContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 5,
  },
  forgotPassword: {
    fontFamily: "roboto-regular",
    color: "rgba(56,43,243,1)",
    width: 168,
    height: 27,
    fontSize: 15,
    marginTop: 5,
    marginLeft: 32,
  },
  continueButtonContainer: {
    width: 140,
    height: 55,
    backgroundColor: "rgba(255,4,237,1)",
    borderRadius: 100,
    marginTop: 30,
    alignSelf: "center",
  },
  continueButtonText: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 12,
    alignSelf: "center",
  },
  facebookCircle: {
    top: 0,
    left: 0,
    width: 70,
    height: 71,
    position: "absolute",
  },
  facebookIcon: {
    top: 6,
    left: 8,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 54,
    height: 59,
    width: 54,
  },
  ellipseStackContainer: {
    width: 70,
    height: 71,
  },
  googleIcon: {
    top: 15,
    left: 18,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 41,
    height: 41,
    width: 35,
  },
  googleCircle: {
    top: 0,
    left: 0,
    width: 70,
    height: 71,
    position: "absolute",
  },
  googleIconStack: {
    width: 70,
    height: 71,
    marginLeft: 53,
  },
  iconsBottomStack: {
    height: 71,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 113,
    marginRight: 96,
    alignSelf: "center",
  },
  noAccount: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 25,
    width: 211,
    fontSize: 20,
    marginTop: 20,
    marginLeft: 105,
  },
  image1: {
    width: 402,
    height: 841,
    marginLeft: 28,
  },
  imageBackgroundContainer: {
    height: 855,
    flexDirection: "row",
    flex: 1,
    marginRight: -442,
    marginLeft: -11,
    marginTop: -14,
  },
});
