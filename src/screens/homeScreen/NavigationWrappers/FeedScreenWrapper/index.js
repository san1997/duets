import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { feedScreenWrapperStyles } from "./style.js";

import FeedScreen from "../../FeedScreen";
import FullDuetScreen from "../../FeedScreen/FullDuetScreen";

const Stack = createStackNavigator();

class FeedScreenWrapper extends React.Component {
  render() {
    return (
      <NavigationContainer independent>
        <Stack.Navigator
          initialRouteName="FeedScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
          <Stack.Screen name="FullDuetScreen" component={FullDuetScreen} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    );
  }
}

export default FeedScreenWrapper;
