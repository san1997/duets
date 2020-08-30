import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
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

var database = firebase.database();

export default function App() {
  const temp = 'test1';
  let ans = 'start';
  var starCountRef = firebase.database().ref('user');
  starCountRef.on('value', function(snapshot) {
    ans = snapshot;
  });
  return (
    <View style={styles.container}>
      <Text>{`App.js is the main${JSON.stringify(ans)} file here!`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
