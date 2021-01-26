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
import NotificationScreen from "../../TabScreens/NotificationScreen";

import queryString from "query-string";
import { SERVER } from "../../../../constConfig/config";
import fonts from "../../../../constConfig/fonts.js";

const FeedStack = createStackNavigator();
const SearchStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

/* need to render this from seperate component */
function FeedStackScreen({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  const { swiperStateChange, userDetails, uid } = route.params;
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
      <FeedStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ swiperStateChange: swiperStateChange }}
        options={{
          headerShown: false,
        }}
      />
    </FeedStack.Navigator>
  );
}

function SearchStackScreen({ navigation, route }) {
  const { swiperStateChange, userDetails, uid } = route.params;
  return (
    <SearchStack.Navigator initialRouteName="SearchScreen">
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ uid: uid }}
        options={{
          headerShown: false,
          // headerStyle: { backgroundColor: "black" },
          // title: "Full Image",
        }}
      />
      <SearchStack.Screen
        name="FullDuetScreen"
        component={FullDuetScreen}
        options={{
          headerShown: false,
          // headerStyle: { backgroundColor: "black" },
          // title: "Full Image",
        }}
      />
      <SearchStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ swiperStateChange: swiperStateChange }}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}

// function NotificationStackScreen({ navigation, route, propsObj }) {
//   const { swiperStateChange, userDetails, uid, tabClick } = route.params;
//   return (
//     <NotificationStack.Navigator initialRouteName="NotificationScreen">
//       <NotificationStack.Screen
//         name="NotificationScreen"
//         // component={NotificationScreen}
//         initialParams={{
//           uid: uid,
//           tabClick: tabClick,
//         }}
//         options={{
//           headerShown: true,
//           title: "Notifications",
//           headerTitleStyle: {
//             textAlign: "center",
//             flex: 1,
//             fontSize: 16,
//           },
//         }}
//       >
//         {(props) => <NotificationScreen {...props} {...propsObj} />}
//       </NotificationStack.Screen>
//     </NotificationStack.Navigator>
//   );
// }

class NotificationStackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperStateChange: this.props.route.params.swiperStateChange,
      userDetails: this.props.route.params.userDetails,
      uid: this.props.route.params.uid,
      tabClick: this.props.tabClick,
    };
  }

  render() {
    return (
      <NotificationStack.Navigator initialRouteName="NotificationScreen">
        <NotificationStack.Screen
          name="NotificationScreen"
          // component={NotificationScreen}
          initialParams={{
            uid: this.state.uid,
          }}
          options={{
            headerShown: true,
            title: "Notifications",
            headerTitleStyle: {
              textAlign: "center",
              flex: 1,
              fontSize: 16,
            },
          }}
        >
          {(props) => <NotificationScreen {...props} {...this.props} />}
        </NotificationStack.Screen>
      </NotificationStack.Navigator>
    );
  }
}

class FeedTabNavigatorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperStateChange: this.props.route.params.swiperStateChange,
      userDetails: this.props.route.params.userDetails,
      uid: this.props.route.params.uid,
      tabClick: false,
    };
  }

  render() {
    const propsObj = {
      ...this.props,
      tabClick: this.state.tabClick,
    };
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        backBehavior="none"
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
          initialParams={{
            userDetails: this.state.userDetails,
            uid: this.state.uid,
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedStackScreen}
          initialParams={{
            swiperStateChange: this.state.swiperStateChange,
            userDetails: this.state.userDetails,
            uid: this.state.uid,
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <EntypoIcon name="home" color={color} size={32} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              this.state.swiperStateChange(true);
              this.setState({ tabClick: false });
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          initialParams={{
            swiperStateChange: this.state.swiperStateChange,
            userDetails: this.state.userDetails,
            uid: this.state.uid,
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <EntypoIcon
                name="notification"
                color={this.state.newNotification ? colors.red : color}
                size={30}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              this.state.swiperStateChange(false);
              this.setState({ tabClick: true });
            },
          }}
        >
          {(props) => <NotificationStackScreen {...props} {...propsObj} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          initialParams={{
            swiperStateChange: this.state.swiperStateChange,
            uid: this.state.uid,
          }}
          options={{
            // tabBarVisible: false,
            tabBarIcon: ({ color }) => (
              <Icon name="search" color={color} size={30} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              this.state.swiperStateChange(false);
              this.setState({ tabClick: false });
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

// function FeedTabNavigatorScreen({ route }) {
//   const { swiperStateChange, userDetails, uid, newNotification } = route.params;

//   console.log("here2", newNotification);
//   // if(route.state && route.state.index === 1){
//   //   swiperStateChange(true);
//   // }

//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       tabBarOptions={{
//         activeTintColor: colors.maroon,
//         inactiveTintColor: colors.black,
//         showLabel: false,
//       }}
//       style={{ backgroundColor: colors.grey }}
//     >
//       <Tab.Screen
//         name="Camera"
//         component={AccountScreen}
//         initialParams={{ userDetails: userDetails, uid: uid }}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="camera" color={color} size={32} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Feed"
//         component={FeedStackScreen}
//         initialParams={{
//           swiperStateChange: swiperStateChange,
//           userDetails: userDetails,
//           uid: uid,
//         }}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <EntypoIcon name="home" color={color} size={32} />
//           ),
//         }}
//         listeners={{
//           tabPress: (e) => {
//             // Prevent default action
//             swiperStateChange(true);
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={NotificationStackScreen}
//         initialParams={{
//           swiperStateChange: swiperStateChange,
//           userDetails: userDetails,
//           uid: uid,
//         }}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <EntypoIcon
//               name="notification"
//               color={newNotification ? "yellow" : color}
//               size={30}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchStackScreen}
//         initialParams={{ swiperStateChange: swiperStateChange, uid: uid }}
//         options={{
//           // tabBarVisible: false,
//           tabBarIcon: ({ color }) => (
//             <Icon name="search" color={color} size={30} />
//           ),
//         }}
//         listeners={{
//           tabPress: (e) => {
//             // Prevent default action
//             swiperStateChange(false);
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

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
              swiperStateChange: this.props.swiperStateChange,
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
