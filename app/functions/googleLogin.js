import { GoogleSignin } from '@react-native-google-signin/google-signin';
import store from '../store/store'
import { updateUser } from '../store/actions'

export default async function onGoogleButtonPress() {
  
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    offlineAccess: true,
    webClientId: '66061236924-eri8f5v16ovb27ccpkgdtmnukkutt2t0.apps.googleusercontent.com',
  })

  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  console.log('userInfo I got is', userInfo)

  const {idToken, accessToken } = userInfo
  store.dispatch(updateUser(userInfo.user))  
  console.log(idToken, accessToken)
  // Create a Google credential with the token
//  const googleCredential = auth.GoogleAuthProvider.credential(idToken, //accessToken);
   //console.log('googleLoginCredentials ', googleCredential)
  // Sign-in the user with the credential
}
