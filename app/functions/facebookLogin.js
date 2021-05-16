import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  console.log('result', result)
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  console.log('data', data)
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
//  const facebookCredential = auth.FacebookAuthProvider.credential//(data.accessToken);
  //console.log('facebook credentials', facebookCredential);
  }
