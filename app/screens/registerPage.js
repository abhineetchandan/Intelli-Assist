import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native";
import * as Yup from "yup";
import { Text } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import auth from '@react-native-firebase/auth'
import store from '../store/store'
import { updateUser } from '../store/actions'
import onFacebookButtonPress from '../functions/facebookLogin'
import onGoogleButtonPress from '../functions/googleLogin'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { LoginButton } from 'react-native-fbsdk'
import storage from '@react-native-firebase/storage'

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

export default class registerPage extends React.Component {
  state={
    err: ''
  }

  async handleSubmit(values) {
    try{
    let response = await(auth().createUserWithEmailAndPassword(values.email, values.password))
    console.log(response)
    store.dispatch(updateUser({response}))
    const reference = storage().ref(`${response.uid}.txt`) 
    
  const re = await reference.putFile(this.state.err);
console.log('re', re)
this.props.navigation.navigate('Detail Page', {name: ''})
    
  } catch (err) {
    const stringErr = `${err}`
    const formatErr = stringErr.replace(/ *\[[^]*\] */g, " ").trim()
    this.setState({err: `${formatErr}`})
	  console.log(this.state.err)
  }
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: "", password: ""}}
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
                <MaterialCommunityIcons style={{paddingTop: 20}} name="email" size={25} />
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
                <MaterialCommunityIcons style={{marginTop: 5}} name="lock" size={25} />
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

              <Button title="REGISTER"  onPress={() => handleSubmit()} color="red" />
            </>
          )}
        </Formik>
	<Text style={{color: 'red'}}>{this.state.err}</Text>
<Text style={{alignSelf: 'center', paddingLeft: 30, paddingTop: 40, paddingRight: 20, color: 'blue'}}>Register using:</Text>
        <View style={{flexDirection: 'row'}}>
	    
    <GoogleSigninButton
    style={{ width: 192, height: 35 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={() => onGoogleButtonPress().then(() => this.props.navigation.navigate('Tab', {screen: 'Home'}))}
    />	  
        <TouchableOpacity style={{paddingTop: 3}} onPress={() => onFacebookButtonPress().then(this.props.navigation.navigate('Tab', {screen: 'Home'}))} >
	  <LoginButton /> 
	</TouchableOpacity>
        <TouchableOpacity>
	  <MaterialCommunityIcons name='microsoft' size={25} style={{ margin: 5, paddingRight: 10}}  />
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
