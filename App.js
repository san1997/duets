import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";

/* to ignore the timer warning */
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

/* Load Screens here */
import WelcomePage from "./src/screens/welcomePage";
import LoginPage from "./src/screens/loginPage";
import HomeScreen from "./src/screens/homeScreen";

/*Optionally import the services that you want to use */
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

const Stack = createStackNavigator();

export default function App() {
  const temp = "test1";
  let ans = "start";
  var starCountRef = firebase.database().ref("user");
  starCountRef.on("value", function (snapshot) {
    ans = snapshot;
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
