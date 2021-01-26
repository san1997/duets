import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { useTheme, Avatar, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Strings from "../../../../../constConfig/strings";
import colors from "../../../../../constConfig/colors";
import images from "../../../../../constConfig/images";

import { drawerContentStyles } from "./style.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export function DrawerContent(props) {
  return (
    <SafeAreaView style={drawerContentStyles.androidSafeArea}>
      <DrawerContentScrollView {...props}>
        <View style={drawerContentStyles.drawerContainer}>
          <View style={drawerContentStyles.profileContainer}>
            <TouchableOpacity>
              <Image
                style={{
                  resizeMode: "contain",
                  width: 60,
                }}
                source={images.logotext}
              />
              {/* <Avatar.Image
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/duets-app-a40c0.appspot.com/o/logo%2FDuets-text-02.png?alt=media&token=b803626c-396b-4326-b0a1-db35dd7aebd6",
                }}
                size={70}
              /> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Text style={drawerContentStyles.userNameStyle}>
                {props.userDetails.firstName} {props.userDetails.lastName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditProfileScreen");
              }}
            >
              <Text style={drawerContentStyles.editProfileLinkStyle}>
                {Strings.editProfile}
              </Text>
            </TouchableOpacity> */}
          </View>

          <Drawer.Section style={drawerContentStyles.drawerSectionStyle}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bell" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="gear" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="Account"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="question" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="Help & Support"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="lock" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="Privacy"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="user" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="Invite a Friend"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="exclamation" color={color} size={26} />
              )}
              inactiveTintColor={colors.blackTimeColor}
              // inactiveBackgroundColor={colors.backgroundLight}
              label="About"
              onPress={() => {
                props.navigation.navigate("AccountScreen");
              }}
              labelStyle={[drawerContentStyles.drawerTextStyle]}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={drawerContentStyles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="arrow-right" color={color} size={26} />
          )}
          inactiveTintColor={colors.blackTimeColor}
          label="Sign Out"
          // onPress={() => {
          //   signOut();
          // }}
          onPress={() => {
            props.logoutUser();
          }}
          labelStyle={[drawerContentStyles.drawerTextStyle]}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}
