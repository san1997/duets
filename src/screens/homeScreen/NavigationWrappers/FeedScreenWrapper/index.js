import React, { useState } from "react";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Feather";

import { AppLoading } from "expo";

import { feedScreenWrapperStyles } from "./style.js";
import colors from "../../../../constConfig/colors";
import images from "../../../../constConfig/images";

import FeedScreen from "../../FeedScreen";
import FullDuetScreen from "../../FeedScreen/FullDuetScreen";
import { DrawerContent } from "../../FeedScreen/FeedDrawer/DrawerContent";

/* drawer screens import */
import AccountScreen from "../../FeedScreen/FeedDrawer/DrawerScreens/AccountScreen";
import ProfileScreen from "../../ProfileScreen";
import EditProfileScreen from "../../EditProfileScreen";

/* tab screens import */
import SearchScreen from "../../TabScreens/SearchScreen";

import queryString from "query-string";
import { SERVER } from "../../../../constConfig/config";

const FeedStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

/* need to render this from seperate component */
function FeedStackScreen({ navigation, route }) {
  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false });
  // } else {
  //   navigation.setOptions({ tabBarVisible: true });
  // }
  const { userDetails, uid } = route.params;
  return (
    <FeedStack.Navigator
      initialRouteName="FeedScreen"
      /*header for all the feedStacks
    screenOptions={{ headerShown: true }} */
    >
      <FeedStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        initialParams={{ uid: uid }}
        options={{
          headerShown: true,
          /*Will remove title and fontsize later*/
          title: userDetails.firstName + "'s feed",
          headerTitleStyle: {
            textAlign: "center",
            flex: 1,
            fontSize: 15,
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
          // headerStyle: { backgroundColor: "black" },
          // title: "Full Image",
        }}
      />
    </FeedStack.Navigator>
  );
}

function FeedTabNavigatorScreen({ route }) {
  const { userDetails, uid } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: colors.maroon,
        inactiveTintColor: colors.black,
        showLabel: false,
      }}
      style={{ backgroundColor: colors.grey }}
    >
      <Tab.Screen
        name="Camera"
        component={AccountScreen}
        initialParams={{ userDetails: userDetails, uid: uid }}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStackScreen}
        initialParams={{ userDetails: userDetails, uid: uid }}
        options={{
          tabBarIcon: ({ color }) => (
            <EntypoIcon name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={AccountScreen}
        initialParams={{ userDetails: userDetails, uid: uid }}
        options={{
          tabBarIcon: ({ color }) => (
            <EntypoIcon name="notification" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class FeedScreenWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    const queryObj = {
      userId: this.props.uid,
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
      <NavigationContainer independent>
        <Drawer.Navigator
          drawerType={"slide"}
          swipeEnabled={false}
          drawerPosition="right"
          backBehavior="initialRoute"
          drawerStyle={{
            backgroundColor: colors.white,
            width: Dimensions.get("window").width * 0.7,
          }}
          drawerContentOptions={{
            userDetails: this.state.userDetails,
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="FeedScreen"
            component={FeedTabNavigatorScreen}
            initialParams={{
              userDetails: this.state.userDetails,
              uid: this.props.uid,
            }}
          />
          <Drawer.Screen
            name="AccountScreen"
            component={AccountScreen}
            initialParams={{
              userDetails: this.state.userDetails,
              uid: this.props.uid,
            }}
            /* need to check, why headerShown isn't working */
            options={{ headerShown: true }}
          />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          <Drawer.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default FeedScreenWrapper;
