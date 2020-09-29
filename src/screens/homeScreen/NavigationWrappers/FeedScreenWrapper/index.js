import React from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { feedScreenWrapperStyles } from "./style.js";
import colors from "../../../../constConfig/colors";
import images from "../../../../constConfig/images";

import FeedScreen from "../../FeedScreen";
import FullDuetScreen from "../../FeedScreen/FullDuetScreen";
import { DrawerContent } from "../../FeedScreen/FeedDrawer/DrawerContent";

const FeedStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator initialRouteName="FeedScreen">
    <FeedStack.Screen
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
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon name="menu" color={colors.black} size={30} />
          </TouchableOpacity>
        ),
      }}
    />
    <FeedStack.Screen
      name="FullDuetScreen"
      component={FullDuetScreen}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: "black" },
        title: "",
        headerTintColor: "white",
      }}
    />
  </FeedStack.Navigator>
);

class FeedScreenWrapper extends React.Component {
  openSideDrawer = () => {
    navigation.navigate.toggleDrawer();
  };

  render() {
    return (
      <NavigationContainer independent>
        <Drawer.Navigator
          drawerPosition="left"
          drawerStyle={{
            backgroundColor: "#ff1",
            width: Dimensions.get("window").width * 0.7,
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="FeedScreen" component={FeedStackScreen} />
          <Drawer.Screen name="FeedScreen2" component={FeedStackScreen} />
        </Drawer.Navigator>
        {/* */}
      </NavigationContainer>
    );
  }
}

export default FeedScreenWrapper;
