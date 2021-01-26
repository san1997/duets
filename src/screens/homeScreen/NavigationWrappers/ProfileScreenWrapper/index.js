import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";

import ProfileScreen from "../../ProfileScreen";
import EditProfileScreen from "../../EditProfileScreen";
import FullDuetScreen from "../../FeedScreen/FullDuetScreen";

import { AppLoading } from "expo";

import queryString from "query-string";
import { SERVER } from "../../../../constConfig/config";

import images from "../../../../constConfig/images";
import { profileScreenWrapperStyles } from "./style.js";

const ProfileStack = createStackNavigator();

class ProfileScreenWrapper extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      profile_uid: this.props.profile_uid
        ? this.props.profile_uid
        : this.props.route.params.profile_uid,
      users_uid: this.props.users_uid
        ? this.props.users_uid
        : this.props.route.params.users_uid,
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <NavigationContainer independent="true">
        <ProfileStack.Navigator
          initialRouteName="ProfileScreen"
          screenOptions={{ headerShown: false }}
        >
          <ProfileStack.Screen
            name="ProfileScreen"
            initialParams={{
              profile_uid: this.state.profile_uid,
              users_uid: this.state.users_uid,
              isUsersProfile: this.state.users_uid == this.state.profile_uid,
            }}
            options={{
              headerShown: false,
              /*Will remove title and fontsize later*/
              title: "Profile Screen",
              headerTitleStyle: {
                textAlign: "center",
                fontSize: 15,
                marginRight: 50,
              },
              headerLeft: () => (
                <View style={{ marginLeft: 15 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 45,
                    }}
                    source={images.logoImage}
                  />
                </View>
              ),
            }}
            component={ProfileScreen}
          />
          <ProfileStack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <ProfileStack.Screen
            name="FullDuetScreen"
            component={FullDuetScreen}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "black" },
              // title: "Full Image",
            }}
          />
        </ProfileStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default ProfileScreenWrapper;
