import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  HeaderBackButton,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { feedScreenWrapperStyles } from "./style.js";
import colors from "../../../../constConfig/colors";
import images from "../../../../constConfig/images";

import FeedScreen from "../../FeedScreen";
import FullDuetScreen from "../../FeedScreen/FullDuetScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class FeedScreenWrapper extends React.Component {
  render() {
    return (
      <NavigationContainer independent>
        <Stack.Navigator initialRouteName="FeedScreen">
          <Stack.Screen
            name="FeedScreen"
            component={FeedScreen}
            options={{
              title: "",
              headerTitleStyle: {
                textAlign: "center",
                flex: 1,
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
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 16 }}>
                  <Icon name="menu" color={colors.black} size={30} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="FullDuetScreen"
            component={FullDuetScreen}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "black" },
              title: "",
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    );
  }
}

export default FeedScreenWrapper;
