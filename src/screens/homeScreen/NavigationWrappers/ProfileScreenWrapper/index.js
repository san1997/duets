import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";

import ProfileScreen from "../../ProfileScreen";
import EditProfileScreen from "../../EditProfileScreen";

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
      userDetails: null,
      isLoading: true,
      isUsersProfile: this.props.profile_uid == this.props.users_uid,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchUserDetails();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchUserDetails() {
    const queryObj = {
      userId: this.props.profile_uid,
    };
    const url = `${SERVER}/user-details?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userDetails: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer independent="true">
        <ProfileStack.Navigator
          initialRouteName="ProfileScreen"
          screenOptions={{ headerShown: false }}
        >
          <ProfileStack.Screen
            name="ProfileScreen"
            initialParams={{
              userDetails: this.state.userDetails,
              profile_uid: this.props.profile_uid,
              users_uid: this.props.users_uid,
              isUsersProfile: this.state.isUsersProfile,
            }}
            options={{
              headerShown: true,
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
        </ProfileStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default ProfileScreenWrapper;
