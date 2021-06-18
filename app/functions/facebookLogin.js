import { LoginManager, AccessToken } from "react-native-fbsdk";
import axios from "axios";

export default async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);
  console.log("result", result);
  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  console.log("data", data.accessToken);
  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  const res = await axios.post("http://192.168.43.20:3000/users/facebook", {
    accessToken: data.accessToken,
  });

  return res.data;

  // Create a Firebase credential with the AccessToken
  //  const facebookCredential = auth.FacebookAuthProvider.credential//(data.accessToken);
  //console.log('facebook credentials', facebookCredential);
}
