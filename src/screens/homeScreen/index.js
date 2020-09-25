import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import UploadScreen from "./UploadScreen";
import EditProfileScreen from "./EditProfileScreen";

const ProfileStack = createStackNavigator();

class HomeScreen extends React.Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={1}>
        <UploadScreen />
        <FeedScreen />
        <NavigationContainer independent="true">
          <ProfileStack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{ headerShown: false }}
          >
            <ProfileStack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
            />
            <ProfileStack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
          </ProfileStack.Navigator>
        </NavigationContainer>
        <ProfileScreen userId={"lDjbCXZC02bECatjaiyFRDr08SN2"} />
      </Swiper>
    );
  }
}

export default HomeScreen;
