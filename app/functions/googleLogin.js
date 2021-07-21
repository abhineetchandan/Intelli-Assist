import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import store from "../store/store";
import { updateUser } from "../store/actions";
import axios from "axios";

export default async function onGoogleButtonPress() {
  GoogleSignin.configure({
    scopes: ["email", "profile"],
    offlineAccess: true,
    webClientId:
      "880365979204-i489dodqrjsrjmoipg4m2b1hg4i6vpqj.apps.googleusercontent.com",
  });
  console.log("reached first line");
  console.log("status codes are", statusCodes);
  // Get the users ID token
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  console.log("userInfo I got is", userInfo);

  let tokens = await GoogleSignin.getTokens();
  console.log(tokens);
  const res = await axios.post(
    "http://192.168.43.20:3000/users/google",
    tokens
  );
  console.log(res);
  return res;
  // Create a Google credential with the token
  //  const googleCredential = auth.GoogleAuthProvider.credential(idToken, //accessToken);
  //console.log('googleLoginCredentials ', googleCredential)
  // Sign-in the user with the credential
}
