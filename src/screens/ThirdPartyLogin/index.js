import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import * as firebase from "firebase";
import 'firebase/firestore';

import googleLogo from "../../assets/google.jpg";
import facebookLogo from "../../assets/facebook.png";
import Loading from "../../../components/Loading"

const firebaseConfig = {
  apiKey: "AIzaSyDsUQKD5-aYCRYxfe0UoIhsbDZNdPLtvjc",
  authDomain: "duets-app-a40c0.firebaseapp.com",
  databaseURL: "https://duets-app-a40c0.firebaseio.com",
  projectId: "duets-app-a40c0",
  storageBucket: "duets-app-a40c0.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class ThirdPartyLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  isUserEqual = (googleUser, firebaseUser) => {
    console.log('user here', googleUser);
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    const that = this;
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (true || !this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .firestore()
                  .collection('users').doc(result.user.uid)
                  .set({
                    profilePicture: result.additionalUserInfo.profile.picture,
                    firstName: result.additionalUserInfo.profile.given_name,
                    lastName: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                    visibility: 'private',
                    following: [],
                    follower: [],
                    userId: 'test_id',
                    duets: []
                  })
                  .then(function(snapshot) {
                    console.log('this is the userid', result.user.uid);
                    that.props.loginUser(result.user.uid);
                  });
              } else {
                firebase
                  .firestore()
                  .collection('users').doc(result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  })
                  .then(function(snapshot) {
                    console.log('this is the userid', result.user.uid);
                    that.props.loginUser(result.user.uid);
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              console.log('error occurerd here', error);
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

  onSignInFacebook = facebookUser => {
    const that = this;
    console.log('inside fb', facebookUser);
    const credential = firebase.auth.FacebookAuthProvider.credential(facebookUser.token);
    console.log('this is credential', credential);
    firebase
     .auth().signInWithCredential(credential)
     .then(result => {
       if (result.additionalUserInfo.isNewUser) {
         firebase
           .firestore()
           .collection('users').doc(result.user.uid)
           .set({
             profilePicture: result.additionalUserInfo.profile.picture.data.url,
             firstName: result.additionalUserInfo.profile.first_name,
             lastName: result.additionalUserInfo.profile.last_name,
             created_at: Date.now(),
             visibility: 'private',
             following: [],
             follower: [],
             userId: 'test_id',
             duets: []
           })
           .then(function(snapshot) {
             console.log('this is the userid', result.user.uid);
             that.props.loginUser(result.user.uid);
           });
       } else {
         firebase
           .firestore()
           .collection('users').doc(result.user.uid)
           .update({
             last_logged_in: Date.now()
           })
           .then(function(snapshot) {
             console.log('this is the userid', result.user.uid);
             that.props.loginUser(result.user.uid);
           });
       }
     })
     .catch(error => {
         console.log(error);
     });
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '126922894384-h1dm84qhsn0oknq50m11ogfagmfnbhf0.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.setState({ loading: true });
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  signInWithFacebookAsync = async () => {
    try {
      await Facebook.initializeAsync('620675282147064');
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (result.type === 'success') {
        this.setState({ loading: true });
        this.onSignInFacebook(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      return { error: true };
      console.log(`Facebook Login Error: ${err}`);
  }
  };
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {this.signInWithGoogleAsync()}}
          >
            <Image
              source={googleLogo}
              style={styles.GoogleIconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {this.signInWithFacebookAsync()}}
          >
            <Image
              source={facebookLogo}
              style={styles.FacebookIconStyle}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GoogleIconStyle: {
    left: -10,
    width: 70,
    height: 70,
  },
  FacebookIconStyle: {
    left: 10,
    width: 50,
    height: 50
  }
});

export default ThirdPartyLogin;
