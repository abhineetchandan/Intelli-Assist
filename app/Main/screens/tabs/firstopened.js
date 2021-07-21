import React from "react";
import { View, Text, Button, Switch } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import styles from "./styles";
import store from "../../../store/store";
import { CHANGE_SHOW, updateUser } from "../../../store/actions";
import ModalSelector from "react-native-modal-selector";
import * as SecureStore from "expo-secure-store";

class firstOpened extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      savingUser: "",
      primaryLanguage: "english",
      secondaryLanguage: "",
      password: "",
      autoLogin: false,
      usePassword: true,
      shouldAutoLogin: this.props.autoLogin,
      shouldUsePassword: this.props.shouldUsePassword,
      errMessage: "",
    };
    this.languages = [
      { id: 1, language: "عربى (Arabic)", name: "arabic" },
      { id: 2, language: "বাংলা (Bangla)", name: "bangla" },
      { id: 3, language: "中國香 (Chinese)", name: "mandarin" },
      { id: 4, language: "Nederlands (Dutch)", name: "dutch" },
      { id: 5, language: "English", name: "english" },
      { id: 6, language: "français (French)", name: "french" },
      { id: 7, language: "Deutsche (German)", name: "german" },
      { id: 8, language: "Ελληνικά (Greek)", name: "greek" },
      { id: 9, language: "हिंदी (Hindi)", name: "hindi" },
      { id: 10, language: "bahasa Indonesia (Indonesian)", name: "indonesian" },
      { id: 11, language: "italiano (Italian)", name: "italian" },
      { id: 12, language: "日本語 (Japanese)", name: "japanese" },
      { id: 13, language: "मराठी (Marathi)", name: "marathi" },
      { id: 14, language: "Polskie (Polish)", name: "polish" },
      { id: 15, language: "português (Portuguese)", name: "portuguese" },
      { id: 16, language: "русский (Russian)", name: "russian" },
      { id: 17, language: "español (Spanish)", name: "spanish" },
      { id: 18, language: "தமிழ் (Tamil)", name: "tamil" },
      { id: 19, language: "తెలుగు (Telugu)", name: "telugu" },
      { id: 20, language: "Türk (Turkish)", name: "turkish" },
    ];
  }

  componentDidMount() {
    console.log("autoLogin: ", this.state.shouldAutoLogin);
  }

  savePassword = async () => {
    await SecureStore.setItemAsync("password", this.state.password);
  };

  checkButton = () => {
    if (this.state.savingUser !== "" && this.state.secondaryLanguage !== "") {
      if (this.state.usePassword && this.state.password !== "") {
        return false;
      } else if (this.state.usePassword === false) {
        return false;
      } else return true;
    } else {
      return true;
    }
  };

  dispatchUsername = () => {
    if (this.state.usePassword) {
      this.savePassword();
      store.dispatch(
        updateUser({
          name: this.state.savingUser,
          language: this.state.secondaryLanguage,
          autoLogin: this.state.autoLogin,
          shouldUsePassword: this.state.usePassword,
        })
      );
      store.dispatch({ type: CHANGE_SHOW, payload: "" });
      this.props.navigation.navigate("Tab", { screen: "Home" });
    } else {
      store.dispatch(
        updateUser({
          name: this.state.savingUser,
          language: this.state.secondaryLanguage,
          autoLogin: this.state.autoLogin,
          usePassword: this.state.usePassword,
        })
      );
      store.dispatch({ type: CHANGE_SHOW, payload: "" });
      this.props.navigation.navigate("Tab", { screen: "Home" });
    }
  };

  validatePassword = async () => {
    const name = await SecureStore.getItemAsync("password");
    if (name === this.state.password) {
      this.props.navigation.navigate("Tab", { screen: "Home" });
    } else {
      this.setState({ errMessage: "Wrong Credential" });
    }
  };

  passwordButtonValidate = () => {
    if (this.state.password === "") return true;
    return false;
  };

  checkPassword = () => {
    if (this.state.usePassword) {
      return true;
    } else {
      return false;
    }
  };

  componentDidUpdate() {}

  render() {
    if (this.state.user === "undefined" && this.props.appCount === 0) {
      return (
        <View style={styles.frontPageView}>
          <Text style={styles.smalltexting}>Enter Your Name To Begin</Text>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.savingUser}
            autoCapitalize="words"
            placeholder={"Enter your name"}
            maxLength={30}
            placeholderTextColor={"white"}
            keyboardType="default"
            onChangeText={(text) => this.setState({ savingUser: text })}
          />
          <ModalSelector
            data={this.languages}
            touchableStyle={{ backgroundColor: "orange" }}
            onChange={(option) => {
              this.setState({ secondaryLanguage: option.name });
            }}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) => item.language}
            style={{ paddingBottom: 60 }}
            initValue="Choose language to receive notification"
            cancelText="Cancel"
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>
              Would You Like To have a Password
            </Text>
            <Switch
              value={this.state.usePassword}
              onValueChange={() =>
                this.setState({ usePassword: !this.state.usePassword })
              }
            />
          </View>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.password}
            autoCapitalize="words"
            placeholder={"Enter your password"}
            maxLength={30}
            placeholderTextColor={"white"}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry
            editable={this.checkPassword()}
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>Keep Me Logged In!</Text>
            <Switch
              value={this.state.autoLogin}
              onValueChange={() =>
                this.setState({ autoLogin: !this.state.autoLogin })
              }
            />
          </View>
          <Button
            title="Go to Home"
            disabled={this.checkButton()}
            onPress={() => {
              this.dispatchUsername();
            }}
          />
        </View>
      );
    } else if (this.props.show === true) {
      return (
        <View style={styles.frontPageView}>
          <Text style={styles.smalltexting}>Enter Your Name To Begin</Text>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.savingUser}
            autoCapitalize="words"
            placeholder={"Enter your name"}
            maxLength={30}
            placeholderTextColor={"white"}
            keyboardType="default"
            onChangeText={(text) => this.setState({ savingUser: text })}
          />
          <ModalSelector
            data={this.languages}
            touchableStyle={{ backgroundColor: "orange" }}
            onChange={(option) => {
              this.setState({ secondaryLanguage: option.name });
            }}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) => item.language}
            style={{ paddingBottom: 60 }}
            initValue="Choose language to receive notification"
            cancelText="Cancel"
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>
              Would You Like To have a Password
            </Text>
            <Switch
              value={this.state.usePassword}
              onValueChange={() => {
                this.setState({ usePassword: !this.state.usePassword });
                if (this.state.usePassword === false) {
                  this.setState({ password: "" });
                }
              }}
            />
          </View>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.password}
            autoCapitalize="words"
            placeholder={"Enter your password"}
            maxLength={30}
            placeholderTextColor={"white"}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry
            editable={this.checkPassword()}
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>Keep Me Logged In!</Text>
            <Switch
              value={this.state.autoLogin}
              onValueChange={() =>
                this.setState({ autoLogin: !this.state.autoLogin })
              }
            />
          </View>
          <Button
            title="Save Changes and Go to Home"
            disabled={this.checkButton()}
            onPress={() => {
              this.dispatchUsername();
            }}
          />
          <Text> </Text>
          <Button
            title="Go Back"
            disabled={this.checkButton()}
            onPress={() => {
              this.props.navigation.navigate("Tab", { screen: "Settings" });
            }}
          />
        </View>
      );
    } else if (this.state.shouldAutoLogin === true) {
      this.props.navigation.navigate("Tab", { screen: "Home" });
      return null;
    } else if (
      this.state.username !== undefined &&
      this.state.shouldUsePassword &&
      !this.state.shouldAutoLogin
    ) {
      return (
        <View style={styles.frontPageView}>
          <Text
            style={styles.smalltexting}
          >{`Hello ${this.state.username}`}</Text>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.password}
            autoCapitalize="words"
            placeholder={"Please Enter Your Password"}
            maxLength={30}
            placeholderTextColor={"white"}
            secureTextEntry
            onChangeText={(text) => this.setState({ password: text })}
          />
          <Button
            title="Validate and Go to Home"
            disabled={this.passwordButtonValidate()}
            onPress={() => {
              this.validatePassword();
            }}
          />
          <Text
            style={{
              color: "red",
              backgroundColor: "black",
              alignSelf: "center",
            }}
          >
            {this.state.errMessage}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.frontPageView}>
          <Text style={styles.smalltexting}>Enter Your Name To Begin</Text>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.savingUser}
            autoCapitalize="words"
            placeholder={"Enter your name"}
            maxLength={30}
            placeholderTextColor={"white"}
            keyboardType="default"
            onChangeText={(text) => this.setState({ savingUser: text })}
          />
          <ModalSelector
            data={this.languages}
            touchableStyle={{ backgroundColor: "orange" }}
            onChange={(option) => {
              this.setState({ secondaryLanguage: option.name });
            }}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) => item.language}
            style={{ paddingBottom: 60 }}
            initValue="Choose language to receive notification"
            cancelText="Cancel"
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>
              Would You Like To have a Password
            </Text>
            <Switch
              value={this.state.usePassword}
              onValueChange={() =>
                this.setState({ usePassword: !this.state.usePassword })
              }
            />
          </View>
          <TextInput
            style={styles.firstPageInput}
            value={this.state.password}
            autoCapitalize="words"
            placeholder={"Enter your password"}
            maxLength={30}
            placeholderTextColor={"white"}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry
            editable={this.checkPassword()}
          />
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text style={{ paddingRight: 20 }}>Keep Me Logged In!</Text>
            <Switch
              value={this.state.autoLogin}
              onValueChange={() =>
                this.setState({ autoLogin: !this.state.autoLogin })
              }
            />
          </View>
          <Button
            title="Go to Home"
            disabled={this.checkButton()}
            onPress={() => {
              this.dispatchUsername();
            }}
          />
        </View>
      );
    }
  }
}

const mapStatetoProps = (state) => ({
  username: state.user.name,
  appCount: state.appCount,
  show: state.shouldShow,
  autoLogin: state.user.autoLogin,
  shouldUsePassword: state.user.shouldUsePassword,
});

export default connect(mapStatetoProps)(firstOpened);
