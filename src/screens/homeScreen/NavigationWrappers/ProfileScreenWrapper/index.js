import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../ProfileScreen";
import EditProfileScreen from "../../EditProfileScreen";

import { profileScreenWrapperStyles } from "./style.js";

const ProfileStack = createStackNavigator();

const ProfileScreenWrapper = () => {
  return (
    <NavigationContainer independent="true">
      <ProfileStack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{ headerShown: false }}
      >
        <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <ProfileStack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />
      </ProfileStack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileScreenWrapper;
