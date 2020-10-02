import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme, Avatar, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Strings from "../../../../../constConfig/strings";
import colors from "../../../../../constConfig/colors";

import { drawerContentStyles } from "./style.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export function DrawerContent(props) {
  const paperTheme = useTheme();
  return (
    <SafeAreaView style={drawerContentStyles.androidSafeArea}>
      <DrawerContentScrollView {...props}>
        <View style={drawerContentStyles.drawerContainer}>
          <View style={drawerContentStyles.profileContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Avatar.Image
                source={{
                  uri:
                    "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/s150x150/105407348_933804930364749_1317614848103623396_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_ohc=tE3BQi9LuPwAX-yvX3Y&oh=69cc8a8e17496555f8d4921581976749&oe=5F9F1121",
                }}
                size={70}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Text style={drawerContentStyles.userNameStyle}>
                Jacqueline Fernandez
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
            </TouchableOpacity>
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
          onPress={() => {
            signOut();
          }}
          labelStyle={[drawerContentStyles.drawerTextStyle]}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}
